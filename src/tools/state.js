import { sessionDb } from './storage.js';

/**
 * 用户登录状态
 */
export default class State {
    defaultState = {
        version: '0.1.0'
    };

    static get isLogin() {
        return !!sessionDb.get('user.login');
    }

    static get userInfo() {
        return sessionDb.get('user.info') || {};
    }

    static get isTeacher() {
        const role = sessionDb.get('user.role');
        return role === 1;
    }

    static get isStudent() {
        const role = sessionDb.get('user.role');
        return role === 2;
    }

    static setUserRole(role) {
        sessionDb.set('user.role', role);
    }

    static get userRole() {
        return sessionDb.get('user.role') || {};
    }

    static login(userInfo) {
        sessionDb.set('user.login', true);
        sessionDb.set('user.role', userInfo.role);
        sessionDb.set('user.info', userInfo);
    }

    static logout() {
        sessionDb.clear();
    }

    static switch(data) {
        sessionDb.set('user.switch', data);
    }
}
