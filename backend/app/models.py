from sqlalchemy import Column, Integer, String, Time, Date, DateTime
from sqlalchemy.orm import relationship
from .database import Base


class Usuario(Base):
    __tablename__ = "usuarios"

    idUsuario = Column(Integer, primary_key=True, index=True)
    tipoDocumento = Column(String(50))
    numeroDocumento = Column(String(15), unique=True, index=True)
    nombres = Column(String(100))
    apellidos = Column(String(100))
    correoUsuario = Column(String(250))
    claveUsuario = Column(String(60))
    idRol = Column(Integer)


class Rol(Base):
    __tablename__ = "rol"

    idRol = Column(Integer, primary_key=True, index=True)
    tipoRol = Column(String(20))



###########################


class Coordinacion(Base):
    __tablename__= 'coordinacion'

    idHorarioFicha = Column(Integer, primary_key=True, index=True)
    nombreCoodinacion = Column(String(100))

class Ficha(Base):
    __tablename__= 'ficha'

    idFicha  = Column(Integer, primary_key=True, index=True)
    numFicha = Column(String(11))
    programaFormacion = Column(String(100))
    nombreCoordinacion = Column(String(11))
    jornada = Column(String(10))

class HorarioFicha(Base):
    __tablename__ = 'horarioficha'

    idHorarioFicha = Column(Integer, primary_key=True, index=True)
    trimestre = Column(Integer)
    numAmbiente = Column(String(11))
    dia = Column(String(10))
    horaInicio = Column(Time)
    horaFin = Column(Time)
    jornadaFicha = Column(String(10))
    sede = Column(String(30))
    idFicha = Column(Integer)

class Horario(Base):
    __tablename__ = "horarios"

    idHorarios = Column(Integer, primary_key=True, index=True)
    fichas = Column(String(11))
    areaEncargada = Column(String(20))
    coordinacion = Column(String(30))
    idUsuario = Column(Integer)


class Taller(Base):
    __tablename__ = "taller"
    idTaller =Column(Integer)
    fechaYHora = Column(DateTime)
    numFicha = Column(String(11))
    tema = Column(String(50))
    observaciones = Column(String(1000))





