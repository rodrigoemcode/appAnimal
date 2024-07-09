from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
from uuid import uuid4

app = FastAPI()

origins = ['http://127.0.0.1:5500']  # Atualize com a porta correta do seu servidor de desenvolvimento

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Animal(BaseModel):
    id: Optional[str] = None
    nome: str
    idade: int
    sexo: str
    cor: str

banco: List[Animal] = []

@app.get("/animais")
async def listar_animais():
    return banco

@app.get("/animais/{animal_id}")
async def obter_animal(animal_id: str):
    for animal in banco:
        if animal.id == animal_id:
            return animal
    return {'erro': 'Animal não localizado'}

@app.delete("/animais/{animal_id}")
def remover_animal(animal_id: str):
    posicao = -1
    for index, animal in enumerate(banco):
        if animal.id == animal_id:
            posicao = index
            break

    if posicao != -1:
        banco.pop(posicao)
        return {'mensagem': 'Animal removido com sucesso!'}
    else:
        return {'erro': 'Nenhum animal'}

@app.post("/animais")
async def criar_animal(animal: Animal):
    animal.id = str(uuid4())
    banco.append(animal)
    return animal  
