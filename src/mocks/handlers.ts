import { rest } from 'msw';
import { mockGiftRanking } from './mock';

export const handlers = [
  rest.get('/api/products/ranking', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ data: mockGiftRanking })
    );
  }),
];
