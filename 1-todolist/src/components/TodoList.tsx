import React, {ChangeEvent, useState} from 'react';
import {FilterValuePropsType} from "../App";

type TodoListPropsType = {
   addTask: (title: string) => void
   changeFilter: (value: FilterValuePropsType) => void
   removeTasks: (taskID: string) => void
   task: TaskType[]
   title: string
}
type TaskType = {
   id: string
   title: string
   isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
   let [title, setTitle] = useState('')

   const addTaskHandler = () => {
      props.addTask(title)
      setTitle('')
   }

   const onAddChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.currentTarget.value)
   }

   const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
         addTaskHandler()
      }
   }

   const onAllChangeFilter = () => {
      props.changeFilter('all')
   }
   const onActiveChangeFilter = () => {
      props.changeFilter('active')
   }
   const onCompletedChangeFilter = () => {
      props.changeFilter('completed')
   }

   return (
      <div>
         <h3>{props.title}</h3>
         <div>
            <input value={title} onKeyDown={onKeyDownHandler} onChange={onAddChangeHandler}/>
            <button onClick={addTaskHandler}>+</button>
         </div>
         <ul>
            {props.task.map(t => {
               const removeTaskHandler = () => {
                  props.removeTasks(t.id)
               }

               return (
                  <li key={t.id}>
                     <input type="checkbox" checked={t.isDone}/>
                     <span>{t.title}</span>
                     <button onClick={removeTaskHandler}>✖</button>
                  </li>
               )
            })}
         </ul>
         <div>
            <button onClick={onAllChangeFilter}>All
            </button>
            <button onClick={onActiveChangeFilter}>Active
            </button>
            <button onClick={onCompletedChangeFilter}>Completed
            </button>
         </div>
      </div>
   );
};

export default TodoList;