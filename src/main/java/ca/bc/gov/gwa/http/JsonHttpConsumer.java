package ca.bc.gov.gwa.http;

import java.io.IOException;

public interface JsonHttpConsumer {
  void accept(JsonHttpClient httpClient) throws IOException;
}
