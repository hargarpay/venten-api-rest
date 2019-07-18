import debug from 'debug';
import {
  expectObj, responseData, getResponseData, throwError,
} from '../helper';
import BaseModel from '../model/model';
import { makeValidation } from '../helper/validator';

const productDebug = debug('automart:product');

const productExistFilterConfig = accepted => ({
  name: {
    column: 'name', operator: '=', value: accepted.name, logic: 'AND',
  },
  description: {
    column: 'description', operator: '=', value: accepted.description, logic: 'AND',
  },
  price: {
    column: 'price', operator: '=', value: accepted.price, logic: 'AND',
  },
  color: {
    column: 'color', operator: '=', value: accepted.color, logic: 'AND',
  },
  category: {
    column: 'category', operator: '=', value: accepted.category, logic: '',
  },
});


export const create = async (req, res) => {
  const { body } = req;

  const fillable = ['name', 'description', 'price', 'category', 'image', 'color'];

  const { status, message, accepted } = expectObj(body, fillable);

  if (status) return responseData(res, false, 422, message);

  const db = new BaseModel('products');

  const rules = {
    name: ['required', 'min_length:3'],
    description: ['required', 'min_length:10'],
    price: ['required', 'is_numeric'],
    category: ['required'],
    image: ['required'],
    color: ['required'],
  };

  try {
    makeValidation(body, rules);

    const record = await db.findByFilter(productExistFilterConfig(accepted));
    if (record.rows.length > 0) throwError(422, `Product with ${accepted.name} name, ${accepted.description} description, ${accepted.price} price,  ${accepted.color} color , ${accepted.category} category and has already been created by seller`);

    // Store data to database and get the ID
    const product = await db.save(accepted, fillable);

    return responseData(res, true, 201, product);
  } catch (error) {
    const { success, code, msg } = getResponseData(error, productDebug, 'Error creating product');
    return responseData(res, success, code, msg);
  } finally {
    db.db.end();
  }
};

export const getProducts = async (req, res) => {
  const db = new BaseModel('products');
  try {
    const { rows } = await db.findAll(['id', 'name', 'price']);
    return responseData(res, true, 200, rows);
  } catch (e) {
    productDebug(e);
    return responseData(res, false, 500, 'Error Fetching all products');
  } finally {
    db.db.end();
  }
};
export const getProductById = async (req, res) => {
  const { params } = req;
  const productId = parseInt(params.id, 10);
  const db = new BaseModel('products');
  try {
    const product = await db.findById(productId, ['name', 'description', 'price', 'category', 'image', 'color']);

    if (product.rows.length === 0) throwError(404, 'Product not found');

    const [record] = product.rows;

    return responseData(res, true, 200, record);
  } catch (error) {
    const { success, code, msg } = getResponseData(error, productDebug, 'Error creating product');
    return responseData(res, success, code, msg);
  } finally {
    db.db.end();
  }
};
