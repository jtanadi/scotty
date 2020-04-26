import styled from "styled-components"

type ContainerPropType = {
  scale: number
}

export const DocumentContainer = styled.div<ContainerPropType>`
  margin: 3rem auto 0 auto;
  height: calc(100vh - 3rem);
  width: 100vw;
  display: flex;
  overflow: ${(props): string => (props.scale <= 1 ? "hidden" : "scroll")};
`

export const PageContainer = styled.div`
  box-sizing: border-box;
  margin: auto;
  padding: 2rem;
  height: 100%;
  display: flex;
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
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  background-color: white;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
  transform-origin: top left;
`
