import { NextApiRequest, NextApiResponse } from 'next';
import Product, { IProduct } from 'models/Product';
import isProductExist from 'utils/api/isProductExist';

export default async function handler({ method, body }: NextApiRequest, res: NextApiResponse) {
  var product: IProduct = body;
  if (method !== 'PUT') return res.status(400).json({
    error: 'Use PUT method'
  });

  if (!await isProductExist(product._id)) return res.status(404).json({
    error: `Product with id ${product._id} not found`
  });

  const initial: IProduct = await Product.collection.findOne<IProduct>({ _id: product._id });

  product = Object.assign(initial, product);
  
  try {
    await Product.collection.findOneAndUpdate({ _id: product._id }, {
      $set: {
        name: product.name,
        barcode: product.barcode,
        updatedAt: new Date()
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.status(200).json(product);
}
