import connectDb from 'utils/connectDb';
import Category, { ICategory } from 'models/Category';
import { CategoryInitialState } from 'models/Category';
import getNewCategoryId from 'utils/api/getNewCategoryId';

const createCategory = async (data: ICategory) => {
  await connectDb();
  const uniqueId: number = await getNewCategoryId();

  data = Object.assign(CategoryInitialState, data, {
    _id: uniqueId,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  if (data.prev !== null) {
    let prev = await Category.collection.findOne({ _id: data.prev });

    if (prev) {
      await Category.collection.findOneAndUpdate({ _id: prev._id }, {
        $set: { next: [...prev.next, data._id] }
      });
    } else {
      data.prev = null;
    }
  }

  await Category.collection.insertOne(data);

  return uniqueId;
};

export default createCategory;
