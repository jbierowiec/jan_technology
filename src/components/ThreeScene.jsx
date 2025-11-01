import React, { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls.js";
extend({ OrbitControls: OrbitControlsImpl });

/* ----------------------------- Starfield ----------------------------- */
function Starfield({ count = 3200, radius = 220 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = radius * (0.85 + Math.random() * 0.3);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.6}
        sizeAttenuation
        color="#bcd2ff"
        transparent
        opacity={0.9}
      />
    </points>
  );
}

/* --------------------------- Camera Controls --------------------------- */
function ControlsPro({ onToggleAuto, autoRotate }) {
  const { camera, gl, scene } = useThree();
  const controls = useRef();
  const raycaster = useRef(new THREE.Raycaster());
  const ndc = useRef(new THREE.Vector2());
  const animRef = useRef(null);

  const HOME_POS = new THREE.Vector3(12, 6, 14);
  const HOME_TGT = new THREE.Vector3(0, 0, 0);

  useEffect(() => {
    const c = controls.current;
    if (!c) return;

    c.enableDamping = true;
    c.dampingFactor = 0.06;
    c.enablePan = true;
    c.screenSpacePanning = true;
    c.enableZoom = true;
    c.zoomSpeed = 0.8;
    if ("zoomToCursor" in c) c.zoomToCursor = true;
    c.autoRotate = autoRotate;
    c.autoRotateSpeed = 0.25;
    c.minDistance = 0.0001;
    c.maxDistance = Infinity;
    c.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };
    c.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
  }, [autoRotate]);

  useFrame(() => controls.current?.update());

  const pickPoint = (clientX, clientY) => {
    const rect = gl.domElement.getBoundingClientRect();
    ndc.current.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    const rc = raycaster.current;
    rc.setFromCamera(ndc.current, camera);
    rc.layers.set(1);
    const hits = rc.intersectObjects(scene.children, true);
    if (hits.length) return hits[0].point.clone();
    const dir = rc.ray.direction.clone().normalize();
    const planePoint = camera.position.clone().addScaledVector(dir, 50);
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      dir,
      planePoint
    );
    const out = new THREE.Vector3();
    rc.ray.intersectPlane(plane, out);
    return out.clone();
  };

  const flyTo = (point, distance = null, duration = 700) => {
    animRef.current = null;
    const c = controls.current;
    if (!c) return;
    const fromPos = camera.position.clone();
    const fromTgt = c.target.clone();
    const distNow = camera.position.distanceTo(point);
    const desired =
      distance ?? THREE.MathUtils.clamp(distNow * 0.35, 1.0, 80.0);
    const dir = new THREE.Vector3()
      .subVectors(point, camera.position)
      .normalize();
    const toPos = point.clone().addScaledVector(dir, -desired);
    const toTgt = point.clone();
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    animRef.current = (now) => {
      const k = Math.min(1, (now - start) / duration);
      const e = ease(k);
      camera.position.lerpVectors(fromPos, toPos, e);
      c.target.lerpVectors(fromTgt, toTgt, e);
      c.update();
      if (k < 1 && animRef.current) requestAnimationFrame(animRef.current);
      else animRef.current = null;
    };
    requestAnimationFrame(animRef.current);
  };

  useEffect(() => {
    const el = gl.domElement;
    const onPointerDown = (e) => {
      if (e.button !== 0) return;
      const point = pickPoint(e.clientX, e.clientY);
      if (!point) return;
      const d = camera.position.distanceTo(point);
      const factor = e.shiftKey ? 1.6 : 0.6;
      const targetDist = THREE.MathUtils.clamp(d * factor, 0.2, Infinity);
      flyTo(point, targetDist, 500);
    };
    const onDblClick = (e) => {
      const point = pickPoint(e.clientX, e.clientY);
      if (point) flyTo(point, null, 800);
    };
    const preventContext = (e) => e.preventDefault();
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("dblclick", onDblClick);
    el.addEventListener("contextmenu", preventContext);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("dblclick", onDblClick);
      el.removeEventListener("contextmenu", preventContext);
    };
  }, [gl, camera, scene]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "r") {
        animRef.current = null;
        camera.position.copy(HOME_POS);
        controls.current?.target.copy(HOME_TGT);
        controls.current?.update();
      } else if (e.key.toLowerCase() === "a") onToggleAuto((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onToggleAuto]);

  useEffect(() => {
    if (controls.current) controls.current.autoRotate = autoRotate;
  }, [autoRotate]);

  return <orbitControls ref={controls} args={[camera, gl.domElement]} />;
}

/* --------------------------- Scene Objects --------------------------- */
function Sun() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial
          color="#ffcc33"
          emissive="#ffb300"
          emissiveIntensity={1.6}
          roughness={0.4}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.95, 48, 48]} />
        <meshBasicMaterial color="#ffb74d" transparent opacity={0.18} />
      </mesh>
      <pointLight intensity={3} distance={260} />
    </group>
  );
}

function OrbitRing({ radius }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
      <meshBasicMaterial
        color="#93a3b8"
        transparent
        opacity={0.35}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Moon({ radius = 0.03, distance = 0.35, color = "#aaa", speed = 1.5 }) {
  const grp = useRef();
  const sphere = useRef();
  useEffect(() => sphere.current?.layers.enable(1), []);
  useFrame((_, d) => (grp.current.rotation.y += d * speed));
  return (
    <group ref={grp}>
      <group position={[distance, 0, 0]}>
        <mesh ref={sphere}>
          <sphereGeometry args={[radius, 24, 24]} />
          <meshStandardMaterial color={color} roughness={0.8} metalness={0.0} />
        </mesh>
      </group>
    </group>
  );
}

function Planet({
  name,
  radius = 0.15,
  distance = 4,
  color = "#6aa0ff",
  speed = 1.0,
  tilt = 0.0,
  rings = null,
  moons = [],
}) {
  const orbit = useRef();
  const sphere = useRef();
  useFrame((_, delta) => {
    orbit.current.rotation.y += delta * speed;
    sphere.current.rotation.y += delta * 0.2;
  });
  useEffect(() => sphere.current?.layers.enable(1), []);
  return (
    <>
      <OrbitRing radius={distance} />
      <group ref={orbit} name={`${name}-orbit`}>
        <group position={[distance, 0, 0]} rotation={[tilt, 0, 0]}>
          <mesh ref={sphere} name={name} castShadow receiveShadow>
            <sphereGeometry args={[radius, 48, 48]} />
            <meshStandardMaterial
              color={color}
              roughness={0.65}
              metalness={0.1}
            />
          </mesh>
          {rings && (
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[rings.inner, rings.outer, 128]} />
              <meshBasicMaterial
                color={rings.color || "#e5e7eb"}
                side={THREE.DoubleSide}
                transparent
                opacity={0.6}
              />
            </mesh>
          )}
          {moons.map((m, i) => (
            <Moon key={i} {...m} />
          ))}
        </group>
      </group>
    </>
  );
}

/* --------------------------------- Scene --------------------------------- */
export default function ThreeScene() {
  const [autoRotate, setAutoRotate] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl border border-black/10 bg-white p-2 shadow-2xl
                 dark:border-white/10 dark:bg-[#0b1120] transition-colors duration-500
                 aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9]"
      aria-label="Interactive 3D solar system"
      role="img"
    >
      <Canvas
        camera={{ position: [12, 6, 14], fov: 50, near: 0.001, far: 1e9 }}
        dpr={Math.min(window.devicePixelRatio || 1, 2)}
        className="!absolute !inset-0 !h-full !w-full block"
      >
        <color attach="background" args={[0x000000]} />
        <ambientLight intensity={0.25} />
        <Starfield />
        <Sun />
        <Planet
          name="Mercury"
          radius={0.06}
          distance={3.0}
          color="#c0c0c0"
          speed={2.1}
        />
        <Planet
          name="Venus"
          radius={0.09}
          distance={4.2}
          color="#e0a76b"
          speed={1.7}
        />
        <Planet
          name="Earth"
          radius={0.095}
          distance={5.9}
          color="#6ab7ff"
          speed={1.25}
          tilt={0.41}
          moons={[
            { radius: 0.026, distance: 0.34, color: "#cfd8dc", speed: 2.0 },
          ]}
        />
        <Planet
          name="Mars"
          radius={0.05}
          distance={7.6}
          color="#c7786b"
          speed={1.05}
        />
        <Planet
          name="Jupiter"
          radius={0.3}
          distance={10.8}
          color="#f5d07a"
          speed={0.72}
          moons={[
            { radius: 0.03, distance: 0.6, color: "#b0bec5", speed: 2.2 },
            { radius: 0.028, distance: 0.8, color: "#bdbdbd", speed: 1.8 },
            { radius: 0.032, distance: 1.0, color: "#cfd8dc", speed: 1.5 },
          ]}
        />
        <Planet
          name="Saturn"
          radius={0.26}
          distance={14.5}
          color="#e3d3a0"
          speed={0.58}
          tilt={0.5}
          rings={{ inner: 0.46, outer: 0.9, color: "#e5e7eb" }}
          moons={[
            { radius: 0.028, distance: 0.7, color: "#c7d1d9", speed: 1.8 },
            { radius: 0.024, distance: 1.0, color: "#b0bec5", speed: 1.3 },
          ]}
        />
        <Planet
          name="Uranus"
          radius={0.18}
          distance={17.8}
          color="#9bb7c6"
          speed={0.47}
          tilt={1.0}
        />
        <Planet
          name="Neptune"
          radius={0.17}
          distance={20.8}
          color="#7aa6f5"
          speed={0.4}
          tilt={0.6}
        />
        <ControlsPro autoRotate={autoRotate} onToggleAuto={setAutoRotate} />
      </Canvas>

      {/* Bottom Controls and Help */}
      <div className="absolute inset-x-0 bottom-2 flex justify-end items-end pr-3 pb-2">
        {showHelp && (
          <div
            className="pointer-events-auto mr-2 rounded-2xl border border-black/10 bg-white/80 px-4 py-2 text-[11px] sm:text-xs 
                       text-slate-700 shadow-md dark:border-white/10 dark:bg-slate-900/70 dark:text-white/80 
                       transition-all duration-300"
          >
            Rotate: left-drag • Pan: right-drag / two-finger drag • Zoom follows
            cursor: scroll
            <br />
            Click to zoom • Shift+Click to zoom out • Double-click fly-to • R:
            Home • A: Auto-rotate
          </div>
        )}
        <button
          onClick={() => setShowHelp((v) => !v)}
          className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-xl border border-black/10 bg-white/80 
                     text-slate-700 shadow-md hover:bg-white transition dark:border-white/10 dark:bg-slate-900/70 
                     dark:text-white/80 dark:hover:bg-slate-900"
          aria-label={showHelp ? "Hide controls" : "Show controls"}
          title={showHelp ? "Hide controls" : "Show controls"}
        >
          ?
        </button>
      </div>
    </div>
  );
}
