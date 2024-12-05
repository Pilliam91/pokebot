const express = require('express');
const app = express();
const { WebhookClient } = require('discord.js');

app.use(express.json());

app.post('/ebay-notifications', (req, res) => {
  const webhookClient = new WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL });
  webhookClient.send({ content: JSON.stringify(req.body, null, 2) });
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT);

app.get('/ebay-notifications', (req, res) => {
  res.status(200).send('OK');
});

app.post('/ebay-notifications', (req, res) => {
  try {
    console.log('Received eBay notification:', req.body);
    const webhookClient = new WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL });
    webhookClient.send({ content: JSON.stringify(req.body, null, 2) });
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing notification');
  }
});
