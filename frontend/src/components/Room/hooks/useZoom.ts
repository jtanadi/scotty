import { useState } from "react"

enum ZOOMLIMIT {
  MIN = 1,
  MAX = 5,
}

type UseZoomReturn = {
  scale: number
  handleZoom: (offset: number) => void
}

export default (): UseZoomReturn => {
  const [scale, setScale] = useState(1)
  const handleZoom = (offset: number): void => {
    setScale(prev => {
      return prev + offset < ZOOMLIMIT.MIN || prev + offset > ZOOMLIMIT.MAX
        ? prev
        : prev + offset
    })
  }

  return { scale, handleZoom }
}
