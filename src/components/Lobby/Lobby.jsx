import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { addSessionToPlayer, createNewSession, getAllPlayers } from '../../apiHelper';
import './Lobby.css';

function Lobby() {
    const location = useLocation();
    const currentSessionPlayers = useMemo(() => location.state ? location.state.players : [], [location.state]);

    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState({});

    const handlePlayerClick = (event) => {
        const player = event.currentTarget;
        const id = player.getAttribute('data-key');
        const name = player.querySelector('.name').innerText;
        const color = player.querySelector('.profilePicture').style.color;
        const profilePicture = player.querySelector('.profilePicture').src;

        let newSelectedPlayers;
        if (!player.classList.contains('selected')) {
            player.classList.add('selected');
            newSelectedPlayers = { ...selectedPlayers, [id]: { name, color, profilePicture } };
        } else {
            player.classList.remove('selected');
            newSelectedPlayers = Object.entries(selectedPlayers).reduce((acc, [key, value]) => {
                if (key !== id) {
                    acc[key] = value;
                }
                return acc;
            }, {});
        }

        setSelectedPlayers(newSelectedPlayers);
    };

    const startGame = () => {
        createNewSession(new Date(), Object.keys(selectedPlayers)).then((sessionId) => {
            Object.keys(selectedPlayers).forEach((id) => {
                addSessionToPlayer(id, sessionId);
            });
        });
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
        });
    }, [currentSessionPlayers]);

    return (
        <div className='player-grid-container'>
            <div className='header'>
                <h2 className='title'>Lobby</h2>
                <p className='subtitle'>Select which players are playing in the current session.</p>
                <Link to='/play' state={selectedPlayers}><button onClick={startGame}>Start Game</button></Link>
            </div>
            <div className='players-container'>
                {players.map((player) => (
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