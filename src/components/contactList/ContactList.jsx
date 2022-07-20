import React from 'react'
import './contactList.scss'
import { useNavigate } from "react-router-dom";

const ContactList = (props) => {

    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate("/add");
      }

    const handleEditClick = (id) => {
        navigate(`/edit/${id}`);
    }

    const handleDeleteClick = (id) => {
        props.deleteContactHandler(id)
    }

    const renderContactList = props.contacts.map((contact, index) => {
        return (
            <div className="item" key={contact.id}>
                <div className="content" >
                    <div>{index + 1}</div>
                    <div>{contact.firstName}</div>
                    <div>{contact.lastName}</div>
                    <div>{contact.age}</div>
                    <div>
                        <button
                            onClick={() => handleEditClick(contact.id)}
                            style={{color: '#1778F2', marginRight: '10px'}}>Edit</button>
                            <button
                            onClick={() => handleDeleteClick(contact.id)}
                            style={{color: 'red'}}>Delete</button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="listContainer">
            <div className='addBtn'>
                <button onClick={handleAddClick}>Add Contact</button>
            </div>
            <div className="listWrapper">
                <div className="item">
                    <div className="content">
                        <div>SR NO.</div>
                        <div>FIRSTNAME</div>
                        <div>LASTNAME</div>
                        <div>AGE</div>
                        <div></div>
                    </div>
                </div>
                {renderContactList}
            </div>
        </div>
    )
}

export default ContactList;