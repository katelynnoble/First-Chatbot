const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors package
const { OpenAI } = require("openai");
 
const app = express();
const port = 5000;
 
// Use the cors middleware
app.use(cors());
 
// Middleware to serve static files from the "public" directory
app.use(express.static("public"));
 
// Middleware to parse JSON bodies
app.use(bodyParser.json());
 
// Create an instance of OpenAI with the API key
const openai = new OpenAI({
    apiKey: 'sk-proj-ruehDsYkBivn3Z5L3cE9T3BlbkFJDDhvo91yC6tmALI4s9Fo',
});
 
// Define the chat route
app.post("/chat", async (req, res) => {
  try {
    const resp = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.question }],
    });
 
    res.status(200).json({ message: resp.choices[0].message.content });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
 
// Start the server
app.listen(port, () => {
  console.log(`Server is active on http://localhost:${port}`);
});