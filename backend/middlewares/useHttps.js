module.exports = (req, res, next) => {
  const forwardedProto = req.headers["x-forwarded-proto"] || ""
  const isSecure = req.secure || forwardedProto === "https"

  if (req.hostname === "localhost" || isSecure) {
    next()
  } else {
    const httpsUrl = `https://${req.get("host")}${req.originalUrl}`
    res.redirect(301, httpsUrl)
  }
}
