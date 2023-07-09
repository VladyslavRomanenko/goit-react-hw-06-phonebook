import { Filter } from '../Filter/Filter';
import { Contacts } from '../Contacts/Contacts';
import { Form } from '../Form/Form';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import contactsDefault from '../../data/contacts.json';

export const App = () => {
  // const [contacts, setContacts] = useState([
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ]);
  const LOCAL_CONTACTS = 'local-contacts';

  const [filter, setFilter] = useState('');

  const [contacts, setContacts] = useState(() => {
    const resultContacts = JSON.parse(localStorage.getItem(LOCAL_CONTACTS));
    if (resultContacts) {
      return resultContacts;
    }
    return contactsDefault;
  });

  // useEffect(() => {
  //   const storedContacts = JSON.parse(localStorage.getItem(LOCAL_CONTACTS));
  //   if (storedContacts) {
  //     setContacts(storedContacts);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const checkName = name => {
    return contacts.find(contact => contact.name === name) ? true : false;
  };

  const addContact = obj => {
    const { name, number } = obj;
    if (checkName(name)) {
      alert(`${name} already exists`);
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      setContacts(prevContacts => [newContact, ...prevContacts]);
    }
  };

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const getContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const allContacts = getContacts();
  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <Form addContact={addContact}></Form>
      <h2 className={css.title}>Contacts</h2>
      <Filter handleFilter={handleFilter} filter={filter}></Filter>
      <Contacts
        allContacts={allContacts}
        removeContact={removeContact}
      ></Contacts>
    </div>
  );
};
