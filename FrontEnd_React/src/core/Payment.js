import React,{useState, useEffect} from 'react';
import { loadCart, cartEmpty } from './helper/cartHelper';
import {Link} from "react-router-dom";
import { processPayment, getMeToken } from './helper/paymentHelper';
import { createOrder } from './helper/orderHelper';
import { isAuthenticated } from '../auth/helper';
import DropIn from "braintree-web-drop-in-react";

const Payment =({products, setReload= f => f,reload= undefined }) => {
    
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        error:"",
        clientToken: null,
        instance:{}
    })

    const userId = isAuthenticated() && isAuthenticated().user_id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken= (userId, token)=>{
        
        getMeToken(userId, token)
        .then(info=>{
            console.log("Information",info);
            if(info.error){
                setInfo({...info,error:info.error})
            }else{
                const clientToken = info.clientToken;
                setInfo({clientToken})
            }
        })
        .catch(err=>console.log(err))
    }

    const showDropIn = () => {
        return(
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{authorization: info.clientToken}}
                            onInstance={instance => (this.instance = instance)}
                        >
                        </DropIn>
                        <button className="btn btn-block btn-success" onClick={onPurchase()}>Buy</button>
                    </div>
                ):(
                    <h3>Please Login</h3>
                )}
            </div>
        )
    }

    useEffect(()=>{
        getToken(userId,token);
    },[])

    const onPurchase = () => {
        setInfo({loading:true})
        let nonce;
        let getNonce= info.instance
            .requestPaymentMethod()
            .then(data =>{
                nonce=data.nonce
                const paymentData={
                    paymentMethodNonce: nonce,
                    amount: getAmount() 
                };
            processPayment(userId, token, paymentData)
            .then(res => {
                setInfo({...info,success: res.success})
                console.log("Payment Succesfull");
            })
            })
            .catch(error =>{
                setInfo({...info,loading:false,success:false,error:error});
                console.log("Payment ")
            })

            
    }

    const getAmount = ()=>{
        let amount= 0;
        products.map(product => amount=amount+product.price )
        return amount;
    }

    return (
        <div>
            <h3>Total Amount is {getAmount()}</h3>
            {showDropIn()}
        </div>
    )
}

export default Payment;
