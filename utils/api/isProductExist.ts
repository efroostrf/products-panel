import Product from 'models/Product';

const isProductExist = async (id: number): Promise<boolean> => {
  var product = await Product.collection.findOne({ _id: id });

  if (product) return true;
  return false;
};

export default isProductExist;
