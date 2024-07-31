import React, { useState } from 'react'
const Time = () => {
    let time = new Date().toLocaleTimeString();
    const [ctime,setCtime]=useState(time);
    const UpdateTime=()=>{
         time = new Date().toLocaleTimeString();
         setCtime(time);
    }
    setInterval(UpdateTime,1000);
  return (
    <>
      <h3  class="time">{ctime}</h3>
    </>
  )
}

export default Time
