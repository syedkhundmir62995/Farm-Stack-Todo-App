
// You will get array of objects here and from here you will call another component with individual object and add html to it
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import TodoItem from './TodoItem'
function TodoList(props){
    
    return(
        <div>
            <Table size = "sm" bordered striped hover>
               <thead>
                   <tr>
                       <th>TODO</th>
                       <th>DESCRIPTION</th>
                       <th>ACTIONS</th>
                   </tr>
               </thead>
               <tbody>
                
                    {
                        props.data.map((item, i)=><TodoItem dataitem = {item} indexkey = {i} getTodoData = {props.getTodoData} />)
                    }
                
                </tbody>
            </Table>
        </div>
    )
}

export default TodoList;