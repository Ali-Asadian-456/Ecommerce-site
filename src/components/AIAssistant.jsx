import React, { useState } from 'react';

export default function AIAssistant() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [hasLoggedIn, setHasLoggedIn] = useState(false); // New state to track login
  const [chatId, setChatId] = useState(null); // New state to store chat ID

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchChatData = async (token) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/chats', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Connection' : 'keep-alive',
          'Accept': 'application/json',
         'Accept-Encoding': 'gzip, deflate, br',


        },
        body: JSON.stringify({
            title: 'newchat',
        }),
      });

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        if (response.ok) {
          let data;
          try {
            data = await response.json();
          } catch (parseError) {
            console.error('JSON parse error:', parseError);
            return;
          }
        //   console.log('Chat API Response:', data);
          setChatId(data.data.id);
        } else {
          console.error('Fetching chat data failed');
        }
      } else {
        const text = await response.text();
        console.error('Unexpected response format:', text);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async () => {
    if (hasLoggedIn) return; // Prevent multiple login attempts
    setHasLoggedIn(true); // Mark login as attempted

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Connection' : 'keep-alive',
          'Accept': 'application/json',
         'Accept-Encoding': 'gzip, deflate, br',

        },
        body: JSON.stringify({
          email: '12345678@gmail.com',
          password: '12345678',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log('API Response:', data); // Debugging log
        setToken(data.data.token); // Correctly accessing the token inside `data`
        fetchChatData(data.data.token); // Fetch chat data after successful login
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='w2-xt-center'>
      <button
        className="fixed bottom-4 right-4 bg-gray-300 p-2 rounded"
        onClick={() => {
          openModal();
          handleLogin();
        }}
      >
        Open Modal
      </button>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded relative"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="cursor-pointer float-right text-xl font-bold"
              onClick={closeModal}
            >
              &times;
            </span>
            <p>Modal Content</p>
            {token && (
              <>
                {/* {console.log('Token State:', token)} Debugging log */}
                {/* <p className="mt-4 text-green-500">Token: {token}</p> */}
              </>
            )}
            {chatId && (
              <div className="mt-4 text-blue-500">Chat ID: {chatId}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
