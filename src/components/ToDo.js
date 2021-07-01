import { useState, useRef, useEffect } from 'react';
import Input from './input';
import { getListOfTask, createTask, editTask, deleteTask, updateStatus } from '../services/ListOfTaskService';
import GenerateParticularListItem from './GenerateParticularListItem';
import GenerateActiveList from './GenerateActiveList';
import { GenerateCompletedList } from './GenerateCompletedList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header';
import { Route } from 'react-router-dom';

function ToDo(props) {
  const inputRef = useRef();
  const editRef = useRef();
  const [list, setlist] = useState([]);
  const [filter, setfilter] = useState("all");
  
  useEffect(()=>{
    getListOfTask(props.authtoken).then(res =>setlist(res.data)).catch(err => console.log(err));
  }, []);

  /*useEffect(()=>{
    localStorage.setItem('listOfTask', JSON.stringify(list));
  },[list]);*/

  function updateList(e){
    e.preventDefault();
    if(validateinput(inputRef.current.value, inputRef) === true){
      let tempTask = {listItem:inputRef.current.value.trim(),status:false,toedit:false};
      createTask(props.authtoken,tempTask).then((res) =>{
        setlist([...list].concat(res.data))
      }); 
    }
    inputRef.current.value = "";
  }
  
  function validateinput(str, strRef){
    let regexOnlyWhiteSpace = new RegExp(/^\s+$/);
    let regexTrailingWhiteSpace = new RegExp(/^$|^\s+.*/);

    if(regexTrailingWhiteSpace.test(str)){
      if(regexOnlyWhiteSpace.test(str)){
        alert("you cant enter only space");
        return false;
      }
      else{
        if(str){
          alert("trailing spaces are not allowed");
          strRef.current.value = strRef.current.value.trim();
          return false;
        }
        else{
          alert("enter something!");
          return false;
        }
      } 
    }else
      return true;
  }

  function handleDelete(id){
    let confirmation = window.confirm("Are you sure want to delete?");
    if(confirmation){
      deleteTask(props.authtoken, id);
      setlist([...list].filter(item => item.taskNo !== id));
    }  
    //setlist([...list].filter(item => item.taskNo !== id));
  }

  function handleEdit(item){
    
    setlist([...list].map( i => { 
      if(i.taskNo === item){
        return {...i,toedit:true};
      }
      else
        return i;
      }));
  }
 
  async function handleStatus(item){
    setlist(await Promise.all([...list].map( i => { 
      if(i.taskNo === item){
        const temp = Promise.resolve (updateStatus(props.authtoken, i.taskNo).then(res => res.data));
        return temp;
      }
      else
        return i;
      })));
  }

  async function handleEditOk(item){
    if(validateinput(editRef.current.value, editRef) === true){
      setlist(await Promise.all([...list].map( i => {
        if(i.taskNo === item){
          let tempTask = {...i, listItem:editRef.current.value.trim(), toedit:false};
          const result = Promise.resolve (editTask(props.authtoken, item, tempTask).then(res => res.data));
          console.log(result);
          return result;
        }
        else
           return i;
        }))); 
    }
  }

  function handleEditCancel(item){
    setlist([...list].map( i => {
       if(i.taskNo === item){
          return {...i, toedit:false};
        }
        else
          return i;
      }));
  }

  function GenerateList(){
    switch(filter){
      case "all": return (<div id="flexContainer">
                            <GenerateParticularListItem
                              tasklist={list}
                              onDelete={handleDelete}
                              onEdit={handleEdit}
                              onStatus={handleStatus}
                              onEditOk={handleEditOk}
                              onEditCancel={handleEditCancel}
                             ref={editRef}/>
                          </div>);
      case "active": return (<div id="flexContainer">
                              <GenerateActiveList
                                tasklist={list}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                onStatus={handleStatus}
                                onEditOk={handleEditOk}
                                onEditCancel={handleEditCancel}
                                ref={editRef}/>
                              </div>);
      case "complete":return (<div id="flexContainer">
                                <GenerateCompletedList
                                tasklist={list}
                                onDelete={handleDelete}/>
                              </div>);
      default:return null;
    }
  }

/*  function GenerateListContainer(){
    return (<div id="flexContainer">
              <GenerateList/>
              <GenerateParticularListItem
               tasklist={list}
               onDelete={handleDelete}
               onEdit={handleEdit}
               onStatus={handleStatus}
               onEditOk={handleEditOk}
               onEditCancel={handleEditCancel}
               ref={editRef}/>
            </div>);
  }*/

  function GenerateFilters(){
    return (
      <div className="filter">
        <button className="btn btn-dark space" onClick={()=> setfilter("all")}>all</button>
        <button className="btn btn-dark space" onClick={()=> setfilter("active")}>Active</button>
        <button className="btn btn-dark space" onClick={()=> setfilter("complete")}>Completed</button>
      </div>
    )
  }

  return (
          <div className="App">
            <Header handleToken={()=>props.handleToken()}/>
              <form className="Addform" autoComplete="off">
                <Input type="text" ref={inputRef} placeholder="enter your task"></Input>
                <button onClick={updateList}>add</button>  
              </form>
              { list.length ? <GenerateFilters/> : ""}      
              { list.length ? <GenerateList/> : ""}
          </div>  
  );
}

export default ToDo;
