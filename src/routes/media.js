import express from 'express';
import { media, getImages } from '../controllers/media';


const router = express.Router();

router.get('/media', getImages);

router.post('/media', media);


export default router;
