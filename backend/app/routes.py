from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import *
from app.schemas import *
from datetime import datetime
from typing import List
from jose import jwt
from sqlalchemy import func
import bcrypt




router = APIRouter()


# Registro de usuarios
@router.post("/registro")
def registrer_user(user: UsuarioCreate, db: Session = Depends(get_db)):
    # Mostrar los datos recibidos
    print(f"Datos recibidos: {user}")

    # Verificar si el usuario ya existe
    user_existence = db.query(Usuario).filter(Usuario.numeroDocumento == user.numeroDocumento).first()
    if user_existence:
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    
    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(user.claveUsuario.encode('utf-8'), bcrypt.gensalt())

    # Crear nuevo usuario
    nuevo_usuario = Usuario(
        tipoDocumento=user.tipoDocumento,
        numeroDocumento=user.numeroDocumento,
        nombres=user.nombres,
        apellidos=user.apellidos,
        correoUsuario=user.correoUsuario,
        claveUsuario=hashed_password.decode('utf-8'),
        idRol=user.idRol,
        estado="pendiente"  # Estado inicial como pendiente
    )

    # Guardar el nuevo usuario en la base de datos
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return {"message": "Usuario registrado exitosamente. Solicitud pendiente de aprobación"}



#usuarios pendientes
@router.get("/usuarios/pendientes")
def get_usuarios_pendientes(db: Session = Depends(get_db)):
    usuarios_pendientes = db.query(Usuario).filter(Usuario.estado == "pendiente").all()
    return usuarios_pendientes


@router.put("/usuarios/{idUsuario}/estado")
def update_estado_usuario(idUsuario: int, estado: str, db: Session = Depends(get_db)):

    # Buscar el usuario por su ID
    usuario = db.query(Usuario).filter(Usuario.idUsuario == idUsuario).first()
    
    # Si el usuario no existe, lanzar un error 404
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Actualizar el estado del usuario (puede ser "aprobado" o "rechazado")
    usuario.estado = estado
    db.commit()  # Guardar los cambios en la base de datos
    
    # Devolver un mensaje de éxito
    return {"message": f"Estado del usuario actualizado a {estado}"}




#login
@router.post("/login")
def login(user: UsuarioLogin, db: Session = Depends(get_db)):

    #Verificar si el usuario existe
    usuario = db.query(Usuario).filter(Usuario.numeroDocumento == user.numeroDocumento).first()

    #validar si el usuario existe
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    #validar si el usuario es aprobado
    if usuario.estado != "aprobado":
        raise HTTPException(status_code=403, detail="Usuario no aprobado")
    
    #validar la contraseña
    if not bcrypt.checkpw(user.claveUsuario.encode('utf-8'), usuario.claveUsuario.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")
    
    return {"message": "Login exitoso", "rol": usuario.idRol, "nombres": usuario.nombres}

#Filtro de profesionales por area
@router.post("/areaSelecionada")
def seleccion_area(area: AreaEncargada, db: Session = Depends(get_db)):
    print(f"Área encargada es: {area.areaEncargada}")
    usuarios_en_area = db.query(Usuario).filter(Usuario.areaEncargada == area.areaEncargada).all()
    return usuarios_en_area

#Filtros de instructores por coordinación 
@router.post("/coordinacionselecionada")
def seleccion_coordinacion(coordinacio: CoordinacionInstru, db: Session = Depends(get_db)):
    print(f"Coordinacion es: {coordinacio.coordinacionInstru}")
    usuarios_en_coordi = db.query(Usuario).filter(Usuario.coordinacionInstru == coordinacio.coordinacionInstru).all()
    return usuarios_en_coordi

@router.post("/fechaSeleccionada")
def seleccion_fecha(fecha: FechaSeleccionada, db: Session = Depends(get_db)):
    print(f"Fecha seleccionada es: {fecha.dia}")
    
    try:
        fecha_formateada = datetime.strptime(fecha.dia, "%Y-%m-%d").date()  # Asegúrate de que el formato es correcto
        talleres_en_fecha = db.query(Taller).filter(func.date(Taller.fechaYHora) == fecha_formateada).all()
        
        if not talleres_en_fecha:
            return {"message": "No hay talleres programados para esta fecha."}

        return {"message": "Talleres encontrados", "data": talleres_en_fecha}

    except ValueError:
        return {"error": "Formato de fecha inválido. Asegúrate de enviar la fecha en formato yyyy-MM-dd"}



@router.get("/buscarTalleres/hoy")
def get_talleres_hoy(db: Session = Depends(get_db)):
    today = datetime.now().date()
    
    # Comparar solo la fecha
    talleres_hoy = db.query(Taller).filter(func.date(Taller.fechaYHora) == today).all()
    
    return talleres_hoy


#Inicio Administrador
@router.get("/buscarTalleres")
def talleres_hoy(db: Session = Depends(get_db)):
    today = datetime.now().date()
    start_of_day = datetime.combine(today, datetime.min.time())  # Inicio del día a las 00:00
    end_of_day = datetime.combine(today, datetime.max.time())    # Fin del día a las 23:59:59.999999

    try:
        talleres_de_hoy = db.query(Taller).filter(
            Taller.fechaYHora >= start_of_day,
            Taller.fechaYHora <= end_of_day
        ).all()

        if not talleres_de_hoy:
            return {"message": "No hay talleres programados para esta fecha."}

        return {"message": "Talleres encontrados", "data": talleres_de_hoy}

    except Exception as e:
        print(f"Error: {e}")  # Para depuración
        return {"error": "Ha ocurrido un error al buscar los talleres"}
    


#Filtros para agendar taller
@router.get("/getCoordinaciones", response_model=List[CoordinacionResponse])
def get_coordinaciones(db: Session = Depends(get_db)):
    coordinaciones = db.query(Coordinacion).all()
    if not coordinaciones:
        raise HTTPException(status_code=404, detail="No se encontraron coordinaciones")
    return coordinaciones


@router.get("/getNumFicha", response_model=List[FichasResponse])
def get_numfichas(db: Session = Depends(get_db)):
    try:
        numfichas = db.query(Ficha).all()
        if not numfichas:
            raise HTTPException(status_code=404, detail="No se encontraron fichas")
        return numfichas
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))  # Devuelve el error al cliente


@router.get("/getTematica", response_model=List[TemasResponse])
def get_coordinaciones(db: Session = Depends(get_db)):
    tematicas = db.query(Tematicas).all()
    if not tematicas:
        raise HTTPException(status_code=404, detail="No se encontraron tematicas")
    return tematicas


@router.get("/getProfesionales", response_model=List[ProfesionalResponse])
def get_profesionales(db: Session = Depends(get_db)):
    try:
        get_profesionales = db.query(Usuario).filter(Usuario.idRol == 3).all()
        if not get_profesionales:
            raise HTTPException(status_code=404, detail="No se encontraron profesionales")
        return get_profesionales
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))  # Devuelve el error al cliente





#CREAR TALLERRRRRRRRRRRRRR T_T ;-;
@router.post("/Creartaller", response_model=TallerCreate)
def create_taller(taller: TallerCreate, db: Session = Depends(get_db)):
    try:
        nuevo_taller = Taller(
            centroFormacion=taller.centroFormacion,
            jornada=taller.jornada,
            coordinacion=taller.coordinacion,
            numFicha=taller.numFicha,
            tema=taller.tema,
            fechaYHora=taller.fechaYHora,  # Aquí se recibe como datetime
            observaciones=taller.observaciones
        )

        db.add(nuevo_taller)
        db.commit()
        return nuevo_taller
    except Exception as e:
        db.rollback()
        print(f"Error: {str(e)}")  # Esto te ayudará a entender qué salió mal
        raise HTTPException(status_code=422, detail=str(e))
    

  
#Consultar talleres
@router.post("/consultartaller")
async def consultar_talleres(filtros: dict, db: Session = Depends(get_db)):
    try:
        query = db.query(Taller)

        if filtros.get("coordinacion"):
            query = query.filter(Taller.coordinacion == filtros["coordinacion"])
        
        if filtros.get("tema"):
            query = query.filter(Taller.tema == filtros["tema"])
        
        if filtros.get("numFicha"):
            query = query.filter(Taller.numFicha == filtros["numFicha"])
        
        talleres = query.all()
        
        if not talleres:
            raise HTTPException(status_code=404, detail="No se encontraron talleres")
        
        return talleres
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



#eliminar un taller
@router.delete("/eliminartaller/{idTaller}", status_code=200)
def eliminar_taller(idTaller: int, db: Session = Depends(get_db)):
    # Buscar el taller por su ID
    taller = db.query(Taller).filter(Taller.idTaller == idTaller).first()

    # Si no se encuentra el taller, lanzar un error 404
    if not taller:
        raise HTTPException(status_code=404, detail="Taller no encontrado")

    # Eliminar el taller
    db.delete(taller)
    db.commit()

    return {"detail": "Taller eliminado exitosamente"}


# Editar un taller
@router.put("/editartaller/{idTaller}", response_model=TallerUpdate)
def editar_taller(idTaller: int, taller: TallerUpdate, db: Session = Depends(get_db)):
    # Buscar el taller por su ID
    taller_a_editar = db.query(Taller).filter(Taller.idTaller == idTaller).first()

    # Si no se encuentra el taller, lanzar un error 404
    if not taller_a_editar:
        raise HTTPException(status_code=404, detail="Taller no encontrado")

    # Actualizar los campos del taller
    taller_a_editar.tema = taller.tema
    taller_a_editar.observaciones = taller.observaciones
    taller_a_editar.centroFormacion = taller.centroFormacion
    taller_a_editar.coordinacion = taller.coordinacion
    taller_a_editar.jornada = taller.jornada
    taller_a_editar.numFicha = taller.numFicha
    taller_a_editar.fechaYHora = taller.fechaYHora

    # Guardar los cambios en la base de datos
    db.commit()

    # Retornar el taller actualizado
    return taller_a_editar



@router.post("/guardar-turno/")
def guardar_turno(turno_data: Turno, db: Session = Depends(get_db)):
    turno = turno_data.turno
    # Lógica para guardar el turno
    return {"message": f"Turno {turno} guardado exitosamente"}

@router.get("/fichas/")
def obtener_fichas(turno: str, db: Session = Depends(get_db)):
    # Consulta para incluir las fichas con el nombre del programa
    fichas = (
        db.query(Ficha, Programa.nombrePrograma)
        .join(Programa, Ficha.idPrograma == Programa.idPrograma)
        .filter(Ficha.jornada == turno)
        .all()
    )

    if not fichas:
        raise HTTPException(status_code=404, detail="No se encontraron fichas para el turno especificado")

    # Formatear el resultado para incluir los campos necesarios
    resultado = [
        {
            "idFicha": ficha.idFicha,
            "numFicha": ficha.numFicha,
            "jornada": ficha.jornada,
            "coordinacion": ficha.nombreCoordinacion,  # Ya está en la tabla Ficha
            "nombrePrograma": nombrePrograma
        }
        for ficha, nombrePrograma in fichas
    ]

    return resultado


@router.get("/horarios/{num_ficha}", response_model=list[HorarioFichaResponse])
def get_horarios_por_ficha(num_ficha: str, db: Session = Depends(get_db)):
    # Buscar la ficha por su número
    ficha = db.query(Ficha).filter(Ficha.numFicha == num_ficha).first()
    if not ficha:
        raise HTTPException(status_code=404, detail="Ficha no encontrada")

    # Obtener los horarios asociados
    horarios = db.query(HorarioFicha).filter(HorarioFicha.idFicha == ficha.idFicha).all()
    if not horarios:
        raise HTTPException(status_code=404, detail="Horarios no encontrados para la ficha")

    return horarios





"""crear profesionales de bienestar
@router.post("/profesionales")
async def crear_profesional(profesional: ProfesionalCreate, db: Session = Depends(get_db)):
    # Verificar si ya existe un profesional con el mismo número de documento
    existing_profesional = db.query(Usuario).filter(Usuario.numeroDocumento == profesional.numeroDocumento).first()
    
    if existing_profesional:
        raise HTTPException(status_code=400, detail="Ya existe un usuario con ese número de documento")
    
    # Encriptar la contraseña
    hashed_password = bcrypt.hashpw(profesional.claveUsuario.encode('utf-8'), bcrypt.gensalt())
    
    try:
        nuevo_profesional = Usuario(
            tipoDocumento=profesional.tipoDocumento,
            numeroDocumento=profesional.numeroDocumento,
            nombres=profesional.nombres,
            apellidos=profesional.apellidos,
            correoUsuario=profesional.correoUsuario,
            claveUsuario=hashed_password.decode('utf-8'),
            idRol=3,  # Asignando el rol
            area_encargada=profesional.areaEncargada,
        )
        db.add(nuevo_profesional)
        db.commit()
        db.refresh(nuevo_profesional)
        return {"mensaje": "Profesional registrado exitosamente", "profesional": nuevo_profesional}
    except Exception as e:
        db.rollback()  # Revertir cambios si ocurre un error
        raise HTTPException(status_code=500, detail=str(e))
"""