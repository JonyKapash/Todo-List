import React, { useState } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";

function App() {
  const [todos, setTodos] = useState(['Shopping', 'Take fox out', 'Feed the dog']);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    // This function will fire when clicking *Add todo*
    e.preventDefault() //Prevent page from refreshing after submitting the form.
    setTodos([...todos, input])
    setInput('')
  }

	return (
		<div className="App">
			<h1>Hello World</h1>
      <form>
        <FormControl>
          <InputLabel>✅Write a Todo</InputLabel>
          <Input value={input} onChange={e => setInput(e.target.value)}/>
        </FormControl>
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map(todo => (<li>{todo}</li>))}
      </ul>
		</div>
	);
}

export default App;
