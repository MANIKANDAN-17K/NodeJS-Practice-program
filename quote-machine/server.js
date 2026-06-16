const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve frontend files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Fallback quotes in case external API fails
const fallbackQuotes = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { content: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
];

// ── GET /api/quote ──
// Fetches a random quote from dummyjson.com
// If that fails, returns one of our fallback quotes
app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');

    if (!response.ok) {
      throw new Error(`External API returned ${response.status}`);
    }

    const data = await response.json();

    res.json({
      success: true,
      source: 'dummyjson.com',
      data: {
        quote: data.quote,
        author: data.author,
        tags: [],
      },
    });

  } catch (err) {
    console.warn(`External API failed: ${err.message} — using fallback`);

    const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];

    res.json({
      success: true,
      source: 'fallback',
      data: {
        quote: random.content,
        author: random.author,
        tags: [],
      },
    });
  }
});

app.listen(PORT, () => {
  console.log(`💬 Quote Machine running → http://localhost:${PORT}`);
});