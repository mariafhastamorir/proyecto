import React, { useEffect }from "react";
import { Link, useNavigate } from 'react-router-dom';

const ImagesB = require.context('../assets', true);


const NavIndex =  () => {
    return(
        <div>
            <nav className="navbar navind">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="navbar-brand">
                        <img src={ImagesB('./logoindex.png')} width="80" height="80" alt="Logo Izquierda" />
                    </div>
                    <div className="navbar-brand">
                        <img src={ImagesB('./logobienestech.png')} alt="Logo Derecha" />
                    </div>
                </div>
            </nav>

        </div>
    )
};


export default NavIndex;