import React from "react";
const ImagesB = require.context('../../assets', true);


const CerrarSesion = () => {
    return (
        <body className="fondo">
            <nav className="navbar navbar-expand-lg nnnn">
                <ul className="navbar-nav">
                </ul>
                <ul className="navbar-nav ms-auto">
                    <div>
                        <img src={ImagesB('./logobienestech.png')} />
                    </div>
                </ul>
            </nav>

            <div className="container">
                <div className="row">
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4 text-center">
                        <div className="card">
                            <div className="card-body cardconfirma">
                                <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                                    <img src={ImagesB('./cerrarSesion.png')} />
                                </div>
                            </div>
                            <h2>Ha cerrado sesión</h2>
                            <div className="d-flex justify-content-center">
                                <img width="50" height="50" src="https://img.icons8.com/ios/50/iphone-spinner--v1.png" alt="iphone-spinner--v1" />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                    </div>
                </div>
            </div>


        </body>
    );
}

export default CerrarSesion;