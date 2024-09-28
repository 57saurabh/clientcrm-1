const app = require('./index'); // Import the Express app

const PORT = process.env.PORT || 3000; // Use the PORT provided by Vercel or default to 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
