import React from 'react';
//import Button from './button';
import Edit from '../edit.png';
import Del from '..//delete.png';
import Input from './input';
import Tick from '../tick.png';
import Cross from '../cross.png';

const GenerateParticularListItem = React.forwardRef((props,ref) => {  
  console.log(props);
  return props.tasklist.map(item => { 
    if(item.toedit === true){
      return (
      <div className="particularItem" >
        <Input className="inputdis names" type="text" defaultValue={item.listItem} ref={ref}></Input>
        <div className="buttons" onClick={() => props.onEditOk(item.taskNo)}><img src={Tick} alt="Ok"/></div>
        <div className="buttons" onClick={() => props.onEditCancel(item.taskNo)}><img src={Cross} alt="cancel"/></div>
      </div>);}
    else if(item.status === true){
      return (
      <div className = "particularItem completed">
        <div className="names">{item.listItem}</div>
        <div className = "buttons disable-button"><img  src={Edit} alt="edit"/></div>
        <div className="buttons" onClick={() => props.onDelete(item.taskNo)}><i class="fas fa-trash-alt"></i></div>
        <div className = "buttons disable-button"><input id="itemCheckBox" type="checkbox" className = "disable-button" checked disabled/></div>
      </div>);}
    else {
      return (
      <div className="particularItem" >
        <div className="names">{item.listItem}</div>
        <div className="buttons" onClick={() => props.onEdit(item.taskNo)}><img src={Edit} alt="edit"/></div>
        <div className="buttons" onClick={() => props.onDelete(item.taskNo)}><i class="fas fa-trash-alt"></i></div>
        <div className="buttons" onClick={() => props.onStatus(item.taskNo)}><input type="checkbox"/></div>
      </div>);}
    });
  });

  export default GenerateParticularListItem;