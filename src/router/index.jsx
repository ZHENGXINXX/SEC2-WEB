import { lazy } from 'react';

const routerList = [
	{
		path: '/main',
		label: '我的课堂',
		children: [
			{
				path: '/main',
				label: '我的课堂',
				component: lazy(() => import('@/view/Main')),
			},
			{
				path: '/main/userSetting',
				label: '用户设置',
				component: lazy(() => import('@/view/UserSetting')),
			},
			{
				path: '/main/classDetail',
				label: '课程详情',
				component: lazy(() => import('@/view/ClassDetail')),
			}
		]
	},
	{
		path: '/lessonPreparation',
		label: '备课区',
		component: lazy(() => import('@/view/LessonPreparation'))
	},
	{
		path: '/teachingResearch',
		label: '虚拟教师',
		component: lazy(() => import('@/view/TeachingResearch'))
	},
	{
		path: '/homework',
		label: '作业详情	',
		component: lazy(() => import('@/view/HomeWork'))
	},
	{
		path: '/members',
		label: '作业详情',
		component: lazy(() => import('@/view/Member'))
	},
	{
		path: '/test',
		label: '作业详情',
		component: lazy(() => import('@/view/Test'))
	}
];

export default routerList;