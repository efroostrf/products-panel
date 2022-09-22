import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from 'utils/connectDb';
import Product, { IProduct, ProductInitialState } from 'models/Product';
import getNewProductId from 'utils/api/getNewProductId';

export default async function handler({ method, body }: NextApiRequest, res: NextApiResponse) {
  if (method !== 'POST') return res.status(400).json({ error: 'Use POST method' });
  
  await connectDb();

  const product: IProduct = Object.assign(ProductInitialState, body, {
    _id: await getNewProductId(),
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  try {
    await Product.collection.insertOne(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({
    status: true,
    _id: product._id
  });
}