import React, { useMemo, useState, useRef, useEffect } from "react";

const CHALLENGE_7_USEMEMO = () => {
  const [data, setData] = useState(0);
  const [data2, setData2] = useState(100);

  const handleSecond = () => {
    // tiggers expensive function
    setData2(data2 - 1);
  };
  const handleFirst = () => {
    // does not tiggers expensive function
    setData(data + 1);
  };

  const epxCalc = () => {
    // expensive function that should not be called everytime
    console.log("expensive function was called");
    for (let index = 0; index < 100000000; index++) {}
    return "hello";
  };

  const memoExpCale = useCustomMemo(epxCalc, [data]);

  return (
    <>
      <div>
        <p>{data}</p>
        <button onClick={handleFirst}>change data</button>
      </div>
      <div>
        <h2>expCale: {memoExpCale}</h2>
      </div>
      <div>
        <p>{data2}</p>
        <button onClick={handleSecond}>change data</button>
      </div>
    </>
  );
};

// =========================================================
// helper function for custom hook

const isTheSame = (prevDeps, Deps) => {
  if (prevDeps === null) return false;
  if (prevDeps.length !== Deps.length) return false;

  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== Deps[i]) {
      return false;
    }
  }
  return true;
};

// =========================================================
// custom Memo hook

export default CHALLENGE_7_USEMEMO;

const useCustomMemo = (fn, depsArray) => {
  const memoizedRef = useRef(null);

  if (
    !memoizedRef.current ||
    !isTheSame(memoizedRef.current.depsArray, depsArray)
  ) {
    memoizedRef.current = {
      data: fn(),
      depsArray,
    };
  }

  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);

  return memoizedRef.current.data;
};
