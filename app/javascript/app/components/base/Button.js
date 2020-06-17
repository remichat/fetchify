import React from 'react';
import classNames from 'classnames';

const Button = ({ children, width100, onClick, disabled, bold, blue, rounded, inline, className, ...props }) => {

    return (
        <div className={classNames('btn-wrapper', { 'btn-width-100': width100, 'btn-inline': inline }, {...className})}>
            <div className={classNames('btn', { 'btn-blue': blue, 'btn-bold': bold, 'btn-rounded': rounded })}
                style={disabled && { pointerEvents: 'none' }}
                onClick={onClick} {...props}>
                {children}
            </div>
        </div>
    )
}
export default Button;