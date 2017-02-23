return {
  no_consumer = true,
  fields = {
    methods = {
      type = "array",
      enum = {
        "GET",
        "HEAD",
        "OPTIONS",
        "POST",
        "PUT",
        "DELETE"
      },
    }
  }
}
