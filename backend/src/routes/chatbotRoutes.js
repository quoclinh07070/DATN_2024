const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAIApi(new Configuration({
    apiKey: 'YOUR_OPENAI_API_KEY',
}));

app.post('/chatbot', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 150,
        });
        res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
