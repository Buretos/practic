import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Error, Header, Footer, Modal } from './components';
import { Authorization, Main, Post, Registration, Users } from './pages';
import { setUser } from './actions';
import { ERROR } from './constants';
import styled from 'styled-components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Page = styled.div`
	padding: 120px 20px 20px;
`;

export const Blog = () => {
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData'); // считываем текущую авторизацию пользователя из sessionStorage (из браузера), который не стирается при обновлении вкладки. Записываем же данные при авторизации и регистрации командой: sessionStorage.setItem('userData', JSON.stringify(res)); Данные в sessionStorage хранятся в виде строк. Поэтому получаем в виде строки JSON, которую нужно преобразовать в объект.

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON); // Преобразование из формата строки JSON в объект.

		dispatch(
			// Обновляем стейт данными из sessionStorage
			setUser({
				// В sessionStorage все данные хранятся в строках. У нас в стейте не всё в строках. roleId у нас число. Поэтому мы переводим roleId из строкового значения в число и записываем в state правильно.
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="/*" element={<Error error={ERROR.PEGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
