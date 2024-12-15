from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from controllers import create_player, delete_player, get_players, update_player
from schema import CreatePlayer
from utils import serialize_players
from models import Base, Player
from config import engine, get_db

app = FastAPI()

# Enable cors
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.post("/players/")
def create_player_endpoint(item: CreatePlayer, db: Session = Depends(get_db)):
    # Create a new Player
    db_item = Player(name=item.name, points=item.points)
    create_player(db, db_item)
    # Return all Players
    all_players = get_players(db)
    return serialize_players(all_players)


@app.get("/players/")
def get_players_endpoint(db: Session = Depends(get_db)):
    # Return all players
    all_players = get_players(db)
    return serialize_players(all_players)


@app.put("/players/{player_id}")
def update_player_endpoint(
    player_id: int, player: CreatePlayer, db: Session = Depends(get_db)
):
    db_player = update_player(db, player_id, name=player.name, points=player.points)
    if db_player is None:
        raise HTTPException(status_code=404, detail="Player not found")
    # Return all Players
    all_players = get_players(db)
    return serialize_players(all_players)


@app.delete("/players/{player_id}")
def delete_player_endpoint(player_id: int, db: Session = Depends(get_db)):
    db_player = delete_player(db, player_id)
    if db_player is None:
        raise HTTPException(status_code=404, detail="Player not found")
    # Return all items
    all_players = get_players(db)
    return serialize_players(all_players)
