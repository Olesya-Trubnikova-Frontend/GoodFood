
import { useDispatch } from 'react-redux'
import {
  changeIsPickProduct, deleteProduct, productDecrement, productIncrement,
} from '../../redux/slices/cartSlice'
import cartItemStyles from "./cartItem.module.css";

function CartItem({
  name, pictures, price, id, description, stock, discount, isPicked, count,
}) {

  const dispatch = useDispatch()
  const deleteProductHandler = () => {
    dispatch(deleteProduct(id))
  }
  const selectProductHandler = () => {
    dispatch(changeIsPickProduct(id))
  }
  const incrementCountHandler = () => {
    if (count < stock) {dispatch(productIncrement(id)) } 
  }

  const decrementCountHandler = () => {
    if (count > 0) {dispatch(productDecrement(id)) }
  }

  return (
    <div className={cartItemStyles.container}>
    <div className={cartItemStyles.box}>
    <ul>
      <h4 className={cartItemStyles.name}>
        <input type="checkbox" checked={isPicked} onChange={selectProductHandler} />
        {name}
      </h4>
            <div className={cartItemStyles.price}>
              <h4>
                {discount > 0 && `${((price * (100 - discount)) / 100)} ₽`}
                {discount === 0 && `${price} ₽`}
              </h4>
              {discount > 0 && (
              <h4>
                {price}
                ₽
              </h4>
              )}
            <p className={cartItemStyles.description}>{description}</p>
            <p>
              В наличии:
              {' '}
              {stock}
            </p>
          <img src={pictures} className={cartItemStyles.img} alt="product" />
        <div>
          <div className={cartItemStyles.btnBox}>
            <button type="button" className={cartItemStyles.btnCount} onClick={decrementCountHandler} disabled={!count}>
              <i className="fa-solid fa-minus"></i>
            </button>
            <h4 className={cartItemStyles.count}>{count}</h4>
            <button type="button" className={cartItemStyles.btnCount} onClick={incrementCountHandler} disabled={count === stock}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <button type="button" className={cartItemStyles.btn} onClick={deleteProductHandler}>Удалить</button>
        </div>
      </div>
    </ul>
    </div>
    </div>
  )
}

export default CartItem