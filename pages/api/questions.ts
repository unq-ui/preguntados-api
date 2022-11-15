// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import questionsData from '../../data/questions';
import { createQuestion } from '../../data/utils';
import { ErrorMessage, Question, Level } from '../../types/types';

export default function handler( req: NextApiRequest, res: NextApiResponse<Question[] | ErrorMessage> ) {
  if (req.method === 'GET') {
    const selectedLevel = Object.values(Level).find(level => level === req.query.level) || Level.EASY;
    res
      .status(200)
      .json(
        questionsData
          .filter((question) => question.level === selectedLevel)
          .map(createQuestion)
          .sort(() => 0.5 - Math.random())
      );    
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }  
}
