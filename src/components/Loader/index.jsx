import React from "react";

import "./index.css";
import { Oval } from "react-loader-spinner";

function Loader() {
  return (
    <div className="loader-class">
      <Oval
        color=" #505887"
        secondaryColor=" #50588730"
        strokeWidth={4}
        height={40}
      />
    </div>
  );
}

export default Loader;
