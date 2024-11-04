from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import routes

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permitir solo el origen local
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Incluir las rutas definidas en routes.py
app.include_router(routes.router)

@app.get("/")
def read_root():
    return {"message": "API de Bienestech está funcionando"}
