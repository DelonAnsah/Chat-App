import React, { useState } from 'react'
import Navbar from './components/Navbar';
import MessageList from './components/MessageList';
import MessageForm from './components/MessageForm';

const App = () => {
  const [user, setUser] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
       <Navbar setSearchTerm={setSearchTerm} />
       <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
          <MessageList user={user} searchTerm={searchTerm} />
          <MessageForm  user={user} setUser={setUser}/>
       </div>
    </div>
  )
}

export default App
