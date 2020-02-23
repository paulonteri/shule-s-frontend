import React, { useState } from "react";
import { Ripple } from "react-awesome-spinners";

export const Spinner = () => {
  const [loading, setLoading] = useState(true);

  return (
    loading && (
      <div
        class="mx-auto d-flex align-items-center min-vh-100"
        style={{ width: "200px", height: "500px" }}
      >
        <Ripple />
      </div>
    )
  );
};

export default Spinner;
