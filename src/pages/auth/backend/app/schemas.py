from pydantic import BaseModel

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

