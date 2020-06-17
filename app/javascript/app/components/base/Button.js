import React from 'react';

const Button = ({ children, width100, onClick, disabled,  }) => {

    return (
        <div style={width100 && { width: '100%', display: 'flex', justifyContent: 'center'}}>
            <div className='btn' style={disabled && { pointerEvents: 'none' }} onClick={onClick}>
                {children}
            </div>
        </div>
    )
}
export default Button;