import Category, { ICategory } from 'models/Category';

const getNextOfCategory = async (id: number): Promise<number[]> => {
  const category = await Category.collection.findOne<ICategory>({ _id: id });
  
  if (category && category.next) return category.next.map((item) => Number(item));
  return [];
};

export default getNextOfCategory;
