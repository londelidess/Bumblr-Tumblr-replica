import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/logo.png'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	const handleReserveClick = () => {
		alert('Feature coming soon');
	};

	return (
		<div className='nav-container'>
			<NavLink exact to="/">
				<img className="logo" src={logo} alt="Home" />
			</NavLink>

			{isLoaded && (
				<div className='nav'>
					{sessionUser && (
						<>
							<div className="icon-item" onClick={handleReserveClick}><i className="fas fa-home fa-lg" /></div> {/* Home icon */}
							<div className="icon-item" onClick={handleReserveClick}><i className="fas fa-envelope fa-lg" /></div> {/* Email icon */}
							<div className="icon-item" onClick={handleReserveClick}><i className="fas fa-compass fa-lg" /></div> {/* Telegram icon */}
							<div className="icon-item" onClick={handleReserveClick}><i className="fas fa-video fa-lg" /></div> {/* Video camera icon */}
							<div className="icon-item" onClick={handleReserveClick}><i className="fas fa-bolt fa-lg" /></div> {/* Bolt icon */}
						</>
					)}
					
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
