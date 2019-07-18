import express from 'express';
import Media from './media';
import Product from './product';

const router = express.Router();
const version = '/';


router.use(version, Product);
router.use(version, Media);

export default router;
