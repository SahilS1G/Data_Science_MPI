// app.js or server.js

const express = require('express');
const mongoose = require('mongoose');
const HistoryItem = require('./model/model'); 

const app = express();
const PORT =  4000; 


app.use(express.json());

mongoose.connect("mongodb+srv://sahimake1773:WBirp9kFEBo3mo0W@cluster0.uzfygel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define endpoints

// Endpoint to add history data
app.post('/history/add', async (req, res) => {
  try {
    const { email, image, response } = req.body;

    // Create a new history item
    const historyItem = new HistoryItem({
      email,
      image,
      response,
    });

    // Save the history item to the database
    await historyItem.save();

    res.status(201).json({ message: 'History data added successfully.' });
  } catch (error) {
    console.error('Error adding history data:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

app.get('/history/:email', async (req, res) => {
    try {
      const { email } = req.params;
  
      // Find history items with the specified email
      const history = await HistoryItem.find({ email });
  
      res.status(200).json(history);
    } catch (error) {
      console.error('Error fetching history data:', error);
      res.status(500).json({ error: 'An internal server error occurred.' });
    }
  });


  app.put('/history/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { feedback } = req.body;
  
      // Find the history item by its ID
      const historyItem = await HistoryItem.findById(id);
  
      if (!historyItem) {
        return res.status(404).json({ error: 'History item not found.' });
      }
  
      // Update the feedback
      historyItem.feedback = feedback;
  
      // Save the updated history item
      await historyItem.save();
  
      res.status(200).json({ message: 'Feedback added successfully.' });
    } catch (error) {
      console.error('Error adding feedback:', error);
      res.status(500).json({ error: 'An internal server error occurred.' });
    }
  });


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
