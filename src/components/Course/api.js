import { baseReq } from '@/services';

export const changeStudent = (data) => {
  return baseReq.connection('post', '/studentCourse/change_topping', data);
};

export const changeTeacher = (data) => {
  return baseReq.connection('post', '/teacherCourse/change_topping', data);
};

export const pigeStudet = (data) =>{
  return baseReq.connection('post','/studentCourse/student_course_file',data);
};

export const pigeTeacher = (data) =>{
  return baseReq.connection('post','/teacherCourse/teacher_course_file',data);
};