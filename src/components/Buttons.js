import React from 'react';
import '../styles/buttons.scss';

const Buttons = ({ className, onClick, text, id }) => {
	return (
		<div id={id} className={className} onClick={onClick}>
			{text}
		</div>
	);
};

export default Buttons;
