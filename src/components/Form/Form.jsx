import css from './Form.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { nanoid } from '@reduxjs/toolkit';
import { addContact } from 'redux/slice';

const Form = () => {
  const [contact, setContact] = useState({ name: '', number: '' });
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleChange = event => {
    setContact(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const checkName = name => {
    return contacts.find(contact => contact.name === name);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (checkName(contact.name)) {
      setContact({
        name: '',
        number: '',
      });
      alert('The contact already exists');
    } else {
      const newContact = { ...contact, id: nanoid() };
      dispatch(addContact(newContact));
      setContact({
        name: '',
        number: '',
      });
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name:
        <input
          onChange={handleChange}
          className={css.input}
          type="text"
          name="name"
          placeholder="Enter your name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={contact.name}
        />
      </label>
      <label className={css.label}>
        Phone:
        <input
          onChange={handleChange}
          className={css.input}
          type="tel"
          name="number"
          placeholder="Enter your phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={contact.number}
        />
      </label>
      <button className={css.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default Form;
