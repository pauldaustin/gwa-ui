package ca.bc.gov.gwa.servlet;

import java.io.IOException;
import java.util.Map;

import ca.bc.gov.gwa.http.JsonHttpClient;

public interface JsonHttpFunction {
  Map<String, Object> apply(JsonHttpClient httpClient) throws IOException;
}
