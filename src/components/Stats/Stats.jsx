import React, { useCallback, useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'chartjs-adapter-moment';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getAllPlayers, getFinishedSessionsByPlayerId } from '../../apiHelper';
import './Stats.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Score Over Time',
        },
    },
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'hour',
            }
        },
        y: {
            ticks: {
                beginAtZero: true,
                callback: function (value) { if (value % 1 === 0) { return value; } }
            }
        }
    }
};

const data = {
    id: null,
    data: {
        labels: [],
        datasets: [
            {
                label: 'Default',
                data: [],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    }
};

function Stats() {
    const [players, setPlayers] = useState([]);
    const [showStats, setShowStats] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [currentPlayerSessions, setCurrentPlayerSessions] = useState({});
    const [currentPlayerSessionData, setCurrentPlayerSessionData] = useState(data);

    const handlePlayerClick = (player) => {
        setCurrentPlayer(player);
        setShowStats(true);
    };

    const onHide = () => {
        setShowStats(false);
        setCurrentPlayer(null);
        setCurrentPlayerSessions({});
        setCurrentPlayerSessionData(data);
    };

    const handleSessionClick = useCallback((session) => {
        // const labels = [`Start ${new Date(session.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`];
        // const counts = [0];
        const labels = [new Date(session.date)];
        const counts = [0];
        for (let i = 0; i < session.players[currentPlayer.id].length; i++) {
            // const time = new Date(session.players[currentPlayer.id][i]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
            const time = new Date(session.players[currentPlayer.id][i]);
            if (labels.length > 0 && labels[labels.length - 1].toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) === time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })) {
                counts[counts.length - 1]++;
            } else {
                labels.push(time);
                counts.push(i + 1);
            }
        }
        const data = {
            id: session.id,
            data: {
                labels,
                datasets: [
                    {
                        label: 'Score',
                        data: counts,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    }
                ]
            }
        };
        setCurrentPlayerSessionData(data);
    }, [currentPlayer]);

    useMemo(() => {
        getAllPlayers().then((players) => {
            players.sort((a, b) => a.name.localeCompare(b.name));
            setPlayers(players);
        });
    }, []);

    useMemo(() => {
        if (currentPlayer) {
            getFinishedSessionsByPlayerId(currentPlayer.id).then((sessions) => {
                sessions.sort((a, b) => new Date(b.date) - new Date(a.date));
                setCurrentPlayerSessions(sessions);
                handleSessionClick(sessions[0]);
            });
        }
    }, [currentPlayer, handleSessionClick]);

    return (
        <div className='player-grid-container'>
            <div className='header'>
                <h2 className='title'>Stats</h2>
                <p className='subtitle'>View stats for each player.</p>
            </div>
            <div className='players-container'>
                {players.length === 0 ? <LoadingSpinner />
                    : players.map((player) => (
                        <div className='player' onClick={() => handlePlayerClick(player)} key={player.id} data-key={player.id}>
                            <h2 className='name'>{player.name}</h2>
                            <img className='profilePicture' src={player.profilePicture} style={{ color: player.color }} alt={player.name} />
                        </div>
                    ))}
            </div>
            <Modal show={showStats} onHide={onHide} aria-labelledby='contained-modal-title-vcenter' dialogClassName='stats-modal' contentClassName='stats-modal' centered>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>{`${currentPlayer ? currentPlayer.name : ''}'s Stats`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='sessions-container'>
                        <div className='sidebar'>
                            {Object.values(currentPlayerSessions).map((session) => (
                                <div className={'session' + (currentPlayerSessionData.id === session.id ? ' selected' : '')} key={session.id} data-key={session.id} onClick={() => handleSessionClick(session)}>
                                    <h2 className='date'>{new Date(session.date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}</h2>
                                </div>
                            ))}
                        </div>
                        <div className='main'>
                            <Line options={options} data={currentPlayerSessionData.data} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Stats;