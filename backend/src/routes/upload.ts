import express from "express"
import { v4 } from "uuid"

import s3 from "../utils/s3"

const router = express.Router()

// get Key and URL from S3
router.get("/", (req, res): void => {
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

export default router
