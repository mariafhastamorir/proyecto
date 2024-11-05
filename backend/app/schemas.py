from pydantic import BaseModel
from datetime import datetime
from typing import Optional

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

class UsuarioTallerCreate(BaseModel):
    idUsuario: int
    idTaller: int


"""
class TallerCreate(BaseModel):
    centroFormacion: str
    jornada: str
    coordinacion: str
    numFicha: str
    tema: str
    fechaYHora: datetime
    observaciones: Optional[str] = None  # Este campo es opcional

class UsuarioTaller(BaseModel):
    idUsuario: int


class ProfesionalCreate(BaseModel):
    tipoDocumento: str
    numeroDocumento: str
    nombres: str
    apellidos: str
    correoUsuario: str
    claveUsuario: str
    areaEncargada: str  # Asegúrate de que este campo esté definido
    """