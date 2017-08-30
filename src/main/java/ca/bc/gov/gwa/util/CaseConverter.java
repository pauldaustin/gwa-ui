package ca.bc.gov.gwa.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

public final class CaseConverter {
  public static final String LOWER_CAMEL_CASE_RE = "";

  public static String captialize(final String text) {
    final char firstChar = text.charAt(0);
    return Character.toUpperCase(firstChar) + text.substring(1).toLowerCase();
  }

  public static List<String> splitWords(final String text) {
    if (text == null) {
      return Collections.emptyList();
    } else {
      final int length = text.length();
      if (length == 0) {
        return Collections.emptyList();
      } else {
        final List<String> list = new ArrayList<>();
        int currentType = Character.getType(text.charAt(0));
        int tokenStart = 0;
        for (int pos = tokenStart + 1; pos < length; pos++) {
          final char character = text.charAt(pos);
          final boolean separator = Character.isWhitespace(character) || character == '_';
          final int type = Character.getType(character);
          if (type == currentType) {
            if (separator) {
              tokenStart = pos + 1;
            } else {
              continue;
            }
          } else if (separator) {
            if (tokenStart < pos) {
              list.add(text.substring(tokenStart, pos));
            }
            tokenStart = pos + 1;
          } else if (type == Character.LOWERCASE_LETTER
            && currentType == Character.UPPERCASE_LETTER) {
            final int newTokenStart = pos - 1;
            if (newTokenStart != tokenStart) {
              if (tokenStart < newTokenStart) {
                list.add(text.substring(tokenStart, newTokenStart));
              }
              tokenStart = newTokenStart;
            }
          } else {
            if (tokenStart != pos) {
              list.add(text.substring(tokenStart, pos));
            }
            tokenStart = pos;
          }
          currentType = type;
        }
        if (tokenStart < length) {
          final String lastWord = text.substring(tokenStart);
          list.add(lastWord);
        }
        return list;
      }
    }
  }

  public static String toCapitalizedWords(final String text) {
    final List<String> words = splitWords(text);
    final StringBuilder result = new StringBuilder();
    for (final Iterator<String> iter = words.iterator(); iter.hasNext();) {
      final String word = iter.next();
      result.append(captialize(word));
      if (iter.hasNext()) {
        result.append(" ");
      }
    }
    return result.toString();
  }

  private CaseConverter() {
  }
}
