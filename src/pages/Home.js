// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<Home />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import Chatbot from '../components/Chatbot';
import SpeechToText from '../components/SpeechToText';
import TextToSpeech from '../components/TextToSpeech';
import DarkMode from '../components/DarkMode';
import '../App.css';

const Home = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [imageData, setImageData] = useState(null);

  return (
    <div className='container'>
      <DarkMode />
      <h1>Image-Based Conversational Chatbot</h1>
      <ImageUpload setImageData={setImageData} />
      <SpeechToText setChatHistory={setChatHistory} />
      <Chatbot chatHistory={chatHistory} setChatHistory={setChatHistory} imageData={imageData} />
      <TextToSpeech chatHistory={chatHistory} />
    </div>
  );
};

export default Home;
