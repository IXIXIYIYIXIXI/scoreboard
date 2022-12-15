import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOngoingSessionsVerbose, updateSessionById } from '../../apiHelper';
import './LobbySelect.css';

function LobbySelect() {
    const [ongoingSessions, setOngoingSessions] = useState({});
    const [loadingSessions, setLoadingSessions] = useState(true);

    useMemo(() => {
        if (loadingSessions) {
            getOngoingSessionsVerbose().then((sessions) => {
                sessions.forEach((session) => {
                    session.date = new Date(session.date);
                    session.players.sort((a, b) => a.name.localeCompare(b.name));
                });
                sessions.sort((a, b) => b.date - a.date);
                setOngoingSessions(sessions);
                setLoadingSessions(false);
            });
        }
    }, [loadingSessions]);

    const formatDate = (date) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toLocaleDateString() === today.toLocaleDateString()) {
            return `Today at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`;
        } else if (date.toLocaleDateString() === yesterday.toLocaleDateString()) {
            return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`;
        } else {
            return `${date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`;
        }
    };

    const handleCloseLobby = (id) => {
        updateSessionById(id, null, false).then(() => {
            setOngoingSessions(ongoingSessions.filter((s) => s.id !== id));
        });
    };

    return (
        <div id='lobby-select-container'>
            <div className='header'>
                <h2 className='title'>Lobbies</h2>
                <p className='subtitle'>Join an existing lobby or create a new lobby.</p>
                <Link to='/lobby'><button>Create Lobby</button></Link>
            </div>
            <div className='session-list'>
                {Object.values(ongoingSessions).map((session) => (
                    <div className='session' key={session.id} data-key={session.id}>
                        <div className='session-info'>
                            {formatDate(session.date)}
                            <button onClick={() => handleCloseLobby(session.id)}>Close Lobby</button>
                            <Link to='/lobby' state={{ sessionId: session.id, players: session.players }}><button>Join Lobby</button></Link>
                        </div>
                        <div className='session-players'>
                            {Object.values(session.players).map((player) => (
                                <div className='player' key={player.id} data-key={player.id}>
                                    <div className='name'>{player.name}</div>
                                    <img className='profilePicture' src={player.profilePicture} style={{ color: player.color }} alt={player.name} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LobbySelect;