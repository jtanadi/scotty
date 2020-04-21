import styled from "styled-components"

type ContainerPropType = {
  scale: number
}

export const DocumentContainer = styled.div<ContainerPropType>`
  margin: 2.5rem auto 0 auto;
  padding: 2rem 0;
  height: calc(100vh - 6.5rem);
  width: 100vw;
  display: flex;
  overflow: ${(props): string => (props.scale <= 1 ? "hidden" : "scroll")};
`

type PagePropType = {
  scale: number
  mouseDown: boolean
}

export const Page = styled.img.attrs((props: PagePropType) => {
  const transform = `scale(${props.scale})`

  let cursor = "default"
  if (props.scale > 1) {
    cursor = props.mouseDown ? "grabbing" : "grab"
  }

  return {
    style: {
      cursor,
      transform,
    },
  }
})<PagePropType>`
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
  margin: auto;
  max-height: 100%;
  object-fit: contain;
  background-color: white;
  transform-origin: top;
`
