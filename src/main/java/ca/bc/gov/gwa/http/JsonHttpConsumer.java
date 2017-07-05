package ca.bc.gov.gwa.http;

import java.io.IOException;
import java.util.Map;

public interface JsonHttpConsumer extends JsonHttpFunction {
  void accept(JsonHttpClient httpClient) throws IOException;

  @Override
  default Map<String, Object> apply(final JsonHttpClient httpClient) throws IOException {
    accept(httpClient);
    return null;
  }
}
