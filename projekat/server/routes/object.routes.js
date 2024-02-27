//Uvoz biblioteke Express koja se koristi za upravljanje rutama i zahtevima
import express from 'express';
//funkcije iz kontrolera
import { createObject,deleteObject,getAllObjects,getObjectDetails,updateObject } from '../controllers/object.controller.js';

//Kreiranje novog router objekta koji se koristi za definisanje novih ruta
const router = express.Router();

router.route('/').get(getAllObjects);

router.route('/:id').get(getObjectDetails);

router.route('/').post(createObject);

//za azuriranje samo odredjenih delova
router.route('/:id').patch(updateObject);

router.route('/:id').delete(deleteObject);


export default router;

