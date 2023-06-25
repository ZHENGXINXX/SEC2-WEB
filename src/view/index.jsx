import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '@/components/Layout';
import Login from '@/view/Login';
import Register from './Register';

export default function index() {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/*' element={<AppLayout />} />
		</Routes>
	);
}
