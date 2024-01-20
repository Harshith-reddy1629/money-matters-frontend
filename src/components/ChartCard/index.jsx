import { Component, useContext } from "react";

import Cookies from "js-cookie";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./index.css";

import GetReqFormat from "../RecentTxnsDateConverter";
import FailedView from "../FailedView";
import LoaderView from "../LoaderView";
import TransactionsContext from "../../context/TransactionsContext";

const ChartCard = () => {
  const s = useContext(TransactionsContext);

  const { sevenDaysTxn, sevenDaysTxnStatus } = s;

  const inRequiredFormat = GetReqFormat(sevenDaysTxn);

  const DataFormatter = (number) => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`;
    }
    return number.toString();
  };

  return (
    <ResponsiveContainer
      className="responsive-container"
      width="100%"
      minWidth={600}
      height={400}
    >
      <BarChart
        className="bar"
        data={inRequiredFormat}
        margin={{
          top: 5,
        }}
        barSize={45}
      >
        <XAxis
          dataKey="day"
          tick={{
            stroke: "gray",
            strokeWidth: 1,
          }}
        />

        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: "gray",
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 20,
            borderRadius: "15px",
          }}
        />
        <Tooltip />
        <Bar dataKey="debit" radius={8} name="Debit" fill="#1f77b4" />
        <Bar radius={8} dataKey="credit" name="Credit" fill="#fd7f0e" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartCard;
