
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Card} from 'react-bootstrap';
import TodoList from './TodoList';
import React ,{useEffect, useState} from 'react';

function App() {
  const [jsonData, setJsonData] = useState();
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [updatebtn, setUpdateBtn] = useState(false);
  const [utaskk, setUtaskk] = useState("")
  const [udescc, setUdescc] = useState("")
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

  function getUpdateTaskData(dataitem){
    
    
    // console.log(dataitem)

    setUtaskk(dataitem['title'])
    setUdescc(dataitem['description'])
   
    
}
  function updateTransaction(){
    
    let data = {"title":utaskk,"description": udescc}
    console.log(data)
    fetch(`http://localhost:8000/api/updatetodo/${utaskk}`,{
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    )
    .then((resp)=>{
        resp.json().then((res)=>{
          console.log(res)
          getTodos()
          setUpdateBtn(false)

        })
    })
  }
  

  return (
    <div className="App">
      <h2 style={{marginTop:"2rem"}}>Todo List Application</h2>
      <Card style={{width: "55rem", margin:"2rem", marginLeft:"2rem", display:"inline-block"}} >
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
          jsonData? <TodoList data = {jsonData} getTodoData = {getTodos} setUpdateBtn = {setUpdateBtn} getUpdateTaskData = {getUpdateTaskData} setUtaskk = {setUtaskk}/> :null
        }
        
        
      </Card> 
      {
        updatebtn?<Card style={{display:"inline-block", width:"20rem", top:"14rem"}}>
        <h5 style={{padding:"1rem"}}>UPDATE TODO</h5>
        <Form>
          <Form.Group controlId='UpdateTask' className='mx-3 my-3'>
            <Form.Control type = 'text' value={utaskk}  disabled/>
          </Form.Group>
          <Form.Group controlId='UpdateDescription' className='mx-3 my-3'>
            <Form.Control type = 'text' value={udescc} onChange={(e)=>{setUdescc(e.target.value)}}/>
          </Form.Group>

          <Button className='mb-3' variant='outline-warning' onClick={()=>{updateTransaction()}}>Update</Button>
          
        </Form>
      </Card> :null
      }
      
    </div>
  );
}

export default App;
