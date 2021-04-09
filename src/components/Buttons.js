import React from 'react';
import '../styles/buttons.scss';

const Buttons = (props) => {
    const { className, onClick, text } = props;

    return (
        <div className={className} onClick={onClick}>
            {text}
        </div>
    );
};

export default Buttons;
