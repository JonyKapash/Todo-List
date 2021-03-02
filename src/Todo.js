import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import "./Todo.css";

function Todo(props) {
	return (
		<List>
			<ListItem>
				<ListItemText primary={props.text} secondary="For today ⏰" />
			</ListItem>
		</List>
	);
}

export default Todo;
