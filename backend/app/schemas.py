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

class CoordinacionSchema(BaseModel):
    idCoordinacion: int
    nombreCoordinacion: str  #




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
