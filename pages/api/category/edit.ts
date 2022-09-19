import Category, { ICategory } from 'models/Category';
import { NextApiRequest, NextApiResponse } from 'next';
import isCategoryExist from 'utils/api/isCategoryExist';

export default async function handler({ method, body }: NextApiRequest, res: NextApiResponse) {
  var category: ICategory = body;
  if (method !== 'PUT') return res.status(400).json({
    error: 'Use PUT method'
  });

  if (!await isCategoryExist(category._id)) return res.status(404).json({
    error: `Category with id ${category._id} not found`
  });

  const initial: ICategory = await Category.collection.findOne<ICategory>({ _id: category._id });

  category = Object.assign(initial, category);
  
  try {
    await Category.collection.findOneAndUpdate({ _id: category._id }, {
      $set: {
        name: category.name,
        sizes: Array.isArray(category.sizes) ? category.sizes : initial.sizes,
        updatedAt: new Date()
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.status(200).json({
    result: true
  });
}
