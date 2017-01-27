module.exports = (app, models, io) => {
    app.get('/products', (req, res) => {
        models.Product.find({}, (err, products) => {
            if(err) throw err;

            res.json(products);
        });
    });

    app.get('/contacts', (req, res) => {
        models.Contact.find({}, (err, contacts) => {
            if(err) throw err;

            res.json(contacts);
        });
    });

    app.get('/slides', (req, res) => {
        models.Slide.find({}, (err, slides) => {
            if(err) throw err;

            res.json(slides);
        });
    });

    app.get('/tables', (req, res) => {
        models.Table.find({}, (err, tables) => {
            if(err) throw err;

            res.json(tables);
        });
    });

    app.post('/reservation', (req, res) => {
        const params = req.body;
        console.log(params);

        const newReservation = models.Reservation({
            firstname: params.firstname,
            surname: params.surname,
            phone: params.phone,
            date: params.date,
            tableId: params.tableId,
            order: params.order
        });

        newReservation.save(err => {
            if(err) throw err;

            res.send({message: "success"})
        });
    });

    app.post('/comment', (req, res) => {
        console.log(req.body);

        const newComment = models.Comment({
            contents: req.body.contents,
            who: req.body.who,
            show: req.body.show,
            date: req.body.date,
            rating: req.body.rating
        })
        models.Product.findByIdAndUpdate(req.body.produtId,
            {$push: {"comments": newComment}},
            {safe: true, upsert: true, new: true},
            (err, model) => {
                console.log(err);
            }
        )
        io.sockets.send('CommentAdded');
    })

    app.post('/admin/product', (req, res) => {
        const newProduct = models.Product({
            name: req.body.name,
            price: req.body.price,
            desc: req.body.desc,
            comments: [],
            stars: 5,
            thumbnailUrl: req.body.thumbnailUrl,
            imageUrl: req.body.imageUrl
        });
        newProduct.save(err => {
            if(err) throw err;
        })
        res.json({message: "success"})
    })

    app.get('/admin/orders', (req, res) => {
        models.Reservation.find({}, (err, reservations) => {
            res.json(reservations);
        });
    })
}
