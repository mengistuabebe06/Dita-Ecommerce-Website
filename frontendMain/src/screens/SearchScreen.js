import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {listProducts} from "../action/productActions";
import LoadingBox from "../share/LoadingBox";
import MessageBox from "../share/MessageBox";
import Product from "../components/Product";

export default function SearchScreen(props){
    const dispatch = useDispatch()
    const {name = "all", category = "all"} = useParams()

    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList

    const productCategoriesList = useSelector((state) => state.productCategoryList)
    const {loading: loadingCategories, error: errorCategories, categories} = productCategoriesList

    useEffect(()=> {
        dispatch(listProducts({
            name: name !== 'all'? name : '',
            category: category !== 'all'? category : ''}))
    },[dispatch, name, category])

    const getFilterUrl = (filter) =>{
        const filterCategory = filter.category || category
        const filterName = filter.name || name
        return `/search/category/${filterCategory}/name/${filterName}`
    }
    return(
        <div>
            <div className="row">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>{products.length} Results</div>
                )}
            </div>
            <div className="row top">
                <div className="col-1">
                    <h3>Department</h3>
                    {loadingCategories ? (
                        <LoadingBox></LoadingBox>
                    ) : errorCategories ? (
                        <MessageBox variant="danger">{errorCategories}</MessageBox>
                    ) : (
                        <ul>
                            {categories.map((c) =>(
                                <li key={c}>
                                    <Link
                                        className={c === category ? 'active' : ''}
                                        to={getFilterUrl({ category: c})}>{c}</Link>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>
                <div className="col-3">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                            {products.length === 0 && (
                                <MessageBox>No Product Found</MessageBox>
                            )}
                            <div className="row center">
                                {products.map((product) => (
                                    <Product key={product._id} product={product}></Product>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}