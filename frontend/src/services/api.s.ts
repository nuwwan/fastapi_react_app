import axios from "axios";
import { TPlayer } from "../types";
const baseURL = "http://localhost:8000";
const API_TIMEOUT = 1000;

const basePlayerUrl = `${baseURL}/players/`;

export const api = axios.create({
    baseURL: baseURL,
    timeout: API_TIMEOUT,
});

export const createPlayer = (data: TPlayer) => {
    return api.post(basePlayerUrl, data);
};

export const getAllPlayers = () => {
    return api.get(basePlayerUrl);
};

export const removePlayer = (id: number) => {
    const removePlayerUrl = `${basePlayerUrl}${id}/`
    return api.delete(removePlayerUrl);
};

export const updatePlayer = (player: TPlayer) => {
    const updatePlayerUrl = `${basePlayerUrl}${player.id}/`
    return api.put(updatePlayerUrl, player);
}
