import { baseReq } from '@/services';

/**
 * 获取详情
 */
export const detail = (id) => {
  return baseReq.connection('get', `/account/detail/${id}`);
};

/**
 * 修改基本信息
 * @param {*} data 
 * @returns 
 */
export const update = (data) => {
  return baseReq.connection('post', '/account/update', data);
};

/**
 * 修改密码
 * @param {*} data 
 * @returns 
 */
export const changePassword = (data) => {
  return baseReq.connection('post', '/account/changePassword', data);
};