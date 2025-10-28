import React, { useRef } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls.js";
extend({ OrbitControls: OrbitControlsImpl });

function SpinningKnot({ color = "#7c3aed", reduceMotion = false }) {
  const mesh = useRef();
  const t = useRef(0);
  useFrame((_, delta) => {
    if (!mesh.current) return;
    const speed = reduceMotion ? 0.08 : 1;
    t.current += delta * speed;
    mesh.current.rotation.x += 0.25 * delta * speed;
    mesh.current.rotation.y += 0.35 * delta * speed;
    const s = 1 + Math.sin(t.current * 1.2) * (reduceMotion ? 0.015 : 0.05);
    mesh.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={mesh} castShadow receiveShadow>
      <torusKnotGeometry args={[1.1, 0.34, 220, 32]} />
      <meshStandardMaterial metalness={0.45} roughness={0.2} color={color} />
    </mesh>
  );
}

function Controls({ reduceMotion }) {
  const { camera, gl } = useThree();
  const ref = useRef();
  useFrame(() => ref.current?.update());
  return (
    <orbitControls
      ref={ref}
      args={[camera, gl.domElement]}
      enablePan={false}
      enableZoom={false}
      autoRotate={!reduceMotion}
      autoRotateSpeed={0.6}
    />
  );
}

export default function ThreeScene() {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className="
        relative w-full overflow-hidden
        rounded-3xl border border-black/10 bg-white p-2 shadow-2xl
        dark:border-white/10 dark:bg-[#0b1120] transition-colors duration-500

        aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9]
        touch-pan-y
      "
      aria-label="Interactive 3D preview"
      role="img"
    >
      <Canvas
        camera={{ position: [2.8, 2.4, 3.2], fov: 50 }}
        shadows
        className="!absolute !inset-0 !h-full !w-full block"
        style={{ display: "block" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 3]} intensity={1.1} castShadow />
        <SpinningKnot reduceMotion={reduceMotion} />
        <Controls reduceMotion={reduceMotion} />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
        <div className="rounded-full bg-black/5 px-3 py-1 text-[11px] sm:text-xs text-slate-700 shadow dark:bg-white/5 dark:text-white/70">
          Drag to orbit
        </div>
      </div>
    </div>
  );
}
