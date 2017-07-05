package ca.bc.gov.gwa.util;

import java.io.Closeable;
import java.io.IOException;
import java.io.Writer;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public final class JsonWriter implements Closeable {

  private int depth = 0;

  private boolean indent;

  private Writer out;

  private boolean startAttribute;

  public JsonWriter(final Writer out) {
    this(out, true);
  }

  public JsonWriter(final Writer out, final boolean indent) {
    this.out = out;
    this.indent = indent;
  }

  public void charSequence(final CharSequence string) throws IOException {
    int length = string.length();
    for (int i = 0; i < length; i++) {
      final char c = string.charAt(i);
      switch (c) {
        case '"':
          this.out.write("\\\"");
        break;
        case '\\':
          this.out.write("\\\\");
        break;
        case '\b':
          this.out.write("\\b");
        break;
        case '\f':
          this.out.write("\\f");
        break;
        case '\n':
          this.out.write("\\n");
        break;
        case '\r':
          this.out.write("\\r");
        break;
        case '\t':
          this.out.write("\\t");
        break;
        default:
          this.out.write(c);
        break;
      }
    }
  }

  @Override
  public void close() throws IOException {
    final Writer out = this.out;
    this.out = null;
    if (out != null) {
      out.close();
    }
  }

  public void endAttribute() throws IOException {
    this.out.write(",");
    newLine();
    this.startAttribute = false;
  }

  public void endList() throws IOException {
    this.depth--;
    newLine();
    indent();
    this.out.write("]");
  }

  public void endObject() throws IOException {
    this.depth--;
    newLine();
    indent();
    this.out.write("}");
  }

  public void flush() throws IOException {
    this.out.flush();
  }

  public void indent() throws IOException {
    if (this.indent) {
      for (int i = 0; i < this.depth; i++) {
        this.out.write("  ");
      }
    }
  }

  public void label(final String key) throws IOException {
    indent();
    value(key);
    this.out.write(": ");
    this.startAttribute = true;
  }

  public void list(final Object... values) throws IOException {
    startList();
    final int size = values.length;

    if (size > 1) {
      if (this.indent) {
        Object value = values[0];
        indent();
        value(value);
        for (int index = 1; index < size; index++) {
          endAttribute();
          indent();
          value = values[index];
          value(value);
        }
      } else {
        Object value = values[0];
        value(value);
        for (int index = 1; index < size; index++) {
          endAttribute();
          value = values[index];
          value(value);
        }
      }
    }
    endList();
  }

  public void newLine() throws IOException {
    if (this.indent) {
      this.out.write('\n');
    }
  }

  public void print(final char value) throws IOException {
    this.out.write(value);
  }

  public void print(final Object value) throws IOException {
    if (value != null) {
      this.out.write(value.toString());
    }
  }

  public void setIndent(final boolean indent) {
    this.indent = indent;
  }

  public void startList() throws IOException {
    final boolean indent = true;
    startList(indent);
  }

  public void startList(final boolean indent) throws IOException {
    if (indent && !this.startAttribute) {
      indent();
    }
    this.out.write('[');
    newLine();
    this.depth++;
    this.startAttribute = false;
  }

  public void startObject() throws IOException {
    if (!this.startAttribute) {
      indent();
    }
    this.out.write('{');
    newLine();
    this.depth++;
    this.startAttribute = false;
  }

  @SuppressWarnings("unchecked")
  public void value(final Object value) throws IOException {
    if (value == null) {
      this.out.write("null");
    } else if (value instanceof Boolean) {
      if ((Boolean)value) {
        this.out.write("true");
      } else {
        this.out.write("false");
      }
    } else if (value instanceof Number) {
      final Number number = (Number)value;
      final double doubleValue = number.doubleValue();
      if (Double.isInfinite(doubleValue) || Double.isNaN(doubleValue)) {
        this.out.write("null");
      } else {
        this.out.write(number.toString());
      }
    } else if (value instanceof Collection) {
      final Collection<? extends Object> list = (Collection<? extends Object>)value;
      write(list);
    } else if (value instanceof Map) {
      final Map<String, ? extends Object> map = (Map<String, ? extends Object>)value;
      write(map);
    } else if (value instanceof CharSequence) {
      final CharSequence string = (CharSequence)value;
      this.out.write('"');
      charSequence(string);
      this.out.write('"');
    } else {
      value(value.toString());
    }
  }

  public void write(final Collection<? extends Object> values) throws IOException {
    startList();
    int i = 0;
    final int size = values.size();
    final Iterator<? extends Object> iterator = values.iterator();
    if (this.indent) {
      while (i < size - 1) {
        final Object value = iterator.next();
        indent();
        value(value);
        endAttribute();
        i++;
      }
      if (iterator.hasNext()) {
        indent();
        final Object value = iterator.next();
        value(value);
      }
    } else {
      while (i < size - 1) {
        final Object value = iterator.next();
        value(value);
        endAttribute();
        i++;
      }
      if (iterator.hasNext()) {
        final Object value = iterator.next();
        value(value);
      }
    }
    endList();
  }

  public void write(final Map<String, ? extends Object> values) throws IOException {
    startObject();
    if (values != null) {
      final Set<String> fields = values.keySet();
      int i = 0;
      final int size = fields.size();
      final Iterator<String> iterator = fields.iterator();
      while (i < size - 1) {
        final String key = iterator.next();
        final Object value = values.get(key);
        label(key);
        value(value);
        endAttribute();
        i++;
      }
      if (iterator.hasNext()) {
        final String key = iterator.next();
        final Object value = values.get(key);
        label(key);
        value(value);
      }
    }
    endObject();
  }
}
