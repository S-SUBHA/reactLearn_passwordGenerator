import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(true);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generateNewPassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "0123456789";
    if (charactersAllowed) str += "~!@#$%^&*(){}[]|?";

    let newPassword = "";
    for (let i = 0; i < length; ++i) {
      const index = Math.floor(Math.random() * str.length);
      newPassword += str[index];
    }
    setPassword(newPassword);
  }, [length, numbersAllowed, charactersAllowed, setPassword]);

  const copyPassword = () => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 2);
    window.navigator.clipboard.writeText(passwordRef.current.value);
  };

  useEffect(() => {
    generateNewPassword();
  }, [length, numbersAllowed, charactersAllowed, generateNewPassword]);

  return (
    <>
      <div className="w-svw h-svh flex justify-center items-center">
        <div className="bg-orange-700 rounded-xl py-20 px-40 flex-col justify-center items-center">
          <h1 className="font-bold text-3xl text-center mb-2">
            Password Generator
          </h1>
          <div className="flex my-7">
            <input
              type="text"
              className="flex-grow text-black text-xl p-2 rounded-l-lg"
              value={password}
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="bg-blue-700 text-xl py-2 px-4 rounded-r-lg hover:bg-blue-600"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>
          <div className="flex gap-4 justify-evenly items-center text-lg font-semibold">
            <input
              type="range"
              name="length"
              className="cursor-pointer"
              min={0}
              max={99}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="">length ({length})</label>

            <input
              type="checkbox"
              name="numbers"
              defaultChecked={numbersAllowed}
              value={numbersAllowed}
              onChange={() => setNumbersAllowed((prev) => !prev)}
              className="w-5 h-5"
            />
            <label htmlFor="numbers">numbers</label>

            <input
              type="checkbox"
              name="characters"
              defaultChecked={charactersAllowed}
              value={charactersAllowed}
              onChange={() => setCharactersAllowed((prev) => !prev)}
              className="w-5 h-5"
            />
            <label htmlFor="characters">characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
