export const catchErrors = (errorTitle) => {
  return app.plugins.plumber(
    app.plugins.notify.onError({
      title: errorTitle,
      message: "Error: <%= error.message %>"
    })
  )
}