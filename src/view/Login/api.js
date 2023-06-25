import { baseReq } from '@/services';


/**
 * 登录
 */
export const login = (data) =>{
  return baseReq.connection('post','/login/login',data);
};