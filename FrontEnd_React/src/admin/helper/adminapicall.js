import { API } from "../../backend";


//category api calls
export const createCategory = (userId, token, category) =>{
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err));
};      

// get All Categories
export const getAllCategories = () => {
    return fetch(`${API}categories`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch( err => console.log(err));
};

export const updateCategory = (categoryId , userId,name, token) => {
    return fetch(`${API}category/${categoryId}/${userId}`,{
        method : "PUT",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json", 
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({name})
    })
    .then(response => {
        return response.json();
    }).catch( err => console.log(err))
}

export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

//product api calls
export const createaProduct = (userId, token, product) => {

    return fetch(`${API}product/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization : `Bearer ${token}`           
        },
        body : product
    })
    .then( response =>{
        return response.json()
    })
    .catch( err => console.log(err))
};

// get All products
export const getAllProducts = () => {
    return fetch(`${API}products`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//delete product
export const deleteProduct = (productId , userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method : "DELETE",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }

    }).then(response => {
        return response.json();
    }).catch( err => console.log(err))
}

// get a product
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`,{
        method : "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch( err => console.log(err))
}


//update product
export const updateProduct = (productId , userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method : "PUT",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
        body :product
    })
    .then(response => {
        return response.json();
    }).catch( err => console.log(err))
}


