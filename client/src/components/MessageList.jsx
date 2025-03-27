import { gql, useQuery } from '@apollo/client';
import React from 'react';

// GraphQL query to fetch messages
const GET_MESSAGES = gql`
  query {
    messages {
      id
      user
      content
    }
  }
`;

// Function to generate a color based on username
const getUserColor = (username) => {
  const colors = [
    'bg-green-500', 'bg-blue-500', 'bg-red-500',
    'bg-purple-500', 'bg-yellow-500', 'bg-pink-500'
  ];
  const index = username
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

const MessageList = ({ user, searchTerm }) => {
  const { data } = useQuery(GET_MESSAGES, { pollInterval: 500 });

  if (!data) {
    return <p className="text-center text-gray-600">Loading messages...</p>;
  }

  const filteredMessages = data.messages.filter((message) =>
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-8 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 w-full mt-16">
      <h3 className="text-2xl font-semibold mb-6 text-center text-blue-600 transition-all">
        Messages
      </h3>
      <div className="space-y-4">
        {filteredMessages.map(({ id, user: messageUser, content }) => {
          const userColor = getUserColor(messageUser);
          const isCurrentUser = user === messageUser;

          return (
            <div
              key={id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} pb-4 animate__animated animate__fadeIn`}
            >
              {/* User Avatar */}
              <div className={`${isCurrentUser ? 'order-last' : ''} flex items-center mr-3`}>
                {!isCurrentUser && (
                  <div
                    className={`h-10 w-10 rounded-full ${userColor} text-white text-center text-xl flex items-center justify-center shadow-md`}
                  >
                    {messageUser.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`${
                  isCurrentUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                } rounded-lg p-4 max-w-[75%] sm:max-w-full shadow-lg transition-all duration-300 transform hover:scale-105`}
              >
                <p>{content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageList;












































{/*
import { gql, useQuery } from '@apollo/client';
import React from 'react';

const GET_MESSAGES = gql`
  query {
    messages {
      id
      user
      content
    }
  }
`;

const MessageList = ({ user, searchTerm }) => {
  const { data } = useQuery(GET_MESSAGES, { pollInterval: 500 });

  if (!data) {
    return <p className="text-center text-gray-600">Loading messages...</p>;
  }

  const filteredMessages = data.messages.filter((message) =>
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-8 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 w-full mt-16">
      <h3 className="text-2xl font-semibold mb-6 text-center text-blue-600 transition-all">
        Messages
      </h3>
      <div className="space-y-4">
        {filteredMessages.map(({ id, user: messageUser, content }) => (
          <div
            key={id}
            className={`flex ${user === messageUser ? 'justify-end' : 'justify-start'} pb-4 animate__animated animate__fadeIn`}
          >
            <div className={`${user === messageUser ? 'order-last' : ''} flex items-center mr-3`}>
              {user !== messageUser && (
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-center text-xl flex items-center justify-center shadow-md">
                  {messageUser.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div
              className={`${
                user === messageUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
              } rounded-lg p-4 max-w-[75%] sm:max-w-full shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              <p>{content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;


*/}