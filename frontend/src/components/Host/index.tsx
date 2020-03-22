import React, { useState, ChangeEvent, ReactElement } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import { v4 } from "uuid"

import socket from "../../socket"

const Host: React.FC<{}> = (): ReactElement => {
  const [pdfFile, setPdfFile] = useState(null)
  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    setPdfFile(e.target.files[0])
  }

  const [roomID, setRoomID] = useState("")
  const handleUpload = async (): Promise<void> => {
    if (!pdfFile) {
      return
    }
    const { type } = pdfFile
    const { Key, url } = (await axios.get("/api/upload")).data

    // Upload to S3 bucket
    await axios.put(`${url}`, pdfFile, {
      headers: { "Content-Type": type },
    })

    const uuidv4 = v4()
    // await axios.post("/api/upload", { roomID: uuidv4, pdfUrl: Key })

    // Create and redirect to room
    socket.emit("create room", { roomID: uuidv4, pdfUrl: Key })
    setRoomID(uuidv4)
  }

  return (
    <div>
      <h4>Upload PDF</h4>
      <input type="file" accept="application/pdf" onChange={handleFile} />
      <button onClick={handleUpload}>Upload</button>
      {roomID ? <Redirect to={`/room=${roomID}`} /> : null}
    </div>
  )
}

export default Host
