import connectDb from 'utils/connectDb';
import { NextApiRequest, NextApiResponse } from 'next';
import isProductExist from 'utils/api/isProductExist';
import Product from 'models/Product';

async function removeProducts(products: number[]) {
  var ids = [];
  products.map((id) => ids.push({ "_id": id }));

  await Product.collection.deleteMany({
    $or: ids
  });
}

export default async function handler({ method, body }: NextApiRequest, res: NextApiResponse) {
  if (method !== 'DELETE') return res.status(400).json({
    error: 'Use DELETE method'
  });

  await connectDb();
  try {
    if (!Array.isArray(body)) {
      const _id: number = Number(body._id);

      if (!_id) return res.status(400).json({
        error: 'Please, enter product id'
      });

      if (!await isProductExist(_id)) return res.status(404).json({
        error: `Product with id ${_id} not found`
      });
      
      await Product.collection.findOneAndDelete({ _id: _id });
    }
    else {
      if (body.length === 0) return res.status(400).json({
        error: `If you want to delete few products specify their IDs in an array`
      });

      await removeProducts(body.map((item) => Number(item)));
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.status(200).json({
    result: true,
    _id: Array.isArray(body)
         ? [body.map(({ _id }) => _id)]
         : [body._id]
  });
}