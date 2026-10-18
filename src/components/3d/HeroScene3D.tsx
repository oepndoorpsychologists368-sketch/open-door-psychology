import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Wind, Sun, Compass } from 'lucide-react';

type AtmosphereMode = 'dawn' | 'sage' | 'dusk';

interface AtmosphereConfig {
  name: string;
  orbColor: string;
  ribbon1Color: string;
  ribbon2Color: string;
  lightWarmth: string;
  lightRim: string;
  ambientIntensity: number;
}

const ATMOSPHERES: Record<AtmosphereMode, AtmosphereConfig> = {
  dawn: {
    name: 'Dawn Sanctuary',
    orbColor: '#F8F5EF',
    ribbon1Color: '#D8A69C', // Clay Rose
    ribbon2Color: '#C7D4C1', // Sage
    lightWarmth: '#FFF2DF',
    lightRim: '#163C3B',
    ambientIntensity: 0.9,
  },
  sage: {
    name: 'Sage Meadow',
    orbColor: '#C7D4C1',
    ribbon1Color: '#163C3B', // Forest Teal
    ribbon2Color: '#D8A69C', // Clay Rose
    lightWarmth: '#E8F3E5',
    lightRim: '#205453',
    ambientIntensity: 0.85,
  },
  dusk: {
    name: 'Twilight Reflection',
    orbColor: '#D9D1E7',
    ribbon1Color: '#D8A69C', // Clay Rose
    ribbon2Color: '#8B7CF6', // Lavender
    lightWarmth: '#F4DFDB',
    lightRim: '#163C3B',
    ambientIntensity: 0.8,
  },
};

// 1. Organic Breathing Vessel Mesh with ripples
function BreathingSanctuaryOrb({
  atmosphere,
  breathingSpeed = 0.8,
}: {
  atmosphere: AtmosphereConfig;
  breathingSpeed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const baseGeom = useMemo(() => new THREE.IcosahedronGeometry(1.4, 64), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * breathingSpeed;

    // Biological 4-7-8 gentle breathing rhythm
    const breath = 1.0 + Math.sin(t * 0.9) * 0.045;
    meshRef.current.scale.set(breath, breath * 1.02, breath);

    // Subtle gentle yaw
    meshRef.current.rotation.y = t * 0.08;
    meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.06;
  });

  return (
    <mesh ref={meshRef} geometry={baseGeom}>
      <meshPhysicalMaterial
        color={atmosphere.orbColor}
        roughness={0.15}
        metalness={0.08}
        transmission={0.88}
        thickness={1.6}
        ior={1.42}
        transparent
        opacity={0.92}
        clearcoat={0.85}
        clearcoatRoughness={0.12}
        reflectivity={0.65}
      />
    </mesh>
  );
}

// 2. Continuous Organic Ribbons entwined around the core
function CalmingRibbons({ atmosphere, speed = 0.8 }: { atmosphere: AtmosphereConfig; speed: number }) {
  const ribbon1Ref = useRef<THREE.Mesh>(null!);
  const ribbon2Ref = useRef<THREE.Mesh>(null!);

  const curve1 = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      const x = Math.sin(theta) * 2.1;
      const y = Math.sin(theta * 2.0) * 0.85;
      const z = Math.cos(theta) * 2.1;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points, true);
  }, []);

  const curve2 = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      const x = Math.cos(theta) * 2.3;
      const y = Math.cos(theta * 2.0) * -0.75;
      const z = Math.sin(theta) * 2.3;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points, true);
  }, []);

  const geom1 = useMemo(() => new THREE.TubeGeometry(curve1, 96, 0.075, 12, true), [curve1]);
  const geom2 = useMemo(() => new THREE.TubeGeometry(curve2, 96, 0.055, 12, true), [curve2]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (ribbon1Ref.current) {
      ribbon1Ref.current.rotation.y = t * 0.12;
      ribbon1Ref.current.rotation.z = Math.sin(t * 0.08) * 0.15;
    }
    if (ribbon2Ref.current) {
      ribbon2Ref.current.rotation.y = -t * 0.1;
      ribbon2Ref.current.rotation.x = Math.cos(t * 0.07) * 0.12;
    }
  });

  return (
    <group>
      <mesh ref={ribbon1Ref} geometry={geom1}>
        <meshPhysicalMaterial
          color={atmosphere.ribbon1Color}
          roughness={0.3}
          metalness={0.15}
          transmission={0.4}
          transparent
          opacity={0.85}
          clearcoat={0.7}
        />
      </mesh>
      <mesh ref={ribbon2Ref} geometry={geom2}>
        <meshPhysicalMaterial
          color={atmosphere.ribbon2Color}
          roughness={0.35}
          metalness={0.1}
          transmission={0.4}
          transparent
          opacity={0.8}
          clearcoat={0.6}
        />
      </mesh>
    </group>
  );
}

// 3. Floating Motes of Light & Gentle Embers
function GentleDustMotes({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 1.6 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3.5;
      pos[i * 3 + 2] = radius * Math.cos(phi);

      scl[i] = 0.025 + Math.random() * 0.035;
    }
    return [pos, scl];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += 0.003;
      if (pos[i * 3 + 1] > 2.0) {
        pos[i * 3 + 1] = -2.0;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#D8A69C"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 4. Studio Lighting Rig tailored to boutique warmth
function StudioLighting({ atmosphere }: { atmosphere: AtmosphereConfig }) {
  return (
    <>
      <ambientLight intensity={atmosphere.ambientIntensity} color={atmosphere.lightWarmth} />
      {/* Warm key light */}
      <directionalLight
        position={[4, 5, 4]}
        intensity={1.2}
        color={atmosphere.lightWarmth}
        castShadow={false}
      />
      {/* Forest Teal back/rim light */}
      <directionalLight
        position={[-4, -3, -4]}
        intensity={0.8}
        color={atmosphere.lightRim}
      />
      {/* Soft clay rose fill */}
      <pointLight position={[0, -2, 2]} intensity={0.6} color="#D8A69C" />
    </>
  );
}

export function HeroScene3D() {
  const [atmosphereKey, setAtmosphereKey] = useState<AtmosphereMode>('dawn');
  const [breathingPace, setBreathingPace] = useState<'4-7-8' | 'gentle' | 'still'>('4-7-8');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const atmosphere = ATMOSPHERES[atmosphereKey];

  const paceSpeed = breathingPace === '4-7-8' ? 0.75 : breathingPace === 'gentle' ? 0.45 : 0.15;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x: x * 0.35, y: y * 0.35 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#F8F5EF] via-[#F2EFE8] to-[#E3EBE0]/40 border border-[#163C3B]/10 shadow-[0_12px_40px_rgba(22,60,59,0.06)]"
    >
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <StudioLighting atmosphere={atmosphere} />
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
          <group position={[mousePos.x, mousePos.y, 0]}>
            <BreathingSanctuaryOrb atmosphere={atmosphere} breathingSpeed={paceSpeed} />
            <CalmingRibbons atmosphere={atmosphere} speed={paceSpeed} />
            <GentleDustMotes count={50} />
          </group>
        </Float>
      </Canvas>

      {/* Top Left Badge */}
      <div className="absolute top-5 left-5 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#163C3B]/10 text-xs font-semibold text-[#163C3B] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D8A69C]" />
          <span>The Sanctuary Portal · Kinetic 3D Installation</span>
        </div>
      </div>

      {/* Floating Art Pedestal Control Dock (Bottom Right) */}
      <div className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-5 z-10">
        <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-[#163C3B]/12 p-3 sm:p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#252927]">
          {/* Atmosphere Picker */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider font-sans mr-1">
              Atmosphere:
            </span>
            {(['dawn', 'sage', 'dusk'] as AtmosphereMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setAtmosphereKey(mode)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  atmosphereKey === mode
                    ? 'bg-[#163C3B] text-[#F8F5EF] shadow-xs'
                    : 'bg-neutral-100/80 hover:bg-neutral-200 text-neutral-600'
                }`}
              >
                {mode === 'dawn' && 'Dawn'}
                {mode === 'sage' && 'Sage'}
                {mode === 'dusk' && 'Dusk'}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-neutral-200 hidden sm:block" />

          {/* Breathing Rhythm Toggle */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider font-sans mr-1 flex items-center gap-1">
              <Wind className="w-3 h-3 text-[#163C3B]" />
              <span>Rhythm:</span>
            </span>
            <div className="flex items-center gap-1">
              {(['4-7-8', 'gentle', 'still'] as const).map((rhythm) => (
                <button
                  key={rhythm}
                  type="button"
                  onClick={() => setBreathingPace(rhythm)}
                  className={`px-2 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    breathingPace === rhythm
                      ? 'bg-[#D8A69C] text-[#163C3B] font-bold shadow-xs'
                      : 'bg-neutral-100/80 hover:bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {rhythm === '4-7-8' ? '4-7-8 Calm' : rhythm === 'gentle' ? 'Gentle Flow' : 'Stillness'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
