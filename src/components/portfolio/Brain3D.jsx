import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';

function BrainModel() {
  const { scene } = useGLTF('/brain_hologram.glb');
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.005;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });
  return <primitive ref={ref} object={scene} scale={1.8} position={[0, 0, 0]} />;
}

export default function Brain3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-3, 3, 3]} intensity={1} color="#6366F1" />
      <pointLight position={[3, -3, -3]} intensity={0.8} color="#EC4899" />
      <Suspense fallback={null}>
        <BrainModel />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5} />
    </Canvas>
  );
}
