import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";

import logo from '../public/images/logo.png'
export function Navbar(){
    return(
        <>
            <div className="navbar">
                <Link to="/allwork"><div className="logo-href"><img className="logonav" src={logo} alt="" /></div></Link>
                <a href="/"><div className="profile"></div></a>
            </div> 
        </>
    )
}
