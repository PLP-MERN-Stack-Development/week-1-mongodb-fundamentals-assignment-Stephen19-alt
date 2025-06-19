//Task 2
//Find books of specific genre
db.books.find({"genre": "Fiction"}).pretty()

//Find books published after 1940
db.books.find({"published_year": {$gte: 1940}}).pretty()

//Find books by a specific author
db.books.find({"author": "George Orwell"}).pretty()

//Update the price of a specific book
db.books.updateOne({"title": "The Alchemist"}, 
    {$set: {price: 12.99}})

//Delete a book by its title
db.books.deleteOne({"title": "The Lord of the Rings"})

//Task 3
//Find books both in stock and published after 2010
db.books.find({$and: [{in_stock: true}, 
    {published_year: {$gt: 2010}}]}).pretty()

//Project to return only the title, author, and price of books
db.books.aggregate(
    {$project: {title: 1, author: 1, price: 1}})

//Sorting to display books by price in ascending order
db.books.find().sort(
    {price: 1}).pretty()

//Sort to display books by price in descending order
db.books.find().sort(
    {price: -1}).pretty()

//Implement pagination to return five books per page using skip and limit
db.books.find().skip(2).limit(5)

//Task 4 Aggregation Pipeline
//Calculate the average price of books by genre
db.books.aggregate([
    {$group: 
        {_id: "$genre", averagePrice: {$avg: "$price"}}}])

//Author with the most books
db.books.aggregate([
    {$group: {_id: "$author", bookCount: {$sum: 1}}},
    {$sort: {bookCount: -1}}, 
    {$limit: 1}])

//Group books by publication decade and count them
db.books.aggregate([
    {$group: {
        _id: {$floor: {$divide: ["$published_year", 10]}},
        bookCount: {$sum: 1}
    }},
    {$sort: {_id: 1}}
])

//Create index on the title field
db.books.createIndex(
    {"title": 1}, 
    {unique: true})

//Create a compound index on author and published_year
db.books.createIndex({"author": 1, "published_year": 1}, 
    {unique: false})

//Use explain () method to demonstrate performance improvement using the index
db.books.find(
    {"author": "George Orwell"}).explain("executionStats")


















