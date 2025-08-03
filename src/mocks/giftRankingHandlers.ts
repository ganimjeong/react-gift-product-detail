import { rest } from 'msw';
import { mockGiftRanking } from './mock'; 

export const giftRankingHandlers = [
  rest.get('/api/gift-rankings', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ data: mockGiftRanking }) 
    );
  }),
];
