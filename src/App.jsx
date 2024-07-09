import { useState, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);

  const [password, setPassword] = useState("Password");

  // useCallBack
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMasdfghjklqwertyuiopzxcvbnm";

    if (number) str += "1234567890";
    if (character) str += "!@#$%^&*(){}|:,./<>?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, character]);

  useEffect( ()=>{
    
    passwordGenerator()
  }, [length, number, character, passwordGenerator] )

  return (
    <>
      <div className="bg-black max-w-lg w-full mx-auto rounded-lg p-4 my-8  text-white ">
        <h1 className=" font-bold underline text-4xl ">Password Generator</h1>
        <div className="flex m-3 ">
          <input
            className="text-red-700 w-full py-1 px-3 outline-none rounded-s-lg"
            type="text"
            placeholder="Password"
            readOnly
            value={password}
          />
          <button className="bg-blue-700 px-5 p-2 outline-none shrink-0 rounded-e-lg">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-4 px-3" >
          <div className="flex gap-x-2" >
          <label htmlFor="">Length:{length} </label>
            <input type="range"
            min={8}
            max={30}
            value={length}
            onChange={(e)=> {setLength(e.target.value)}}
            className="cursor-pointer"
             />
          </div>

          <div className="flex gap-x-2">
          <label htmlFor="">Numbers </label>
            <input type="checkbox"
            defaultChecked={number}
            onChange={ 
              ()=> setNumber((prev) => !prev) 
             }            
            />
          </div>

          <div className="flex gap-x-2">
          <label htmlFor="">Characters </label>
            <input type="checkbox"
            defaultChecked={character}

            onChange={ 
              ()=> setCharacter((prev) => !prev) 
             }    

            // onChange={()=> setCharacter(!character)}
             />
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
