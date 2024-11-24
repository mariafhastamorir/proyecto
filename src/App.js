import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/auth/index";
import Registro from "./pages/auth/registro";
import Login from "./pages/auth/inicio_sesion";
import Admin from "./pages/auth/admin";
import TalleresIn from "./pages/auth/talleres"
import Agendar from  "./pages/auth/agendar_talleres"
import Agendado from  "./pages/auth/agendado"
import Permisos from "./pages/auth/permisosAdmin"
import ProgramacionTalleres from  "./pages/auth/programacionTalleres"
import ConsultarTalleres from   "./pages/auth/consultarTalleres"

import Prof from "./pages/auth/profesional";
import GestionprofB from "./pages/auth/gestionprofB";
import Profespecifico from "./pages/auth/prof_especifico";
import Registrarprof from "./pages/auth/registrarprof";
import RegistroExitoso from './pages/auth/registro_exitoso';
import ConsultarInstru from "./pages/auth/consultar_instru";

import Coordinador from  "./pages/auth/coordi";
import Instru from  "./pages/auth/instru";
import GestionInstru from "./pages/auth/gestionInstru";
import GestionFichas from "./pages/auth/gestionFichas";
import ImportarFichas from "./pages/auth/importarFicha";
import ImportarInstru from "./pages/auth/importarInstru";
import PerfilCordi from "./pages/auth/perfil";
import PerfilAdmin from "./pages/auth/perfil_admin";
import GestionFichasAdmin from "./pages/auth/gestionFichasAdmin";
import ConsultarFichasAdmin from  "./pages/auth/consultar_fichasAdmin";

import PoliticasPrivacidad from "./pages/auth/PoliticasPrivacidad";



function App() {

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Index />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login/> } />
          <Route path="/admin" element={<Admin/> } />
          <Route path="/profesional" element={<Prof />}/>
          <Route path="/talleres" element={<TalleresIn />}/>
          <Route path="/agendar" element={<Agendar />}/>
          <Route path="/agendado" element={<Agendado />}/>
          <Route path="/perfilAdministrador" element={<PerfilAdmin />} />
          <Route path="/gestionFichasAdmin" element={<GestionFichasAdmin/>}/>
          <Route path="/consultarFichaAdmin" element={<ConsultarFichasAdmin/>}/>
          <Route path="/permisos" element={<Permisos/>}/>
          <Route path="/programacionTalleres" element={<ProgramacionTalleres/>}/>
          <Route path="/consultarTalleres" element={<ConsultarTalleres/>}/>
          
          <Route path="/gestionprofB" element={<GestionprofB/>}/>
          <Route path="/prof_especifico" element={<Profespecifico/>}/>
          <Route path="/registrarprof" element={<Registrarprof/>}/>
          <Route path="/registro_exitoso" element={<RegistroExitoso />} />
          <Route path="/consultar_instru" element={<ConsultarInstru/>}/>
          
          <Route path="/coordinador" element={<Coordinador/>}/>
          <Route path="/instructor" element={<Instru/>}/>
          <Route path="/gestionInstructores" element={<GestionInstru/>}/>
          <Route path="/gestionFichas2" element={<GestionFichas />} />
          <Route path="/importarFichas" element={<ImportarFichas />} />
          <Route path="/importarInstru" element={<ImportarInstru />} />
          <Route path="/perfilCoordinador" element={<PerfilCordi />} />

          <Route path="/politicasPrivacidad" element={<PoliticasPrivacidad />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
