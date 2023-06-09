import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, deleteProduct, listProducts} from "../action/productActions";
import LoadingBox from "../share/LoadingBox";
import MessageBox from "../share/MessageBox";
import {useEffect} from "react";
import {PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET} from "../constants/productConstants";

export default function ProductListScreen(props) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const sellerMode = pathname.indexOf('/seller') >= 0;

    const productList = useSelector((state) => state.productList);
    const {loading, error, products} = productList

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;
    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;

    const userSignin = useSelector((state) => state.userSignin);
    const { userinfo } = userSignin;
    const dispatch = useDispatch();
    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
           navigate(`/product/${createdProduct._id}/edit`);
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET });
        }
        dispatch(listProducts({seller: sellerMode ? userinfo._id : ''}))
    }, [createdProduct, dispatch, navigate, successCreate]);

    const createHandler = () => {
        dispatch(createProduct());
    };
    const deleteHandler = (product) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteProduct(product._id));
        }
    };
    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button type="button" className="primary" onClick={createHandler}>
                    Create Product
                </button>
            </div>

            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => navigate(`/product/${product._id}/edit`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => deleteHandler(product)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}