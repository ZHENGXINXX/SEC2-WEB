import { baseReq } from '@/services';

/**
 * 作业下载
 */
export const detail = (id=56) =>{
  return baseReq.connection('get',`/task/task_detail/${id}`);
};