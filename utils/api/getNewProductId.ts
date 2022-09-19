import connectDb from 'utils/connectDb';
import Product from 'models/Product';

const getNewProductId = async (): Promise<number> => {
  await connectDb();
  const last = await Product.collection.aggregate([
    { $project: { "_id": 1 } },
    { $sort: { "_id": -1 } },
    { $limit: 1 }
  ]).next();

  if (last && last._id) return last._id + 1;

  return await Product.collection.countDocuments() + 1;
};

export default getNewProductId;
