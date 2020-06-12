/* import { useState, Dispatch, SetStateAction } from "react" */

/* import { PageOption } from "../../NavBar" */
/* import socket from "../../../socket" */

/* type UsePageNumReturn = { */
/*   pageNum: number */
/*   setPageNum: Dispatch<SetStateAction<number>> */
/*   handleChangePage: (option: PageOption) => void */
/* } */

/* export default (roomID: string, pages: string[]): UsePageNumReturn => { */
/*   const [pageNum, setPageNum] = useState(1) */
/*   const handleChangePage = (option: PageOption): void => { */
/*     const { offset, goto } = option */
/*     setPageNum(current => { */
/*       let newPageNum: number */
/*       if (offset) { */
/*         newPageNum = current + offset */
/*       } else if (goto) { */
/*         newPageNum = goto */
/*       } */

/*       if (newPageNum <= pages.length && newPageNum >= 1) { */
/*         socket.emit("client change page", { roomID, pageNum: newPageNum }) */
/*         return newPageNum */
/*       } */

/*       return current */
/*     }) */
/*   } */

/*   return { pageNum, setPageNum, handleChangePage } */
/* } */
