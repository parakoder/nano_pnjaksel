import React from 'react';
import '../styles/guide.scss';

const Guide = ({ imageSource, text }) => {
	return (
		<div className='guide-wrapper-tablet'>
			<div className='guide-wrapper'>
				<img src={imageSource} alt='guide.png' className='guide-img' />
			</div>
			<div className='txt-guide'>{text}</div>
		</div>
	);
};

export default Guide;
