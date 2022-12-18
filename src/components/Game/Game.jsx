import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addScoreToPlayerInSession, deleteScoreFromPlayerInSession } from '../../apiHelper';
import './Game.css';

function Game() {
    const location = useLocation();
    const sessionId = location.state ? location.state.sessionId : undefined;
    const selectedPlayers = useMemo(() => location.state ? location.state.players : {}, [location.state]);
    const [players, setPlayers] = useState({});
    const [modifyPlayers, setModifyPlayers] = useState({});

    const handleXcrementClick = (id, isIncrement) => {
        const newModifyPlayers = { ...modifyPlayers };
        newModifyPlayers[id] = (newModifyPlayers[id] || 0) + (isIncrement ? 1 : -1);
        setModifyPlayers(newModifyPlayers);
    };

    const handleCommitClick = () => {
        const newPlayers = { ...players };
        const date = new Date();
        Object.entries(modifyPlayers).forEach(([id, amount]) => {
            if (amount > 0) {
                addScoreToPlayerInSession(sessionId, id, amount, date);
                for (let i = 0; i < amount; i++) {
                    newPlayers[id].times.push(date);
                }
            } else if (amount < 0) {
                deleteScoreFromPlayerInSession(sessionId, id, -amount);
                for (let i = 0; i > amount; i--) {
                    newPlayers[id].times.pop();
                }
            }
        });

        const sorted = Object.entries(newPlayers).sort((a, b) => b[1].times.length - a[1].times.length === 0 ? a[1].name.localeCompare(b[1].name) : b[1].times.length - a[1].times.length).reduce((acc, [id, player]) => {
            acc[id] = player;
            return acc;
        }, {});
        setModifyPlayers({});
        setPlayers(sorted);
    };

    useMemo(() => {
        const sorted = Object.entries(selectedPlayers).sort((a, b) => b[1].times.length - a[1].times.length === 0 ? a[1].name.localeCompare(b[1].name) : b[1].times.length - a[1].times.length).reduce((acc, [id, player]) => {
            acc[id] = player;
            return acc;
        }, {});
        setPlayers(sorted);
    }, [selectedPlayers]);

    return (
        <div id='scoreboard-container'>
            <div className='header'>
                <h2 className='title'>Scoreboard</h2>
                <p className='subtitle'></p>
                <button onClick={handleCommitClick}>Commit</button>
            </div>
            <div className='scoreboard'>
                {Object.entries(players).map(([id, player]) => (
                    <div className='player' key={id} data-key={id}>
                        <div className='box'>
                            <img className='profilePicture' style={{ color: player.color }} src={player.profilePicture} alt='profile' />
                        </div>
                        <div className='box'>
                            <h2 className='name'>{player.name}</h2>
                        </div>
                        <div className='box'>
                            <h2 className='score'>{(modifyPlayers[id] ? `(${(modifyPlayers[id] > 0 ? '+' : '') + modifyPlayers[id]}) ` : '') + player.times.length}</h2>
                            <div className='buttons'>
                                <button className='increment' onClick={() => handleXcrementClick(id, true)}>+</button>
                                <button className='decrement' disabled={player.times.length + (modifyPlayers[id] || 0) <= 0 ? 'disabled' : undefined} onClick={() => handleXcrementClick(id, false)}>-</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Game;