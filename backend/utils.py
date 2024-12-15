# Helper function to serialize SQLAlchemy objects
def serialize_players(players):
    player_objs = [
        {"id": player.id, "name": player.name, "points": player.points}
        for player in players
    ]
    # sort players by points and name
    sorted_players = sorted(player_objs, key=lambda p: (-p["points"], p["name"]))

    rank = 1
    i = 0

    while i < len(sorted_players):
        current_points = sorted_players[i]["points"]

        # get all players with same point
        group = [obj for obj in sorted_players[i:] if obj["points"] == current_points]
        group_size = len(group)

        if group_size > 1:  # handle groups
            for obj in group:
                obj["rank"] = f"T{rank}"
        else:
            sorted_players[i]["rank"] = rank

        # update rank counter and iterate
        rank += group_size
        i += group_size
    return sorted_players
