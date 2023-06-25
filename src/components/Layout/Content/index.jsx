import React from 'react';
 import { Routes, Route, Navigate } from 'react-router-dom';
 import { renderRouters } from '@/tools/route';
import css from './index.module.less';
import routerList from '@/router';

export default function Content() {
    
    return (
        <div className={css['app-content']}>
            <React.Suspense fallback={<></>}>
                <Routes>
                    {renderRouters(routerList)}
                    <Route path="/" element={<Navigate to="/main" replace={true} />} />
                </Routes>
            </React.Suspense>
        </div>
    );
}
