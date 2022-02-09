import React from 'react'
import SockJsClient from 'react-stomp';
import { useState } from "react";
import ReactPlayer from 'react-player';

const Display = ({sucursal,tipoServicio}) => {
    const [proximos, setproximos] = useState([])
  const [enAtencion, setenAtencion] = useState([])
  const [llamado, setllamado] = useState(null)
  const videos = ["https://youtu.be/QhM0ok4Bodw","https://youtu.be/0KWyWJZ7QCc"]
  const SOCKET_URL = '../displayback/ws'
  const onConnected = () => {
    console.log("Connected!!")
    console.log('/call/message/'+sucursal.id+'/'+tipoServicio);
  }

  const onMessageReceived = (m) => {
    console.log(m);
    if(m.proximos.length > 3){
      const arr = m.proximos.slice(0,4)
      setproximos(arr)
      console.log(arr);
    }else{
      setproximos(m.proximos);
    }
    setenAtencion(m.enAtencion)
    setllamado(m.llamado)
    
  }

  return (
    <div class="h-100 d-flex align-items-start">
      <SockJsClient
        url={SOCKET_URL}
        topics={['/call/message/'+sucursal.id+'/'+tipoServicio]}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      
      <div class=" h-100  w-25 ml-5" >

      <div class="card mt-5  mb-3 w-100"style={{height : "35%"}}  >
        <div class="card-header  text-center" style={{background:"#0D529B",color: "#ffffff"}}><h1>Proximos</h1></div>
          <div class="card-body text-center" style={{border:"1px black solid"}}>
            {proximos.length > 0 ? proximos.map(({turno})=>{
              return(
                <h1>{turno}</h1>
              )
            }) : <></>}
           
        </div>
      </div>

      <div class="card mt-2  mb-3 w-100" style={{height : "15%"}} >
        <div class="card-header text-center " style={{background:"#0D529B",color: "#ffffff"}}>
            <div class="d-flex w-100">
              <h2 class="w-50">Llamado</h2>
              <h2 class="w-50">{tipoServicio}</h2>
            </div>
            
            
            </div>
          <div class="card-body text-center" style={{border:"1px black solid"}}>
          <div class="d-flex w-100">
            {llamado !== null ?
            <>
            <h1 class="w-50">{llamado.turno}</h1>
            <h2 class="w-50">{llamado.mostrador.nombre}</h2> 
            </>: <></> }
              
            </div>
           
        </div>
      </div>

      <div class="card mt-2  mb-3 w-100" style={{height : "35%"}} >
        <div class="card-header  text-center " style={{background:"#0D529B",color: "#ffffff"}}>
          <h1>En atencion</h1>
          
          </div>
          <div class="card-body text-center" style={{border:"1px black solid"}}>
          
            {enAtencion.length > 0 ?
            enAtencion.map(({turno,mostrador})=>{
              return(
                <div class="d-flex w-100">
            <h1 class="w-50">{turno}</h1>
            <h2 class="w-50">{mostrador.nombre}</h2> 
            </div>
              )
            })
            : <></> }
              
           
        </div>
      </div>
      </div>
      <div className="mt-5 w-75 h-100  mr-1">
        <div class="  w-100 "  style={{border : "1px black solid",height : "88%"}} >
         
            <ReactPlayer
            url={videos}
            playing={true}
            width="100%"
            height="100%"
            controls={false}
            loop={true}
            
            />
        </div>

        

      </div>
      


    </div>

  );
}

export default Display
