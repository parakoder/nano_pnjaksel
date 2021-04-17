import React from 'react';
import '../styles/card-layanan.scss';

const CardLayanan = ({ className, imageSource, text, onClick }) => {
	return (
		<div className={className} onClick={onClick}>
			<img src={imageSource} alt='' className='img-card' />
			<div className='txt-card'>{text}</div>
		</div>
	);
};

export default CardLayanan;
