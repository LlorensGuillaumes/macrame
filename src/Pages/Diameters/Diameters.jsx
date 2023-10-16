import React, { useEffect, useState } from 'react'
import api from '../../Shared/API/api';
import './Diameters.css';

const Diameters = () => {
    const [diametersData, setDiametersData] = useState([]);
    const [diametersDiameter, setDiamtersDiameter] = useState('');

    useEffect(()=>{
      api
        .get('/diameters/')
        .then((response) =>{
          console.log(response)
          const sortResponse = response.sort((a,b) => a.diameter - b.diameter)
          setDiametersData(sortResponse);
        })
        .catch((error) =>{
          console.log(error);
        })
    },[])
    
    const fnAddTreadType = () => {
      const newProvider = {
        diameter: diametersDiameter,
      };
  
      api 
        .post('/diameters/new', newProvider)
        .then(() => {
          api
          .get('/diameters/')
          .then((response) => {
            setDiametersData(response)
          })
        })
        .catch((error) => {
          console.log(error)
        })
  
        setDiamtersDiameter('');
    }
  return (
    <div className='providersContainer'>
    <div className='providersTitle'>
      <h1>DIAMETROS</h1>
    </div>
    <div className='providersItemsContainer'>
          {diametersData && diametersData.length > 0 && diametersData.map((item, index) => (
      <div key={index} className='diameterItemContainer'>
        <p className='diameterItem'>{item.diameter} mm</p>
      </div>
    ))}
    </div>


    <div className='newDiameter'>
    <h1>NUEVO DIAMETRO</h1>
      <input 
      type='text' 
      value={diametersDiameter}
      placeholder='nuevo diámetro' 
      onChange={(e)=>{setDiamtersDiameter(e.target.value)}}
      className='diameterInput'
      />
      <button 
      type='button'
      className='btnSaveDiameter'
      onClick={()=>{fnAddTreadType()}}
      >GUARDAR</button>
    </div>
    </div>
  )
}

export default Diameters