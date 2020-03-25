import React, { useState, ChangeEvent, ReactElement, MouseEvent } from "react"
import axios from "axios"
import { v4 } from "uuid"

import socket from "../../socket"

import LinkModal from "../LinkModal"
import { Background } from "../globalStyles"
import { Form, Label, Input, UploadButton } from "./styles"

const Home: React.FC<{}> = (): ReactElement => {
  const [pdfFile, setPdfFile] = useState(null)
  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    setPdfFile(e.target.files[0])
  }

  const [roomID, setRoomID] = useState("")
  const [loading, setLoading] = useState(false)
  const handleUpload = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault()

    if (!pdfFile) {
      return
    }
    const { type } = pdfFile
    const { Key, url } = (await axios.get("/api/upload")).data

    setLoading(true)

    // Upload to S3 bucket
    await axios.put(`${url}`, pdfFile, {
      headers: { "Content-Type": type },
    })

    const uuidv4 = v4()

    // Create and redirect to room
    socket.emit("create room", { roomID: uuidv4, pdfUrl: Key })

    // When roomID is set, LinkModal will be displayed
    // LinkModal will take care of redirecting to Room
    setRoomID(uuidv4)
  }

  const renderInput = (): ReactElement => {
    return (
      <Form>
        <Input
          type="file"
          id="file-input"
          accept="application/pdf"
          onChange={handleFile}
        />
        <Label htmlFor="file-input">
          {pdfFile ? pdfFile.name : "Select PDF to upload"}
        </Label>
        <UploadButton disabled={!pdfFile || loading} onClick={handleUpload}>
          {loading ? "🛸️ Beaming.... 🛸️" : "🖖️ Beam me up, Scotty! 🖖"}
        </UploadButton>
      </Form>
    )
  }

  return (
    <Background>
      {roomID ? (
        <LinkModal
          link={`${window.location.toString()}room=${roomID}/file=${
            pdfFile.name
          }`}
        />
      ) : (
        renderInput()
      )}
    </Background>
  )
}

export default Home
