import React, { useEffect, useState } from 'react'
import './TreadTypes.css'
import api from '../../Shared/API/api';

const TreadTypes = () => {

    const [treadTypesData, setTreadTypesData] = useState([]);
    const [TreadTypesName, setTreadTypesname] = useState('');

    useEffect(()=>{
      api
        .get('/treadTypes')
        .then((response) =>{
          setTreadTypesData(response);
        })
        .catch((error) =>{
          console.log(error);
        })
    },[])
    
    const fnAddTreadType = () => {
      const newProvider = {
        name: TreadTypesName,
      };
  
      api 
        .post('/TreadTypes/new', newProvider)
        .then(() => {
          api
          .get('/TreadTypes')
          .then((response) => {
            setTreadTypesData(response)
          })
        })
        .catch((error) => {
          console.log(error)
        })
  
        setTreadTypesname('');
    }
    return (
        <div className='providersContainer'>
        <div className='providersTitle'>
          <h1>TIPOS DE CUERDA</h1>
        </div>
        <div className='providersItemsContainer'>
              {treadTypesData && treadTypesData.length > 0 && treadTypesData.map((item, index) => (
          <div key={index} className='treadsItemContainer'>
            <p className='providersItem'>{item.name}</p>
            <a href={item.web} className='providersItem'>{item.web}</a>
          </div>
        ))}
        </div>
    
    
        <div>
        <h1>NUEVO TIPO DE CUERDA</h1>
          <input 
          type='text' 
          value={TreadTypesName}
          placeholder='Nombre' 
          onChange={(e)=>{setTreadTypesname(e.target.value)}}
          className='loginInput nameInput lower'
          />
        </div>
        <div>
          <button 
          type='button'
          className='btnNavbar btnAddCategory'
          onClick={()=>{fnAddTreadType()}}
          >Grabar</button>
        </div>
        </div>
      )
}

export default TreadTypes