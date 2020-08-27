import React, { Fragment } from "react";
import Loader from "react-loader-spinner";

export const SpinnerFull = (props) => {
    return (
        <Fragment>
            <p className="pl-1">{props.info}</p>
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "100vh" }}
            >
                <Loader
                    type="Bars"
                    color="#1890FF"
                    height={60}
                    width={55}
                    timeout={50000}
                />
            </div>
        </Fragment>
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
