import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Drzava = new Schema({
    naziv: {
        type: String
    },
    zastava: {
        type: String
    },
    zlato:{
        type: Number
    },
    srebro:{
        type: Number
    },
    bronza:{
        type: Number
    }
});

export default mongoose.model('Drzava', Drzava, 'drzava');