import { baseReq } from '@/services';

/**
 * 获取作业详情
 */
export const getCourse = (id) =>{
  return baseReq.connection('get',`course/course_detail/${id}`);
};