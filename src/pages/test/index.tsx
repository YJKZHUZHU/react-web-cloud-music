// /** @format */

// import React from "react"
// import {useRequest} from "ahooks"
// import {ButtonPopover} from "@/components"
// import API from "@/api"
// import styles from "./index.scss"

// export default function () {
//   const {data} = useRequest(API.getVedioGroupList, {
//     formatResult: (response) => {
//       if(response.code !== 200) return []
//       return response.data
//     }
//   })


//   return (
//     <div className={styles.topNumber}>
//       {/* <ButtonPopover data={data} /> */}
//     </div>
//   )
// }
