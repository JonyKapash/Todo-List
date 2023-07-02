import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import "./Todo.css";
import db from "../../Firebase/firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

let colorMix = `rgb(${[1, 2, 3].map((x) => (Math.random() * 256) | 0)})`;

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const Todo = ({ todo }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const updateTodo = () => {
    // Update todo with the new input text
    db.collection("todos").doc(todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <Box className={classes.paper}>
          <form>
            <Typography variant="h1">Update Todo</Typography>
            <input
              placeholder={todo.todo}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" onClick={updateTodo}>
              ✔
            </Button>
          </form>
        </Box>
      </Modal>

      <List>
        <Box className="todo_list" style={{ backgroundColor: colorMix }}>
          <ListItem>
            <ListItemText primary={todo.todo} secondary="For today ⏰" />
          </ListItem>
          <Button onClick={(e) => setOpen(true)}>Edit</Button>
          <DeleteForeverIcon
            id="delBtn"
            onClick={(e) => db.collection("todos").doc(todo.id).delete()}
          />
        </Box>
      </List>
    </>
  );
};
