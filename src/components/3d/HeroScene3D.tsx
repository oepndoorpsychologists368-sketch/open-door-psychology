import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Wind, Sun, Compass, Heart } from 'lucide-react';

type AtmosphereMode = 'blush' | 'noir' | 'dream';

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
  blush: {
    name: 'Blush & Silk',
    orbColor: '#FFF9FC',
    ribbon1Color: '#F6C5D7', // Blush Pink
    ribbon2Color: '#EFA0BF', // Rose Pink
    lightWarmth: '#FFF9FC',
    lightRim: '#F6C5D7',
    ambientIntensity: 0.95,
  },
  noir: {
    name: 'Midnight Velvet',
    orbColor: '#151218',
    ribbon1Color: '#EFA0BF', // Rose Pink
    ribbon2Color: '#C87596', // Dusty Rose
    lightWarmth: '#FBE3EC',
    lightRim: '#F6C5D7',
    ambientIntensity: 0.85,
  },
  dream: {
    name: 'Dreamy Baby Pink',
    orbColor: '#FBE3EC',
    ribbon1Color: '#F6C5D7', // Blush Pink
    ribbon2Color: '#FFFFFF', // Pure White
    lightWarmth: '#FFFFFF',
    lightRim: '#EFA0BF',
    ambientIntensity: 0.9,
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

    // Gentle 4-7-8 breathing rhythm
    const breath = 1.0 + Math.sin(t * 0.9) * 0.055;
    meshRef.current.scale.set(breath, breath, breath);

    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.08;
  });

  return (
    <mesh ref={meshRef} geometry={baseGeom}>
      <meshPhysicalMaterial
        color={atmosphere.orbColor}
        roughness={0.15}
        metalness={0.08}
        transmission={0.65}
        thickness={1.2}
        ior={1.45}
        clearcoat={0.9}
        clearcoatRoughness={0.1}
        reflectivity={0.65}
        attenuationColor={new THREE.Color(atmosphere.ribbon1Color)}
        attenuationDistance={1.8}
        transparent
        opacity={0.88}
      />
    </mesh>
  );
}

// 2. Calming Ribbons wrapping around the vessel
function CalmingRibbons({
  atmosphere,
  speed = 0.8,
}: {
  atmosphere: AtmosphereConfig;
  speed: number;
}) {
  const ribbon1Ref = useRef<THREE.Mesh>(null!);
  const ribbon2Ref = useRef<THREE.Mesh>(null!);

  const torusGeom1 = useMemo(() => new THREE.TorusGeometry(1.9, 0.05, 32, 100), []);
  const torusGeom2 = useMemo(() => new THREE.TorusGeometry(2.25, 0.035, 32, 100), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;

    if (ribbon1Ref.current) {
      ribbon1Ref.current.rotation.x = Math.sin(t * 0.4) * 0.5 + 0.6;
      ribbon1Ref.current.rotation.y = t * 0.25;
      ribbon1Ref.current.rotation.z = Math.cos(t * 0.3) * 0.3;
    }

    if (ribbon2Ref.current) {
      ribbon2Ref.current.rotation.x = -Math.cos(t * 0.35) * 0.4 - 0.4;
      ribbon2Ref.current.rotation.y = -t * 0.2;
      ribbon2Ref.current.rotation.z = Math.sin(t * 0.25) * 0.4;
    }
  });

  return (
    <group>
      <mesh ref={ribbon1Ref} geometry={torusGeom1}>
        <meshStandardMaterial
          color={atmosphere.ribbon1Color}
          roughness={0.25}
          metalness={0.3}
          emissive={atmosphere.ribbon1Color}
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh ref={ribbon2Ref} geometry={torusGeom2}>
        <meshStandardMaterial
          color={atmosphere.ribbon2Color}
          roughness={0.35}
          metalness={0.2}
          emissive={atmosphere.ribbon2Color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

// 3. Gentle Floating Dust Motes (Soft Pink & White)
function GentleDustMotes({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorPink = new THREE.Color('#F6C5D7');
    const colorRose = new THREE.Color('#EFA0BF');
    const colorWhite = new THREE.Color('#FFF9FC');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 7.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5.0;

      const chosenColor = Math.random() > 0.6 ? colorPink : Math.random() > 0.3 ? colorRose : colorWhite;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.04;
    pointsRef.current.rotation.x = Math.sin(t * 0.03) * 0.06;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 4. Soft Studio Lighting Rig with pink ambient highlights
function StudioLighting({ atmosphere }: { atmosphere: AtmosphereConfig }) {
  return (
    <>
      <ambientLight color={atmosphere.lightWarmth} intensity={atmosphere.ambientIntensity} />
      <directionalLight
        position={[4, 5, 4]}
        intensity={1.2}
        color={atmosphere.lightWarmth}
      />
      <pointLight
        position={[-4, -3, -2]}
        intensity={0.8}
        color={atmosphere.lightRim}
      />
      <pointLight
        position={[0, 4, -3]}
        intensity={0.65}
        color="#F6C5D7"
      />
    </>
  );
}

// 5. Main HeroScene3D export
export function HeroScene3D() {
  const [atmosphereKey, setAtmosphereKey] = useState<AtmosphereMode>('blush');
  const [breathingPace, setBreathingPace] = useState<'4-7-8' | 'gentle' | 'still'>('4-7-8');
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const atmosphere = ATMOSPHERES[atmosphereKey];

  const paceSpeed = useMemo(() => {
    switch (breathingPace) {
      case '4-7-8':
        return 0.7;
      case 'gentle':
        return 1.1;
      case 'still':
        return 0.25;
    }
  }, [breathingPace]);

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
      className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B0A0D] via-[#151218] to-[#25202B] border border-[#F6C5D7]/25 shadow-[0_16px_50px_rgba(11,10,13,0.7)]"
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
            <GentleDustMotes count={60} />
          </group>
        </Float>
      </Canvas>

      {/* Top Left Badge */}
      <div className="absolute top-5 left-5 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151218]/90 backdrop-blur-md border border-[#F6C5D7]/30 text-xs font-semibold text-[#FFF9FC] shadow-[0_4px_16px_rgba(11,10,13,0.4)]">
          <Sparkles className="w-3.5 h-3.5 text-[#F6C5D7]" />
          <span>Sanctuary Kinetic Installation</span>
        </div>
      </div>

      {/* Floating Art Pedestal Control Dock (Bottom) */}
      <div className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-5 z-10">
        <div className="rounded-2xl bg-[#151218]/92 backdrop-blur-md border border-[#F6C5D7]/30 p-3 sm:p-4 shadow-[0_12px_36px_rgba(11,10,13,0.6)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FFF9FC]">
          {/* Atmosphere Picker */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[11px] font-bold text-[#BEB7C0] uppercase tracking-wider font-sans mr-1">
              Palette:
            </span>
            {(['blush', 'noir', 'dream'] as AtmosphereMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setAtmosphereKey(mode)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  atmosphereKey === mode
                    ? 'bg-[#F6C5D7] text-[#0B0A0D] shadow-[0_2px_10px_rgba(246,197,215,0.4)]'
                    : 'bg-white/10 hover:bg-white/20 text-[#FFF9FC]'
                }`}
              >
                {mode === 'blush' && 'Blush'}
                {mode === 'noir' && 'Velvet'}
                {mode === 'dream' && 'Dream'}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-white/15 hidden sm:block" />

          {/* Breathing Rhythm Toggle */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-[11px] font-bold text-[#BEB7C0] uppercase tracking-wider font-sans mr-1 flex items-center gap-1">
              <Wind className="w-3 h-3 text-[#F6C5D7]" />
              <span>Rhythm:</span>
            </span>
            <div className="flex items-center gap-1">
              {(['4-7-8', 'gentle', 'still'] as const).map((rhythm) => (
                <button
                  key={rhythm}
                  type="button"
                  onClick={() => setBreathingPace(rhythm)}
                  className={`px-2 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    breathingPace === rhythm
                      ? 'bg-[#EFA0BF] text-[#0B0A0D] shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-[#FFF9FC]'
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
