import React, { useEffect, useState } from 'react';
import State from '@/tools/state';
import css from './index.module.less';
import { Dropdown, Tabs, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { courseItems } from '../../Items';

export default function Header() {

	const navigate = useNavigate();
	const [tabItems, setItems] = useState([]);

	const logout = () => {
		Modal.confirm({
			title: '提示?',
			icon: <ExclamationCircleOutlined />,
			content: '您确定要离开吗',
			okText: '确定',
			cancelText: '取消',
			onOk() {
				State.logout();
				setTimeout(() => {
					window.location.reload();
				}, 500);
			},
		});
	};

	const items = [
		{
			key: 'shezhi',
			label: (
				<a href='/main/userSetting'>
					个人设置
				</a>
			)
		},
		{
			key: 'logout',
			label: (
				<a onClick={logout}>
					退出系统
				</a>
			)
		},
	];

	useEffect(() => {
		if (State.isTeacher) {
			setItems(courseItems);
		} else {
			setItems(courseItems.slice(0, 1));
		}
	}, [State]);

	const change = (value) => {
		const item = tabItems.find(t => t.key === value);
		navigate(item.path);
	};

	return (
		<div className={css.header}>
			<div className={css.logo}>
				<img src='https://www.ketangpai.com/images/common/logo_blue.png' />
			</div>
			<div className={css.tabs}>
				<Tabs items={tabItems} onTabClick={change} tabBarStyle={{height:64}}/>
			</div>
			<div className={css.dropdown}>
				<Dropdown menu={{ items }} trigger={['click']} placement="bottom">
					<img src='https://assets.ketangpai.com//Public/Common/img/40/33.png' style={{ width: 32, height: 40 }} />
				</Dropdown>
			</div>
		</div>
	);
}
