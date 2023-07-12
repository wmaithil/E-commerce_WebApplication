import React from 'react'
import Menu from  "./Menu"

const Base = ({ title="Title default", description="My description" ,className="bg-dark text-white p-4",children}) => {
    
    return (
        <div>
            <Menu/>
            
            <div className="container-fluid">
                <div className="jumbotron text-white text-center">
                    <h2 className="display-4"> {title} </h2>
                    <p className="lead"> { description }</p>
                </div>

                <div className={className}>
                    { children } 
                </div>

            </div>   

                <footer className="footer bg-dark mt-auto">
                    <div className="container-fluid bg-success text-white text-center py-3">
                        <h4> Got Questions, feel free to reach out </h4>
                        <button className="btn btn-warning btn-lg "> Contact us </button>
                    </div>
                    <div className="container text-white text-center">
                        <span className="text-muted">
                            Amazing Place to buy t-shirts
                        </span>
                    </div>
                </footer>
        </div>
    )
}

export default Base;
