export type Tool = {
  name: string
  image: string
  hover?: string
  active?: string
}

const createTool = (name: string): Tool => ({
  name,
  image: `/static/icons/${name}.svg`,
  hover: `/static/icons/${name}Light.svg`,
})

export const pointerTools: Tool[] = ["pointer", "presenter"].map(tool =>
  createTool(tool)
)

export const zoomTools: Tool[] = ["zoomIn", "zoomOut", "zoomReset"].map(tool =>
  createTool(tool)
)
