import React, { useState } from "react";
import { passwordStrength } from "check-password-strength";

const UppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const Symbols = "!@#$%^&*()_+[]{}|;:',.<>?/`~";
const Numbers = "1234567890";

const CHALLENGE_4_PASSWORD_GEN = () => {
  const [criterai, setCriteria] = useState({
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: true,
  });
  const [passLength, setPassLength] = useState(9);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const createPass = () => {
    const { numbers, symbols, uppercase, lowercase } = criterai;

    if (!numbers && !symbols && !uppercase && !lowercase) {
      setPassword("");
      return;
    }
    let chars = "";
    if (numbers) chars += Numbers;
    if (symbols) chars += Symbols;
    if (uppercase) chars += UppercaseChars;
    if (lowercase) chars += LowercaseChars;

    let pass = "";
    for (let i = 0; i < passLength; i++) {
      const char = (Math.random() * chars.length).toFixed(0);
      pass += chars[char];
    }
    setPassword(pass);
    evalutePassStrength();
  };

  const evalutePassStrength = () => {
    const strength = passwordStrength(password).value;
    setStrength(strength);
  };

  const copyToClipBoard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      alert("password copied");
    }
  };

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setCriteria({
      ...criterai,
      [name]: checked,
    });
  };
  console.log(criterai);
  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontWeight: "bold" }}>{password}</p>
          <button onClick={copyToClipBoard}>copy</button>
        </div>
        <span>
          <h3>Character length</h3>
          <input
            type="range"
            min={4}
            max={15}
            value={passLength}
            onChange={(e) => setPassLength(e.target.value)}
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        </span>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridAutoRows: "50px",
          }}
        >
          <div>
            <input
              checked={criterai.uppercase}
              id="uppercase"
              type="checkbox"
              name="uppercase"
              onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="uppercase">Include Uppercase Letters</label>
          </div>
          <div>
            <input
              checked={criterai.lowercase}
              id="lowercase"
              type="checkbox"
              name="lowercase"
              onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="lowercase">Include Lowercase Letters</label>
          </div>
          <div>
            <input
              checked={criterai.numbers}
              id="numbers"
              type="checkbox"
              name="numbers"
              onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="numbers">Include Numbers</label>
          </div>
          <div>
            <input
              checked={criterai.symbols}
              id="symbols"
              type="checkbox"
              name="symbols"
              onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="symbols">Include Symbols</label>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>{strength}</p>
          <p>medium</p>
        </div>
        <button
          onClick={createPass}
          style={{
            cursor: "pointer",
            width: "100%",
            padding: ".4rem",
            borderRadius: "10px",
            border: "none",
          }}
        >
          GENERATE PASSOWRD
        </button>
      </div>
    </div>
  );
};

export default CHALLENGE_4_PASSWORD_GEN;
