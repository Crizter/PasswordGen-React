import React from "react";


import { useState, useCallback,useRef, useEffect } from "react";
export default function App() {
  //
  const [password , setPassword]  = useState("")  // 
  const [length , setLength] = useState(8) // useState for setting the length of the password 
  const [charAllowed , setCharAllowed] = useState(false)  // useState for allowing whether we should take teh char or not , keep the default value as true or false  
  // upon selection it will change to its opposite value 

  const [numberAllowed , setNumberAllowed] = useState(false)

  // useCallBack function is being used for  memoize this function
  // optimizes the code and prevents its rerendering 


  const passWordGenerator = useCallback( () =>{
   let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

   
            if(numberAllowed) {
              str += "1234567890"

            }
            if(charAllowed){
              str += "~!@#$%^&*()_+{}"

            }
            // generate the password 
            for (let i = 0; i < length; i++) {
            let  chr = Math.floor(Math.random() * str.length + 1)
            // storing the  random letter in pass using charAt, charAt returns the value of the index             
            pass += str.charAt(chr)
            }

          
          setPassword(pass)   // sending the password in setPassword method

  },[length , numberAllowed, charAllowed, setPassword])

  // whenever any of the dependencies is changed
  useEffect(() => { passWordGenerator()
  }, [length, numberAllowed, charAllowed, passWordGenerator])

  const passwordRef = useRef(null) 

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select(); // to enhance user experience, shows the selected text
    passwordRef.current?.setSelectionRange(0, 999); // selecting the range of selection
    window.navigator.clipboard.writeText(password); // copies the password to the clipboard 
  }, [password]);
  
  return (
    <div className="bg-black h-screen text-white flex flex-col items-center justify-center ">
      <div
        href="#"
        className="flex flex-col items-center  max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Password generator
        </h5>
        <input
        className="rounded-lg p-3 px-4 text-black"
        type = "text"
        value = {password}  
        placeholder="Password"
        readOnly
        ref = {passwordRef}     // getting the reference of the password 
        >
        </input>
        <button 
        onClick={copyToClipBoard} // invoking the copy function on clicking
        type="button" 
        className ="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Copy
        </button>
        <div>
        <input
          type ="range" 
          min={8}
          max={30}
          value= {length} 
          className="cursor-pointer"
          onChange={(e) => { // on changing the slider we will get the range value 
                setLength(e.target.length)
    
          }}  
        />
        <label>Length: {length}</label>
        </div>
        <label htmlFor="charInput">
          <input
          type="checkBox"
          onChange={() => { 
            setCharAllowed((prev) => !prev)
          }}
          />
          Character
        </label>
        <label htmlFor="numberInput">
          <input
          onChange={() => { 
            setNumberAllowed((prev) => !prev)
            
          }}
          type="checkBox"
          />
          Numbers
        </label>
      

      </div>
    </div>
  );
}
