from pydantic import BaseModel


class BasePlayer(BaseModel):
    name: str
    points: int


class CreatePlayer(BasePlayer):
    pass


class Player(BasePlayer):
    id: int

    class Config:
        orm_mode = True
