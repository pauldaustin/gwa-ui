package ca.bc.gov.gwa.http;

import java.net.URI;

import org.apache.http.annotation.NotThreadSafe;
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;

@NotThreadSafe
public class HttpPatch extends HttpEntityEnclosingRequestBase {

  public static final String METHOD_NAME = "PATCH";

  public HttpPatch() {
    super();
  }

  public HttpPatch(final String uri) {
    super();
    setURI(URI.create(uri));
  }

  public HttpPatch(final URI uri) {
    super();
    setURI(uri);
  }

  @Override
  public String getMethod() {
    return METHOD_NAME;
  }

}
