import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/logo.png'
import { fetchSearchPosts } from '../../store/post';
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);
	const [searchInput, setSearchInput] = useState('');


	const handleSearchClick = async (e) => {
		e.preventDefault();
		dispatch(fetchSearchPosts(searchInput)).then(history.push("/search"))
	};

	const handleSearchChange = (e) => {
		setSearchInput(e.target.value);
	};

	// const handleSearchSubmit = (e) => {
	// 	e.preventDefault();
	// 	console.log('Search submitted:', searchInput);
	// 	setSearchInput('');
	// };

	return (
		<div className='nav-container'>

			<div className='nav1'>

				<NavLink exact to="/">
					<img className="logo" src={logo} alt="Home" />
				</NavLink>

				<form className="search-bar" onSubmit={handleSearchClick}>
					<input
						type="text"
						value={searchInput}
						onChange={handleSearchChange}
						placeholder="Search Tumblr"
					/>
					<button type="submit">Search</button>
				</form>
			</div>

			{isLoaded && (
				<div className='nav'>
					{sessionUser && (
						<>
							<NavLink to="/" className="icon-item">
								<i className="fas fa-home fa-lg" /> {/* Home Component*/}
							</NavLink>
							{/* <div className="icon-item" onClick={handleReserveClick}><i className="fas fa-envelope fa-lg" /></div>
							<div className="icon-item" onClick={handleReserveClick}><i className="fas fa-compass fa-lg" /></div>
							<div className="icon-item" onClick={handleReserveClick}><i className="fas fa-video fa-lg" /></div>
							<div className="icon-item" onClick={handleReserveClick}><i className="fas fa-bolt fa-lg" /></div> */}

						</>
					)}

					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
