import { useState, useRef, useEffect } from 'react';
import Input from './input';
import { getListOfTask, createTask, editTask, deleteTask, updateStatus } from '../services/ListOfTaskService';
import GenerateParticularListItem from './GenerateParticularListItem';
import GenerateActiveList from './GenerateActiveList';
import { GenerateCompletedList } from './GenerateCompletedList';
import Header from './header';
import {Route,Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
function ToDo(props) {
  const inputRef = useRef();
  const editRef = useRef();
  const [list, setlist] = useState([]);
  
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
        toast.success('Task added successfully',{autoClose:2000});
      }); 
    }
    inputRef.current.value = "";
  }
  
  function validateinput(str, strRef){
    let regexOnlyWhiteSpace = new RegExp(/^\s+$/);
    let regexTrailingWhiteSpace = new RegExp(/^$|^\s+.*/);

    if(regexTrailingWhiteSpace.test(str)){
      if(regexOnlyWhiteSpace.test(str)){
        toast.warning('you cannot enter only space',{position:"top-center",autoClose:2000});
        return false;
      }
      else{
        if(str){
          toast.warning('Trailing spaces are not allowed',{position:"top-center",autoClose:2000});
          strRef.current.value = strRef.current.value.trim();
          return false;
        }
        else{
          toast.warning('Must enter some value',{position:"top-center",autoClose:2000});
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
      toast.success('Task deleted successfully',{autoClose:2000});
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
        toast.success('Task Status changed successfully',{autoClose:2000});
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
          toast.success('Task Updated successfully',{autoClose:2000});
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

function GenerateListRoute(){
  return(
      <Switch>
          <Route path="/active">
            <div id="flexContainer">
              <GenerateActiveList
              tasklist={list}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onStatus={handleStatus}
              onEditOk={handleEditOk}
              onEditCancel={handleEditCancel}
              ref={editRef}/>
            </div>
          </Route>
          <Route path="/finished">
            <div id="flexContainer">
              <GenerateCompletedList
              tasklist={list}
              onDelete={handleDelete}/>
              </div>
          </Route>
          <Route path="/">
            <div id="flexContainer">
              <GenerateParticularListItem
              tasklist={list}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onStatus={handleStatus}
              onEditOk={handleEditOk}
              onEditCancel={handleEditCancel}
              ref={editRef}/>
            </div>
          </Route>
        </Switch>
  );
}

  return (
          <div className="App">
            <Header handleToken={()=>props.handleToken()}/>
              <form className="Addform" autoComplete="off">
                <Input type="text" ref={inputRef} placeholder="enter your task"></Input>
                <button onClick={updateList}>add</button>  
              </form>      
              { list.length ? <GenerateListRoute/> : ""}
          </div>  
  );
}

export default ToDo;
