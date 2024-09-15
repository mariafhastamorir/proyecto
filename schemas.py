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

class VistaProfesionalesBase(BaseModel):
    nombres: str
    apellidos: str
    numeroDocumento: str
    areaEncargada: str

    class Config:
        orm_mode = True  # Esto permite que Pydantic funcione con los modelos de SQLAlchemy