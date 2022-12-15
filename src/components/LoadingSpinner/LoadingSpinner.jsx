import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
    return (
        <div class='lds-ring'>
            <div className='first'>
            </div>
            <div className='second'>
            </div>
            <div className='third'>
            </div>
            <div className='fourth'>
            </div>
        </div>
    );
}

export default LoadingSpinner;