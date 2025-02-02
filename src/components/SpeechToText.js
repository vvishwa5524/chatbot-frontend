import React, { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToText = ({ setChatHistory }) => {
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  const { listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({
    onResult: (result) => setTranscript(result),
    onError: (err) => setError(err.message),
  });

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const handleSend = () => {
    if (transcript.trim()) {
      setChatHistory((prevHistory) => [...prevHistory, { user: transcript, bot: 'Processing...' }]);
      setTranscript('');
      resetTranscript();
    }
  };

  return (
    <div>
      <h2>Voice Input</h2>
      <button onClick={() => SpeechRecognition.startListening({ continuous: true })} disabled={listening}>
        {listening ? 'Listening...' : 'Start Listening'}
      </button>
      <button onClick={SpeechRecognition.stopListening}>
        Stop
      </button>
      <button onClick={handleSend} disabled={!transcript.trim()}>
        Send
      </button>
      <p>{transcript}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SpeechToText;
