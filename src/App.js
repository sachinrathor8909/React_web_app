import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import {BsSearch} from "react-icons/bs";
function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from the API
    axios
      .get('https://reqres.in/api/users?page=2')
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      
      <h1 className='h1'>User List</h1>
      
      <div className='Form-field'>
        <input 
          type="text"
          placeholder="Search...."
          value={searchTerm}
          onChange={handleSearch}
        />
        <span className='icon'><BsSearch/></span>
      </div>
      <div className='user'>
        {filteredUsers.map((user) => (
          <div key={user.id}>
            <div className='img'><img src={user.avatar} alt={user.first_name} />
            </div>
            <p className='p'>{user.first_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
  