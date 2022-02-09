import { useState } from "react";
import {HashRouter as Router, Route, Routes } from "react-router-dom";
import Display from "./modules/Display";
import Login from "./modules/Login";


function App() {
  const [sucursal, setsucursal] = useState({})
  const [tipoServicio, settipoServicio] = useState('')

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login setsucursal={setsucursal} settipoServicio={settipoServicio} />}/>
        <Route path="/display" element={<Display  sucursal={sucursal} tipoServicio={tipoServicio}/>}/>
 
      </Routes>
    </Router>
  )
}

export default App;
