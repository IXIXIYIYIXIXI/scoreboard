import React from 'react';
import { Link } from 'react-router-dom';
import './MainMenu.css';

function MainMenu() {
    return (
        <div id="mainmenu-container">
            <div className="container-fluid">
                <img src="https://ih1.redbubble.net/image.1268011224.3675/st,small,507x507-pad,600x600,f8f8f8.jpg" alt="soju" className="splash img-circle" />
            </div>
            <div className="container-fluid text-center">
                <Link to='lobby' className="btn btn-lg">play</Link>
                <Link to='lobbies' className="btn btn-lg">lobbies</Link>
                <Link to='settings' className="btn btn-lg">settings</Link>
                <Link to='stats' className="btn btn-lg">stats</Link>
            </div>
            <footer className="footer">
                <div className="feet text-muted">
                    copy right deez nuttz
                </div>
            </footer>
        </div>
    );
};

export default MainMenu;