import { baseReq } from '@/services';

/** 
 * 老师添加作业不发布
*/
export const addFalse = (data) => {
  return baseReq.connection('post', `/task/insert_not_submit`, data, true);
};

/**
 * 老师添加作业并发布
 */
export const addTrue = (data) => {
  return baseReq.connection('post', `/task/insert_submit`, data, true);
};

/**
 * 获取老师作业
 */
export const getTeaWork = (id) => {
  return baseReq.connection('get', `/task/teacher_task_list/${id}`);
};

/**
 * 获取学生作业
 */
export const getStuWork = (data) => {
  return baseReq.connection('post', '/studentTask/student_task_list', data);
};

/**
 * 获取学生数量
 */
export const getNumber = (id) =>{
  return baseReq.connection('get',`/course/course_detail/${id}`);
};

/**
 * 删除作业未发布
 */
export const delNo = (taskId) =>{
  return baseReq.connection('delete',`/task/delete_not_submit/${taskId}`);
};

/**
 * 删除作业已发布
 */
export const delYes = (taskId) =>{
  return baseReq.connection('delete',`/task/delete_submit/${taskId}`);
};

/**
 * 作业详情
 */
export const detail = (id) =>{
  return baseReq.connection('get',`/task/task_detail/${id}`);
};

/**
 * 发布作业
 */
export const submit = (data) =>{
  return baseReq.connection('post',`/task/submit`,data);
};

/**
 * 
 * 编辑作业
 */
export const edit = (data)=>{
  return baseReq.connection('post','/task/update_task',data,true);
};