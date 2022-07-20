import React, {useState, useEffect} from 'react'
import './editContact.scss'

import "react-datepicker/dist/react-datepicker.css";

import { useNavigate, useParams } from "react-router-dom";

const EditContact = (props) => {

    const id = useParams().id;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const retrieveContacts = JSON.parse(localStorage.getItem('contacts'));
        const contactToEdit = retrieveContacts.find((contactObj) => {
            if(contactObj.id === id) {
                return contactObj;
            }
        })
        setFirstName(contactToEdit.firstName);
        setLastName(contactToEdit.lastName);
      }, []);

    const cancelClick = () => {
        navigate('/');
    }

    const edit = (e) => {
        e.preventDefault();
        props.editHandler({id, firstName, lastName});
        setFirstName('');
        setLastName('');
        navigate('/');
    }

    return (
        <div className="editContainer">
            <div className="editWrapper">
                <h2>Edit Contact</h2>
                <form onSubmit={edit}>
                    <div className="inputContainer">
                        <label>First Name</label>
                        <input type='text'
                        placeholder='Enter your first name'
                        id="firstName"
                        autoComplete='off'
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        required/>
                    </div>
                    <div className="inputContainer">
                    <label>Last Name</label>
                        <input type='text'
                        placeholder='Enter your last name'
                        autoComplete='off'
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        required/>
                    </div>
                    <div className="buttonSection">
                        <button style={{marginRight: '10px'}}>Save</button>
                        <button onClick={cancelClick} style={{float: 'right'}}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditContact;