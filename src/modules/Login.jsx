import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import Menu from './Menu'

const Login = ({setsucursal,settipoServicio}) => {
    const [sucursales, setsucursales] = useState([])
    const [redirect, setredirect] = useState(false)
    
   
    useEffect(() => {
        const getSucursales = async () =>{
            const response = await fetch('../displayback/api/sucursales',{ 
                headers : { 'Content-Type': 'application/json' },
                method: 'GET',
                mode: 'cors', // <---
                cache: 'default',
              })
            const responseJson = await response.json()
            setsucursales(responseJson)
            
        }
        
        getSucursales()
        
    }, [])

    const seleccionarSucursal = (e) =>{
        const suc = sucursales.filter((s) => s.id === e.target.value)[0]
        setsucursal(suc)
       
    }
  
    const ingresar = () =>{
        setredirect(true)
    }
    const seleccionarTipoServicio = (e) =>{
        settipoServicio(e.target.value)
    }
    return (
        !redirect ?
        <>
        <Menu/>
        <div class="d-flex justify-content-center align-items-center flex-column  h-100 w-100 ">
            <div class="d-flex justify-content-center align-items-center flex-column  h-100 w-25 text-center  ">
                <select class="form-select mb-5" onChange={seleccionarSucursal} >
                    <option selected >Selecciona una sucursal</option>
                    {sucursales.length > 0 ? sucursales.map(({id,nombre})=>{
                        return (
                            <option value={id} >{nombre}</option>
                        )

                    }) : <p></p>}
                </select>

                <select class="form-select mb-5" onChange={seleccionarTipoServicio} >
                    <option selected>Selecciona un tip de servicio</option>
                    <option value="CAJA">CAJA</option>
                    <option value="EJECUTIVO">EJECUTIVO</option>
                </select>

                <button type='submit' className="btn    p-3 mt-3  " style={{background:"#0D7E61",color:"white"} } onClick={ingresar} >Ingresar</button>
                
            </div>
        </div>
        </>:
        <Navigate to={"/display"}/>
    )
}

export default Login
