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

/* const tools: Tool[] = ["pointer", "draw", "erase"].map(tool => createTool(tool)) */
const tools: Tool[] = ["pointer", "presenter"].map(tool => createTool(tool))

export default tools
