package ca.bc.gov.gwa.util;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Map;

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

}
