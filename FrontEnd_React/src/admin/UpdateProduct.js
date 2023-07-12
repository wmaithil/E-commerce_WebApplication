import React,{useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import {updateProduct , getAllCategories, getProduct} from "./helper/adminapicall";

const UpdateProduct = ({match}) => {

    const [ values, setValues] = useState({
        name : "",
        description: "",
        stock:"0",
        price:"",
        photo:"",
        categories: [],
        category: "",
        loading: false,
        error:"",
        createdProduct:"",
        getRedirect : false,
        formData: ""
    });

    const {name , description, stock, price, categories,
        category, loading, error, createdProduct,
        getRedirect, formData } = values;

    const {user, token} = isAuthenticated();

    const successMessage = () => {
            <div className="alert alert-success mt-3" style={{display: createdProduct ? "" : "none"}}>
                <h4> {createdProduct} Updated Successfully</h4>
            </div>
    };

    const errorMessage = () => {
        <div className="alert alert-danger mt-3" style={{display: error ? "" : "none" }}>
                <h4> Product cannot be Updated</h4>
        </div>
    };
    
    const performRedirect = () => {
        if(getRedirect){
            <Redirect to="/admin/dashboard"></Redirect>
        }
    }

    const loadingMsg = () => {
        return (
            loading && (
                <div className="alert alert-info" >
                    <h2>  Loading ... </h2>
                </div>
            )
        );
    };

    const preload = (productId) => {
            getProduct(productId).then(data => {
                
                if(data.error){
                    setValues({...values, error: data.error});
                }else{
                    preloadCategories();
                    setValues({...values,
                         name : data.name,
                         description: data.description,
                         price: data.price,stock:data.stock ,
                         category: data.category._id,
                         formData : new FormData(),
                         });
                    
                }
            });
    };

    const preloadCategories = () => {
            getAllCategories().then(data =>{
                if(data.error){
                    setValues({...values, error: data.error});
                }else{
                    setValues({ categories: data, formData: new FormData()
                    })
                }
            })
    }

    useEffect(()=>{
        preload(match.params.productId);
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true})
        console.log("Form Data is",formData);
        updateProduct(match.params.productId, user._id, token, formData).then(data => {
            if(data.error){
                setValues({...values , error : data.error })
            }else(
                setValues({
                ...values, 
                name: "",
                description: "",
                price: "",
                photo: "",
                stock: "",
                loading: false,
                createdProduct: data.name
                })
            )
        }).catch(err => console.log(err));
    };

    const handleChange = name => event => {
        const value = name ==="photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value})
        
    };

    const createProductForm = () =>( 
        <form>
            <span> Post photo </span>
            <div className="form-group py-2">
                <label className="btn btn-block btn-success">
                    <input onChange={handleChange("photo")} type="file" name="photo" accept="image" placeholder="choose a file" />
                </label>
            </div>

            <div className="form-group py-2">
                <input onChange={handleChange("name")} name="photo" className="form-control" placeholder="Name" value={name} />
            </div>

            <div className="form-group py-2">
                <textarea onChange={handleChange("description")} name="photo" className="form-control"
                 placeholder="Description" value={description}></textarea>
            </div>

            <div className="form-group py-2">
                <input onChange={handleChange("price")} type="number" className="form-control" placeholder="Price" value={price} />
            </div>

            <div className="form-group py-2">
                <select onChange={handleChange("category")} className="form-control" placeholder="Category">
                    <option > Select</option>
                    {categories && 
                        categories.map((category ,index) => {
                            return(
                                <option key={index} value={category._id} > 
                                    {category.name} 
                                </option>
                        ); 
                        })}
                </select>
            </div>

            <div className="form-group py-2">
                <input onChange={handleChange("stock")} type="number" className="form-control" placeholder="Quantity" value={stock} />
            </div>

            <div> 
                <button type="submit" onClick={onSubmit} className="btn btn-success py-1 mb-3"> Update Product</button>
            </div>
            
        </form>
    );

    return(
        <Base
            title="Add a product here!"
            description="Welcome to product creation section"
            className="container bg-info p-4"
        >
            <h1>Add product</h1>
            <Link to="/admin/dashboard" className="btn btn-medium btn-dark mb-3"> Admin Home </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                   <h1> Hello </h1>
                    {performRedirect()} 
                    { loadingMsg()}
                    {successMessage()}
                    {errorMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    )
    
    
};

export default UpdateProduct;