import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { DogFoodApiConst } from '../../Api/DogFoodApi'
import { clearCart } from '../../redux/slices/cartSlice'
import { getTokenSelector, logOut } from '../../redux/slices/userSlice'

export function User() {

  const userToken = useSelector(getTokenSelector)

  const navigate = useNavigate()

  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logOut())
    dispatch(clearCart())
  }

  const { data } = useQuery({
    queryKey: (['user']),
    queryFn: () => DogFoodApiConst.getUserByToken(userToken),
    keepPreviousData: true,
  })

  console.log({data})

  return (
    <div className={{}}>
      
      <h1>Информация о пользователе:</h1> 
      <h3> Имя: {' '}
        {data.name}
      </h3>
      <h3> Профессия: {' '}
        {data.about}
      </h3>
      <h3> Почта: {' '}
        {data.email}
      </h3>
      <h3> Группа: {' '}
        {data.group}
      </h3>
      <img src={data.avatar} alt="user" />
        <div>
          <Link
            to="/"
          >
            <button type="button" className={{}} onClick={logoutHandler}>
              Выйти
            </button>
          </Link>
        </div>

    </div>
  )
}