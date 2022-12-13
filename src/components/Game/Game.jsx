import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Game() {
    const selectedPlayers = useLocation().state;
    const [players, setPlayers] = useState({});
    console.log('Players: ', players);

    useEffect(() => {
        const updatedPlayers = {};
        Object.entries(players).forEach(([key, player]) => {
            if (key in selectedPlayers) {
                updatedPlayers[key] = player;
            }
        });

        Object.entries(selectedPlayers).forEach(([key, player]) => {
            if (!(key in players)) {
                updatedPlayers[key] = {
                    name: player.name,
                    color: player.color,
                    profilePicture: player.profilePicture,
                    times: []
                };
            }
        });
        setPlayers(updatedPlayers);
    }, [selectedPlayers, players]);

    console.log('Updated Players: ', players);

    return (
        <div>
            <h1>Game</h1>
            <p>props.players</p>
        </div>
    );
}

export default Game;