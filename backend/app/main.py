from fastapi import FastAPI
from app import routes # Debería usarse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configurar CORS para permitir solicitudes desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # El origen del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas definidas en routes.py
app.include_router(routes.router)

@app.get("/")
def read_root():
    return {"message": "API de Bienestech está funcionando"}
