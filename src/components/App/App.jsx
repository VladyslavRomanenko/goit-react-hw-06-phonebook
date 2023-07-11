import css from './App.module.css';
import Filter from '../Filter/Filter';
import Contacts from '../Contacts/Contacts';
import Form from '../Form/Form';

export const App = () => {
  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <Form />
      <h2 className={css.title}>Contacts</h2>
      <Filter />
      <Contacts />
    </div>
  );
};
