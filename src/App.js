import { useState } from "react";
import SockJsClient from 'react-stomp';


function App() {
  const [msg,setmsg] = useState([])
  const SOCKET_URL = 'http://localhost:8080/ws';

  const onConnected = () => {
    console.log("Connected!!")
  }

  const onMessageReceived = (m) => {
    console.log(m);
    if(m.length > 3){
      const arr = m.slice(0,4)
      setmsg(arr)
      console.log(arr);
    }else{
      setmsg(m);
    }
    
  }

  return (
    <div class="h-100 d-flex align-items-start">
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      
      <div class=" h-100  w-25 ml-5" >

      <div class="card mt-5  mb-3 w-100"style={{height : "35%"}}  >
        <div class="card-header  text-center" style={{background:"#0D529B",color: "#ffffff"}}><h4>Proximos</h4></div>
          <div class="card-body text-center" style={{border:"1px black solid"}}>
            {msg.length > 0 ? msg.map(({turno})=>{
              return(
                <h4>{turno}</h4>
              )
            }) : <></>}
           
        </div>
      </div>

      <div class="card mt-2  mb-3 w-100" style={{height : "15%"}} >
        <div class="card-header text-center " style={{background:"#0D529B",color: "#ffffff"}}>
            <div class="d-flex w-100">
              <h4 class="w-50">Llamado</h4>
              <h4 class="w-50">Caja</h4>
            </div>
            
            
            </div>
          <div class="card-body" style={{border:"1px black solid"}}>
            <h5 class="card-title"></h5>
           
        </div>
      </div>

      <div class="card mt-2  mb-3 w-100" style={{height : "35%"}} >
        <div class="card-header  text-center " style={{background:"#0D529B",color: "#ffffff"}}>
          <h4>En atencion</h4>
          
          </div>
          <div class="card-body" style={{border:"1px black solid"}}>
            <h5 class="card-title"></h5>
           
        </div>
      </div>
      </div>
      <div className="mt-5 w-75 h-100  mr-1">
        <div class="  w-100 "  style={{border : "1px black solid",height : "75%"}} >
            <h3>Video</h3>
        </div>

        <div class="  w-100 "  style={{border : "1px black solid",height : "14%"}} >
             <h3>Mensajes</h3>
        </div>

      </div>
      


    </div>
  );
}

export default App;
