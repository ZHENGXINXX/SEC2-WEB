import { baseReq } from '@/services';

/**
 *注册
 */
export const regist = (data) => {
  return baseReq.connection('post', '/account/insert', data);
};