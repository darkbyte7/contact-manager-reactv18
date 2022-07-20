import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/login/Login';
import Header from './components/header/Header';
import AddContact from './components/addContact/AddContact'
import ContactList from './components/contactList/ContactList';
import EditContact from './components/editContact/EditContact';

import  { v4 as uuidv4 } from 'uuid';

function App() {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) || []);

  const addContactHandler = (contact) => {
    setContacts([...contacts,{id: uuidv4(), ...contact}]);
  };

  const editHandler = (contact) => {
    const newContacts = contacts.map((obj) => {
      if (obj.id === contact.id) {
        return Object.assign({}, obj, {firstName: contact.firstName, lastName: contact.lastName});
      } else {
        return obj;
      }
    });
    setContacts(newContacts);
  }

  const deleteContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })
    setContacts(newContactList);
  }

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem('contacts'));
    if(retrieveContacts) setContacts(retrieveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <BrowserRouter>
      <Routes>
        {/* add page */}
        <Route path='/add' element={
        <>
          <Header />
          <AddContact addContacthandler={addContactHandler}/>
        </>} />
        {/* home page */}
        <Route path='/' element={
        <>
          <Header />
          <ContactList contacts={contacts} deleteContactHandler={deleteContactHandler}/>
        </>} />
        {/* edit page */}
        <Route path='/edit/:id' element={
        <>
          <Header />
          <EditContact editHandler={editHandler}/>
        </>} />
        {/* login page */}
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
