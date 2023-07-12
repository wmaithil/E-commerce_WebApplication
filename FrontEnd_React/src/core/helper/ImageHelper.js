import React from 'react';
import { API } from "../../backend"; 

const ImageHelper = ({product}) => {
    const imageUrl= product ? `${API}product/photo/${product._id}` : "";
    return (
        <div className="rounded border border-success p-2">
            <img src={imageUrl}
            alt="photo"
            style= {{ maxHeight: "100%" , maxWidth: "100%"}} 
            className="mb-1 rounded"
            />
        </div>
    )
};

export default ImageHelper;