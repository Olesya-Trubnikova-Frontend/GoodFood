
import productStyles from "./productItem.module.css";
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, deleteProduct, getAllCartProductsSelector } from '../../redux/slices/cartSlice'
import {
  addFavorite,
  getAllFavoriteProductsSelector,
  removeFavorite,
} from '../../redux/slices/favorite'

function ProductItem ({
	id,
	pictures,
	name,
	price,
	wight
}) {
	const cartProducts = useSelector(getAllCartProductsSelector)

	 const favorites = useSelector(getAllFavoriteProductsSelector)

	const dispatch = useDispatch()

  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }

  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }
  const isInCart = (productListId) => cartProducts.find((product) => product.id === productListId)

	return (
		<>
				<ul className={productStyles.box}>

					<img src={pictures} alt="" className={productStyles.img}></img>
					<p className={productStyles.name}>{name}</p>
					<p className={productStyles.price}>{price}</p>
					<p className={productStyles.wight}>{wight}</p>
					{/* <span>{id}</span> */}

					{favorites.includes(id) && (
				    <i className="fa-solid fa-heart" onClick={() => { dispatch(removeFavorite(id)) }}></i>
					)}
					{!favorites.includes(id) && (
	         <i className="fa-regular fa-heart" onClick={() => { dispatch(addFavorite(id)) }}></i>
					)}
					 <i className="fa-regular fa-comment"></i>

					<button
					className={productStyles.btn}
					type="button"
					onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}>
						{isInCart(id) ? ('В корзине') : ('В корзину')}
				  </button>

			</ul>
		</>
	)
}

export default ProductItem