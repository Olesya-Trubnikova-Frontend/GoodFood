import { Link } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import productStyles from "./productItem.module.css";

export function ProductItem ({
	id,
	pictures,
	name,
	price,
	wight
}) {
	 const { changeStatus } = useTokenContext()

	 const completeHandler = (e) => {
		e.preventDefault()
    changeStatus(id)
  }

	return (
		<>
		<Link to={`./${id}`}>
				<ul className={productStyles.box}>

					<img src={pictures} alt="" className={productStyles.img}></img>
					<p className={productStyles.name}>{name}</p>
					<p className={productStyles.price}>{price}</p>
					<p className={productStyles.wight}>{wight}</p>
					
					<i class="fa-regular fa-heart"></i>
					<i class="fa-regular fa-comment"></i>

					<button
					className={productStyles.btn}
					onClick={completeHandler}
					type="button">
						В корзину
				  </button>

			</ul>
		</Link>
		</>
	)
}