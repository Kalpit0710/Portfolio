"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sparkles, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function InteractiveLiquidBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  // Persistent vector to avoid garbage collection leaks
  const targetPos = new THREE.Vector3(0, 0, 0);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle continuous flowy rotation
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
      
      // Smoothly map mouse to screen positions
      targetPos.set(state.pointer.x * 2.5, state.pointer.y * 2.5, 0);
      
      // ultra-smooth easing via lerp gives a lag-free, "flowy" liquid feel
      meshRef.current.position.lerp(targetPos, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      <Sphere ref={meshRef} visible args={[1, 128, 128]} scale={2.6}>
        <MeshDistortMaterial
          color="#0f172a"
          attach="material"
          distort={0.4} // High distortion for liquid effect
          speed={1.5}   // Fluid animation speed
          roughness={0.1}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={3} color="#3b82f6" />
      <directionalLight position={[-10, 10, -5]} intensity={2} color="#2dd4bf" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#ffffff" />
      
      <InteractiveLiquidBlob />
      
      <Sparkles count={100} scale={15} size={2} speed={0.4} opacity={0.3} color="#3b82f6" />
      <Environment preset="city" />
    </>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="sticky top-0 h-screen w-full overflow-hidden flex items-center z-0">
      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        <Canvas camera={{ position: [0, 3, 10], fov: 50 }} dpr={[1, 2]}>
          <Scene />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none md:block hidden z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-0" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full px-6 container mx-auto max-w-7xl pointer-events-none">
        <div className="max-w-4xl pt-20 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md mb-8 items-center gap-3"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-gray-300 font-mono text-xs uppercase tracking-widest font-medium">
              Available for work
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-display font-extrabold text-white mb-6 leading-[0.9] tracking-tighter"
          >
            Kalpit <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">Agarwal.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-3xl text-gray-400 max-w-2xl mb-12 font-light leading-relaxed font-sans"
          >
            Elevating digital experiences. <strong className="text-white font-medium">Full Stack Developer</strong> & UX Enthusiast engineering premium web interfaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a
              href="#projects"
              className="px-8 py-5 rounded-full bg-white text-black font-semibold text-lg hover:bg-gray-200 hover:scale-105 transition-all flex items-center justify-center gap-3 group"
            >
              Explore Works
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#contact"
              className="px-8 py-5 rounded-full bg-white/5 border border-white/10 text-white font-medium text-lg hover:bg-white/10 transition-colors backdrop-blur-lg flex items-center justify-center"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-auto md:right-10 flex items-center gap-4 text-gray-500 hover:text-white transition-colors group cursor-pointer z-20 pointer-events-auto"
      >
        <span className="text-sm font-mono uppercase tracking-widest rotate-90 origin-left translate-x-3">Scroll</span>
        <div className="w-[1px] h-24 bg-gray-500/30 overflow-hidden ml-6">
          <motion.div
            animate={{ y: [0, 96, 96] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-full h-1/3 bg-primary"
          />
        </div>
      </motion.a>
    </section>
  );
}
