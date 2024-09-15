from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from .database import Base
import enum


class RolType(str, enum.Enum):
    profesional = "profesional"
    otro = "otro"  # Otros roles si es necesario

class Usuario(Base):
    __tablename__ = "usuarios"
    
    idUsuario = Column(Integer, primary_key=True, index=True)
    tipoDocumento = Column(String(50))
    numeroDocumento = Column(String(15), unique=True, index=True)
    nombres = Column(String(100))
    apellidos = Column(String(100))
    correoUsuario = Column(String(250))
    claveUsuario = Column(String(60))
    estado = Column(Enum("pendiente", "aprobado", "denegado"))
    idRol = Column(Integer, ForeignKey("rol.idRol"))
    
    rol = relationship("Rol", back_populates="usuarios")
    horarios = relationship("Horarios", back_populates="usuario")

class Rol(Base):
    __tablename__ = "rol"
    
    idRol = Column(Integer, primary_key=True, index=True)
    tipoRol = Column(String(20), nullable=False)
    
    usuarios = relationship("Usuario", back_populates="rol")

class Horarios(Base):
    __tablename__ = "horarios"
    
    idHorarios = Column(Integer, primary_key=True, index=True)
    fichas = Column(String(100))
    areaEncargada = Column(String(20))
    idUsuario = Column(Integer, ForeignKey("usuarios.idUsuario"))
    
    usuario = relationship("Usuario", back_populates="horarios")

class VistaProfesionales(Base):
    __tablename__ = 'vista_profesionales'
    
    # Campos que corresponden a la vista en la base de datos
    nombres = Column(String, index=True)
    apellidos = Column(String, index=True)
    numeroDocumento = Column(String, primary_key=True, index=True)  # Asumimos que el número de documento es único
    areaEncargada = Column(String, index=True)

