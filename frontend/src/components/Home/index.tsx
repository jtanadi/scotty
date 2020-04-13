import React, {
  useState,
  useEffect,
  ChangeEvent,
  ReactElement,
  MouseEvent,
} from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import { v4 } from "uuid"

import socket from "../../socket"
import { RoomData } from "../../../../backend/src/sockets/types"
import { conveyorAPI, pingbackAddress } from "../../utils/apis"

import { Background } from "../globalStyles"
import { Form, Label, Input, UploadButton } from "./styles"

export type LocationState = {
  host: boolean
  filename: string
}

const Home: React.FC<{}> = (): ReactElement => {
  const [pdfFile, setPdfFile] = useState(null)
  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    setPdfFile(e.target.files[0])
  }

  const [loading, setLoading] = useState(false)
  const handleUpload = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault()

    if (!pdfFile) {
      return
    }

    setLoading(true)

    const uuidv4 = v4()
    const { type } = pdfFile
    const { message } = (
      await axios.post(`${conveyorAPI}/convert/pdf?out=png`, pdfFile, {
        headers: {
          "Content-Type": type,
          "x-Pingback": pingbackAddress,
          "x-Forward-Data": JSON.stringify({
            hostID: socket.id,
            roomID: uuidv4,
          }),
        },
      })
    ).data

    if (!message) {
      console.error("Message not received")
    }
  }

  const [roomID, setRoomID] = useState("")
  useEffect(() => {
    // Ping conveyor on start, but don't wait for answer
    axios.get(`${conveyorAPI}/ping`)

    socket.on("room created", (data: RoomData) => {
      setRoomID(data.roomID)
    })

    return (): void => {
      socket.off("room created")
    }
  }, [])

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

  const redirectToRoom = (): ReactElement => {
    return (
      <Redirect
        to={{
          pathname: `/room=${roomID}/filename=${pdfFile.name}`,
          state: { host: true },
        }}
      />
    )
  }

  return <Background>{roomID ? redirectToRoom() : renderInput()}</Background>
}

export default Home
