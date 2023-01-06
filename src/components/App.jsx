import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export function App1() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  const addContacts = (name, number) => {
    const newContact = { id: nanoid(), name, number };

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts(contacts => [...contacts, newContact]);
  };

  const getVisibleContacts = () => {
    const normalized = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalized)
    );
  };

  const onChangeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(contacts => {
      return contacts.filter(contact => contact.id !== contactId);
  });
  };

  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContacts} />
      <h2 className={css.title}>Contacts</h2>

      <Filter value={filter} onChange={onChangeFilter} />
      <ContactList
        contacts={getVisibleContacts}
        deleteContact={deleteContact}
      />
    </div>
  );
}

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   addContacts = ({ name, number }, reset) => {
//     const { contacts } = this.state;
//     const newContact = { id: nanoid(), name, number };

//     if (contacts.find(contact => contact.name === name)) {
//       alert(`${name} is already in contacts.`);
//       return;
//     }
//     this.setState(({ contacts }) => ({ contacts: [...contacts, newContact] }));
//     reset();
//   };

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalized = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalized)
//     );
//   };

//   onChangeFilter = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   deleteContact = contactId => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(({ id }) => id !== contactId),
//     }));
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const { filter } = this.state;
//     const { addContacts, onChangeFilter } = this;
//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <div className={css.container}>
//         <h1 className={css.title}>Phonebook</h1>
//         <ContactForm onSubmit={addContacts} />
//         <h2 className={css.title}>Contacts</h2>

//         <Filter value={filter} onChange={onChangeFilter} />
//         <ContactList
//           contacts={visibleContacts}
//           deleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }
