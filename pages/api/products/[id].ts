import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from 'utils/connectDb';
import Product from 'models/Product';
import Category, { ICategory } from 'models/Category';
import getCategoriesTree from 'utils/api/getCategoriesTree';

connectDb();

export default async function handler({ query }: NextApiRequest, res: NextApiResponse) {
  const { id } = query;
  const dataToResponse = {
    "_id": 1,
    name: 1,
    barcode: 1,
    category: 1,
    createdAt: 1,
    updatedAt: 1
  };  

  var categoriesTree = await getCategoriesTree(Number(id));
  var match = [];

  categoriesTree.map((item) => match.push({ category: Number(item) }));
  match.push({ category: Number(id) });

  if (!id) var result = await Product.collection.aggregate([
    { $project: dataToResponse }
  ]).toArray();
  else {
    if (match.length > 0) var result = await Product.collection.aggregate([
      { $match: { $or: match } },
      { $project: dataToResponse}
    ]).toArray();
    else var result = await Product.collection.aggregate([
      { $match: { category: Number(id) } },
      { $project: dataToResponse}
    ]).toArray();
  }

  for (let item of result) {
    let { name } = await Category.collection.findOne<ICategory>({ _id: Number(item.category) });
    item.categoryName = name;
  }

  res.status(200).json(result);
}
