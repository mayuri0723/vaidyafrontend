import React from 'react'
import '../breadcrumb.css'

function Breadcrumb() {
    const breadCrumbHeading = window.location.href.split("/").slice(-1)[0];
   
    return (
        <>
            <div className="pa-breadcrumb">
                <div className="container-fluid">
                    <div className="pa-breadcrumb-box">
                        {breadCrumbHeading === 'about' ? (
                            <>
                                <h1>About us</h1>
                                <ul>
                                    <li>
                                        <a href="/">
                                            Home</a>
                                    </li>
                                    <li>About us</li>
                                </ul>
                            </>
                        ) : (
                            <>
                                <h1>Contact us</h1>
                                <ul>
                                    <li>
                                        <a href="/">
                                            Home</a>
                                    </li>
                                    <li>Contact us</li>
                                </ul>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </>

    )
}

export default Breadcrumb