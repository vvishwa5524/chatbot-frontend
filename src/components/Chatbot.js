// import React, { useState } from 'react';
// import axios from 'axios';

// const Chatbot = ({ chatHistory, setChatHistory, imageData }) => {
//   const [userInput, setUserInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSendMessage = async () => {
//     if (!userInput.trim() && !imageData) {
//       setError('Please enter a message or upload an image.');
//       return;
//     }
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post('http://localhost:5000/api/chat', {
//         text: imageData ? imageData.extractedText : userInput,
//       });

//       setChatHistory([...chatHistory, { user: userInput || 'Image Text', bot: response.data.botResponse }]);
//       setUserInput('');
//     } catch (error) {
//       setError('Error getting response from chatbot. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Chat with AI</h2>
//       <div className='chat-box'>
//         {chatHistory.map((chat, index) => (
//           <div key={index}>
//             <p><strong>You:</strong> {chat.user}</p>
//             <p><strong>Bot:</strong> {chat.bot}</p>
//           </div>
//         ))}
//       </div>
//       <input 
//         type='text' 
//         value={userInput} 
//         onChange={(e) => setUserInput(e.target.value)} 
//         placeholder='Type a message...'
//       />
//       <button onClick={handleSendMessage} disabled={loading}>
//         {loading ? 'Sending...' : 'Send'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = ({ imageData }) => {
  const [chatHistory, setChatHistory] = useState(
    JSON.parse(localStorage.getItem('chatHistory')) || []
  );
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!userInput.trim() && !imageData) {
      setError('Please enter a message or upload an image.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        text: imageData ? imageData.extractedText : userInput,
      });

      const newChat = { user: userInput || 'Image Text', bot: response.data.botResponse };
      setChatHistory([...chatHistory, newChat]);
      setUserInput('');
    } catch (error) {
      setError('Error getting response from chatbot. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Chat with AI</h2>
      <div className='chat-box'>
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <p><strong>You:</strong> {chat.user}</p>
            <p><strong>Bot:</strong> {chat.bot}</p>
          </div>
        ))}
      </div>
      <input 
        type='text' 
        value={userInput} 
        onChange={(e) => setUserInput(e.target.value)} 
        placeholder='Type a message...'
      />
      <button onClick={handleSendMessage} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Chatbot;
