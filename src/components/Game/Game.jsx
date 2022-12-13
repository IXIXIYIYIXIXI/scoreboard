import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Game.css';

function Game() {
    const location = useLocation();
    const selectedPlayers = location.state;
    const [players, setPlayers] = useState({});

    const handleButtonClick = (id, isIncrement) => {
        const player = players[id];
        const name = player.name;
        const color = player.color;
        const profilePicture = player.profilePicture;

        const newPlayers = { ...players, [id]: { name, color, profilePicture, times: (isIncrement ? [...player.times, new Date()] : player.times.slice(0, -1)) } };
        const sorted = Object.entries(newPlayers).sort((a, b) => b[1].times.length - a[1].times.length === 0 ? a[1].name.localeCompare(b[1].name) : b[1].times.length - a[1].times.length).reduce((acc, [id, player]) => {
            acc[id] = player;
            return acc;
        }, {});
        setPlayers(sorted);
    };

    useMemo(() => {
        setPlayers(selectedPlayers);
    }, [selectedPlayers]);

    return (
        <div id='scoreboard-container'>
            <div className='header'>
                <h2 className='title'>Scoreboard</h2>
                <p className='subtitle'></p>
            </div>
            <div className='scoreboard'>
                {Object.entries(players).map(([id, player]) => (
                    <div className='player' key={id} data-key={id}>
                        <img className='profilePicture' style={{ color: player.color }} src={player.profilePicture} alt='profile' />
                        <h2 className='name'>{player.name}</h2>
                        <h2 className='score'>{player.times.length}</h2>
                        <div className='buttons'>
                            <button className='increment' onClick={() => handleButtonClick(id, true)}>+</button>
                            <button className='decrement' disabled={player.times.length === 0 ? 'disabled' : undefined} onClick={() => handleButtonClick(id, false)}>-</button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Game;