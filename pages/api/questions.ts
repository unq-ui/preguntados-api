// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import questionsData from '../../data/questions';
import { createQuestion } from '../../data/utils';
import { ErrorMessage, Question, Difficulty } from '../../types/types';

export default function handler( req: NextApiRequest, res: NextApiResponse<Question[] | ErrorMessage> ) {
  if (req.method === 'GET') {
    const selectedDifficulty = Object.values(Difficulty).find(difficulty => difficulty === req.query.difficulty) || Difficulty.EASY;
    res
      .status(200)
      .json(
        questionsData
          .filter((question) => question.difficulty === selectedDifficulty)
          .map(createQuestion)
          .sort(() => 0.5 - Math.random())
      );    
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }  
}
