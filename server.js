const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { generateMockReviews } = require('./generator');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

function initializeDatabase() {
    if (!fs.existsSync(DB_FILE)) {
        const initialData = generateMockReviews(15);
        fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    }
}

function readData() {
    const rawData = fs.readFileSync(DB_FILE);
    return JSON.parse(rawData);
}

function writeData(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

initializeDatabase();

app.get('/api/reviews', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const reviews = readData();
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedReviews = reviews.slice(startIndex, endIndex);

    res.json({
        success: true,
        metadata: {
            currentPage: page,
            itemsPerPage: limit,
            totalItems: reviews.length,
            hasMore: endIndex < reviews.length
        },
        reviews: paginatedReviews
    });
});

app.post('/api/reviews', (req, res) => {
    const { username, rating, reviewText } = req.body;
    if (!username || !rating || !reviewText) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newReview = {
        id: Date.now().toString(),
        username,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        rating: Number(rating),
        reviewText,
        photos: [],
        createdAt: new Date().toISOString()
    };
    const reviews = readData();
    reviews.unshift(newReview);
    writeData(reviews);
    res.status(201).json({ success: true, review: newReview });
});

app.post('/api/reset', (req, res) => {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
    res.json({ success: true, message: 'Database reset' });
});

app.post('/api/generate', (req, res) => {
    const { count, minRating, maxRating } = req.body;
    const existingReviews = readData();
    const newReviews = generateMockReviews(count, minRating ? Number(minRating) : 1, maxRating ? Number(maxRating) : 5);
    const combined = [...newReviews, ...existingReviews];
    writeData(combined);
    res.json({ success: true, count: newReviews.length });
});

app.listen(PORT, () => {
    console.log(`✅ Persistent API running at http://localhost:${PORT}`);
    console.log(`📊 Dashboard available at http://localhost:${PORT}/dashboard.html`);
});
