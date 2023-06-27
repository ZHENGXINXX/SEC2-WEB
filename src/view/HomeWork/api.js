import { baseReq } from '@/services';

/**
 * 作业详情
 */
export const detail = (id) =>{
  return baseReq.connection('get',`/task/task_detail/${id}`);
};

/**
 * 作业下载
 */
export const download = (id)=>{
  return baseReq.connection('get',`/task/task_attachments/${id}`);
};