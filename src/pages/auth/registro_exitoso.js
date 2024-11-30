import React from "react";
import { Link } from "react-router-dom";
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';
import "./admin.css";

const ImagesB = require.context('../../assets', true);


const RegistroExitoso = () => {
  return (
    <div>
      <Navbar />
      <main >
        <h1 className="hh1"> Registrar Profesionales Bienestar</h1>
        <img src={ImagesB('./registrao.png')} className="registrao" />
        <h2 className="h2">El nuevo profesional se registró correctamente</h2>

        <div className="containerRe">
          <label htmlFor="btn-modal">
            <button className="btnR" type="button">
              <img width={40} height={40} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC8ElEQVR4nO2ZTWgTURDHX/VQ8AuKFUT0pCh6kQoKXgRFEUX0oIG2OxM/0YtRSDOTiEIEFcSTFw9ePHgR9eIHlrY7k4D1CwQRQUQRvVmFHsRWUauNbJpAmqa222STPMgP5rq7P/7z3u68NaZBA3vgtLPU2E5cYQsLDBhbCd0KzSbFs6TwlxUzxkZOPTy4iAV6PYF8GduIa3gTCX4qlLBLJGOaSJyTLPC7WMIakYSLC0mhu5SANSIJ11lPAh//J1HfIpmxViLFX1NJ1K1IpNtZQAq3pyNQtyIkzjoWeO9Hou5EWOA4K/z0K5GrYW9bJoE3rJBiwaukSDEXtybToXnVayXBmzMUmLJIcIQFnrPg6UQaVgQiEVdYSwpvg5KYROxxLAV7k8nkrIpIkDhHWPBHNSWK6h2ps3vGAl29MJcFrtdQYHxCCt2+RwFSZxUpvqr1w5eQGSQXd00/DXHWsOLrWj94yRIcZRej1rYWT0znvK82iymESeF7XcoIxH1vv97uUZdtJuF9vmTo0aH5pHij/lLBoYSLK02VP1ECKngyoxenN3+w4ge/N0zeOzqH+tqXcB+ujrm4MZ7CPV6fk+A1FnxW1lqU8DHfIlmZ/s4WFrzr52ZTXTPSHWkmCW9mxQuk8MJXiykMet+DZQxW2DXZjO5XpJi4i20scIUUv04vFUiaeh51E176ihen+uYbSyXSXJZMNN3RSgI9QYjkifYcWFZ8VlYilXZTLt7OQQpnWPFPECJZMqaJU3Bi8nMCSJlKkV2wAgOBiORggW0s8G1iIjga0/ByUyli6f2Ls+NsQCIeLOEN3guxWCamGDGVPsRmwXNBHmKzhHdkx+Tx7XU/sN8KpPg5kIsbb37KrsvCVIbL3r1q8aMn5P2+EHxaKOO9EoyNxF1sy7dwbhs+bGyFBO4UpHLZ2AqncHtBIg+MtWRMU34AJMGXxmZY4FIulS/GZkhxZy6RIWMz0XRHa05kxNhOor+zxataP0eDBg1MdfgHovwmodZc1U4AAAAASUVORK5CYII=" />
              Regresar
            </button>
          </label>
        </div>
      </main>
      <PiePagina />
    </div>

  );
}

export default RegistroExitoso;
