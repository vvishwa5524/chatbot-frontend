import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const TextToSpeech = ({ chatHistory }) => {
  const { speak } = useSpeechSynthesis();

  const handleSpeak = (text) => {
    speak({ text });
  };

  return (
    <div>
      <h2>Bot Speech Output</h2>
      {chatHistory.map((chat, index) => (
        <div key={index}>
          <p><strong>Bot:</strong> {chat.bot}</p>
          <button onClick={() => handleSpeak(chat.bot)}>🔊 Listen</button>
        </div>
      ))}
    </div>
  );
};

export default TextToSpeech;