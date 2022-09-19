import Category from 'models/Category';

const isCategoryExist = async (id: number): Promise<boolean> => {
  var category = await Category.collection.findOne({ _id: id });

  if (category) return true;
  return false;
};

export default isCategoryExist;
