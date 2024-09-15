from fastapi import FastAPI, APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, time, timedelta
from app.database import get_db
from app.models import Usuario, VistaProfesionales
from typing import List
from . import models, schemas
import json
import os



from app.schemas import UsuarioCreate, UsuarioLogin
import bcrypt

router = APIRouter()
app = FastAPI()

# Registro de usuarios
@router.post("/registro")

def registrer_user(user: UsuarioCreate, db: Session = Depends(get_db)):
    # Verificar si el usuario ya existe
    user_existence = db.query(Usuario).filter(Usuario.numeroDocumento == user.numeroDocumento).first()
    if user_existence:
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    
    # Encriptar contraseña
    hashed_password = bcrypt.hashpw(user.claveUsuario.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    # Crear un nuevo usuario
    nuevo_usuario = Usuario(
        tipoDocumento=user.tipoDocumento,
        numeroDocumento=user.numeroDocumento,
        nombres=user.nombres,
        apellidos=user.apellidos,
        correoUsuario=user.correoUsuario,
        claveUsuario=hashed_password,
        idRol=user.idRol
    )

    # Guardar el nuevo usuario en la base de datos
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return {"message": "Usuario registrado exitosamente"}


# Login de usuarios

@router.post("/login")
def login_user(user: UsuarioLogin, db: Session = Depends(get_db)):
    
    # Buscar al usuario por número de documento
    db_user = db.query(Usuario).filter(Usuario.numeroDocumento == user.numeroDocumento).first()
    
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Verificar la contraseña utilizando bcrypt
    if not bcrypt.checkpw(user.claveUsuario.encode('utf-8'), db_user.claveUsuario.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    return {"message": "Login exitoso", "rol": db_user.idRol, "nombres": db_user.nombres}  # Incluye los nombres

#Filtro profesional

@router.get("/vista")
def get_vista(db: Session = Depends(get_db)):
    query = db.execute("SELECT * FROM vista_profesionales;")
    result = query.fetchall()
    return result
