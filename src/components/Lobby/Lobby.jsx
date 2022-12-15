import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addSessionToPlayer, createNewSession, getAllPlayers, deletePlayersFromSession, deleteSessionFromPlayer, addPlayersToSession } from '../../apiHelper';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Lobby.css';

function Lobby() {
    const location = useLocation();
    const currentSessionId = location.state ? location.state.sessionId : undefined;
    const currentSessionPlayers = useMemo(() => location.state ? location.state.players : [], [location.state]);

    const [players, setPlayers] = useState([]);
    const [alreadyPlayingPlayers, setAlreadyPlayingPlayers] = useState({});
    const [selectedPlayers, setSelectedPlayers] = useState({});

    const navigate = useNavigate();

    const handlePlayerClick = (event) => {
        const player = event.currentTarget;
        const id = player.getAttribute('data-key');
        const name = player.querySelector('.name').innerText;
        const color = player.querySelector('.profilePicture').style.color;
        const profilePicture = player.querySelector('.profilePicture').src;

        let newSelectedPlayers;
        if (id in selectedPlayers) {
            newSelectedPlayers = Object.entries(selectedPlayers).reduce((acc, [key, value]) => {
                if (key !== id) {
                    acc[key] = value;
                }
                return acc;
            }, {});
        } else {
            newSelectedPlayers = { ...selectedPlayers, [id]: { name, color, profilePicture } };
        }

        setSelectedPlayers(newSelectedPlayers);
    };

    const generatePlayersToSend = () => {
        if (currentSessionId) {
            const newPlayers = Object.entries(selectedPlayers).reduce((acc, [id, player]) => {
                if (id in alreadyPlayingPlayers) {
                    acc[id] = {
                        name: player.name,
                        color: player.color,
                        profilePicture: player.profilePicture,
                        times: player.scores
                    };
                } else {
                    acc[id] = {
                        name: player.name,
                        color: player.color,
                        profilePicture: player.profilePicture,
                        times: []
                    };
                }
                return acc;
            }, {});
            return newPlayers;
        } else {
            const newPlayers = Object.entries(selectedPlayers).reduce((acc, [id, player]) => {
                acc[id] = {
                    name: player.name,
                    color: player.color,
                    profilePicture: player.profilePicture,
                    times: []
                };
                return acc;
            }, {});
            return newPlayers;
        }
    };

    const startGame = () => {
        if (currentSessionId) {
            const playersToDelete = Object.keys(alreadyPlayingPlayers).reduce((acc, id) => {
                if (!(id in selectedPlayers)) {
                    deleteSessionFromPlayer(id, currentSessionId);
                    acc.push(id);
                }
                return acc;
            }, []);
            if (playersToDelete.length > 0) {
                deletePlayersFromSession(currentSessionId, playersToDelete);
            }

            const playersToAdd = Object.keys(selectedPlayers).reduce((acc, id) => {
                if (!(id in alreadyPlayingPlayers)) {
                    addSessionToPlayer(id, currentSessionId);
                    acc.push(id);
                }
                return acc;
            }, []);
            if (playersToAdd.length > 0) {
                addPlayersToSession(currentSessionId, playersToAdd);
            }
            navigate('/play', { state: { sessionId: currentSessionId, players: generatePlayersToSend() } });
        } else {
            createNewSession(new Date(), Object.keys(selectedPlayers)).then((sessionId) => {
                Object.keys(selectedPlayers).forEach((id) => {
                    addSessionToPlayer(id, sessionId);
                });
                addPlayersToSession(sessionId, Object.keys(selectedPlayers));
                navigate('/play', { state: { sessionId, players: generatePlayersToSend() } });
            });
        }
    };

    useMemo(() => {
        getAllPlayers().then((players) => {
            players.sort((a, b) => a.name.localeCompare(b.name));
            setPlayers(players);
            const currentPlayers = {};
            currentSessionPlayers.forEach((player) => {
                currentPlayers[player.id] = player;
            });
            setSelectedPlayers(currentPlayers);
            setAlreadyPlayingPlayers(currentPlayers);
        });
    }, [currentSessionPlayers]);

    return (
        <div className='player-grid-container'>
            <div className='header'>
                <h2 className='title'>Lobby</h2>
                <p className='subtitle'>Select which players are playing in the current session.</p>
                <button disabled={Object.keys(selectedPlayers).length === 0 ? 'disabled' : undefined} onClick={startGame}>Start Game</button>
            </div>
            <div className='players-container'>
                {players.length === 0 ? <LoadingSpinner />
                    : players.map((player) => (
                        <div className={'player' + (player.id in selectedPlayers ? ' selected' : '')} onClick={handlePlayerClick} key={player.id} data-key={player.id}>
                            <h2 className='name'>{player.name}</h2>
                            <img className='profilePicture' src={player.profilePicture} style={{ color: player.color }} alt={player.name} />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Lobby;