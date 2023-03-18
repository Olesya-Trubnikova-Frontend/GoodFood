import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { DogFoodApiConst } from '../../Api/DogFoodApi'
import { getQueryCartKey } from '../Products/utils'
import { clearFavorites, getAllFavoriteProductsSelector } from '../../redux/slices/favorite'
import { getTokenSelector } from '../../redux/slices/userSlice'
import { FavoriteItem } from '../FavoriteItem/FavoriteItem'
import favoriteStyles from './favorite.module.css'

export function Favorite() {

  const favorites = useSelector(getAllFavoriteProductsSelector)

  const userToken = useSelector(getTokenSelector)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  const {
    data: favoriteProducts, isLoading, isError, error,
  } = useQuery({
    queryKey: [getQueryCartKey(favorites.length)],
    queryFn: () => DogFoodApiConst.getProductsByIds(favorites, userToken),
    enabled: !!(userToken),
  })

  const clearFavoritesHandler = () => {
    dispatch(clearFavorites())
  }
  // if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>

  return (
    <div  className={favoriteStyles.wr}>
      {
        !favorites[0] && (
        <div className={favoriteStyles.text}>
          <h1>Вы ничего не выбрали</h1>
          <Link to="/products">
            <button type="button" className={favoriteStyles.btn}>
              В каталог
            </button>
          </Link>
        </div>
        )
        }

      {favoriteProducts && (
        <div>
          <button type="button" onClick={clearFavoritesHandler} className={favoriteStyles.btn}>
            Очистить
          </button>
          <ul className={favoriteStyles.box}>
            {favoriteProducts.map((item) => (
              <FavoriteItem
                key={item._id}
                id={item._id}
                title={item.name}
                photo={item.pictures}
                price={item.price}
                wight={item.wight}
                discount={item.discount}
                tags={item.tags}
              />
            ))}
          </ul>
        </div>
      )}

    </div>
  )
}