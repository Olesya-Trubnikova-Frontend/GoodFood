import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import headerStyles from './header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getTokenSelector } from '../../redux/slices/userSlice'
import { getAllCartProductsSelector } from '../../redux/slices/cartSlice'
import { clearCart } from '../../redux/slices/cartSlice'
import { logOut } from '../../redux/slices/userSlice'

export const Header = () => {

	const userToken  = useSelector(getTokenSelector)

	const cartProducts = useSelector(getAllCartProductsSelector)

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
						<NavLink className={({isActive}) => classNames({[headerStyles.activeLink]: isActive})} to="/">Good Food</NavLink>
					</li>
					<li>
						<NavLink className={({isActive}) => classNames({[headerStyles.activeLink]: isActive})} to="products/">Товары</NavLink>
					</li>
					{userToken ? (
					<li>
						<NavLink className={({isActive}) => classNames({[headerStyles.activeLink]: isActive})} onClick={handleLogOut} to="signin/">Выйти</NavLink>
					</li>
					) : (
					<li>
					  <NavLink className={({isActive}) => classNames({[headerStyles.activeLink]: isActive})} to="signin/">Войти</NavLink>
					</li>
					)}
					<li>
						<NavLink className={({isActive}) => classNames({[headerStyles.activeLink]: isActive})} to="signup/">Регистрация</NavLink>
					</li>
						<NavLink className={({isActive}) => classNames({[headerStyles.activeLink]: isActive})} to="cart/">
							<i class="fa-solid fa-basket-shopping"></i>
							<span className={headerStyles.number}>{cartProducts.length}</span>
						</NavLink>
				</ul>
			</nav>
    </header>
	)
}