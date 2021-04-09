import React from 'react';
import '../styles/guide.scss';

const Guide = ({ imageSource, text }) => {
    return (
        <div>
            <div className='guide-wrapper'>
                <img
                    src={imageSource}
                    alt='guide.png'
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 100,
                    }}
                />
            </div>
            {/* <div className='guide-wrapper'> */}
            <div className='txt-guide'>{text}</div>
            {/* </div> */}
        </div>
    );
};

export default Guide;
