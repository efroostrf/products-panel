import { Schema, model, models } from 'mongoose';

interface Source {
  data: string;
  contentType: string;
}

export interface IProduct {
  _id?: any;
  id?: any;
  name: string;
  barcode: number | null;
  category: number;
  src?: Source;
  srcURL?: string;
  createdAt?: any;
  updatedAt?: any;
}

export const ProductInitialState: IProduct = {
  name: '',
  barcode: null,
  category: 0,
  src: null,
  srcURL: null,
  createdAt: null,
  updatedAt: null
};

export const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Please, enter product name'],
    trim: true
  },
  barcode: {
    type: Number,
    required: [true, 'Please, enter product barcode']
  },
  category: {
    type: Number,
    required: [true, `You can't create product without category`]
  },
  src: { data: Buffer, contentType: String },
  srcURL: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date }
});

export default models.Product || model<IProduct>('Product', ProductSchema);
