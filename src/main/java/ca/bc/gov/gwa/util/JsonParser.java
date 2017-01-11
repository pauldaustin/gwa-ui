package ca.bc.gov.gwa.util;

import java.io.BufferedReader;
import java.io.Closeable;
import java.io.IOException;
import java.io.Reader;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

public class JsonParser implements Iterator<JsonParser.EventType>, Closeable {
  public enum EventType {
    booleanValue, colon, comma, endArray, endDocument, endObject, nullValue, number, startArray, startDocument, startObject, string, unknown
  }

  public static String getString(final Reader reader, final int count) throws IOException {
    final StringBuilder builder = new StringBuilder();
    final char[] buffer = new char[4096];
    long totalBytes = 0;
    int readBytes;
    while (totalBytes < count && (readBytes = reader.read(buffer)) > -1) {
      if (totalBytes + readBytes > count) {
        readBytes = (int)(count - totalBytes);
      }
      totalBytes += readBytes;
      builder.append(buffer, 0, readBytes);
    }
    return builder.toString();
  }

  private int currentCharacter;

  private EventType currentEvent = EventType.startDocument;

  private Object currentValue;

  private int depth;

  private EventType nextEvent = EventType.startDocument;

  private Object nextValue;

  private Reader reader;

  public JsonParser(final Reader reader) {
    this.reader = new BufferedReader(reader, 10000);
    try {
      this.currentCharacter = this.reader.read();
    } catch (final IOException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void close() throws IOException {
    final Reader reader = this.reader;
    this.reader = null;
    if (reader != null) {
      reader.close();
    }
  }

  public List<Object> getArray() throws IOException {
    if (getEvent() == EventType.startArray || hasNext() && next() == EventType.startArray) {
      EventType event = getEvent();
      final List<Object> list = new ArrayList<>();
      do {
        final Object value = getValue();
        if (value instanceof EventType) {
          event = (EventType)value;
          if (event == EventType.comma) {
            throw new IllegalStateException(
              "Missing value before ',' " + getString(this.reader, 80));
          } else if (event == EventType.endArray) {
            if (!list.isEmpty()) {
              throw new IllegalStateException(
                "Missing value after ',' and before ']' " + getString(this.reader, 80));
            }
          }
        } else {
          list.add(value);
          event = next();
        }
      } while (event == EventType.comma);
      if (event != EventType.endArray) {
        throw new IllegalStateException("Exepecting end array, not '" + this + ']');
      }
      return list;
    } else {
      throw new IllegalStateException("Exepecting start array, not: " + this);
    }

  }

  @SuppressWarnings("unchecked")
  public <T> T getCurrentValue() {
    return (T)this.currentValue;
  }

  public int getDepth() {
    return this.depth;
  }

  public EventType getEvent() {
    return this.currentEvent;
  }

  public Map<String, Object> getMap() throws IOException {
    if (getEvent() == EventType.startObject || hasNext() && next() == EventType.startObject) {
      EventType event = getEvent();
      final Map<String, Object> map = new LinkedHashMap<>();
      do {
        if (hasNext() && next() == EventType.string) {
          final String key = getStringIntern();
          if (hasNext()) {
            if (next() == EventType.colon) {
              if (hasNext()) {
                final Object value = getValue();
                if (value instanceof EventType) {
                  throw new IllegalStateException("Exepecting a value, not: " + key + "=" + value);
                }
                if (key != null) {
                  map.put(key, value);
                }
              }
            }
          }
          event = next();
        } else {
          event = getEvent();
        }
      } while (event == EventType.comma);
      if (event != EventType.endObject) {
        throw new IllegalStateException("Exepecting end object, not:" + event);
      }
      return map;
    } else {
      throw new IllegalStateException("Exepecting end object, not:" + getEvent());
    }

  }

  public String getString() {
    if (getEvent() == EventType.string || hasNext() && next() == EventType.string) {
      return getCurrentValue();
    } else {
      throw new IllegalStateException("Expecting a string");
    }
  }

  public String getStringIntern() {
    final String string = getString();
    if (string == null) {
      return null;
    } else {
      return string.intern();
    }
  }

  public Object getValue() throws IOException {
    // TODO empty array
    if (hasNext()) {
      final EventType event = next();
      if (event == EventType.startArray) {
        return getArray();
      } else if (event == EventType.startObject) {
        return this.getMap();
      } else if (event == EventType.booleanValue) {
        return getCurrentValue();
      } else if (event == EventType.nullValue) {
        return getCurrentValue();
      } else if (event == EventType.string) {
        return getCurrentValue();
      } else if (event == EventType.number) {
        return getCurrentValue();
      } else {
        return event;
      }
    } else {
      throw new IllegalStateException("Expecting a value not EOF");
    }
  }

  @Override
  public boolean hasNext() {
    return this.currentEvent != EventType.endDocument;
  }

  public boolean isEvent(final EventType eventType) {
    return this.currentEvent == eventType;
  }

  public boolean isEvent(final EventType... eventTypes) {
    for (final EventType eventType : eventTypes) {
      if (this.currentEvent == eventType) {
        return true;
      }
    }
    return false;
  }

  private void moveNext() {
    this.nextValue = null;
    try {
      skipWhitespace();
      switch (this.currentCharacter) {
        case ',':
          this.nextEvent = EventType.comma;
          this.currentCharacter = this.reader.read();
        break;
        case ':':
          this.nextEvent = EventType.colon;
          this.currentCharacter = this.reader.read();
        break;
        case '{':
          this.nextEvent = EventType.startObject;
          this.currentCharacter = this.reader.read();
          this.depth++;
        break;
        case '}':
          this.nextEvent = EventType.endObject;
          this.currentCharacter = this.reader.read();
          this.depth--;
        break;
        case '[':
          this.nextEvent = EventType.startArray;
          this.currentCharacter = this.reader.read();
        break;
        case ']':
          this.nextEvent = EventType.endArray;
          this.currentCharacter = this.reader.read();
        break;
        case 't':
          for (int i = 0; i < 3; i++) {
            this.currentCharacter = this.reader.read();
          }
          this.nextEvent = EventType.booleanValue;
          this.nextValue = Boolean.TRUE;
          this.currentCharacter = this.reader.read();
        break;
        case 'f':
          for (int i = 0; i < 4; i++) {
            this.currentCharacter = this.reader.read();
          }
          this.nextEvent = EventType.booleanValue;
          this.nextValue = Boolean.FALSE;
          this.currentCharacter = this.reader.read();
        break;
        case 'n':
          for (int i = 0; i < 3; i++) {
            this.currentCharacter = this.reader.read();
          }
          this.nextEvent = EventType.nullValue;
          this.nextValue = null;
          this.currentCharacter = this.reader.read();
        break;
        case '"':
          this.nextEvent = EventType.string;

          processString();
          this.currentCharacter = this.reader.read();
        break;
        case '-':
          this.nextEvent = EventType.number;

          processNumber();
        break;
        case -1:
          this.nextEvent = EventType.endDocument;
        break;
        default:
          if (this.currentCharacter >= '0' && this.currentCharacter <= '9') {
            this.nextEvent = EventType.number;
            processNumber();
          } else {
            this.nextEvent = EventType.unknown;
          }
        break;
      }
    } catch (final IOException e) {
      this.nextEvent = EventType.endDocument;
    }
  }

  @Override
  public EventType next() {
    if (hasNext()) {
      this.currentValue = this.nextValue;
      this.currentEvent = this.nextEvent;
      moveNext();
      return this.currentEvent;
    } else {
      throw new NoSuchElementException();
    }
  }

  private void processNumber() throws IOException {
    final StringBuilder text = new StringBuilder();
    if (this.currentCharacter == '-') {
      text.append((char)this.currentCharacter);
      this.currentCharacter = this.reader.read();
    }
    while (this.currentCharacter >= '0' && this.currentCharacter <= '9') {
      text.append((char)this.currentCharacter);
      this.currentCharacter = this.reader.read();
    }

    if (this.currentCharacter == '.') {
      text.append((char)this.currentCharacter);
      this.currentCharacter = this.reader.read();
      while (this.currentCharacter >= '0' && this.currentCharacter <= '9') {
        text.append((char)this.currentCharacter);
        this.currentCharacter = this.reader.read();
      }
    }

    if (this.currentCharacter == 'e' || this.currentCharacter == 'E') {
      text.append((char)this.currentCharacter);
      this.currentCharacter = this.reader.read();
      if (this.currentCharacter == '-' || this.currentCharacter == '+') {
        text.append((char)this.currentCharacter);
        this.currentCharacter = this.reader.read();
      }
      while (this.currentCharacter >= '0' && this.currentCharacter <= '9') {
        text.append((char)this.currentCharacter);
        this.currentCharacter = this.reader.read();
      }
    }
    this.nextValue = new BigDecimal(text.toString());
  }

  private void processString() throws IOException {
    final StringBuilder text = new StringBuilder();
    this.currentCharacter = this.reader.read();
    while (this.currentCharacter != '"' && this.currentCharacter != -1) {
      if (this.currentCharacter == '\\') {
        this.currentCharacter = this.reader.read();
        switch (this.currentCharacter) {
          case -1:
          break;
          case 'b':
            text.setLength(text.length() - 1);
          break;
          case '"':
            text.append('"');
          break;
          case '/':
            text.append('/');
          break;
          case '\\':
            text.append('\\');
          break;
          case 'f':
            text.append('\f');
          case 'n':
            text.append('\n');
          break;
          case 'r':
            text.append('\r');
          break;
          case 't':
            text.append('\t');
          break;
          case 'u':
            final char[] buf = new char[4];
            final int readCount = this.reader.read(buf);
            final String unicodeText = String.valueOf(buf, 0, readCount);
            if (readCount == 4) {
              try {
                final int unicode = Integer.parseInt(unicodeText, 16);
                text.append((char)unicode);
              } catch (final NumberFormatException e) {
                throw e;
              }
            } else {
              throw new IllegalStateException("Unicode escape not correct " + unicodeText);
            }
          break;
          default:
            throw new IllegalStateException(
              "Invalid escape character: \\" + (char)this.currentCharacter);
        }
      } else {
        text.append((char)this.currentCharacter);
      }
      this.currentCharacter = this.reader.read();
    }
    this.nextValue = text.toString();
  }

  @Override
  public void remove() {
  }

  /** Skip to next attribute in any object.*/
  public String skipToAttribute() {
    while (hasNext()) {
      final EventType eventType = next();
      if (eventType == EventType.string) {
        final String key = getStringIntern();
        if (hasNext() && next() == EventType.colon) {
          return key;
        }
      }
    }
    return null;
  }

  /**
   * Skip through the document until the specified object attribute name is
   * found.
   *
   * @param parser The parser.
   * @param fieldName The name of the attribute to skip through.
   */
  public boolean skipToAttribute(final String fieldName) {
    while (hasNext()) {
      final EventType eventType = next();
      if (eventType == EventType.string) {
        final String key = getStringIntern();
        if (key.equals(fieldName)) {
          if (hasNext() && next() == EventType.colon) {
            if (hasNext()) {
              next();
              return true;
            } else {
              return false;
            }
          }
        }
      } else if (eventType == EventType.unknown) {
        return false;
      }
    }
    return false;
  }

  /** Skip to next attribute in the same object.*/
  public String skipToNextAttribute() {
    int objectCount = 0;
    while (hasNext()) {
      final EventType eventType = next();
      if (objectCount == 0 && eventType == EventType.string) {
        final String key = getStringIntern();
        if (hasNext() && next() == EventType.colon) {
          return key;
        }
      } else if (eventType == EventType.startObject) {
        objectCount++;
      } else if (eventType == EventType.endObject) {
        if (objectCount == 0) {
          return null;
        } else {
          objectCount--;
        }
      }
    }
    return null;
  }

  public boolean skipToNextObjectInArray() {
    if (isEvent(EventType.startArray, EventType.comma)) {
      if (hasNext()) {
        final EventType eventType = next();
        if (eventType == EventType.startObject) {
          return true;
        } else if (eventType == EventType.endArray) {
          return false;
        } else {
          throw new IllegalArgumentException("Unexpected element: " + this);
        }
      }
    }
    return false;
  }

  private void skipWhitespace() throws IOException {
    while (Character.isWhitespace(this.currentCharacter)) {
      this.currentCharacter = this.reader.read();
    }
  }

  @Override
  public String toString() {
    String jsonText = "";
    try {
      jsonText = getString(this.reader, 80);
    } catch (final IOException e) {
    }
    return this.currentEvent + " : " + this.currentValue + " "
      + Character.toString((char)this.currentCharacter) + jsonText;
  }
}
