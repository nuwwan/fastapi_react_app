from sqlalchemy.orm import Session
from models import Player


def get_players(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Player).offset(skip).limit(limit).all()


def create_player(db: Session, player: Player):
    db.add(player)
    db.commit()
    db.refresh(player)
    return player


def update_player(db: Session, player_id: int, name: str, points: int):
    db_player = db.query(Player).filter(Player.id == player_id).first()
    if db_player:
        db_player.name = name
        db_player.points = points
        db.commit()
        db.refresh(db_player)
    return db_player


def delete_player(db: Session, player_id: int):
    db_player = db.query(Player).filter(Player.id == player_id).first()
    if db_player:
        db.delete(db_player)
        db.commit()
    return db_player
