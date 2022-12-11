import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
    createNewPlayer,
    getAllPlayers,
    updatePlayerById,
    deletePlayerById
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
            <div id='modal-new-player-preview-container'>
                <div class='modal-player-preview'>
                    <p className='name'></p>
                    <img className='profilePicture' src='https://raw.githubusercontent.com/IXIXIYIYIXIXI/scoreboard/main/assets/defpfp.jpg' alt='PFP' />
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId='newPlayerForm.Name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name='name' type='text' placeholder='John Doe' onChange={(event) => {
                            document.querySelector('#modal-new-player-preview-container .modal-player-preview .name').innerText = event.target.value;
                        }} required autoFocus />
                    </Form.Group>
                    <Form.Group controlId='newPlayerForm.Color'>
                        <Form.Label>Color</Form.Label>
                        <Form.Control name='color' type='color' onChange={(event) => {
                            document.querySelector('#modal-new-player-preview-container .modal-player-preview .profilePicture').style.color = event.target.value;
                        }} required />
                    </Form.Group>
                    <Form.Group controlId='newPlayerForm.ProfilePicture'>
                        <Form.Label>Profile Picture URL</Form.Label>
                        <Form.Control name='profilePicture' type='text' placeholder='https://www.example.com/example.png'
                            defaultValue='https://raw.githubusercontent.com/IXIXIYIYIXIXI/scoreboard/main/assets/defpfp.jpg' onChange={(event) => {
                                document.querySelector('#modal-new-player-preview-container .modal-player-preview .profilePicture').src = event.target.value;
                            }} required />
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
    const [color, setColor] = useState('#000000');
    const [showDelete, setShowDelete] = useState(false);

    if (!player) {
        player = {
            id: 0,
            name: '',
            color: '#000000',
            profilePicture: 'https://raw.githubusercontent.com/IXIXIYIYIXIXI/scoreboard/main/assets/defpfp.jpg'
        };
    }

    useEffect(() => {
        setColor(player.color);
    }, [player]);

    const handleDelete = () => {
        setReload(true);
        props.onHide();
    };

    const handleClose = () => {
        props.onHide();
        setColor(player.color);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || player.id === 0) {
            event.stopPropagation();
            return;
        }
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        if (player.name !== data.name || player.color !== color || player.profilePicture !== data.profilePicture) {
            updatePlayerById(player.id, data.name, color, data.profilePicture);
            setReload(true);
        }
        props.onHide();
    };

    return (
        <>
            <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>Edit Player</Modal.Title>
                </Modal.Header>
                <div id='modal-edit-player-preview-container'>
                    <div class='modal-player-preview'>
                        <h2 className='name'>{player.name}</h2>
                        <img className='profilePicture' src={player.profilePicture} style={{ color: color }} alt='PFP' />
                    </div>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId='editPlayerForm.Name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='name' type='text' placeholder='John Doe' defaultValue={player.name} onChange={(event) => {
                                document.querySelector('#modal-edit-player-preview-container .modal-player-preview .name').innerText = event.target.value;
                            }} required autoFocus />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Color</Form.Label>
                            <Form.Control id='colorInput' name='color' type='color' value={color} onChange={(event) => {
                                setColor(event.target.value);
                                document.querySelector('#modal-edit-player-preview-container .modal-player-preview .profilePicture').style.borderColor = event.target.value;
                            }} required />
                        </Form.Group>
                        <Form.Group controlId='editPlayerForm.ProfilePicture'>
                            <Form.Label>Profile Picture URL</Form.Label>
                            <Form.Control name='profilePicture' type='text' placeholder='https://raw.githubusercontent.com/IXIXIYIYIXIXI/scoreboard/main/assets/defpfp.jpg'
                                defaultValue={player.profilePicture} onChange={(event) => {
                                    document.querySelector('#modal-edit-player-preview-container .modal-player-preview .profilePicture').src = event.target.value;
                                }} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={() => setShowDelete(true)}>Delete</Button>
                        <Button variant='secondary' onClick={handleClose}>Cancel</Button>
                        <Button variant='primary' type='submit'>Apply</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <ConfirmDeleteModal show={showDelete} onHide={() => setShowDelete(false)} id={player.id} handleDelete={handleDelete} />
        </>
    );
}

function ConfirmDeleteModal({ id, handleDelete, ...props }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        deletePlayerById(id);
        props.onHide();
        handleDelete();
    };
    return (
        <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>Delete Player</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this player?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.onHide}>Cancel</Button>
                <Button variant='danger' onClick={handleSubmit}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}

function Settings() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewPlayer, setShowNewPlayer] = useState(false);
    const [showEditPlayer, setShowEditPlayer] = useState(false);
    const [currentEditPlayer, setCurrentEditPlayer] = useState(null);

    const handleShowEditPlayer = (event) => {
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }

        function rgbToHex(color) {
            const r = parseInt(color.slice(4, color.indexOf(',')));
            const g = parseInt(color.slice(color.indexOf(',') + 2, color.lastIndexOf(',')));
            const b = parseInt(color.slice(color.lastIndexOf(',') + 2, color.lastIndexOf(')')));
            return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
        const player = event.currentTarget;
        const id = player.getAttribute('data-key');
        const name = player.querySelector('.name').textContent;
        const color = rgbToHex(player.querySelector('.profilePicture').style.color);
        const profilePicture = player.querySelector('.profilePicture').src;
        setCurrentEditPlayer({ id, name, color, profilePicture });
        setShowEditPlayer(true);
    };

    const handleHideEditPlayer = () => {
        setCurrentEditPlayer(null);
        setShowEditPlayer(false);
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
                    <div className='player' onClick={handleShowEditPlayer} key={player.id} data-key={player.id}>
                        <h2 className='name'>{player.name}</h2>
                        <img className='profilePicture' src={player.profilePicture} style={{ color: player.color }} alt={player.name} />
                    </div>
                ))}
            </div>
            <NewPlayerModal show={showNewPlayer} onHide={() => setShowNewPlayer(false)} setReload={setLoading} />
            <EditPlayerModal show={showEditPlayer} onHide={() => handleHideEditPlayer()} setReload={setLoading} player={currentEditPlayer} />
        </div>
    );
}

export default Settings;