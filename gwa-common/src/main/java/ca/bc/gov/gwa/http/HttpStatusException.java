package ca.bc.gov.gwa.http;

import java.io.IOException;

public class HttpStatusException extends IOException {
  private final int code;

  private final String body;

  public HttpStatusException(final int code, final String message, final String body) {
    super(message);
    this.code = code;
    this.body = body;
  }

  public String getBody() {
    return this.body;
  }

  public int getCode() {
    return this.code;
  }
}
