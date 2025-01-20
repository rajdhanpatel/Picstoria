require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { createNewUser } = require('./controllers/userController');  
const { searchPhotos,createPhoto, addTagsToPhoto, searchPhotosByTag } = require('./controllers/photoController');
const { getSearchHistory } = require('./controllers/searchHistoryController');

app.use(cors());
app.use(express.json());


app.post("/api/users", createNewUser);
app.get("/api/photos/search", searchPhotos);
app.post("/api/photos",createPhoto);
app.post("/api/photos/:photoId/tags",addTagsToPhoto);
app.get('/api/photos/tag/search', searchPhotosByTag);
app.get('/api/search-history', getSearchHistory);
app.listen(port, () => {    
    console.log(`Server is running on port ${port}`);
});
