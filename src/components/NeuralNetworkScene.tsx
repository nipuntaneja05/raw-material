import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Configuration
const particleCount = 150;
const connectionDistance = 2.5;
const baseSpeed = 0.2;

const Particles = () => {
  const { viewport } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // 1. Initialize Particles (Positions and Velocities)
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * viewport.width * 1.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      vel[i * 3] = (Math.random() - 0.5) * baseSpeed;
      vel[i * 3 + 1] = (Math.random() - 0.5) * baseSpeed;
      vel[i * 3 + 2] = (Math.random() - 0.5) * baseSpeed * 0.5;
    }
    return [pos, vel];
  }, [viewport]);

  // 2. Initialize geometry for lines
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const maxLines = particleCount * particleCount;
    const linePositions = new Float32Array(maxLines * 3 * 2);
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, []);

  // 3. Animation Loop
  useFrame((_state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;

    // We cast to BufferAttribute to satisfy TS
    const pointGeo = pointsRef.current.geometry;
    const pointPositions = (pointGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;

    // A. Update particle positions
    for (let i = 0; i < particleCount; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Update local array (which is a reference to the buffer attribute array)
      pointPositions[ix] += velocities[ix] * delta;
      pointPositions[iy] += velocities[iy] * delta;
      pointPositions[iz] += velocities[iz] * delta;

      // Bounce off boundaries
      if (pointPositions[ix] > viewport.width / 1.5 || pointPositions[ix] < -viewport.width / 1.5) velocities[ix] *= -1;
      if (pointPositions[iy] > viewport.height / 1.5 || pointPositions[iy] < -viewport.height / 1.5) velocities[iy] *= -1;
      if (pointPositions[iz] > 5 || pointPositions[iz] < -5) velocities[iz] *= -1;
    }
    
    pointGeo.attributes.position.needsUpdate = true;

    // B. Draw Connections
    let vertexIndex = 0;
    const lineGeo = linesRef.current.geometry;
    const linePositions = (lineGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
    
    const connectionDistanceSq = connectionDistance * connectionDistance;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const ix = i * 3;
        const jx = j * 3;

        const dx = pointPositions[ix] - pointPositions[jx];
        const dy = pointPositions[ix + 1] - pointPositions[jx + 1];
        const dz = pointPositions[ix + 2] - pointPositions[jx + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < connectionDistanceSq) {
          linePositions[vertexIndex++] = pointPositions[ix];
          linePositions[vertexIndex++] = pointPositions[ix + 1];
          linePositions[vertexIndex++] = pointPositions[ix + 2];

          linePositions[vertexIndex++] = pointPositions[jx];
          linePositions[vertexIndex++] = pointPositions[jx + 1];
          linePositions[vertexIndex++] = pointPositions[jx + 2];
        }
      }
    }

    lineGeo.setDrawRange(0, vertexIndex / 3);
    lineGeo.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#ffffff"
          transparent
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#00aaff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
};

export default function NeuralNetworkScene() {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 25]} />
        <Particles />
      </Canvas>
    </div>
  );
}