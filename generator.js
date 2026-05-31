const { faker } = require('@faker-js/faker');

function generateMockReviews(count = 10, minRating = 1, maxRating = 5) {
    const reviews = [];
    for (let i = 0; i < count; i++) {
        reviews.push({
            id: faker.string.uuid(),
            username: faker.internet.userName(),
            avatarUrl: faker.image.avatar(),
            rating: faker.number.int({ min: minRating, max: maxRating }),
            reviewText: faker.lorem.paragraph({ min: 1, max: 3 }),
            photos: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(() => 
                faker.image.urlLoremFlickr({ category: 'product', width: 400, height: 400 })
            ),
            createdAt: faker.date.recent({ days: 30 })
        });
    }
    return reviews;
}

module.exports = { generateMockReviews };
