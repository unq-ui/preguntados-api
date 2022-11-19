// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import questionsData from '../../data/questions';
import { getKeyValue } from '../../data/utils';
import { Answer, ErrorMessage } from '../../types/types';

function handler(req: NextApiRequest, res: NextApiResponse<Answer | ErrorMessage>) {
  if (req.method === 'POST') {
    const {questionId, option } = req.body;
    if (questionId && option) {
      const question = questionsData.find(question => question._id === questionId);
      if (question) {
        const selectedOption = getKeyValue(question, option);
        if (selectedOption) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res
            .status(200)
            .json({ questionId, answer: question.answer === selectedOption });
        } else {
          res.status(404).json({ error: "Option not found" });
        }
      } else {
        res.status(404).json({ error: "Question not found" });
      }
    } else {
      res.status(404).json({ error: "Body not accepted" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }  
}

type HandlerType = (req: NextApiRequest, res: NextApiResponse<Answer | ErrorMessage>) => void;

const allowCors = (fn: HandlerType) => async (req: NextApiRequest, res: NextApiResponse<Answer | ErrorMessage>) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

export default allowCors(handler);
