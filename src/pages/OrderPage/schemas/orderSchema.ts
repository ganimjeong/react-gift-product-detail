import { z } from 'zod';

export const OrderFormSchema = z.object({
  senderName: z.string().min(1, '보내는 사람 이름을 입력해 주세요'),
  receiverName: z.string().min(1, '받는 사람 이름을 입력해 주세요'),
  receiverPhone: z.string().regex(/^010\d{8}$/, '전화번호는 01012341234 형식이어야 해요'),
  quantity: z.number().min(1, '수량은 1개 이상이어야 해요'),
  message: z.string().min(1, '메시지를 입력해 주세요'),
});
