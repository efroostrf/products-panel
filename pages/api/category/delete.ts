import connectDb from 'utils/connectDb';
import { NextApiRequest, NextApiResponse } from 'next';
import Category, { ICategory } from 'models/Category';
import deleteCategory from 'utils/api/deleteCategory';
import getNextOfCategory from 'utils/api/getNextOfCategory';
import isCategoryExist from 'utils/api/isCategoryExist';

interface InitialState {
  id: number | null;
  deleteSubcategories?: boolean;
}

const initialState: InitialState = {
  id: null,
  deleteSubcategories: true
};

export default async function handler({ method, body }: NextApiRequest, res: NextApiResponse) {
  var { _id, deleteSubcategories } = Object.assign(initialState, body);
  _id = Number(_id);

  if (method !== 'DELETE') return res.status(400).json({
    error: 'Use DELETE method'
  });

  if (!_id) return res.status(400).json({ error: 'Please, enter category id' });

  await connectDb();
  if (!await isCategoryExist(_id)) return res.status(404).json({
    error: `Category with id ${_id} not found`
  });

  try {
    var { prev, next } = await Category.collection.findOne<ICategory>({ _id: _id });

    if (deleteSubcategories && next && next.length > 0) {
      for (let id of next) {
        if (!await isCategoryExist(Number(id))) continue;
        await deleteCategory(Number(id));
      }
    }

    await deleteCategory(Number(_id));

    if (prev !== null) {
      let newNextCategories: number[] = await getNextOfCategory(Number(prev));
      if (newNextCategories) await Category.collection.findOneAndUpdate({ _id: Number(prev) }, {
        $set: { next: newNextCategories.filter((item) => item !== _id) }
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message
    });
  }

  res.status(200).json({
    result: true,
    _id: _id
  });
}