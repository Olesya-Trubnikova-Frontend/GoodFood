import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import headerStyles from './header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getTokenSelector } from '../../redux/slices/userSlice'
import { getAllCartProductsSelector } from '../../redux/slices/cartSlice'
import { clearCart } from '../../redux/slices/cartSlice'
import { logOut } from '../../redux/slices/userSlice'
import { getAllFavoriteProductsSelector } from '../../redux/slices/favorite'

export const Header = () => {

	const userToken  = useSelector(getTokenSelector)

	const cartProducts = useSelector(getAllCartProductsSelector)

	const favoriteProducts = useSelector(getAllFavoriteProductsSelector)

	const dispatch = useDispatch()

	const handleLogOut = () => {
    dispatch(logOut())
    dispatch(clearCart())
  }

	return (
		    <header className={headerStyles.wr}>
			<nav>
				<ul className={headerStyles.headerMenu}>
					<div>
					<i className="fa-solid fa-dog"></i>
					</div>
					<li>
						<NavLink className={headerStyles.logo} to="/">Good Food</NavLink>
					</li>
					<li>
						<NavLink className={{}} to="products/">Товары</NavLink>
					</li>
					{userToken ? (
					<li>
						<NavLink className={{}} onClick={handleLogOut} to="signin/">Выйти</NavLink>
					</li>
					) : (
					<li>
					  <NavLink className={{}} to="signin/">Войти</NavLink>
					</li>
					)}
					<li>
						<NavLink to="signup/">Регистрация</NavLink>
					</li>
						<NavLink to="user/">
							<i className="fa-regular fa-user"></i>
						</NavLink>
				  	<NavLink to="favorite/">
							<i className="fa-regular fa-heart"></i>
							<span className={headerStyles.number}>{favoriteProducts.length}</span>
						</NavLink>
						<NavLink to="cart/">
							<i className="fa-solid fa-basket-shopping"></i>
							<span className={headerStyles.number}>{cartProducts.length}</span>
						</NavLink>
				</ul>
			</nav>
    </header>
	)
}