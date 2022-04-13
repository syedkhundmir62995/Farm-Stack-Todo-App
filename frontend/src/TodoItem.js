import { useState } from 'react'
import {Button} from 'react-bootstrap'


function TodoItem(props){
    

    function deleteHandler(id){
        console.log(`http://127.0.0.1:8000/api/deletetodo/${id}`)
        fetch(`http://127.0.0.1:8000/api/deletetodo/${id}`,{method: "DELETE"})
        .then((resp)=>{
            resp.json().then((result)=>{
                console.log(result)
                props.getTodoData()
            })
        })
    }

    function updateHandler(dataitem){
        props.setUpdateBtn(true)
        
        // console.log("data item is", dataitem)
        // props.setUtaskk(dataitem['title'])
        props.getUpdateTaskData(dataitem)
        

    }
    
    
    return(
        
        <tr key={props.indexkey}>
            <td>{props.dataitem.title}</td>
            <td>{props.dataitem.description}</td>
            <td style={{width:"16rem"}}>
                <Button variant='outline-success' size = "sm" className='mx-1' >Completed</Button>
                <Button variant='outline-info' size = "sm" className='mx-1' onClick={()=>{updateHandler(props.dataitem)}}>Update</Button>
                <Button variant='outline-danger' size = "sm" className='mx-1' onClick={()=>{deleteHandler(props.dataitem.title)}}>Delete</Button>

            </td>
        </tr>



        
    )
}

export default TodoItem;