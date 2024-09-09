from pydantic import BaseModel
from typing import List

class UsuarioCreate(BaseModel):
    tipoDocumento: str
    numeroDocumento: str
    nombres: str
    apellidos: str
    correoUsuario: str
    claveUsuario: str
    idRol: int

class UsuarioLogin(BaseModel):
    numeroDocumento: str
    claveUsuario: str

class Horario(BaseModel):
    ficha: str
    horaInicio: str
    horaFin: str

class HorarioFichaResponse(BaseModel):
    dia: str
    horaInicio: str
    horaFin: str
    jornadaFicha: str

    class Config:
        orm_mode = True

class FichaResponse(BaseModel):
    numFicha: str
    programaFormacion: str
    nombreCoordinacion: str
    horarios: List[HorarioFichaResponse]

    class Config:
        orm_mode = True
