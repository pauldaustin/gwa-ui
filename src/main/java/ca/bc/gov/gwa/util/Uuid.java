package ca.bc.gov.gwa.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

public class Uuid {
  // use sha1 instead
  public static final UUID md5(final String namespace, final byte[] name) {
    return name(3, namespace, name);
  }

  // use sha1 instead
  public static final UUID md5(final String namespace, final Object name) {
    return name(3, namespace, name);
  }

  // use sha1 instead
  public static final UUID md5(final String namespace, final String name) {
    return name(3, namespace, name);
  }

  private static UUID name(final int type, final String namespace, final byte[] name) {
    try {
      final MessageDigest digester;
      if (type == 3) {
        digester = MessageDigest.getInstance("MD5");
      } else if (type == 5) {
        digester = MessageDigest.getInstance("SHA-1");
      } else {
        throw new IllegalArgumentException("Unknown namespace UUID type " + type);
      }
      if (namespace != null) {
        final byte[] bytes = namespace.getBytes(StandardCharsets.UTF_8);
        digester.update(bytes);
      }
      if (name != null) {
        digester.update(name);
      }
      final byte[] digest = digester.digest();
      return Uuid.toUuid(type, digest);
    } catch (final NoSuchAlgorithmException e) {
      throw new RuntimeException(e);
    }
  }

  private static UUID name(final int type, final String namespace, final Object name) {
    try {
      final MessageDigest digester;
      if (type == 3) {
        digester = MessageDigest.getInstance("MD5");
      } else if (type == 5) {
        digester = MessageDigest.getInstance("SHA-1");
      } else {
        throw new IllegalArgumentException("Unknown namespace UUID type " + type);
      }
      if (namespace != null) {
        final byte[] bytes = namespace.getBytes(StandardCharsets.UTF_8);
        digester.update(bytes);
      }
      if (name != null) {
        final String string = name.toString();
        final byte[] bytes = string.getBytes(StandardCharsets.UTF_8);
        digester.update(bytes);
      }
      final byte[] digest = digester.digest();
      return Uuid.toUuid(type, digest);
    } catch (final NoSuchAlgorithmException e) {
      throw new RuntimeException(e);
    }
  }

  public static final UUID sha1(final String namespace, final byte[] name) {
    return name(5, namespace, name);
  }

  public static final UUID sha1(final String namespace, final Object name) {
    return name(5, namespace, name);
  }

  public static final UUID sha1(final String namespace, final String name) {
    return name(5, namespace, name);
  }

  static int toInt(final byte[] bytes, final int offset) {
    final byte b1 = bytes[offset];
    final byte b2 = bytes[offset + 1];
    final byte b3 = bytes[offset + 2];
    final byte b4 = bytes[offset + 3];
    return b1 << 24 | (b2 & 0xFF) << 16 | (b3 & 0xFF) << 8 | b4 & 0xFF;
  }

  static long toLong(final byte[] bytes, final int offset) {
    final long high = (long)toInt(bytes, offset) << 32;
    final long low = (long)toInt(bytes, offset + 4) << 32 >>> 32;
    return high | low;
  }

  public static UUID toUuid(final byte[] bytes) {
    final long l1 = toLong(bytes, 0);
    final long l2 = toLong(bytes, 8);
    return new UUID(l1, l2);
  }

  public static UUID toUuid(final int type, final byte[] bytes) {
    bytes[6] &= 0x0f; // clear version
    bytes[6] |= type << 4; // set to version
    bytes[8] &= 0x3f; // clear variant
    bytes[8] |= 0x80; // set to IETF variant
    return toUuid(bytes);
  }

}
