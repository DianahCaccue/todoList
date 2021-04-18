import React,{Fragment} from "react"
//import logo from './logo.svg';
import './App.css';

//components
import InputTodo from './components/InputTodo'
import ListTodos from './components/ListTodos'

function App() {
  return (
    <Fragment>
      <div className= "container">
       <InputTodo/>
       <ListTodos/>
      </div>
    </Fragment>
  );
}

export default App;
