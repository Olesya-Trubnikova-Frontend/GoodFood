import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  clearCart, getAllCartProductsSelector, notPickAllProducts, pickAllProducts,
} from '../../redux/slices/cartSlice'
import CartItem from '../CartItem/CartItem'
import { getTokenSelector } from '../../redux/slices/userSlice'
import { getQueryCartKey } from '../Products/utils'
import { DogFoodApiConst } from '../../Api/DogFoodApi'
import cartStyles from "./cart.module.css";


export const Cart = () => {

  const cart = useSelector(getAllCartProductsSelector)//Список всех товаров в корзине
  
  const userToken = useSelector(getTokenSelector)

  const dispatch = useDispatch()

const {
    data: cartProducts, isLoading, isError, error,
  } = useQuery({
    queryKey: getQueryCartKey(cart.length),
    queryFn: () => DogFoodApiConst.getProductsByIds(cart.map((product) => product.id), userToken),
    enabled: !!(userToken),
  })

  const clearCartHandler = () => {
    dispatch(clearCart())
  }
  const isAllCardPicked = () => cart.filter((item) => item.isPicked === true).length === cart.length
  const findAllPickedProducts = () => {
    const allPickedProducts = []
    cart.forEach((item) => {
      if (item.isPicked === true) allPickedProducts.push(item)
    })
    return allPickedProducts
  }

  const getCartProductById = (idItem) => cartProducts.find((product) => product._id === idItem)

  const getCartStateProductById = (idItem) => cart.find((product) => product.id === idItem)

  const pickAllProductsHandler = () => {
    if (!isAllCardPicked()) dispatch(pickAllProducts())
    else dispatch(notPickAllProducts())
  }
  const calculateSum = () => findAllPickedProducts().reduce((sum, product) => {
    const updatedSum = sum + product.count * getCartProductById(product.id).price
    return updatedSum
  }, 0)
  const calculateDiscount = () => findAllPickedProducts().reduce((sum, product) => {
    const updatedSum = sum + product.count * getCartProductById(product.id).price * (getCartProductById(product.id).discount / 100)
    return updatedSum
  }, 0)
  const calculateSumWithDiscount = () => findAllPickedProducts().reduce((sum, product) => {
    const updatedSum = sum + product.count * getCartProductById(product.id).price * ((100 - getCartProductById(product.id).discount) / 100)
    return updatedSum
  }, 0)
  
  // if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>

  return (

 <div className={cartStyles.box}>
      {!cart[0] && (
      <div>
        <h1 className={cartStyles.h1}>Ваша корзина пуста</h1>
        <Link to="/products">
          <button type="button" className={cartStyles.btn}>
            Перейти к покупкам
          </button>
        </Link>
      </div>
      )}

      {cartProducts && (
        <div>
          <div>
                <input id="select_all" type="checkbox" checked={isAllCardPicked()} onChange={pickAllProductsHandler} />
                <label htmlFor="select_all">Выбрать все</label>
                <br></br>
                <button type="button" className={cartStyles.btn} onClick={clearCartHandler}>
                Очистить
              </button>
            </div>
            <ul
              className>
              {cartProducts.map((item) => (
                <CartItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  pictures={item.pictures}
                  stock={item.stock}
                  discount={item.discount}
                  description={item.description}
                  isPicked={getCartStateProductById(item._id).isPicked}
                  count={getCartStateProductById(item._id).count}
                />
              ))}
            </ul>
          <div className={cartStyles.info}>
            <h4>Ваш заказ:</h4>
            <p>
              Сумма:
              {' '}
              {calculateSum() || 0}
              {' '}
              ₽
            </p>
            <p>
              Скидка:
              {' '}
              {calculateDiscount() || 0}
              {' '}
              ₽
            </p>
            <h4>
              К оплате:
              {' '}
              {calculateSumWithDiscount() || 0}
              {' '}
              ₽
            </h4>
            <button type="button" className={cartStyles.btn}>
              Оформить
            </button>
          </div>
        </div>
      )}
    </div>

  )
}
