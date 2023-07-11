import css from './Contacts.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';
import { deleteContact } from 'redux/slice';

const Contacts = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const getContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContacts = getContacts();

  return (
    <div className={css.contacts}>
      <ul className={css.contactsList}>
        {visibleContacts.map(contact => (
          <li key={contact.id} className={css.contactListItem}>
            <div className={css.textContact}>
              <p className={css.contact}>{contact.name} : </p>
              <p className={css.contact}>{contact.number}</p>
            </div>
            <button
              className={css.contactDeleteBtn}
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
