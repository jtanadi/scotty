const AWS = require("aws-sdk")
const express = require("express")
const { v4 } = require("uuid")

const cache = require("../cache")

const s3 = new AWS.S3()
const router = express.Router()

// get Key and URL from S3
router.get("/", (req, res) => {
  const Key = `${v4()}.pdf`

  s3.getSignedUrl(
    "putObject",
    {
      Bucket: "my-bucket",
      ContentType: "application/pdf",
      Key,
    },
    (err, url) => {
      if (err) throw err
      res.send({ Key, url })
    }
  )
})

// store imageUrl in memory
router.post("/", (req, res) => {
  const { roomID, imageUrl } = req.body
  cache.set(roomID, imageUrl)
  res.sendStatus(204)
})

module.exports = router
