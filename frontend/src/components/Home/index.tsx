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

import BeamingModal from "../BeamingModal"
import SelectPDF from "./SelectPDF"
import UploadPDF from "./UploadPDF"
import Prompt from "./Prompt"

import { Background, COLORS } from "../globalStyles"
import { Form, ResetText } from "./styles"

export type LocationState = {
  host: boolean
  filename: string
}

const Home: React.FC<{}> = (): ReactElement => {
  const [pdfFile, setPdfFile] = useState(null)
  const [mode, setMode] = useState("select")
  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    setPdfFile(e.target.files[0])
    setMode("upload")
  }

  const handleFormReset = (): void => {
    setMode("select")

    // Wait until CSS animaiton is under way
    setTimeout(() => {
      setPdfFile(null)
    }, 250)
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

    setLoading(true)

    const uuidv4 = v4()
    const { type } = pdfFile

    try {
      const { message } = (
        await axios.post(`${conveyorAPI}/convert/pdf?out=jpg`, pdfFile, {
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
        console.error("Conveyor error: no message received")
      }
    } catch (err) {
      console.error(`Conveyor error: ${err.message}`)
    }
  }

  const [conveyorMessage, setConveyorMessage] = useState("")
  const [conveyorError, setConveyorError] = useState("")
  useEffect(() => {
    const pingConveyor = async (): Promise<void> => {
      try {
        // Ping conveyor to make sure it's awake
        const { message } = (await axios.get(`${conveyorAPI}/ping`)).data
        console.log(`Conveyor status: ${message}`)
      } catch (err) {
        console.error("Conveyor not awake")
      }
    }

    pingConveyor()

    socket.on("room created", (data: RoomData) => {
      setRoomID(data.roomID)
    })

    socket.on("conveyor update", (data: string) => {
      setConveyorMessage(data)
    })

    socket.on("conveyor error", (data: string) => {
      setConveyorError(data)
    })

    return (): void => {
      socket.off("room created")
      socket.off("conveyor update")
      socket.off("conveyor error")
    }
  }, [])

  const handleTryAgain = (): void => {
    setLoading(false)
    setConveyorMessage("")
    setConveyorError("")
  }

  const renderHome = (): ReactElement => {
    return (
      <>
        <Form>
          <Prompt mode={mode} filename={pdfFile?.name} />
          {!pdfFile ? (
            <SelectPDF pdfFile={pdfFile} handleFile={handleFile} />
          ) : (
            <UploadPDF
              disabled={!pdfFile || loading}
              handleUpload={handleUpload}
              inUploadMode={mode === "upload"}
            />
          )}
          <ResetText show={mode === "upload"} onClick={handleFormReset}>
            Select a different file
          </ResetText>
        </Form>
        {loading && (conveyorMessage || conveyorError) ? (
          <BeamingModal
            filename={pdfFile.name}
            message={conveyorMessage}
            error={conveyorError}
            handleTryAgain={handleTryAgain}
          />
        ) : null}
      </>
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

  return (
    <Background color={COLORS.SPACE_GRAY}>
      {roomID ? redirectToRoom() : renderHome()}
    </Background>
  )
}

export default Home
