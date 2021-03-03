import { Button, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import "./Todo.css";
import db from "./firebase";

function Todo(props) {
	return (
		<List>
			<ListItem>
				<ListItemText primary={props.todo.todo} secondary="For today ⏰" />
			</ListItem>
			<Button onClick={e => db.collection("todos").doc(props.todo.id).delete()}>
				✖
			</Button>
		</List>
	);
}

export default Todo;
