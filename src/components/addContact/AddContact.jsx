import React, {useState} from 'react'
import './addContact.scss'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from "react-router-dom";

const AddContact = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState(new Date());

    const navigate = useNavigate();

    const cancelClick = () => {
        navigate('/');
    }

    const add = (e) => {
        e.preventDefault();
        const diff_ms = Date.now() - dob.getTime();
        const age_dt = new Date(diff_ms); 
        const age = Math.abs(age_dt.getUTCFullYear() - 1970);

        if(firstName === '' || lastName === '') {
            alert("All the fields are mandatory!");
            return;
        }
        props.addContacthandler({firstName, lastName, age});
        setFirstName('');
        setLastName('');
        navigate('/');
    }

    return (
        <div className="addContainer">
            <div className="addWrapper">
                <h2>Add Contact</h2>
                <form onSubmit={add}>
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
                    <div className="birthDateWrapper">
                        <label>Date of birth</label>
                        <DatePicker
                            closeOnScroll={true}
                            selected={dob}
                            onChange={(date) => setDob(date)}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select" />
                    </div>
                    <div className="addButton">
                        <button style={{marginRight: '10px'}}>Add</button>
                        <button onClick={cancelClick} style={{float: 'right'}}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddContact;