package ca.bc.gov.gwa.servlet;

import java.io.IOException;

import ca.bc.gov.gwa.http.JsonHttpClient;

public interface JsonHttpConsumer {
  void accept(JsonHttpClient httpClient) throws IOException;
}
