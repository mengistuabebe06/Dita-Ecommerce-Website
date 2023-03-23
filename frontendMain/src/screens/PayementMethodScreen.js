import CheckoutSteps from "../components/CheckoutSteps";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {savePaymentMethod} from "../action/cartActions";

export default function PayementMethodScreen(){
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        navigate('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch  = useDispatch()
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    return(
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment</h1>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="telebirr"
                            name="paymentMethod"
                            value="TeleBirr"
                            required
                            checked
                            onChange={(e)=> setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="telebirr">TeleBirr</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="paypal"
                            name="paymentMethod"
                            value="PayPal"
                            required
                            onChange={(e)=> setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="stripe"
                            name="paymentMethod"
                            value="Stripe"
                            required
                            onChange={(e)=> setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}