import Category from 'models/Category';
import connectDb from 'utils/connectDb';

const getNewCategoryId = async (): Promise<number> => {
  await connectDb();
  const last = await Category.collection.aggregate([
    { $project: { "_id": 1 } },
    { $sort: { "_id": -1 } },
    { $limit: 1 }
  ]).next();

  if (last && last._id) return last._id + 1;

  return await Category.collection.countDocuments() + 1;
};

export default getNewCategoryId;
