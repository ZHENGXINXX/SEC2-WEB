import { baseReq } from '@/services';

/**
 * 学生课程置顶
 * @returns 
 */
export const studentTop = (id) => {
  return baseReq.connection('get', `/studentCourse/student_course_topping/${id}`);
};

/**
 * 教师课程置顶
 * @returns 
 */
export const teacherTop = (id) => {
  return baseReq.connection('get', `/teacherCourse/teachert_course_topping/${id}`);
};

/**
 * 
 * 学生课程
 * @returns 
 */
export const studentCourse = (id) => {
  return baseReq.connection('get', `/studentCourse/student_course/${id}`);
};

/**
 * 
 * 老师课程
 * @returns 
 */
export const teacherCourse = (id) => {
  return baseReq.connection('get', `/teacherCourse/teachert_course/${id}`);
};