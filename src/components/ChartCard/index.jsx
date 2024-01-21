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
    <div>
      <h2 className="seven-txt">This Week Transactions Overview</h2>
      <div
        style={{
          backgroundColor: "#fff",
          paddingTop: "16px",
          borderRadius: "15px",
        }}
      >
        <ResponsiveContainer
          className="responsive-container-desk"
          width="100%"
          height={320}
          // margin={0}
        >
          <BarChart
            className="bar"
            data={inRequiredFormat}
            margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
            barSize={45}
          >
            <XAxis
              dataKey="day"
              tick={{
                stroke: "gray",
                strokeWidth: 1,
                fontSize: "12px",
              }}
            />

            <YAxis
              tickFormatter={DataFormatter}
              tick={{
                stroke: "gray",
                strokeWidth: 0,
                fontSize: "12px",
              }}
            />
            <Legend margin={{ bottom: 10 }} wrapperStyle={{}} />
            <Tooltip />
            <Bar dataKey="debit" radius={8} name="Debit" fill="#1f77b4" />
            <Bar radius={8} dataKey="credit" name="Credit" fill="#fd7f0e" />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer
          className="responsive-container"
          width="100%"
          height={220}

          // margin={0}
        >
          <BarChart
            className="bar"
            data={inRequiredFormat}
            margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
            barSize={45}
          >
            <XAxis
              dataKey="day"
              tick={{
                stroke: "gray",
                strokeWidth: 1,
                fontSize: "12px",
              }}
            />

            <YAxis
              tickFormatter={DataFormatter}
              tick={{
                stroke: "gray",
                strokeWidth: 0,
                fontSize: "12px",
              }}
            />
            <Legend margin={{ bottom: 10 }} wrapperStyle={{}} />
            <Tooltip />
            <Bar dataKey="debit" radius={8} name="Debit" fill="#1f77b4" />
            <Bar radius={8} dataKey="credit" name="Credit" fill="#fd7f0e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartCard;
