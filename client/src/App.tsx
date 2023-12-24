import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => setCount(count + 1)}>Click me</button>
    </>
  )
}

export default App
