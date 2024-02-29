import mongoose from 'mongoose';
//modeli koji su potrebni
import Object from '../mongodb/models/object.js';
import User from '../mongodb/models/user.js';

import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

//biblioteka dotenv učitava .env fajl
dotenv.config();

//loudinary.config() koja prihvata tri parametra  Ovi parametri se prosleđuju iz .env fajla preko process.env,
//aplikacija može da koristi Cloudinary API za preuzimanje, otpremanje i manipulisanje slikama
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})



const getAllObjects = async (req, res) => {
    //parametri za filtriranje podataka,ograničavanje broja povratnih podataka i sortiranje podataka
    const { _end, _order, _start, _sort, title_like = "", objectType = ""} = req.query;

    //kasnije se koristi za definisanje različitih parametara za pretraživanje baze podataka
    const query = {};

    //proverava se "objectType" iz zahteva i ako je definisan, dodaje se u "query" objekat kao parametar
    if(objectType !== ""){
        query.objectType = objectType;
    }

    // Pronađeni objekti se dodaju u "query" objekat
    if(title_like){
        query.title = {$regex: title_like, $options: 'i' };
    }

    try {
        //countDocuments funkcija da bi se izbrojao broj pronađenih koncerata pre slanja upita bazi podataka
        const count = await Object.countDocuments({query});

        //vracaju se objekti na osnovu zahteva,ogranicenje broja rezultata i da li ima preskakanje, i sortiranje
        const objects = await Object
            .find(query)
            .limit(_end)
            .skip(_start)
            .sort({[_sort]: _order})

        // uključuje se informacija o ukupnom broju pronađenih koncerata
        res.header('x-total-count', count);
        //Vezano za CORS politiku! Dozvoljava klijentskoj pristup x-total-count, tj.
        // informaciji o ukupnom broju podataka sto je korisno za paginaciju!
        res.header('Access-Control-Expose-Headers', 'x-total-count');
        //sve pronađene objekti se šalju kao JSON odgovor klijentskoj aplikaciji.
        res.status(200).json(objects);
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
};

const getObjectDetails = async (req, res) => {
    //iz parametara zahteva se izdvaja id
    const { id } = req.params;
    //da se nadje taj objekat sa tim id-em
    const objectExists = await Object.findOne({
        _id: id
    }).populate('creator',); //da se prikaze i kreator objekta

    //salje odgovor sa detaljima objekta
    if(objectExists) { res.status(200).json(objectExists) 
    }else{
        res.status(404).json({ message: 'Object not found'});
    }
};

const createObject = async (req, res) => {

    try {
        //req.body sadrži parametre za kreiranje objekta koje je korisnik poslao preko HTTP zahteva.
        const {title, description, objectType, location, price, photo, email} = req.body;

    //zapocinje se nova transakcija u bazi podataka
    const session = await mongoose.startSession();
    session.startTransaction();

    //pronađe korisnika na osnovu njihove adrese e-pošte
    const user = await User.findOne({ email }).session(session);

    if(!user) throw new Error('User not found');

    //servis da bi se slika objekta postavila na mrežu i dobila javni URL.
    const photoUrl = await cloudinary.uploader.upload(photo);

    //novu instanca Object modela, koja se zatim dodaje u bazu podataka. 
    const newObject = await Object.create({
        title,
        description,
        objectType,
        location,
        price,
        photo: photoUrl.url,
        creator: user._id
    });
    // ID novog objekta u listu svih koncerata korisnika. Zatim se ovo ažuriranje čuva u bazi podataka.
    user.allObjects.push(newObject._id);
    await user.save({ session });

    //izvrsava transakciju, promene tokom transakcije se potvrđuju.
    await session.commitTransaction();

    res.status(200).json({ message: 'Object created succesfully'}) 

    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
   

};
//editovanje objekta
const updateObject = async (req, res) => {
    try {
        //koji se menja
        const {id} = req.params;
        //req.body sadrži parametre za kreiranje objeata koje je korisnik poslao preko HTTP zahteva.
        const {title, description, objectType, location, price, photo} = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Object.findByIdAndUpdate({_id: id}, {
            title,
            description,
            objectType,
            location,
            price,
            photo: photoUrl.url || photo

        })

        res.status(200).json({message: 'Object updated successfully'})

    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
};


//brisanje objekta
const deleteObject = async (req, res) => {
    try {
        //koji objekat se brise
        const { id } = req.params;

        //koristi za pronalaženje objekta u bazi
        const objectToDelete = await Object.findById({
            _id: id
        }).populate('creator'); //učitali podaci korisnika koji je kreirao objekat

        if(!objectToDelete) throw new Error('Object not found'); //ako ne postoji

        //zapocinje se nova transakcija u bazi podataka
        const session = await mongoose.startSession();
        session.startTransaction();

        //Uklanjanje objekta iz baze podataka koristeći remove funkciju 
        objectToDelete.remove({session});
        //uklanja referenca na objekat kod korisnika sa pull funkcijom
        objectToDelete.creator.allObjects.pull(objectToDelete);

        //Ažuriranje korisničkog objekta u bazi podataka kako bi se uklonila referenca
        await objectToDelete.creator.save({session});
        await session.commitTransaction();

        res.status(200).json({message: 'Object deleted successfully'});

    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export {
    getAllObjects,
    getObjectDetails,
    createObject,
    updateObject,
    deleteObject,
}