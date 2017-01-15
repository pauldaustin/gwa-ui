package ca.bc.gov.gwa.kong;

import java.io.Closeable;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import ca.bc.gov.gwa.util.Json;

public class KongAdminClient implements Closeable {
  private final String serviceUrl;

  private CloseableHttpClient httpClient;

  public KongAdminClient(final String serviceUrl) {
    this.serviceUrl = serviceUrl;
    this.httpClient = HttpClients.createDefault();
  }

  private void appendContent(final StringBuilder content, final CloseableHttpResponse response)
    throws IOException {
    try (
      InputStream in = response.getEntity().getContent();
      Reader reader = new InputStreamReader(in)) {
      final char[] chars = new char[4096];
      for (int readCount = reader.read(chars); readCount != -1; readCount = reader.read(chars)) {
        content.append(chars, 0, readCount);
      }
    }
  }

  @Override
  public void close() throws IOException {
    if (this.httpClient != null) {
      this.httpClient.close();
      this.httpClient = null;
    }
  }

  public Map<String, Object> delete(final String path) throws IOException {
    final HttpDelete httpRequest = new HttpDelete(this.serviceUrl + path);
    try (
      CloseableHttpClient httpClient = HttpClients.createDefault();
      CloseableHttpResponse updateResponse = httpClient.execute(httpRequest)) {
      final StatusLine statusLine = updateResponse.getStatusLine();
      final int statusCode = statusLine.getStatusCode();
      if (statusCode == 204 || statusCode == 404) {
        return Collections.singletonMap("deleted", true);
      } else {
        final Map<String, Object> errorData = new LinkedHashMap<>();
        errorData.put("errorCode", statusCode);
        errorData.put("errorMessage", statusLine.getReasonPhrase());
        final String body = getContent(updateResponse);
        errorData.put("errorDetail", body);
        return errorData;
      }
    }
  }

  public Map<String, Object> executeRequest(final HttpUriRequest httpRequest)
    throws IOException, ClientProtocolException {
    try (
      CloseableHttpClient httpClient = HttpClients.createDefault();
      CloseableHttpResponse updateResponse = httpClient.execute(httpRequest)) {
      final StatusLine statusLine = updateResponse.getStatusLine();
      final int statusCode = statusLine.getStatusCode();
      if (statusCode == 200 || statusCode == 201) {
        return getContentJson(updateResponse);
      } else {
        final Map<String, Object> errorData = new LinkedHashMap<>();
        errorData.put("errorCode", statusCode);
        errorData.put("errorMessage", statusLine.getReasonPhrase());
        final String body = getContent(updateResponse);
        errorData.put("errorDetail", body);
        return errorData;
      }
    }
  }

  public Map<String, Object> executeRequestJson(final HttpEntityEnclosingRequestBase httpRequest,
    final Map<String, Object> data) throws IOException, ClientProtocolException {
    final String requestText = Json.toString(data);
    final StringEntity updateRequestEntity = new StringEntity(requestText,
      ContentType.APPLICATION_JSON);
    httpRequest.setEntity(updateRequestEntity);
    final Map<String, Object> result = executeRequest(httpRequest);
    return result;
  }

  public String getContent(final CloseableHttpResponse response) throws IOException {
    final StringBuilder content = new StringBuilder();
    appendContent(content, response);
    return content.toString();
  }

  public Map<String, Object> getContentJson(final CloseableHttpResponse response)
    throws IOException {
    final HttpEntity entity = response.getEntity();
    try (
      InputStream in = entity.getContent();
      Reader reader = new InputStreamReader(in, StandardCharsets.UTF_8)) {
      return Json.read(reader);
    }
  }

  public Map<String, Object> post(final String path, final Map<String, Object> data)
    throws IOException {
    final HttpPost updateRequest = new HttpPost(this.serviceUrl + path);
    return executeRequestJson(updateRequest, data);
  }

  public Map<String, Object> put(final String path, final Map<String, Object> data)
    throws IOException {
    final HttpPut updateRequest = new HttpPut(this.serviceUrl + path);
    return executeRequestJson(updateRequest, data);
  }
}
