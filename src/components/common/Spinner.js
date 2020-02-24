import React, { useState } from "react";
import Loader from "react-loader-spinner";

export const Spinner = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Loader
        type="MutatingDots"
        color="#1890FF"
        height={100}
        width={100}
        timeout={20000}
      />
    </div>
  );
};

export default Spinner;
