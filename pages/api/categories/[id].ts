import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from 'utils/connectDb';
import Category from 'models/Category';

connectDb();

export default async function handler({ query }: NextApiRequest, res: NextApiResponse) {
  const { id } = query;

  if (!id) var result = await Category.collection.find({ prev: null }).toArray();
  else  var result = await Category.collection.find({ prev: Number(id) }).toArray();

  res.status(200).json(result);
}
