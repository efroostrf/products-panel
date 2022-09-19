import connectDb from 'utils/connectDb';
import Category from 'models/Category';
import Product from 'models/Product';

const deleteCategory = async (id: number) => {
  await connectDb();
  await Category.collection.findOneAndDelete({ _id: id });
  await Product.collection.deleteMany({ category: id });
};

export default deleteCategory;
