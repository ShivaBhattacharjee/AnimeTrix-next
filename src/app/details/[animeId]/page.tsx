import React from 'react'

const page = ({params}:{
    params : {animeId : number}
}) => {
  return (
    <div>This is details page Id:{params.animeId}</div>
  )
}

export default page