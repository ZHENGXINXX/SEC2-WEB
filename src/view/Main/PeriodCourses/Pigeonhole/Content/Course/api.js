import { baseReq } from '@/services';

export const pigeStudet = (data) =>{
  return baseReq.connection('post','/studentCourse/student_course_file',data);
};

export const pigeTeacher = (data) =>{
  return baseReq.connection('post','/teacherCourse/teacher_course_file',data);
};