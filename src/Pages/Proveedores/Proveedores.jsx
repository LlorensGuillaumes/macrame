import React, { useEffect, useState } from 'react'
import './Proveedores.css'
import api from '../../Shared/API/api'

const Proveedores = () => {

  const [providersData, setProvidersData] = useState([]);
  const [providerName, setProviderName] = useState('');
  const [providerPhone, setProviderPhone] = useState('');
  const [providerMail, setProviderMail] = useState('');
  const [providerWeb, setProviderWeb] = useState('');


  useEffect(()=>{
    api
      .get('/providers')
      .then((response) =>{
        setProvidersData(response);
      })
      .catch((error) =>{
        console.log(error);
      })
  },[])
  
  const fnAddProvider = () => {
    const newProvider = {
      name: providerName,
      phone: providerPhone,
      mail: providerMail,
      web: providerWeb,
    };

    api 
      .post('/providers/new', newProvider)
      .then(() => {
        api
        .get('/providers')
        .then((response) => {
          setProvidersData(response)
        })
      })
      .catch((error) => {
        console.log(error)
      })

      setProviderName('');
      setProviderPhone('');
      setProviderMail('');
      setProviderWeb('');
  }

  function formatPhoneNumber(phone) {
    if (typeof phone === 'string' && /^\d+$/.test(phone)) {
      return phone.replace(/(\d{3})(?=\d)/g, '$1 ');
    } else {
      return phone;
    }
  }
  
  
  return (
    <div className='providersContainer'>
    <div className='providersTitle'>
      <h1>PROVEEDORES</h1>
    </div>
    <div className='providersItemsContainer'>
          {providersData && providersData.length > 0 && providersData.map((item, index) => (
      <div key={index} className='providersItemContainer'>
        <p className='providersItem provider_name'>{item.name}</p>
        <p className='providersItem'>{formatPhoneNumber(item.phone)}</p>
        <p className='providersItem provider_email'>{item.mail}</p>
        <a href={item.web} target='_blank' className='providersItem provider_web'>{item.web}</a>
      </div>
    ))}
    </div>


    <div>
    <h1>NUEVO PROVEEDOR</h1>
      <input 
      type='text' 
      value={providerName}
      placeholder='Nombre' 
      onChange={(e)=>{setProviderName(e.target.value)}}
      className='loginInput nameInput upper'
      />
      <input 
      type='text' 
      value={providerPhone}
      placeholder='Telefono' 
      onChange={(e)=>{setProviderPhone(e.target.value)}}
      className='loginInput nameInput'
      />
      <input 
      type='text' 
      value={providerMail}
      placeholder='Email' 
      onChange={(e)=>{setProviderMail(e.target.value)}}
      className='loginInput nameInput lower'
      />
      <input 
      type='text' 
      value={providerWeb}
      placeholder='Web' 
      onChange={(e)=>{setProviderWeb(e.target.value)}}
      className='loginInput nameInput lower'
      />
    </div>
    <div>
      <button 
      type='button'
      className='btnNavbar btnAddCategory'
      onClick={()=>{fnAddProvider()}}
      >Grabar</button>
    </div>
    </div>
  )
}

export default Proveedores