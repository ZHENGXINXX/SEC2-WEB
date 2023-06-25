import { baseReq } from '@/services';

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

/**
 * 
 * 教师归档
 * @returns 
 */
export const teacherPiges = (id) => {
  return baseReq.connection('get', `/teacherCourse/teachert_course_file/${id}`);
};

/**
 * 
 * 学生归档
 * @returns 
 */
export const studentPiges = (id) => {
  return baseReq.connection('get', `/studentCourse/student_course_file/${id}`);
};