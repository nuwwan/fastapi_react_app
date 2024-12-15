# Helper function to serialize SQLAlchemy objects
def serialize_players(players):
    return [
        {"id": player.id, "name": player.name, "points": player.points}
        for player in players
    ]
