import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Game.css';

function Game() {
    const location = useLocation();
    const selectedPlayers = useMemo(() => location.state, [location]);
    const [players, setPlayers] = useState({});

    useMemo(() => {
        setPlayers(selectedPlayers);
    }, [selectedPlayers]);

    return (
        <div id='scoreboard-container'>
            <div className='header'>
                <h2 className='title'>Scoreboard</h2>
                <p className='subtitle'>Subtitle</p>
            </div>
            <div className='scoreboard'>
                {Object.entries(players).map(([id, player]) => (
                    <div className='player' key={id}>
                        <img className='profilePicture' style={{ color: player.color }} src={player.profilePicture} alt='profile' />
                        <h2 className='name'>{player.name}</h2>
                        <h2 className='score'>{player.times.length}</h2>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Game;