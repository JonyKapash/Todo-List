import { Button, List, ListItem, ListItemText, makeStyles, Modal } from "@material-ui/core";
import React, { useState } from "react";
import "./Todo.css";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

function Todo(props) {
    const classes = useStyles();
	const [open, setOpen] = useState(false);
    const [input, setInput] = useState()


    // Another option for handler instead of the inline function.
	// const handleOpen = () => { 
	// 	setOpen(true);
	// };

    const updateTodo = () => {
        // update todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})
        setOpen(false);
    }


	return (
		<>
			<Modal open={open} onClose={e => setOpen(false)}>
                <div className={classes.paper}>
                    <h1>Update Todo</h1>
                    <input placeholder={props.todo.todo } value={input} onChange={e => setInput(e.target.value)} />
                    <Button onClick={updateTodo}>✔</Button>
                </div>
            </Modal>

			<List>
				<ListItem>
					<ListItemText primary={props.todo.todo} secondary="For today ⏰" />
				</ListItem>
				<Button onClick={e => setOpen(true)}>Edit</Button>
				<DeleteForeverIcon
					onClick={e => db.collection("todos").doc(props.todo.id).delete()}
				/>
			</List>
		</>
	);
}

export default Todo;
