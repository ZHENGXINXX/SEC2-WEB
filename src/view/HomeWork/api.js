import { baseReq } from '@/services';

/**
 * 作业详情
 */
export const detail = (id) => {
  return baseReq.connection('get', `/task/task_detail/${id}`);
};

/**
 * 作业下载
 */
export const download = (id) => {
  return baseReq.connection('get', `/task/task_attachments/${id}`);
};

/** 
 * 
 * 提交作业
*/
export const submit = (data) => {
  return baseReq.connection('post', '/studentTask/upload_homework', data, true);
};

/** 
 * 学生查看提交作业详情
*/
export const submitDetail = (id) => {
  return baseReq.connection('get', `/studentTask/student_task_detail/${id}`);
};

/**
 * 学生作业列表
 */
export const getList = (id) => {
  return baseReq.connection('get', `/studentTask/task_student_list/${id}`);
};

/** 
 * 批改作业
*/
export const correct = (data) => {
  return baseReq.connection('post', '/studentTask/homework_correction',data);
};