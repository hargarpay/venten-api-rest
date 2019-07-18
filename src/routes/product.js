import express from 'express';
import { getProducts, getProductById, create } from '../controllers/product';

const router = express.Router();

router.post('/product', create);

router.get('/products', getProducts);

router.get('/product/:id', getProductById);

export default router;
