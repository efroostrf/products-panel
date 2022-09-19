import Category from 'models/Category';
import { NextApiRequest, NextApiResponse } from 'next';
import isCategoryExist from 'utils/api/isCategoryExist';

export default async function handler({ query }: NextApiRequest, res: NextApiResponse) {
  const { id } = query;

  if (!await isCategoryExist(Number(id))) return res.status(404).json({
    error: `Category with id ${id} doesn't exist`
  });

  return res.status(200).json(await Category.collection.findOne({ _id: Number(id) }));
}
