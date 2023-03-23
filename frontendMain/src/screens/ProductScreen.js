import {Link, useNavigate, useParams} from "react-router-dom";
import Rating from "../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import LoadingBox from "../share/LoadingBox";
import MessageBox from "../share/MessageBox";
import {useEffect, useState} from "react";
import {createProduct, detailsProduct} from "../action/productActions";
import {PRODUCT_CREATE_RESET} from "../constants/productConstants";


function ProductScreen(props){
    //x is a data retrived and to get the user click id using props.match.params.id for version 5
    // const {id} = useParams()
    // const product = data.products.find((x)=> x._id === id)
    // if(!product){
    //     return <div>Product not found</div>
    // }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const {productId} = useParams();
    // const {productId} = params.id
    const { id } = useParams();
    const [qty, setQty] = useState(1)

    // console.log("product id")
    // console.log(id)
    // const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    // const productCreate = useSelector((state) => state.productCreate);
    // const {
    //     loading: loadingCreate,
    //     error: errorCreate,
    //     success: successCreate,
    //     product: createdProduct,
    // } = productCreate;

    useEffect(() => {
        // if(successCreate){
        //     dispatch({type: PRODUCT_CREATE_RESET})
        //     navigate(`/product/${createdProduct._id}/edit`)
        // }
        dispatch(detailsProduct(id));
    }, [dispatch, navigate]);

    const addToCartHandler = () =>{
        navigate(`/cart/${id}?qty=${qty}`)
    }

    return(

        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    <Link to="/">back to Result</Link>
                    <div className="row top">
                        <div className="col-2">
                            <img className="large" src={product.image} alt={product.name}/>
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li>
                                    <Rating
                                        rating={product.rating}
                                        numReview={product.numReviews}></Rating>
                                </li>
                                <li>Pirce: ${product.price}</li>
                                <li>Description:
                                    <p>{product.description}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price">${product.price}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                            <div>
                                                {product.counterInStock > 0 ? (
                                                    <span className="success">In Stock</span>
                                                ):(
                                                    <span className="danger">Unavailable</span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                    {product.counterInStock > 0 && (
                                        <>
                                            <li>
                                                <div className="row">
                                                    <div>Qty</div>
                                                    <div>
                                                        <select value={qty} onChange={(e)=> setQty(e.target.value)}
                                                        >
                                                            {[...Array(product.counterInStock).keys()].map(
                                                                (x) => (
                                                                    <option key={x+1} value={x + 1}>{x + 1}</option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <button
                                                    className="primary block"
                                                    onClick={addToCartHandler}
                                                >Add To Cart</button>
                                            </li>
                                        </>
                                    )}

                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            )
            }

        </div>

    )
}
export default ProductScreen