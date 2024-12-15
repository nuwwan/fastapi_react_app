from sqlalchemy import String, Column, Integer
from config import Base


class Player(Base):
    __tablename__ = "player"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    points = Column(Integer, nullable=False, default=0)
