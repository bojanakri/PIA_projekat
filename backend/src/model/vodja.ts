import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Vodja = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    korime: {
        type: String
    },
    lozinka: {
        type: String
    },
    tip:{
        type: String
    },
    zemlja:{
        type: String
    },
    email: {
        type: String
    },
    odobren: {
        type: Boolean
    }
});

export default mongoose.model('Vodja', Vodja, 'vodja');