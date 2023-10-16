import React from 'react'
import './SelectColor.css'
import { useNavigate } from 'react-router-dom'

const SelectColor = (
    {
        basicColor,
    }
) => {
    const navigate = useNavigate();
    const fnClose = () =>{
        navigate(-1)
    }
  return (
    <div className='selectColorContainer'>
        <h1>{basicColor}</h1>
        <p>llistat de colors de la gamma {basicColor} </p>
        <button onClick={()=>{fnClose()}}>cerrar</button>
    </div>
  )
}

export default SelectColor