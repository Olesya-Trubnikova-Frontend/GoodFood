import { NavLink } from 'react-router-dom'
import footerStyles from './footer.module.css'

export const Footer = () => {

	return (
		    <footer className={footerStyles.wr}>
				<div className={footerStyles.footerI}>
					<i className="fa-solid fa-paw"></i>
				</div>
				<nav>
				<ul className={footerStyles.footerMenu}>
					<li>
						<NavLink to="">Каталог</NavLink>
					</li>
					<li>
						<NavLink to="">Контакты</NavLink>
					</li>
					<li>
						<NavLink to="">Отзывы</NavLink>
					</li>
				</ul>
			</nav>
			<div className={footerStyles.footerIcons}>
					<i className="fa-brands fa-tiktok"></i>
					<i className="fa-brands fa-instagram"></i>
					<i className="fa-brands fa-twitter"></i>
				</div>
    </footer>
	)
}