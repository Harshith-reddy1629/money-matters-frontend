import React from "react";

import "./index.css";
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CategoryTiles({ items }) {
  const navigate = useNavigate();
  const typesData = { credit: 0, debit: 0 };

  const K = items[1].map((e) => {
    if (e.TxnType === "credit") {
      typesData.credit += e.Amount;
    } else {
      typesData.debit += e.Amount;
    }
  });

  return (
    <div
      className="tile"
      onClick={() => navigate(`/transactions?category=${items[0]}`)}
    >
      <h4>{items[0]}</h4>
      <div className="amount-c">
        <h3 className="d-h-u">
          <FaRegArrowAltCircleUp size={15} /> {typesData.credit}
        </h3>
        <h3 className="d-h-d">
          <FaRegArrowAltCircleDown size={15} />
          {typesData.debit}
        </h3>
      </div>
    </div>
  );
}

export default CategoryTiles;
