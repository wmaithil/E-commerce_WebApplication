import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { updateCategory } from './helper/adminapicall';


const UpdateCategory = ({match}) => {

    const [name , setName] = useState("");
    const [success, setSuccess] = useState(false);
    const [error , setError] = useState(false);
    const [validateinput , setValidateinput] = useState(false);
    const {user, token } = isAuthenticated();

    const goBack = () => {
        return(
            <div className="mt-5">
                <Link className="btn btn-md btn-success mb-3" to="/admin/dashboard">
                    Admin Home
                </Link>
            </div>      
        );
    };

    const inputNotValidMsg = () => {
            if(validateinput){
                return <h4 className="text-error"> Please Enter a Valid Input </h4>
            }
    }

    const successMsg = () => {
        if(success){
            return <h4 className="text-success"> Category Updated Successfully </h4> 
        } 
    };

    const warningMsg = () =>{
        if(error){
            return <h4 className="text-error"> Could not create Category </h4>               
        };   
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setError(false);
        setSuccess(false);
        if(name.length){
            updateCategory(match.params.categoryId , user._id, name , token).then(data =>{
                if(data.error){
                    setError(true);
                    console.log(data.error);
                }else{
                    setSuccess(true); 
                    setName("");
                }
            })
            .catch(error => console.log(error));
        }else{
            setValidateinput(true);
        }
        
    };

    const handleChange = (e) =>{
        setName(e.target.value);
        setValidateinput(false);
    };

    const updateCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead"> Enter the Category to Update</p>
                <input 
                type="text" 
                className="form-control  my-3"
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="For Ex. Summer"
                />
                <button onClick={onSubmit} className="btn btn-success mb-2"> Update Category</button>
            </div>
        </form>
    );

    return (
       <Base 
       title="Update Category"
       description= "Update Your Categories Here"
       className="container bg-info p-4"
       >
        <div className="row bg-white rounded" >
            <div className="col-md-8 offset-md-2">
                {successMsg()}
                {warningMsg()}
                {inputNotValidMsg()}
                {updateCategoryForm()}
                {goBack()}
            </div>
        </div>

       </Base>
    )
};

export default UpdateCategory;
