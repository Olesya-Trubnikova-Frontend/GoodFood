import { useDispatch, useSelector } from 'react-redux'
import {
  addNewProduct,
  deleteProduct,
  getAllCartProductsSelector,
} from '../../redux/slices/cartSlice'
import { removeFavorite } from '../../redux/slices/favorite'
import favoriteItemStyles from './favoriteItem.module.css'

export function FavoriteItem({
  title,
  id,
  photo,
  price,
  wight,
  discount,
  tags,
}) {

  const dispatch = useDispatch()
  const cartProducts = useSelector(getAllCartProductsSelector)
  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }

  const removeFavoritesHandler = () => {
    dispatch(removeFavorite(id))
  }

  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }
  const isInCart = (productListId) => cartProducts.find((product) => product.id === productListId)

  return (
    <div className={favoriteItemStyles.box}>
      <div className={favoriteItemStyles.price}>
        {discount ? (
          <div className={favoriteItemStyles.price}>
            -
            {discount}
            %
          </div>
        ) : (
          ''
        )}
        {tags.includes('new') ? (
          <div className={favoriteItemStyles.text}>Новинка</div>
        ) : (
          ''
        )}
      </div>
      <div>
        <img
        className={favoriteItemStyles.img}
          src={photo}
          alt="изображение товара"
        />
      </div>
      <div className={favoriteItemStyles.price}>
        {price}
        {' '}
        ₽
      </div>
      <div className={favoriteItemStyles.text}>{wight}</div>
      <div className={favoriteItemStyles.text}>{title}</div>
      <div>
        <button
          className={favoriteItemStyles.btn}
          type="button"
          onClick={removeFavoritesHandler}
        >
          Убрать
        </button>
        <button
          className={favoriteItemStyles.btn}
          type="button"
          onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}
        >
         {isInCart(id) ? ('Из корзины') : ('В корзину')}
        </button>
      </div>
    </div>
  )
}