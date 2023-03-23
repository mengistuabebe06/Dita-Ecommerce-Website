import Product from "../components/Product";
import {useEffect} from "react";
import LoadingBox from "../share/LoadingBox";
import MessageBox from "../share/MessageBox";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../action/productActions";

function HomeScreen(){
    // const [products, setProducts] = useState([])
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState(false)
    //initialized the dispatch
    const dispatch  = useDispatch()
    //get object from redux store with its state properties
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(()=>{
        //load the action here
        dispatch(listProducts({}))
    }, [dispatch])
    return(
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="row center">
                    {products.map((product)=>(
                        <Product key={product._id} product={product}></Product>
                    ))}
                </div>
            )
            }

        </div>
    )
}

export default HomeScreen