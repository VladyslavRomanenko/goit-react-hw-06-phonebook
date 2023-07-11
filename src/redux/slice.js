import { createSlice } from '@reduxjs/toolkit';
import contactsDefault from '../data/contacts.json';

const initialState = {
  contacts: contactsDefault,
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts = [action.payload, ...state.contacts];
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    getFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, getFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
