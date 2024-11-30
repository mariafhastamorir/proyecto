from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from datetime import time

class UsuarioCreate(BaseModel):
    tipoDocumento: str
    numeroDocumento: str
    nombres: str
    apellidos: str
    correoUsuario: str
    claveUsuario: str
    idRol: int
    areaEncargada: str = None


class UsuarioLogin(BaseModel):
    numeroDocumento: str
    claveUsuario: str

class AreaEncargada(BaseModel):
    areaEncargada: str

class CoordinacionInstru(BaseModel):
    coordinacionInstru: str

class FechaSeleccionada(BaseModel):
    dia: str  # Fecha en formato yyyy-MM-dd

class RecuperarContrasena(BaseModel):
    correoUsuario: str

class RestablecerContrasena(BaseModel):
    token: str
    claveUsuario: str


#agendar talleres filtros
class CoordinacionResponse(BaseModel):
    idCoordinacion: int
    nombreCoordinacion: str

class FichasResponse(BaseModel):
    idFicha: int
    numFicha: str

class TemasResponse(BaseModel):
    idTematicas: int
    tema: str

class ProfesionalResponse(BaseModel):
    idUsuario: int
    nombres: str
    apellidos: str


#crear taller
class TallerCreate(BaseModel):
    centroFormacion: str
    jornada: str
    coordinacion: str
    numFicha: str
    tema: str
    fechaYHora: datetime # Este debe ser datetime
    observaciones: str

    # Esquema para la solicitud
class VerificarTallerRequest(BaseModel):
    numFicha: str
    tema: str
    fechaYHora: str
    

class UsuarioTallerCreate(BaseModel):
    idUsuario: int
    idTaller: int



#Consultar talleres filtros
class TallerFilters(BaseModel):
    coordinacion: str
    tema: str
    numFicha: str



#Consultar talleres en gestión talleres






#restablecer contraseña

# Esquema para solicitar el restablecimiento de contraseña
class PasswordResetRequest(BaseModel):
    email: str


# Esquema para confirmar el restablecimiento de contraseña
class PasswordChangeRequest(BaseModel):
    new_password: str


#editar taller
class TallerUpdate(BaseModel):
    tema: str
    observaciones: str | None
    centroFormacion: str
    coordinacion: str
    jornada: str
    numFicha: str
    fechaYHora: str  # Asegúrate de usar el formato adecuado para la fecha y hora

#Filtros de ficha por jornada
class Turno(BaseModel):
    turno: str #turno hace referencia a jornada
    
class FichaRequest(BaseModel):
    numFicha: str
    jornada: str  # Aquí representamos el turno
    idPrograma: int
    nombreCoordinacion: str

class HorarioFichaResponse(BaseModel):
    idHorarioFicha: int
    
class HorarioFichaResponse(BaseModel):
    trimestre: int | None
    numAmbiente: str | None
    dia: str | None
    horaInicio: time | None
    horaFin: time | None
    sede: str | None
"""

class ProfesionalCreate(BaseModel):
    tipoDocumento: str
    numeroDocumento: str
    nombres: str
    apellidos: str
    correoUsuario: str
    claveUsuario: str
    areaEncargada: str  # Asegúrate de que este campo esté definido
    """