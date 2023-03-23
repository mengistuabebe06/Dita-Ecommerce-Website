import Rating from "./Rating";
import {Link} from "react-router-dom";

function Product(props){
    const {product} = props
    return(
        <div key={product._id} className="card">
            <Link to={`/product/${product._id}`}>
                <img className="medium" src={product.image} alt={product.name}/>
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                </Link>
                <Rating rating={product.rating} numReview={product.numReviews}></Rating>
                <div className="price">
                   <div className="row">
                       <strong>$ {product.price}</strong>
                       {/*<div>*/}
                       {/*    <Link to={`/seller/${product.seller._id}`} >*/}
                       {/*        {product.seller.seller.name}*/}
                       {/*    /!*    the first seller point to the product seller and the second is point to the user seller *!/*/}
                       {/*    </Link>*/}
                       {/*</div>*/}
                   </div>
                </div>
            </div>
        </div>
    )
}

 export default Product