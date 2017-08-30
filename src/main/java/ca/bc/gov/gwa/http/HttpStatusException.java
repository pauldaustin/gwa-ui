package ca.bc.gov.gwa.http;

import java.io.IOException;

import org.apache.http.client.methods.HttpUriRequest;

public class HttpStatusException extends IOException {
  private static final long serialVersionUID = 1L;

  private final int code;

  private final String body;

  private final transient HttpUriRequest httpRequest;

  public HttpStatusException(final HttpUriRequest httpRequest, final int code, final String message,
    final String body) {
    super(message);
    this.httpRequest = httpRequest;
    this.code = code;
    this.body = body;
  }

  public String getBody() {
    return this.body;
  }

  public int getCode() {
    return this.code;
  }

  public HttpUriRequest getHttpRequest() {
    return this.httpRequest;
  }

  @Override
  public String toString() {
    return super.toString() + "\n" + this.httpRequest;
  }
}
