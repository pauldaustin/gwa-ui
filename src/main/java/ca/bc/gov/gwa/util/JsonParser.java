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
    BOOLEAN_VALUE, COLON, COMMA, END_ARRAY, END_DOCUMENT, END_OBJECT, NULL_VALUE, NUMBER, START_ARRAY, START_DOCUMENT, START_OBJECT, STRING, UNKNOWN
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

  private EventType currentEvent = EventType.START_DOCUMENT;

  private Object currentValue;

  private int depth;

  private EventType nextEvent = EventType.START_DOCUMENT;

  private Object nextValue;

  private Reader reader;

  public JsonParser(final Reader reader) {
    this.reader = new BufferedReader(reader, 10000);
    try {
      this.currentCharacter = this.reader.read();
    } catch (final IOException e) {
      throw new IllegalStateException("Error parsing file", e);
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
    if (getEvent() == EventType.START_ARRAY || hasNext() && next() == EventType.START_ARRAY) {
      final List<Object> list = new ArrayList<>();
      do {
        final Object value = getValue();
        if (value instanceof EventType) {
          getArrayError(list, value);
        } else {
          list.add(value);
          this.currentEvent = next();
        }
      } while (this.currentEvent == EventType.COMMA);
      if (this.currentEvent != EventType.END_ARRAY) {
        throw new IllegalStateException("Exepecting end array, not '" + this + ']');
      }
      return list;
    } else {
      throw new IllegalStateException("Exepecting start array, not: " + this);
    }

  }

  private void getArrayError(final List<Object> list, final Object value) throws IOException {
    final EventType event = (EventType)value;
    if (event == EventType.COMMA) {
      throw new IllegalStateException("Missing value before ',' " + getString(this.reader, 80));
    } else if (event == EventType.END_ARRAY && !list.isEmpty()) {
      throw new IllegalStateException(
        "Missing value after ',' and before ']' " + getString(this.reader, 80));
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
    if (this.currentEvent == EventType.START_OBJECT
      || hasNext() && next() == EventType.START_OBJECT) {
      final Map<String, Object> map = new LinkedHashMap<>();
      do {
        getMapEntry(map);
      } while (this.currentEvent == EventType.COMMA);
      if (this.currentEvent != EventType.END_OBJECT) {
        throw new IllegalStateException("Exepecting end object, not:" + this.currentEvent);
      }
      return map;
    } else {
      throw new IllegalStateException("Exepecting end object, not:" + getEvent());
    }

  }

  private void getMapEntry(final Map<String, Object> map) throws IOException {
    if (hasNext() && next() == EventType.STRING) {
      final String key = getStringIntern();
      if (hasNext() && next() == EventType.COLON) {
        getMapValue(map, key);
      }
      next();
    }
  }

  private void getMapValue(final Map<String, Object> map, final String key) throws IOException {
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

  public String getString() {
    if (getEvent() == EventType.STRING || hasNext() && next() == EventType.STRING) {
      return getCurrentValue();
    } else {
      throw new IllegalStateException("Expecting a STRING");
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
    if (hasNext()) {
      final EventType event = next();
      if (event == EventType.START_ARRAY) {
        return getArray();
      } else if (event == EventType.START_OBJECT) {
        return this.getMap();
      } else if (event == EventType.BOOLEAN_VALUE) {
        return getCurrentValue();
      } else if (event == EventType.NULL_VALUE) {
        return getCurrentValue();
      } else if (event == EventType.STRING) {
        return getCurrentValue();
      } else if (event == EventType.NUMBER) {
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
    return this.currentEvent != EventType.END_DOCUMENT;
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
          this.nextEvent = EventType.COMMA;
          this.currentCharacter = this.reader.read();
        break;
        case ':':
          this.nextEvent = EventType.COLON;
          this.currentCharacter = this.reader.read();
        break;
        case '{':
          this.nextEvent = EventType.START_OBJECT;
          this.currentCharacter = this.reader.read();
          this.depth++;
        break;
        case '}':
          this.nextEvent = EventType.END_OBJECT;
          this.currentCharacter = this.reader.read();
          this.depth--;
        break;
        case '[':
          this.nextEvent = EventType.START_ARRAY;
          this.currentCharacter = this.reader.read();
        break;
        case ']':
          this.nextEvent = EventType.END_ARRAY;
          this.currentCharacter = this.reader.read();
        break;
        case 't':
          for (int i = 0; i < 3; i++) {
            this.currentCharacter = this.reader.read();
          }
          this.nextEvent = EventType.BOOLEAN_VALUE;
          this.nextValue = Boolean.TRUE;
          this.currentCharacter = this.reader.read();
        break;
        case 'f':
          for (int i = 0; i < 4; i++) {
            this.currentCharacter = this.reader.read();
          }
          this.nextEvent = EventType.BOOLEAN_VALUE;
          this.nextValue = Boolean.FALSE;
          this.currentCharacter = this.reader.read();
        break;
        case 'n':
          for (int i = 0; i < 3; i++) {
            this.currentCharacter = this.reader.read();
          }
          this.nextEvent = EventType.NULL_VALUE;
          this.nextValue = null;
          this.currentCharacter = this.reader.read();
        break;
        case '"':
          this.nextEvent = EventType.STRING;

          processString();
          this.currentCharacter = this.reader.read();
        break;
        case '-':
          this.nextEvent = EventType.NUMBER;

          processNumber();
        break;
        case -1:
          this.nextEvent = EventType.END_DOCUMENT;
        break;
        default:
          if (this.currentCharacter >= '0' && this.currentCharacter <= '9') {
            this.nextEvent = EventType.NUMBER;
            processNumber();
          } else {
            this.nextEvent = EventType.UNKNOWN;
          }
        break;
      }
    } catch (final IOException e) {
      throw new IllegalStateException("Error getting next event", e);
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
          break;
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
            processUnicodeEscape(text);
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

  private void processUnicodeEscape(final StringBuilder text) throws IOException {
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
  }

  @Override
  public void remove() {
    throw new UnsupportedOperationException();
  }

  /** Skip to next attribute in any object.*/
  public String skipToAttribute() {
    while (hasNext()) {
      final EventType eventType = next();
      if (eventType == EventType.STRING) {
        final String key = getStringIntern();
        if (hasNext() && next() == EventType.COLON) {
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
      if (eventType == EventType.STRING) {
        final String key = getStringIntern();
        if (key.equals(fieldName) && hasNext() && next() == EventType.COLON) {
          if (hasNext()) {
            next();
            return true;
          } else {
            return false;
          }
        }
      } else if (eventType == EventType.UNKNOWN) {
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
      if (objectCount == 0 && eventType == EventType.STRING) {
        final String key = getStringIntern();
        if (hasNext() && next() == EventType.COLON) {
          return key;
        }
      } else if (eventType == EventType.START_OBJECT) {
        objectCount++;
      } else if (eventType == EventType.END_OBJECT) {
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
    if (isEvent(EventType.START_ARRAY, EventType.COMMA) && hasNext()) {
      final EventType eventType = next();
      if (eventType == EventType.START_OBJECT) {
        return true;
      } else if (eventType == EventType.END_ARRAY) {
        return false;
      } else {
        throw new IllegalArgumentException("Unexpected element: " + this);
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
    return this.currentEvent + " : " + this.currentValue + " "
      + Character.toString((char)this.currentCharacter);
  }
}
