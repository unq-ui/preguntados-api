// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { ErrorMessage, Level } from '../../types/types';

export default function handler( req: NextApiRequest, res: NextApiResponse<string[] | ErrorMessage> ) {
  if (req.method === 'GET') {
    res.status(200).json(Object.values(Level));
  } else {
    res.status(405).json({ error: "T_T" });
  }  
}
