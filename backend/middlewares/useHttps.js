module.exports = (req, res, next) => {
  const forwardedProtocol = req.headers["x-forwarded-proto"] || ""
  const isSecure = req.secure || forwardedProtocol === "https"

  if (req.hostname === "localhost" || isSecure) {
    next()
  } else {
    const httpsUrl = `https://${req.get("host")}${req.originalUrl}`
    res.redirect(301, httpsUrl)
  }
}
