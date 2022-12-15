const API_URL = 'https://4sk07xvyo9.execute-api.us-east-1.amazonaws.com';

const createNewPlayer = async (name, color, profilePicture) => {
    const response = await fetch(`${API_URL}/players`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            color,
            profilePicture,
        }),
    });
    const data = await response.json();
    console.log(data);
    return data;
}

const getAllPlayers = async () => {
    const response = await fetch(`${API_URL}/players`);
    const data = await response.json();
    return data.Items;
};

const getPlayerById = async (id) => {
    const response = await fetch(`${API_URL}/players/${id}`);
    const data = await response.json();
    return data.Item;
};

const updatePlayerById = async (id, name, color, profilePicture) => {
    const response = await fetch(`${API_URL}/players/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            color,
            profilePicture,
        }),
    });
    const data = await response.json();
    console.log(data);
};

const addSessionToPlayer = async (id, sessionId) => {
    const response = await fetch(`${API_URL}/players/${id}/sessionIds`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sessionId,
        }),
    });
    const data = await response.json();
    console.log(data);
};

const deletePlayerById = async (id) => {
    const response = await fetch(`${API_URL}/players/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
};

const deleteSessionFromPlayer = async (id, sessionId) => {
    const response = await fetch(`${API_URL}/players/${id}/sessionIds`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sessionId,
        }),
    });
    const data = await response.json();
    console.log(data);
};

const createNewSession = async (date, playerIds) => {
    const response = await fetch(`${API_URL}/sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date,
            playerIds,
        }),
    });
    const data = await response.json();
    console.log(data);
    return data.slice(20);
};

const getAllSessions = async () => {
    const response = await fetch(`${API_URL}/sessions`);
    const data = await response.json();
    return data.Items;
};

const getSessionById = async (id) => {
    const response = await fetch(`${API_URL}/sessions/${id}`);
    const data = await response.json();
    return data;
};

const getOngoingSessions = async () => {
    const response = await fetch(`${API_URL}/sessions/ongoing`);
    const data = await response.json();
    return data.Items;
};

const getOngoingSessionsVerbose = async () => {
    const response = await fetch(`${API_URL}/sessions/ongoing/verbose`);
    const data = await response.json();
    return data; // Not data.Items because API is wack
};

const getFinishedSessions = async () => {
    const response = await fetch(`${API_URL}/sessions/finished`);
    const data = await response.json();
    return data;
};

const getFinishedSessionsByPlayerId = async (playerId) => {
    const response = await fetch(`${API_URL}/sessions/finished/${playerId}`);
    const data = await response.json();
    return data.Items;
};

const updateSessionById = async (id, date, ongoing) => {
    const body = {};
    if (date) {
        body.date = date;
    }
    if (ongoing !== undefined && ongoing !== null) {
        body.ongoing = ongoing;
    }

    const response = await fetch(`${API_URL}/sessions/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
};

const addPlayersToSession = async (id, playerIds) => {
    const response = await fetch(`${API_URL}/sessions/${id}/players`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            playerIds,
        }),
    });
    const data = await response.json();
    console.log(data);
};

const deletePlayersFromSession = async (id, playerIds) => {
    const response = await fetch(`${API_URL}/sessions/${id}/players`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            playerIds,
        }),
    });
    const data = await response.json();
    console.log(data);
};

const addScoreToPlayerInSession = async (id, playerId, score, date) => {
    const response = await fetch(`${API_URL}/sessions/${id}/players/${playerId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            score,
            date,
        }),
    });
    const data = await response.json();
    console.log(data);
};

const deleteScoreFromPlayerInSession = async (id, playerId, score) => {
    const response = await fetch(`${API_URL}/sessions/${id}/players/${playerId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            score,
        }),
    });
    const data = await response.json();
    console.log(data);
};

const getScoresFromPlayerInSession = async (id, playerId) => {
    const response = await fetch(`${API_URL}/sessions/${id}/players/${playerId}`);
    const data = await response.json();
    return data;
};

export {
    createNewPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayerById,
    addSessionToPlayer,
    deletePlayerById,
    deleteSessionFromPlayer,
    createNewSession,
    getAllSessions,
    getSessionById,
    getOngoingSessions,
    getOngoingSessionsVerbose,
    getFinishedSessions,
    getFinishedSessionsByPlayerId,
    updateSessionById,
    addPlayersToSession,
    deletePlayersFromSession,
    addScoreToPlayerInSession,
    deleteScoreFromPlayerInSession,
    getScoresFromPlayerInSession,
};