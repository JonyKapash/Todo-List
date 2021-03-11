import { Button, List, ListItem, ListItemText, makeStyles, Modal } from "@material-ui/core";
import React, {useState } from "react";
import "./Todo.css";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// import { makeStyles } from '@material-ui/core/styles';

let colorMix = `rgb(${[1, 2, 3].map(x => (Math.random() * 256) | 0)})`;


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
        // Update todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})
        setOpen(false);
    }


	return (
		<>
            {/* Update the todo with different text  */}
			<Modal open={open} onClose={e => setOpen(false)}>
                <div className={classes.paper}>
                    <form>
                    <h1>Update Todo</h1>
                    <input placeholder={props.todo.todo} value={input} onChange={e => setInput(e.target.value)} />
                    <Button type="submit" onClick={updateTodo}>✔</Button>
                    </form>
                </div>
            </Modal>

			<List>
             <div className="todo_list" style={{backgroundColor: colorMix}}>

				<ListItem>
					<ListItemText primary={props.todo.todo} secondary="For today ⏰"/>
				</ListItem>
				<Button onClick={e => setOpen(true)}>Edit</Button>
				<DeleteForeverIcon id="delBtn"
					onClick={e => db.collection("todos").doc(props.todo.id).delete()}
				/>
               
             </div>
			</List>
		</>
	);
}

export default Todo;
