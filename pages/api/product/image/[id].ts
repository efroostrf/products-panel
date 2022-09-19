import { NextApiRequest, NextApiResponse } from 'next';
import Product, { IProduct } from 'models/Product';
import connectDb from 'utils/connectDb';
import isProductExist from 'utils/api/isProductExist';

const EMPTY_IMAGE: string = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAB7CAAAewgFu0HU+AAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAAATSURBVHjaYvj/6xcjAAAA//8DAAjkAvXYEK42AAAAAElFTkSuQmCC';

export default async function handler({ method, query }: NextApiRequest, res: NextApiResponse) {
  const { id } = query;

  if (method !== 'GET') return res.status(400).json({
    error: 'Use GET method'
  });

  await connectDb();

  if (!await isProductExist(Number(id))) return res.status(404).json({
    error: `Product with id ${id} doesn't exist`
  });

  const product: IProduct = await Product.collection.findOne<IProduct>({ _id: Number(id) });

  if (!product.src) var data: string = EMPTY_IMAGE;
  else var data: string = product.src.data.split(',')[1];

  const buffer: Buffer = Buffer.from(data, 'base64');

  res.writeHead(200, {
    'Content-Type': product.src ? product.src.contentType : 'image/png',
    'Content-Length': buffer.length
  });

  res.end(buffer);
}
