// import { useQuery } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { DogFoodApiConst } from '../../Api/DogFoodApi'
import { clearCart } from '../../redux/slices/cartSlice'
import { getTokenSelector, logOut } from '../../redux/slices/userSlice'
import userStyles from './user.module.css'


export function User() {
  const userToken = useSelector(getTokenSelector)
  console.log('token', userToken)
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

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: () => DogFoodApiConst.getUserByToken(userToken),
    keepPreviousData: true,
  })

  // if(!isError) return ()=> console.log('eeeerrrr')
  if (isLoading) return () => console.log('Loader...')

  return (
    <div className={userStyles.wr}>
      
      <h1 className={userStyles.text}> Информация о пользователе:</h1> 
      <h3 className={userStyles.name}> Имя: {' '}
        {data.name}
      </h3>
      <h3 className={userStyles.name}> Профессия: {' '}
        {data.about}
      </h3>
      <h3 className={userStyles.name}> Почта: {' '}
        {data.email}
      </h3>
      <h3 className={userStyles.name}> Группа: {' '}
        {data.group}
      </h3>
      <img className={userStyles.img} src={data.avatar} alt="user" />
        <div>
          <Link
            to="/"
          >
            <button type="button" className={userStyles.btn} onClick={logoutHandler}>
              Выйти
            </button>
          </Link>
        </div>

    </div>
  )
}