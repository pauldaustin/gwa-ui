package ca.bc.gov.gwa.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Reader;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;

import ca.bc.gov.gwa.util.JsonParser.EventType;

public interface Json {
  static final String FILE_EXTENSION = "json";

  static final String MIME_TYPE = "application/json";

  @SuppressWarnings("unchecked")
  static <V> V read(final Reader reader) throws IOException {
    try (
      final JsonParser parser = new JsonParser(reader)) {
      if (parser.hasNext()) {
        final EventType event = parser.next();
        if (event == EventType.startDocument) {
          final V value = (V)parser.getValue();
          if (parser.hasNext() && parser.next() != EventType.endDocument) {
            throw new IllegalStateException("Extra content at end of file: " + parser);
          }
          return value;
        }
      }
      return null;
    }
  }

  @SuppressWarnings("unchecked")
  static <V> V read(final String string) throws IOException {
    final StringReader reader = new StringReader(string);
    return (V)read(reader);
  }

  @SuppressWarnings("unchecked")
  static Map<String, Object> readJsonMap(final HttpServletRequest httpRequest) {
    try (
      BufferedReader reader = httpRequest.getReader()) {
      final Object data = read(reader);
      if (data instanceof Map) {
        return (Map<String, Object>)data;
      } else {
        return null;
      }
    } catch (final IOException e) {
      LoggerFactory.getLogger(Json.class).debug("Unable to read", e);
      return null;
    }
  }

  static String toString(final Map<String, ? extends Object> values) {
    final StringWriter writer = new StringWriter();
    try (
      final JsonWriter jsonWriter = new JsonWriter(writer, false)) {
      jsonWriter.write(values);
    } catch (final IOException e) {
    }
    return writer.toString();
  }

  static String toString(final Map<String, ? extends Object> values, final boolean indent) {
    final StringWriter writer = new StringWriter();
    try (
      final JsonWriter jsonWriter = new JsonWriter(writer, indent)) {
      jsonWriter.write(values);
    } catch (final IOException e) {
    }
    return writer.toString();
  }

  static String toString(final Object value) {
    final StringWriter stringWriter = new StringWriter();
    try (
      JsonWriter jsonWriter = new JsonWriter(stringWriter)) {
      jsonWriter.value(value);
    } catch (final IOException e) {
    }
    return stringWriter.toString();
  }

  static void writeJson(final HttpServletResponse httpResponse, final Map<String, Object> data) {
    httpResponse.setContentType("application/json");
    try (
      PrintWriter writer = httpResponse.getWriter();
      JsonWriter jsonWriter = new JsonWriter(writer, false)) {
      jsonWriter.write(data);
    } catch (final IOException e) {
      LoggerFactory.getLogger(Json.class).debug("Unable to write: " + data, e);
    }
  }

}
