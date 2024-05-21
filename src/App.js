import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setContacts(response.data);
        setFilteredContacts([]);
      })
      .catch(error => {
        console.error('Error fetching the contacts', error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredContacts([]); // Show no contacts when search term is empty
    } else {
      setFilteredContacts(
        contacts.filter(contact =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, contacts]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedContact(null); // Clear the previously selected contact
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setFilteredContacts([]);
    setSearchTerm('');
  };

  return (
    <div className="app-container">
      <h1>Contacts Application</h1>
      <div className="search-bar-container">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Please enter your name to search"
            value={searchTerm}
            onChange={handleSearchChange}
            onClick={() => setSelectedContact(null)} // Clear the selected contact on click
          />
        </div>
        {filteredContacts.length > 0 && (
          <ul className="suggestions-list">
            {filteredContacts.map(contact => (
              <li key={contact.id} onClick={() => handleContactClick(contact)}>
                <span className="suggestion-name">{contact.name}</span>
                <span className="suggestion-phone"> ({contact.phone})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedContact && (
        <div className="contact-details">
          <h2>{selectedContact.name}</h2>
          <p><strong>Username:</strong> {selectedContact.username}</p>
          <p><strong>Email:</strong> {selectedContact.email}</p>
          <p><strong>Phone:</strong> {selectedContact.phone}</p>
          <p><strong>Website:</strong> {selectedContact.website}</p>
          <p><strong>Address:</strong> {selectedContact.address.street}, {selectedContact.address.suite}, {selectedContact.address.city}, {selectedContact.address.zipcode}</p>
          <p><strong>Company:</strong> {selectedContact.company.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;