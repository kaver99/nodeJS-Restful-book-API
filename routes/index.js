module.exports = (app, Book) => {
    // GET All Book
    app.get('/api/books', (req, res) => {
        Book.find( (err, books) => {
            if(err) return res.status(500).send({ error: 'database failure.' });
            res.json(books);
        });
    });

    // GET Single Book
    app.get('/api/books/:book_id', (req, res) => {
        Book.findOne({ _id: req.params.book_id }, (err, book) => {
            if(err) return res.status(500).json({ error: err });
            if(!book) return res.status(404).json({ error: 'book is not found.' });
            res.json(book);
        });
    });

    // GET Book by Author
    app.get('/api/books/author/:author', (req, res) => {
        Book.findOne({ author: req.params.author }, { _id: 0, title: 1, published_date: 1 }, (err, books) => {
            if(err) return res.status(500).json({ error: err });
            if(books.length === 0) return res.status(404).json({ error: 'book is not found.' });
            res.json(books);
        });
    });

    // POST Create Book
    app.post('/api/books', (req, res) => {
        var book = new Book();
        book.title = req.body.title;
        book.author = req.body.author;
        book.published_date = new Date(req.body.published_date);

        book.save( (err) => {
            if(err) {
                console.error(err);
                res.json(err);
                return;
            }

            res.json({ result: 1 });
        });
    });

    // PUT Update the Book
    app.put('/api/books/:book_id', (req, res) => {
        Book.findById(req.params.book_id, (err, book) => {
            if(err) return res.status(500).json({ error: err });
            if(!book) return res.status(404).json({ error: 'book is not found.' });
            
            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.published_date) book.published_date = req.body.published_date;

            book.save( (err) => {
                if(err) res.status(500).json({ error: 'failed to update.' });
                res.json({ message: 'book is updated.' });
            });
        });
    });

    // DELETE Delete Book
    app.delete('/api/books/:book_id', (req, res) => {
        Book.remove({ _id: req.params.book_id }, (err, output) => {
            if(err) return res.status(500).json({ error: err });
            
            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: 'book is not found.' });
            res.json({ message: 'book is deleted.' });
            */

            res.status(204).end();
        });
    });
}