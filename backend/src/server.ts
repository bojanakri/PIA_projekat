import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import delegat from './model/delegat';
import organizator from './model/organizator';
import vodja from './model/vodja';
import sport from './model/sport';
import sportista from './model/sportista';
import format from './model/format';
import takmicenje from './model/takmicenje';
import drzava from './model/drzava';


const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/projekat_septembar');

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('mongo open');
})
const router = express.Router();


router.route('/login').post(
    (req, res)=>{
        let korime = req.body.korime;
        let lozinka = req.body.lozinka;
        let tip = req.body.tip;
        if (tip == "organizator"){
            organizator.find({"korime":korime, "lozinka":lozinka}, (err,organizator)=>{
                if(err) console.log(err);
                else res.json(organizator);
            })
        }
        else if(tip == "delegat"){
            delegat.find({"korime":korime, "lozinka":lozinka}, (err,delegat)=>{
                if(err) console.log(err);
                else res.json(delegat);
            })
        }
        else if(tip == "vodja"){
            vodja.find({"korime":korime, "lozinka":lozinka}, (err,vodja)=>{
                if(err) console.log(err);
                else res.json(vodja);
            })
        }
    }
);

router.route('/dohvatiDelegata').post((req, res)=>{
    let kor_ime = req.body.kor_ime;

    delegat.findOne({"korime":kor_ime}, (err, delegat)=>{
        if(err) console.log(err);
        else res.json(delegat);
    })
});

router.route('/dohvatiVodju').post((req, res)=>{
    let kor_ime = req.body.kor_ime;

    vodja.findOne({"korime":kor_ime}, (err, vodja)=>{
        if(err) console.log(err);
        else res.json(vodja);
    })
});

router.route('/dohvatiVodjuZemlje').post((req, res)=>{
    let zemlja = req.body.zemlja;

    vodja.findOne({"zemlja":zemlja}, (err, vodja)=>{
        if(err) console.log(err);
        else res.json(vodja);
    })
});


router.route('/proveriMailDelegata').post((req, res)=>{
    let email = req.body.email;

    delegat.findOne({"email":email}, (err, delegat)=>{
        if(err) console.log(err);
        else res.json(delegat);
    })
});

router.route('/proveriMailVodje').post((req, res)=>{
    let email = req.body.email;

    vodja.findOne({"email":email}, (err, vodja)=>{
        if(err) console.log(err);
        else res.json(vodja);
    })
});

router.route('/registerD').post((req,res)=>{
    let u = new delegat(req.body);
    u.save().then(u=>{
        res.status(200).json({'delegat':'ok'});
    }).catch(err=>{
        res.status(400).json({'delegat':'no'});
    })
});

router.route('/registerV').post((req,res)=>{
    let u = new vodja(req.body);
    u.save().then(u=>{
        res.status(200).json({'vodja':'ok'});
    }).catch(err=>{
        res.status(400).json({'vodja':'no'});
    })
});

router.route('/dohvatiSveSportove').get((req, res)=>{
    sport.find({}, (err, sportovi)=>{
        if(err) console.log(err);
        else res.json(sportovi);
    })
});

router.route('/dodajSportDisciplinu').post((req, res)=>{
    let nazivSporta = req.body.nazivSporta;
    let nazivDiscipline = req.body.nazivDiscipline;
    let boo = true;
    sport.collection.updateOne({"sport":nazivSporta, "disciplina.naziv":nazivDiscipline}, {$set: {"disciplina.$.unesen": boo}});
    res.json({poruka: 1});
});

router.route('/dohvatiIndividualneSportove').get((req, res)=>{
    sport.find({"disciplina.vrsta" : "individualni"}, (err, individualniSportovi)=>{
        if(err) console.log(err);
        else res.json(individualniSportovi);
    })
});

router.route('/unesiTakmicara').post((req,res)=>{

    let u = new sportista(req.body);
    u.save().then(u=>{
        res.status(200).json({'sportista':'ok'});
    }).catch(err=>{
        res.status(400).json({'sportista':'no'});
    });
  
});

router.route('/dohvatiSportistu').post((req, res)=>{
    let ime = req.body.ime;
    let prezime = req.body.prezime;

    sportista.findOne({"ime":ime, "prezime":prezime}, (err, sportista)=>{
        if(err) console.log(err);
        else res.json(sportista);
    })
});

router.route('/dodajDisciplinu').post((req, res)=>{
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let disciplina = req.body.disciplina;

    let nazivDiscipline={
        naziv: disciplina
    }
    sportista.collection.updateOne({"ime":ime, "prezime":prezime}, {$push: {"disciplina": nazivDiscipline}});
});


router.route('/dohvatiSveSportiste').get((req, res)=>{
    sportista.find({}, (err, sportisti)=>{
        if(err) console.log(err);
        else res.json(sportisti);
    })
});

router.route('/dohvatiSveDelegate').get((req, res)=>{
    delegat.find({}, (err, delegati)=>{
        if(err) console.log(err);
        else res.json(delegati);
    })
});
router.route('/dohvatiDelegateNaCekanju').get((req, res)=>{
    delegat.find({"odobren":false}, (err, delegati)=>{
        if(err) console.log(err);
        else res.json(delegati);
    })
});
router.route('/dohvatiVodjeNaCekanju').get((req, res)=>{
    vodja.find({"odobren":false}, (err, vodje)=>{
        if(err) console.log(err);
        else res.json(vodje);
    })
});

router.route('/dohvatiFormat').post((req, res)=>{
    let disciplina = req.body.disciplina;
    format.findOne({"disciplina":disciplina}, (err, format)=>{
        if(err) console.log(err);
        else res.json(format);
    })
});


router.route('/unesiTakmicenje').post((req, res)=>{

    let f = new takmicenje(req.body);
    f.save().then(f=>{
        res.status(200).json({'takmicenje':'ok'});
    }).catch(err=>{
        res.status(400).json({'takmicenje':'no'});
    })

});

router.route('/dohvatiSveZemlje').get((req, res)=>{
    drzava.find({}, (err, drzave)=>{
        if(err) console.log(err);
        else res.json(drzave);
    })
});
router.route('/dohvatiSportisteIzZemlje').post((req, res)=>{
    let zemlja = req.body.zemlja;
    sportista.find({"zemlja":zemlja}, (err, sportisti)=>{
        if(err) console.log(err);
        else res.json(sportisti);
    })
});


router.route('/pretraziSportisteZemljaSport').post((req, res)=>{
    let zemlja = req.body.zemlja;
    let sport = req.body.sport;
    sportista.find({"zemlja":zemlja, "sport":sport}, (err, sportisti)=>{
        if(err) console.log(err);
        else res.json(sportisti);
    })
});

router.route('/pretraziSportisteSport').post((req, res)=>{
    let sport = req.body.sport;
    sportista.find({"sport":sport}, (err, sportisti)=>{
        if(err) console.log(err);
        else res.json(sportisti);
    })
});

router.route('/pretraziSportisteImeSport').post((req, res)=>{
    let ime = req.body.ime;
    let prezime  =req.body.prezime;
    let sport = req.body.sport;
    sportista.find({"sport":sport, "ime":ime, "prezime":prezime}, (err, sportisti)=>{
        if(err) console.log(err);
        else res.json(sportisti);
    })
});

router.route('/pretraziSportisteIme').post((req, res)=>{
    let ime = req.body.ime;
    let prezime  =req.body.prezime;
    sportista.find({"ime":ime, "prezime":prezime}, (err, sportisti)=>{
        if(err) console.log(err);
        else res.json(sportisti);
    })
});
router.route('/pretraziSportisteImeZemljaSport').post((req, res)=>{
    let ime = req.body.ime;
    let prezime  =req.body.prezime;
    let zemlja = req.body.zemlja;
    let sport = req.body.sport;
    sportista.find({"sport":sport, "ime":ime, "prezime":prezime, "zemlja":zemlja}, (err, sportisti)=>{
        if(err) console.log(err);
        else res.json(sportisti);
    })
});
router.route('/pretraziSportisteImeZemlja').post((req, res)=>{
    let ime = req.body.ime;
    let prezime  =req.body.prezime;
    let zemlja = req.body.zemlja;
    sportista.find({"ime":ime, "prezime":prezime, "zemlja":zemlja}, (err, sportisti)=>{
        if(err) console.log(err);
        else res.json(sportisti);
    })
});

router.route('/dohvatiTakmicenje').post((req, res)=>{
    let disciplina = req.body.disciplina;
    let pol = req.body.pol;
    takmicenje.findOne({"disciplina":disciplina, "pol":pol}, (err, takmicenje)=>{
        if(err) console.log(err);
        else res.json(takmicenje);
    })
});

router.route('/dodajDelegata').post((req, res)=>{
    let korime = req.body.korime;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let zemlja = req.body.zemlja;
    delegat.collection.updateOne({"korime":korime, "ime":ime, "prezime":prezime, "zemlja":zemlja}, {$set: {"odobren": true}});
    res.json({poruka: 1});
});
router.route('/dodajVodju').post((req, res)=>{
    let korime = req.body.korime;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let zemlja = req.body.zemlja;
    vodja.collection.updateOne({"korime":korime, "ime":ime, "prezime":prezime, "zemlja":zemlja}, {$set: {"odobren": true}});
    res.json({poruka: 1});
});

router.route('/dohvatiSvaTakmicenjaZaRaspored').get((req, res)=>{
    takmicenje.find({"unetRaspored":false}, (err, takmicenja)=>{
        if(err) console.log(err);
        else res.json(takmicenja);
    })
});

router.route('/unesiIzabraneSportisteRaspored').post((req, res)=>{
    let izabraniSportisti = req.body.izabraniSportisti;
    let datumTakmicenja = req.body.datumTakmicenja;
    let vremeTakmicenja = req.body.vremeTakmicenja;
    let disciplina = req.body.disciplina;
    
   takmicenje.collection.updateOne({"disciplina":disciplina}, {$set: {"izabraniSportisti": izabraniSportisti, "vremeTakmicenja":vremeTakmicenja, "datumTakmicenja":datumTakmicenja, "unetRaspored": true}});
  
    res.json({poruka: 1});
});

router.route('/dohvatiSvaTakmicenjaZaRezultat').get((req, res)=>{
    takmicenje.find({"unetRaspored":true, "unetRezultat":false}, (err, takmicenja)=>{
        if(err) console.log(err);
        else res.json(takmicenja);
    })
});

router.route('/uvecajZlatne').post((req, res)=>{
    let zemlja = req.body.zemlja;
    drzava.collection.updateOne({"naziv":zemlja}, {$inc: {"zlato": 1}});
    res.json({poruka: 1});
});


router.route('/unesiRezTakmicenja').post((req, res)=>{
    let disciplina = req.body.disciplina;
    takmicenje.collection.updateOne({"disciplina":disciplina}, {$set: {"unetRezultat": true}});
    res.json({poruka: 1});
});


router.route('/uvecajSrebrne').post((req, res)=>{
    let zemlja = req.body.zemlja;
    drzava.collection.updateOne({"naziv":zemlja}, {$inc: {"srebro": 1}});
    res.json({poruka: 1});
});

router.route('/uvecajBronzane').post((req, res)=>{
    let zemlja = req.body.zemlja;
    console.log(zemlja);
    
    drzava.collection.updateOne({"naziv":zemlja}, {$inc: {"bronza": 1}});
    res.json({poruka: 1});
});

router.route('/povecajBrojTakmicenjaDelegatu').post((req, res)=>{
    let korime = req.body.korime;
    
    delegat.collection.updateOne({"korime":korime}, {$inc: {"brojTakmicenja": 1}});
    res.json({poruka: 1});
});


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
