const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const Chat = require('../models/Chat');

const router = express.Router();
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

// Chatbot Route
router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Analyze the following text and provide a response:
"${text}"`,
      max_tokens: 100,
    });

    const botMessage = response.data.choices[0].text.trim();

    // Save to MongoDB
    const chat = new Chat({ userMessage: text, botResponse: botMessage });
    await chat.save();

    res.json({ userMessage: text, botResponse: botMessage });
  } catch (error) {
    console.error('AI Response Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

module.exports = router;