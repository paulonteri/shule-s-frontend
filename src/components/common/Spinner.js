import React from "react";
import Loader from "react-loader-spinner";

export const Spinner = () => {
    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100%" }}
        >
            <Loader
                type="Bars"
                color="#1890FF"
                height={32}
                width={32}
                timeout={35000}
            />
        </div>
    );
};

export default Spinner;
