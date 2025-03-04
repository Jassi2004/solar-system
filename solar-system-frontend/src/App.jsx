import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sun from './components/Sun'
import { Canvas } from "@react-three/fiber";
import Mercury from './components/Mercury'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      {/* <Sun/> */}
      <ambientLight intensity={0.5} />
  
  {/* Directional light to mimic sunlight */}
  <directionalLight position={[5, 5, 5]} intensity={2} />

  {/* Point light to illuminate Mercury from a specific spot */}
  <pointLight position={[2, 2, 2]} intensity={1.5} />

      <Mercury/>
    </Canvas>
    </>
  )
}

export default App
