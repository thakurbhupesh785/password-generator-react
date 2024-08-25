import { useState , useCallback, useEffect, useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')


  const passwordRef = useRef(null)

  // used useCallback for optimisation
  // can be done without useCallback

  const passwordGenerator = useCallback( () =>{
  let pass='';
  let str='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  if (numAllowed) str += '1234567890'
  if (charAllowed) str += "!@#$%^&*()-_{}[]/"

  for (let i = 0; i < length; i++) {
    let indexOfPass = Math.floor(Math.random()*str.length+1)
   pass += str.charAt(indexOfPass)
  }

  setPassword(pass)
  },[length,numAllowed,charAllowed,setPassword])

  // here we don't need to put setpassword on dependencies
  // but we have put it for optimisation


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,18)
    window.navigator.clipboard.writeText(password)
  }, [password])

  // used useEffect bcz if we simply use function 
  // then there will be too many re-renders

  useEffect(() => {
    passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator])
  
  return (
   <>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my8
   bg-gray-800 text-orange-500'>
    <h1 className='text-white text-4xl text-center my-3'>Password Generator</h1>
  <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input
    type='text'
    value={password}
    className='outline-none w-full py-1 px-3'
    placeholder='password'
    readOnly
    ref={passwordRef}
    />
    <button
    onClick={copyPasswordToClipboard}
    className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
  </div>
  <div className='flex text-sm gap-x-2'>
     <div className='flex items-center gap-x-1'>
       <input type='range'
       min={6}
       max={20}
       value={length}
       className='cursor-pointer'
       //onChange={(event) => {setLength(event.target.value)}}
       // event.target gives us the element that triggered the event
       onChange={(e) =>{setLength(e.target.value)}}
       />
       <label>Length: {length}</label>
     </div>
     <div className='flex items-center gap-x-1'>
       <input type='checkbox'
       id='numberInput'
       defaultChecked={numAllowed}
       onChange={() => {setNumAllowed((prev) => !prev)}}
       />
       <label htmlFor='numberInput'>Numbers</label>
     </div>
     <div className='flex items-center gap-x-1'>
       <input type='checkbox'
       id='characterInput'
       defaultChecked={charAllowed}
       onChange={() => {setCharAllowed((prev) => !prev)}}
       />
       <label htmlFor='characterInput'>Characters</label>
     </div>

  </div>
   </div>
   </>
  )
}

export default App
