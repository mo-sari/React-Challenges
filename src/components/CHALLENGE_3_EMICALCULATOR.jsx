import React, { useEffect, useState } from "react";
import { tenureData } from "../datas/CHALLENGE_3_DATA ";
import "../assets/css/CHALLENGE_3.css";

const CHALLENGE_3_EMICALCULATOR = () => {
  const [cost, setCost] = useState(0);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  const [interestRate, setInterestRate] = useState(10);
  console.log(`cost: ${cost}, emi: ${emi}, downPayment:${downPayment}`);

  const calculateEMI = (downPayment) => {
    const rateOfInterest = interestRate / 100;
    const principle = cost - downPayment;
    const numberOfYears = tenure / 12;

    const loanPerMonth =
      (principle * rateOfInterest * (1 + rateOfInterest) ** numberOfYears) /
        (1 + rateOfInterest) ** numberOfYears -
      1;
    return Number(loanPerMonth).toFixed(0);
  };

  const calculateDP = (emi) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }
    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [tenure, cost]);

  const updateEMI = (e) => {
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    const emi = calculateEMI(dp);
    setEmi(emi);
  };

  const updateDownPayment = (e) => {
    if (!cost) return;

    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    const dp = calculateDP(emi);
    setDownPayment(dp);
  };

  const totalDownPayment = () => {
    return;
    (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0);
  };

  const totalEMI = () => {
    return (emi * tenure).toFixed(0);
  };

  return (
    <div style={{ background: "white", color: "black", padding: "2rem" }}>
      <h1>EMI Calculator</h1>
      <span>
        <h3>total cost of asset</h3>
        <input
          style={{ width: "100%" }}
          type="text"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </span>
      <span>
        <h3>Interest Rate (in %)</h3>
        <input
          style={{ width: "100%" }}
          type="text"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
      </span>
      <span>
        <h3>Processing Fee (in %)</h3>
        <input
          style={{ width: "100%" }}
          type="text"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />
      </span>
      <span>
        <h3>Down Payment </h3>
        <h2>Total Down Payment - {downPayment}</h2>
        <input
          style={{ width: "100%" }}
          value={downPayment}
          min={0}
          max={cost}
          onChange={updateEMI}
          type="range"
        ></input>
      </span>
      <span>
        <h3>Loan Per Month </h3>
        <h2>Total Loan Amount - {emi}</h2>
        <input
          style={{ width: "100%" }}
          type="range"
          placeholder="processing fee"
          onChange={updateDownPayment}
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
          value={emi}
        />
      </span>
      <span>
        <h3>Tenure</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {tenureData.map((d) => {
            return (
              <button
                onClick={() => setTenure(d)}
                key={d}
                className={`tenure ${d === tenure ? "selected" : ""}`}
                style={{
                  width: "100px",
                  height: "80px",
                  borderRadius: "40px",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                {d}
              </button>
            );
          })}
        </div>
      </span>
    </div>
  );
};

export default CHALLENGE_3_EMICALCULATOR;
