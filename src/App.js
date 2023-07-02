import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import firebase from "firebase";
import db from "./Firebase/firebase";
import { Todo } from "./components/Todo/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // When the app loads, we need to listen to the database and fetch new todos as they get added/removed.
  useEffect(() => {
    // The code here run when the app.js loads.
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (e) => {
    // This function will fire when clicking *Add todo*

    e.preventDefault(); // --> Prevent page from refreshing after submitting the form.

    db.collection("todos").add({
      //--> Adding a new todo to our firebase database + the timestamp from firebase servers.
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <Box className="App">
      <Typography>My Todo List ✅</Typography>
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </form>

      <ul>
        {/* Mapping on each todo and displaying it */}
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo} />
        ))}
      </ul>
    </Box>
  );
}

export default App;
