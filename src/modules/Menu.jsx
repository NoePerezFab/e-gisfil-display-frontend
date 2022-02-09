import React from 'react'
import gisnetLogo from '../images/gisnetLogo.png'
const Menu = () => {
    return (
        <header >
            <nav class="navbar navbar-dark  fixed-top d-flex  " style={{background:"#0D529B"}}>
                <div class="container-fluid d-flex  align-items-end " style={{color:"#ffffff"}}>
                    <img src={gisnetLogo} alt="" width="50" height="50" class="  "/>
                    <h2 class="mr-auto  ml-2 " >e-GISfil</h2>    
                </div>      
            </nav>
        </header>
    )
}

export default Menu
