import { Room } from "../sockets/types"

export default (
  filename: string,
  s3Dir: string,
  pdfUrl: string,
  pages: string[]
): Room => {
  return {
    users: [],
    filename,
    s3Dir,
    pdfUrl,
    pageNum: 1,
    pages,
    presenterID: "",
    zoom: 1,
    scrollLeft: 0.5,
    scrollTop: 0.5,
  }
}
