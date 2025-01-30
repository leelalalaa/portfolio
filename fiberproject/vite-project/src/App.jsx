import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Sparkles } from "@react-three/drei";

const RotatingCylinder = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 1, 32]} />
      <meshLambertMaterial color="#468585" emissive="#468585" />
    
      <Sparkles count={100} scale={1} size={6} speed={0.002} noise={0.2} color="orange" /> 
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <OrbitControls enableZoom enablePan enableRotate />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} intensity={10} color={0x9CD} />
      <color attach="background" args={["#F0F0F0"]} />
      <RotatingCylinder />
    </Canvas>
  );
};

export default App;
