import { Schema, model, models, Document, ObjectId } from 'mongoose';

export type CategoryKey = string;

export interface ICategory {
  _id?: any;
  name: string;
  sizes: string[];
  prev: CategoryKey | null;
  next: CategoryKey[];
  createdAt?: any;
  updatedAt?: any;
}

export const CategoryInitialState: ICategory = {
  name: null,
  sizes: [],
  prev: null,
  next: [],
  createdAt: null,
  updatedAt: null
};

export const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  sizes: [{ type: String }],
  prev: { type: String },
  next: [{ type: String }],
  createdAt: { type: Date },
  updatedAt: { type: Date }
});

export default models.Category || model<ICategory>('Category', CategorySchema);
