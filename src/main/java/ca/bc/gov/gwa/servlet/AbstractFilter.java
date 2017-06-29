package ca.bc.gov.gwa.servlet;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;

public abstract class AbstractFilter implements Filter {

  protected void sendError(final HttpServletResponse response, final int statusCode) {
    try {
      response.sendError(statusCode);
    } catch (final IOException e) {
      LoggerFactory.getLogger(getClass()).debug("Unable to send status:" + statusCode, e);
    }
  }

  protected void sendRedirect(final HttpServletResponse response, final String url) {
    try {
      response.sendRedirect(url);
    } catch (final IOException e) {
      LoggerFactory.getLogger(getClass()).debug("Unable to send redirect: " + url, e);
    }
  }
}
