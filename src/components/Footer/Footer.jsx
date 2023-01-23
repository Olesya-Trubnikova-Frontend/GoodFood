import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import footerStyles from './footer.module.css'

export const Footer = () => {

	return (
		    <header className={footerStyles.wr}>
				<div className={footerStyles.footerI}>
					<i class="fa-solid fa-paw"></i>
				</div>
				<nav>
				<ul className={footerStyles.footerMenu}>
					<li>
						<NavLink className={({isActive}) => classNames({[footerStyles.activeLink]: isActive})} to="">Каталог</NavLink>
					</li>
					<li>
						<NavLink className={({isActive}) => classNames({[footerStyles.activeLink]: isActive})} to="">Контакты</NavLink>
					</li>
					<li>
						<NavLink className={({isActive}) => classNames({[footerStyles.activeLink]: isActive})} to="">Отзывы</NavLink>
					</li>
				</ul>
			</nav>
			<div className={footerStyles.footerIcons}>
					<i class="fa-brands fa-tiktok"></i>
					<i class="fa-brands fa-instagram"></i>
					<i class="fa-brands fa-twitter"></i>
				</div>
    </header>
	)
}