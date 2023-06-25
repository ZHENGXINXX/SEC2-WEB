import React, { } from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Content from './Content';
import State from '@/tools/state';
import { Navigate, Route, Routes } from 'react-router-dom';
import './index.less';
import css from './index.module.less';

export default function AppLayout() {

    if (!State.isLogin) {
        return (<Routes>
            <Route path='*' element={<Navigate to='/login'></Navigate>} />
        </Routes>);
    }

    return (
        // <Watermark content='王磊传媒学院'>
        <Layout className={css.app_layout}>
            <Layout.Header>
                <Header />
            </Layout.Header>

            <Layout.Content className={css.content}>
                <Content />
            </Layout.Content>
        </Layout>
        // </Watermark>
    );
}
