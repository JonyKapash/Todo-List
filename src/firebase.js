import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyAGJ2vMJ5Z1JysgMMVRXgDdDjxq8oCH52U",
	authDomain: "todo-list-4e72f.firebaseapp.com",
	projectId: "todo-list-4e72f",
	storageBucket: "todo-list-4e72f.appspot.com",
	messagingSenderId: "427898940944",
	appId: "1:427898940944:web:6f2dcaf188a224b0132495",
	measurementId: "G-VDN9CWX341",
});

const db = firebaseApp.firestore();

export default db;
