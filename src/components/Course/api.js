import { baseReq } from '@/services';

/**
 * 修改置顶学生
 * @param {*} data 
 * @returns 
 */
export const changeStudent = (data) => {
  return baseReq.connection('post', '/studentCourse/change_topping', data);
};

/**
 * 修改置顶老师
 * @param {*} data 
 * @returns 
 */
export const changeTeacher = (data) => {
  return baseReq.connection('post', '/teacherCourse/change_topping', data);
};

/**
 * 归档学生
 * @param {*} data 
 * @returns 
 */
export const pigeStudet = (data) =>{
  return baseReq.connection('post','/studentCourse/student_course_file',data);
};

/**
 * 归档老师
 * @param {*} data 
 * @returns 
 */
export const pigeTeacher = (data) =>{
  return baseReq.connection('post','/teacherCourse/teacher_course_file',data);
};

/**
 * 退课
 * @param {*} data 
 * @returns 
 */
export const studentDelete = (id) =>{
  return baseReq.connection('delete',`/studentCourse/delete/${id}`);
};

/**
 * 删除课程
 * @param {*} data 
 * @returns 
 */
export const teacherDelete = (id) =>{
  return baseReq.connection('delete',`/course/delete/${id}`);
};