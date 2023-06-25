import { baseReq } from '@/services';

/**
 * 获取作业详情
 */
export const test = (id=41) =>{
  return baseReq.connection('get',`/task/task_detail/${id}`);
};