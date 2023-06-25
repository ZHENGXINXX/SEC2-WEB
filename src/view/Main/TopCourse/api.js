import { baseReq } from '@/services';

/**
 * 创建课程
 * @returns 
 */
export const create = (data) => {
  return baseReq.connection('post', `/course/insert`, data);
};


/**
 * 加入课程
 * @returns 
 */
export const add = (data) =>{
  return baseReq.connection('post','studentCourse/insert',data);
};