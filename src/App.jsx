import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);

  const [password, setPassword] = useState("Password");

  const passwordRef = useRef(null)

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

  const copyPassword = useCallback (()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 30);
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect( ()=>{
    
    passwordGenerator()
  }, [length, number, character, passwordGenerator] )

  return (
    <>
      <div className="bg-black max-w-lg w-full mx-auto rounded-lg p-4 my-8  text-white ">
        <h1 className=" font-bold  text-4xl ">Auto Password Generator</h1>
        <div className="flex m-3 ">
          <input
            className="text-red-700 w-full py-1 px-3 outline-none rounded-s-lg cursor-not-allowed"
            type="text"
            placeholder="Password"
            readOnly
            value={password}
            ref={passwordRef}
          />
          <button className="bg-blue-700 px-5 p-2 outline-none shrink-0 rounded-e-lg hover:bg-blue-800 hover:text-red-600 "
          onClick={copyPassword}>
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-4 px-3" >
          <div className="flex gap-x-2" >
          <label htmlFor="length" className="hover:text-red-600">Length:{length} </label>
            <input type="range"
            id="length"
            min={8}
            max={30}
            value={length}
            onChange={(e)=> {setLength(e.target.value)}}
            className="cursor-pointer "
             />
          </div>

          <div className="flex gap-x-2">
          <label htmlFor="number" className="hover:text-red-600">Numbers </label>
            <input  type="checkbox"
            id="number"
            defaultChecked={number}
            onChange={ 
              ()=> setNumber((prev) => !prev) 
             }            
            />
          </div>

          <div className="flex gap-x-2">
          <label htmlFor="character"className="hover:text-red-600" >Characters </label>
            <input type="checkbox"
            id="character"
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
