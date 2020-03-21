import React, { useState, ChangeEvent } from "react"
import { v4 } from "uuid"
import axios from "axios"

const Host: React.FC<{}> = (): React.ReactElement => {
  const [pdfFile, setPdfFile] = useState(null)
  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    setPdfFile(e.target.files[0])
  }

  const handleUpload = async (): Promise<void> => {
    if (!pdfFile) {
      return
    }
    const { fileType } = pdfFile
    const { Key, url } = (await axios.get("/api/upload")).data

    await axios.put(`${url}`, pdfFile, {
      headers: { "Content-Type": fileType },
    })

    const roomID = v4()
    await axios.post("/api/upload", { roomID, imageUrl: Key })

    // redirect to room
  }

  return (
    <div>
      <h4>Upload PDF</h4>
      <input type="file" accept="application/pdf" onChange={handleFile} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default Host
