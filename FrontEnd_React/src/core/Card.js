import React,{useState, useEffect} from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({ product , addtoCart= true, removeFromCart = false, setReload = f=> f, reload=undefined}) => {

  const [redirect , setRedirect] = useState(false);
  const [count,setCount] = useState(product.count);
  
  const addToCart = () =>{
    addItemToCart(product, ()=> setRedirect(true))
  }

  const getARedirect = (redirect) => {
      if(redirect){
        return  <Redirect to="/cart" />
      }
  }

  const showTitle= () => {
      return product? product.name : "Product Name"
  }

  const showAddToCart = () => {
        return(
          addtoCart && 
          <div className="col-12">
                <button
                  onClick={addToCart}
                  className="btn btn-block btn-success mt-2 mb-2"
                >
                  Add to Cart
                </button>
              </div>
        )
  };

  const showRemoveFromCart = () => {
        return(
              <div className="col-12">
                <button
                  onClick={() => {
                    removeItemFromCart(product._id);
                    setReload(!reload);
                  }}
                  className="btn btn-block btn-danger mt-2 mb-2"
                >
                  Remove from cart
                </button>
              </div>
        )
  };

  return (
    <div className="card text-black bg-white border border-info ">
      <div className="card-header lead">{showTitle()}</div>

      <div className="card-body">
          {getARedirect(redirect)}
          <ImageHelper product={product}/>
          <p className="lead font-weight-normal text-wrap">
            {product.description}
          </p>
          <p className="btn btn-success rounded btn-sm px-4"><span> Rs.</span> {product.price}</p>   
         
          <div className="row">
            {addtoCart === true ? (
                  showAddToCart()
                ): (
                  showRemoveFromCart()
                )
            }  
          </div>
      </div>

    </div>
  );
};

export default Card;

 