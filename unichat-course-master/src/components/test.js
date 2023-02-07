import React,{useRef} from 'react'

function Test() {
    const inputRef = useRef(null);
   const  handleSubmitButton =()=>{
    alert(inputRef.current.value)
   }
  return (
    <div>
            <input type="text"
                    ref={inputRef}        
                />
                <input type="submit" value="submit"
                onClick={handleSubmitButton}
                />

    </div>
  )
}

export default Test