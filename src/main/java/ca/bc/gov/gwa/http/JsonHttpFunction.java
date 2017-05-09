package ca.bc.gov.gwa.http;

import java.io.IOException;
import java.util.Map;

public interface JsonHttpFunction {
  Map<String, Object> apply(JsonHttpClient httpClient) throws IOException;
}
