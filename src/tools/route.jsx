import React from 'react';
import routeList from '@/router';
import { Route } from 'react-router-dom';
// import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem';

// 权限路由的相关封装还可以优化(这坨屎还可以优化^_^)
export function getRouters(permission) {
    let res = [];
    for (let i = 0; i < permission.length; i++) {
        if (permission[i].selected) {
            for (let j = 0; j < routeList.length; j++) {
                if (permission[i].path === routeList[j].path) {
                    res.push(routeList[j]);
                }
            }
        } else if (permission[i].children && permission[i].children.length) {
            let children = [];
            for (let j = 0; j < permission[i].children.length; j++) {
                if (permission[i].children[j].selected) {
                    children.hidden = true;
                    children.push(routeList[i].children.find(item =>
                        item.label === permission[i].children[j].name
                    ));
                }
            }
            if (children.length) {
                routeList[i].children = children;
                res.push(routeList[i]);
            }
        }
    }
    return res;
}

/**
 * 根据路由表渲染路由
 * @param {Array} childRoutes 
 * @returns 
 */
export const renderRouters = (childRoutes) => {
    return childRoutes.map((route, index) => {
        if (route.children !== undefined &&
            route.children.length > 0) {
            return renderRouters(route.children);
        }
        delete route.children;
        return <Route key={index} {...route} element={<route.component />} />;
    });
};
