import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

function LiquidMetal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 64);
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    uniforms.uTime.value = time;
    uniforms.uMouse.value.set(pointer.x, pointer.y);
    
    // Morph vertices based on noise
    const positions = meshRef.current.geometry.attributes.position;
    const originalPositions = geometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = originalPositions.getX(i);
      const y = originalPositions.getY(i);
      const z = originalPositions.getZ(i);
      
      const noise = Math.sin(x * 2 + time * 0.5) * 
                    Math.sin(y * 2 + time * 0.3) * 
                    Math.sin(z * 2 + time * 0.4) * 0.15;
      
      const mouseInfluence = (pointer.x * 0.1 + pointer.y * 0.1);
      
      const length = Math.sqrt(x * x + y * y + z * z);
      const scale = 1 + noise + mouseInfluence * 0.05;
      
      positions.setXYZ(
        i,
        (x / length) * 2 * scale,
        (y / length) * 2 * scale,
        (z / length) * 2 * scale
      );
    }
    
    positions.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
    
    // Slow rotation
    meshRef.current.rotation.y = time * 0.1 + pointer.x * 0.3;
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.2 + pointer.y * 0.2;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color="#888888"
          metalness={1}
          roughness={0.15}
          envMapIntensity={1.5}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.5} />
      
      <LiquidMetal />
      
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr"
        background={false}
      />
    </>
  );
}

export default function LiquidMetalScene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
