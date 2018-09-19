const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000;

// Will serve up all assets from the public directory
app.use(express.static(publicPath))

// If the file doesn't (what the user requested) 
// exist in the public folder => then always serve index.html
app.get('*', (req,res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server running!');
});