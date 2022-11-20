import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";

export type FilterValuePropsType = 'all' | 'active' | 'completed'

function App() {
  let [tasks, setTasks] = useState([
     { id: v1(), title: "HTML&CSS", isDone: true },
     { id: v1(), title: "JS", isDone: true },
     { id: v1(), title: "ReactJS", isDone: false },
     { id: v1(), title: "GraphQL", isDone: true },
     { id: v1(), title: "API", isDone: false },
  ])

   function addTask(title: string) {
      let newTask = { id: v1(), title: title, isDone: true }
      setTasks([newTask ,...tasks])
   }

   function removeTasks(taskID: string) {
     let filteredTasks = tasks.filter(f => f.id !== taskID)
      setTasks(filteredTasks)
   }

   const [filter, setFilter] = useState<FilterValuePropsType>('all')
   let taskForTodolist = tasks
   // @ts-ignore
   if (filter === 'active') {
      taskForTodolist = tasks.filter(f => f.isDone)
   }
   if (filter === 'completed') {
      taskForTodolist = tasks.filter(f => !f.isDone)
   }

   const changeFilter = (value: FilterValuePropsType) => {
      setFilter(value)
   }

   return (
      <div className="App">
         <TodoList
            title='Menu'
            task={taskForTodolist}
            removeTasks={removeTasks}
            changeFilter={changeFilter}
            addTask={addTask}
         />
      </div>
   );
}

export default App;
