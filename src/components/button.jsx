import React from 'react';
import Edit from '../edit.png';

function Button(){
    return(
        <div className = "buttons disable-button"><img  src={Edit} alt="edit"/></div>
    );
}

export default Button;