import React, { useState } from "react";
import Loader from "react-loader-spinner";

export const SpinnerFull = () => {
    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
        >
            <Loader
                type="Bars"
                color="#1890FF"
                height={65}
                width={65}
                timeout={20000}
            />
        </div>
    );
};

export default SpinnerFull;

// type Types =
//     | 'Audio'
//     | 'BallTriangle'
//     | 'Bars'
//     | 'Circles'
//     | 'Grid'
//     | 'Hearts'
//     | 'Oval'
//     | 'Puff'
//     | 'Rings'
//     | 'TailSpin'
//     | 'ThreeDots'
//     | 'Watch'
//     | 'RevolvingDot'
//     | 'Triangle'
