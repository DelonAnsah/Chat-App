import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const POST_MESSAGE = gql`
  mutation PostMessage($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const MessageForm = ({ user, setUser }) => {
  const [content, setContent] = useState('');
  const [postMessage] = useMutation(POST_MESSAGE);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      postMessage({ variables: { user, content } });
      setContent('');
    }
  };

  const handleUsernameChange = (e) => {
    setUser(e.target.value); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6 w-full px-4">
      <input
        type="text"
        placeholder="Username"
        value={user}
        onChange={handleUsernameChange}
        className="w-full sm:w-32 p-3 border rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      
      <input
        type="text"
        placeholder="Type a message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full flex-1 p-3 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
      />
      
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        Send
      </button>
    </form>
  );
};

export default MessageForm;
