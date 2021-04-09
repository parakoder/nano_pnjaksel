import React from 'react';
import '../styles/card-layanan.scss';

const CardLayanan = (props) => {
    const { className, imageSource, text, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <img src={imageSource} alt='' className='img-card' />
            <div className='txt-card'>{text}</div>
        </div>
    );
};

export default CardLayanan;
