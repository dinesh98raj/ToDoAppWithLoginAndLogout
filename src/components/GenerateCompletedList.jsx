import React from 'react';
import Edit from '../edit.png';
import Del from '..//delete.png';

export const GenerateCompletedList = (props) => {  
  console.log(props);
  return props.tasklist.map(item => { 
    if(item.toedit === true){return null;}
    else if(item.status === true){
      return (
      <div className = "particularItem completed">
        <div className="names">{item.listItem}</div>
        <div className = "buttons disable-button"><img  src={Edit} alt="edit"/></div>
        <div className="buttons" onClick={() => props.onDelete(item.taskNo)}><img src={Del} alt="delete"/></div>
        <div className = "buttons disable-button"><input id="itemCheckBox" type="checkbox" className = "disable-button" checked disabled/></div>
      </div>);}
    else {return null;}
    });
  }