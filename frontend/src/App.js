
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Card} from 'react-bootstrap';
import TodoList from './TodoList';
import React ,{useEffect, useState} from 'react';

function App() {
  const [jsonData, setJsonData] = useState();
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(()=>{
    getTodos();
  },[])

  function getTodos(){
    fetch("http://localhost:8000/api/todo")
    .then((resp)=>{
      resp.json().then((result)=>{
          // console.log(result);
          setJsonData(result);
      })
    })
  }

  function saveTransaction(){
    let data = {"title":task, "description":desc}
    // console.log(task.length)
    if(task.length>1 && desc.length > 1){
      
      fetch(`http://localhost:8000/api/addtodo`,{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((resp)=>{
      resp.json().then((result)=>{
        console.log(result)
        getTodos();
      })
    })
    }
    else{
      alert("Enter Data!!")
    }
    
  }
  

  return (
    <div className="App">
      <h2 style={{marginTop:"2rem"}}>Todo List Application</h2>
      <Card style={{width: "55rem", margin:"2rem", marginLeft:"15rem"}} >
        <Form>
          <Form.Group className='mb-3 mt-3 px-3' controlId='titleId'>
            <Form.Control type='text' placeholder='Task' onChange={(e)=>{setTask(e.target.value)}}/>
          </Form.Group>
          <Form.Group className='mb-3 mt-3 px-3' controlId='descriptionId'>
            <Form.Control type='text' placeholder='Description' onChange={(e)=>{setDesc(e.target.value)}}/>
          </Form.Group>
          <Button className='mb-3' variant='outline-primary' onClick={()=>{saveTransaction()}}>Add Todo</Button>
        </Form>
        
        <h4>PENDING TODOS</h4>
        {
          jsonData? <TodoList data = {jsonData} getTodoData = {getTodos}/> :null
        }
        
        
      </Card> 
    </div>
  );
}

export default App;
