import { NextApiRequest, NextApiResponse } from 'next';
import createCategory from 'utils/api/createCategory';

export default async function handler({ method, body }: NextApiRequest, res: NextApiResponse) {
  if (method !== 'POST') return res.status(400).json({ error: 'Use POST method' });

  try {
    var id: number = await createCategory(body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({
    status: true,
    _id: body.prev
  });
}
