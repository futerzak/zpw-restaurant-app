module.exports = (mongoose) => {
    const Schema = mongoose.Schema;

    const slide = new Schema({
        url: {type: String, required: true}
    })

    const Slide = mongoose.model('Slide', slide);

    const table = new Schema({
        name: {type: String, required: true},
        places: {type: Number, required: true}
    });
    const Table = mongoose.model('Table', table);

    const comment = new Schema({
        contents: String,
        who: String,
        show: Boolean,
        date: Date,
        rating: {type: Number, required: true}
    })
    const Comment = mongoose.model('Comment', comment)

    const product = new Schema({
        name: {type: String, required: true},
        price: {type: Number, required: true},
        desc: String,
        comments: [{type: Object, ref: 'Commment'}],
        stars: Number,
        thumbnailUrl: {type: String, required: true},
        imageUrl: {type: String, required: true}
    })
    const Product = mongoose.model('Product', product);

    const contact = new Schema({
        name: {type: String, required: true},
        phone: {type: String, required: true},
        email: String
    })
    const Contact = mongoose.model('Contact', contact);

    return {
        Slide: Slide,
        Table: Table,
        Product: Product,
        Contact: Contact
    };

}
