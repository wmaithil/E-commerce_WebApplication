
import React,{useState, useEffect} from 'react';
import "/home/maithil/mern_course/projfrontend/src/styles.css";
import {API} from "../backend"
import Base from "./Base";
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import Payment from './Payment';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(()=>{
        setProducts(loadCart())
    },[reload]);

      const loadAllProducts = (products) =>{
        return (
          <div>
            <h2> Loading Products in Cart</h2>
            {products.map(( product, index) =>(
                <Card 
                 key={index}
                product={product}
                addtoCart={false}
                removeFromCart={true}
                setReload={setReload}
                reload={reload}
                />
            ))}
          </div>
        )
      }; 
 
      const loadCheckout = () =>{
        return (
          <div>
            <Payment products={products} setReload={setReload} ></Payment>
          </div>
        )
      };

    return (
        <Base title="Cart page" description="Displaying Items in the Cart">
            <div className="row text-center">
              <div className="col-6">
                {products.length === 0 ? 
                  (<h3> Your cart is Empty. Please select any product.</h3> )
                :
                  ( loadAllProducts() )
                }
              </div>
              <div className="col-6">
                {loadCheckout()}
              </div>
            </div>
        </Base>
    );
};

export default Cart; 
