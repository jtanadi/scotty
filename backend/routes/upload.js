const express = require("express")
const { v4 } = require("uuid")

const s3 = require("../utils/s3")

const router = express.Router()

// get Key and URL from S3
router.get("/", (req, res) => {
  const Key = `${v4()}.pdf`

  s3.getSignedUrl(
    "putObject",
    {
      Bucket: process.env.S3_BUCKET,
      ContentType: "application/pdf",
      Key,
    },
    (err, url) => {
      if (err) throw err
      res.send({ Key, url })
    }
  )
})

module.exports = router
