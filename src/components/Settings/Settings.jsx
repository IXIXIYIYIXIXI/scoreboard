import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
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
    getFinishedSessions,
    getFinishedSessionsByPlayerId,
    updateSessionById,
    addPlayersToSession,
    deletePlayersFromSession,
    addScoreToPlayerInSession,
    deleteScoreFromPlayerInSession,
    getScoresFromPlayerInSession
} from '../../apiHelper';
import './Settings.css';

function NewPlayerModal({ setReload, ...props }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        createNewPlayer(data.name, data.color, data.profilePicture);
        setReload(true);
        props.onHide();
    };
    return (
        <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>New Player</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId='newPlayerForm.Name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name='name' type='text' placeholder='John Doe' required autoFocus />
                    </Form.Group>
                    <Form.Group controlId='newPlayerForm.Color'>
                        <Form.Label>Color</Form.Label>
                        <Form.Control name='color' type='color' required />
                    </Form.Group>
                    <Form.Group controlId='newPlayerForm.ProfilePicture'>
                        <Form.Label>Profile Picture URL</Form.Label>
                        <Form.Control name='profilePicture' type='text' placeholder='https://www.example.com/example.png' defaultValue='https://raw.githubusercontent.com/IXIXIYIYIXIXI/scoreboard/main/assets/defpfp.jpg' required />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={props.onHide}>Cancel</Button>
                    <Button variant='primary' type='submit'>Create</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

function EditPlayerModal({ setReload, player, ...props }) {
    if (!player) {
        player = {
            name: '',
            color: '#000000',
            profilePicture: 'https://raw.githubusercontent.com/IXIXIYIYIXIXI/scoreboard/main/assets/defpfp.jpg'
        };
    }
    const handleSubmit = (event) => {

    };
    return (
        <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>Edit Player</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId='editPlayerForm.Name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name='name' type='text' placeholder='John Doe' defaultValue={player.name} required autoFocus />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Color</Form.Label>
                        <Form.Control id='colorInput' name='color' type='color' required />
                    </Form.Group>
                    <Form.Group controlId='editPlayerForm.ProfilePicture'>
                        <Form.Label>Profile Picture URL</Form.Label>
                        <Form.Control name='profilePicture' type='text' placeholder='https://raw.githubusercontent.com/IXIXIYIYIXIXI/scoreboard/main/assets/defpfp.jpg' defaultValue={player.profilePicture} required />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={props.onHide}>Cancel</Button>
                    <Button variant='primary' type='submit'>Create</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

function Settings() {
    const [players, setPlayers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [showNewPlayer, setShowNewPlayer] = React.useState(false);
    const [showEditPlayer, setShowEditPlayer] = React.useState(false);
    const [currentEditPlayer, setCurrentEditPlayer] = React.useState(null);

    const handleEditPlayer = (event) => {
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        function rgbToHex(color) {
            const r = parseInt(color.slice(4, color.indexOf(',')));
            const g = parseInt(color.slice(color.indexOf(',') + 2, color.lastIndexOf(',')));
            const b = parseInt(color.slice(color.lastIndexOf(',') + 2, color.lastIndexOf(')')));
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
        const player = event.currentTarget;
        const name = player.querySelector('.name').textContent;
        const color = rgbToHex(player.style.borderColor);
        const profilePicture = player.querySelector('.profilePicture').src;
        setCurrentEditPlayer({ name, color, profilePicture });
        setShowEditPlayer(true);
    };

    // https://stackoverflow.com/questions/55240526/useeffect-second-argument-variations-in-react-hook
    useEffect(() => {
        getAllPlayers().then((players) => {
            players.sort((a, b) => a.name.localeCompare(b.name));
            setPlayers(players);
            setLoading(false);
        });
    }, [loading]);

    return (
        <div id='settings-container'>
            <div className='header'>
                <h2 className='title'>Players</h2>
                <p className='subtitle'>Modify existing players or create new players.</p>
                <Button variant='primary' onClick={() => setShowNewPlayer(true)}>New Player</Button>
            </div>
            <div id='players-container'>
                {players.map((player) => (
                    <div className='player' style={{ borderColor: player.color }} onClick={handleEditPlayer} key={player.id}>
                        <h2 className='name'>{player.name}</h2>
                        <img className='profilePicture' src={player.profilePicture} alt={player.name} />
                    </div>
                ))}
            </div>
            <NewPlayerModal show={showNewPlayer} onHide={() => setShowNewPlayer(false)} setReload={setLoading} />
            <EditPlayerModal show={showEditPlayer} onHide={() => setShowEditPlayer(false)} setReload={setLoading} player={currentEditPlayer} />
        </div>
    );
}

export default Settings;