import { baseReq } from '@/services';

/**
 * 获取列表
 */
export const getList = (id) => {
  return baseReq.connection('get', `/course/list_course_student_teacher/${id}`);
};