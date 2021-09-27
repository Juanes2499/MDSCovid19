import React from 'react';
import './Button.css';
import {Link} from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];
const SIZES = ['btn--medium', 'btn--large'];

const Button =({to, children, type, onClick, buttonStyle, buttonSize}) => {
    
    //Revisa si cuando se emplea este componte se una usa alguno de los estilos establecidos en STYLES, de lo contrario se usa el primer estilo del arreglo STYLES
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    //Revisa si cuando se emplea este componte se una usa alguno de los tamaños establecidos en SIZES, de lo contrario se usa el primer tamaño del arreglo SIZES
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize: SIZES[0];

    if(to){
        return (
            <Link to={to ? to : null} className = 'btn-mobile'>
                <button 
                    className = {`btn ${checkButtonStyle} ${checkButtonSize}`}
                    onClick = {onClick}
                    type = {type}
                >
                    {children}
                </button>
            </Link>
        )
    }else {
        return (
            <button 
                className = {`btn btn-mobile ${checkButtonStyle} ${checkButtonSize}`}
                onClick = {onClick}
                type = {type}
            >
                {children}
            </button>
        )
    }
};

export default Button;