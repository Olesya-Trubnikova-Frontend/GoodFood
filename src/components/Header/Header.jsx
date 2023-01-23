import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import headerStyles from './header.module.css'

export const Header = () => {

	return (
		    <header className={headerStyles.wr}>
			<nav>
				<ul className={headerStyles.headerMenu}>
					<div>
					<i className="fa-solid fa-dog"></i>
					</div>
					<li>
						<NavLink className={({isActive}) => classNames({[headerStyles.activeLink]: isActive})} to="/">Good Food</NavLink>
					</li>
					<li>
						<NavLink className={({isActive}) => classNames({[headerStyles.activeLink]: isActive})} to="products/">Товары</NavLink>
					</li>
					<li>
						<NavLink className={({isActive}) => classNames({[headerStyles.activeLink]: isActive})} to="signin/">Войти</NavLink>
					</li>
					<li>
						<NavLink className={({isActive}) => classNames({[headerStyles.activeLink]: isActive})} to="signup/">Регистрация</NavLink>
					</li>
				</ul>
			</nav>
    </header>
	)
}