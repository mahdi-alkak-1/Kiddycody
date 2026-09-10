"use client";

import { useEffect, useRef, useState } from "react";
import type * as Three from "three";

export default function CodingWorld({ paused, burst, reducedMotion }: { paused: boolean; burst: number; reducedMotion: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const settings = useRef({ paused, burst, reducedMotion });
  const [ready, setReady] = useState(false);
  useEffect(() => { settings.current = { paused, burst, reducedMotion }; }, [paused, burst, reducedMotion]);

  useEffect(() => {
    let cancelled = false;
    let dispose = () => {};
    const node = host.current;
    if (!node) return;
    async function initialize() {
      const [THREE, { RoundedBoxGeometry }] = await Promise.all([import("three"), import("three/addons/geometries/RoundedBoxGeometry.js")]);
      if (cancelled || !node) return;
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.45;
      node.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");
      const camera = new THREE.OrthographicCamera(-4.1, 4.1, 4.1, -4.1, 0.1, 60);
      camera.position.set(6.8, 5.1, 12);
      camera.lookAt(0.35, -0.15, 0);
      scene.add(new THREE.HemisphereLight(0xffffff, 0xb1bacb, 2.9));
      const key = new THREE.DirectionalLight(0xfff5e1, 4.3);
      key.position.set(-4, 8, 7); key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = -7; key.shadow.camera.right = 7; key.shadow.camera.top = 7; key.shadow.camera.bottom = -7;
      key.shadow.normalBias = 0.035; key.shadow.bias = -0.0005;
      key.shadow.radius = 4;
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xd5efff, 2.2); rim.position.set(5, 4, -5); scene.add(rim);
      const materials: Three.Material[] = [];
      const geometries: Three.BufferGeometry[] = [];
      function material(color: string, roughness = 0.36) {
        const m = new THREE.MeshPhysicalMaterial({ color, roughness, metalness: 0.06, clearcoat: 0.45, clearcoatRoughness: 0.4 });
        materials.push(m); return m;
      }
      const red = material("#F15C4C"), yellow = material("#F2C94C"), blue = material("#3498DB"), teal = material("#1ABC9C");
      const colors = { red, yellow, blue, teal };
      const darks = { red: material("#BA3D31", 0.6), yellow: material("#B99935", 0.6), blue: material("#246997", 0.6), teal: material("#138C73", 0.6) };
      function box(x: number, y: number, z: number, radius = 0.08) { const g = new RoundedBoxGeometry(x, y, z, 3, radius); geometries.push(g); return g; }
      const bodyGeo = box(1.12, 0.91, 1.12);
      const frontGeo = box(1.12, 0.15, 0.20, 0.042);
      const sideGeo = box(0.20, 0.15, 0.78, 0.042);
      const wellGeo = box(0.73, 0.035, 0.73, 0.025);
      function cube(color: keyof typeof colors) {
        const group = new THREE.Group();
        function add(geo: Three.BufferGeometry, mat: Three.Material, x: number, y: number, z: number) {
          const mesh = new THREE.Mesh(geo, mat); mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; group.add(mesh);
        }
        add(bodyGeo, colors[color], 0, -0.06, 0);
        add(frontGeo, colors[color], 0, 0.445, 0.46); add(frontGeo, colors[color], 0, 0.445, -0.46);
        add(sideGeo, colors[color], 0.46, 0.445, 0); add(sideGeo, colors[color], -0.46, 0.445, 0);
        add(wellGeo, darks[color], 0, 0.399, 0);
        return group;
      }
      const world = new THREE.Group(); scene.add(world);
      const logo = new THREE.Group(); world.add(logo);
      const layout: [number, number, number, keyof typeof colors][] = [
        [-1.5, 1.45, 0, "red"], [-1.5, 0.25, 0, "red"], [-1.5, -0.95, 0, "red"],
        [-0.34, 0.84, 0, "yellow"], [0.82, 1.43, 0, "yellow"], [1.98, 1.43, 0, "yellow"],
        [-0.34, -0.38, 0, "blue"], [0.82, -0.98, 0, "blue"], [1.98, -0.98, 0, "blue"],
      ];
      const pieces = layout.map(([x,y,z,color], i) => {
        const object = cube(color); object.position.set(x,y,z); logo.add(object);
        return { object, home: new THREE.Vector3(x,y,z), spread: new THREE.Vector3((x + 0.1) * 0.38, (y + 0.15) * 0.42, (i % 2 ? 1 : -1) * 0.55), index: i };
      });
      logo.rotation.y = -0.12;
      const platformGeo = new THREE.CylinderGeometry(3.55, 3.45, 0.18, 96); geometries.push(platformGeo);
      const platform = new THREE.Mesh(platformGeo, material("#eeeeda", 0.85)); platform.position.set(0,-2.05,0); platform.receiveShadow = true; world.add(platform);
      const ringGeo = new THREE.TorusGeometry(3.2, 0.012, 8, 100); geometries.push(ringGeo);
      const ring = new THREE.Mesh(ringGeo, material("#c9ccb0", 0.9)); ring.rotation.x = Math.PI / 2; ring.position.y = -1.949; world.add(ring);
      const shadowGeo = new THREE.PlaneGeometry(40,40); geometries.push(shadowGeo);
      const shadowMat = new THREE.ShadowMaterial({ color: 0x647570, opacity: 0.11 }); materials.push(shadowMat);
      const floor = new THREE.Mesh(shadowGeo, shadowMat); floor.rotation.x = -Math.PI/2; floor.position.y = -2.18; floor.receiveShadow = true; scene.add(floor);
      const satellites = [
        { object: cube("teal"), home: new THREE.Vector3(-2.75, 2.3, -0.2), scale: 0.43 },
        { object: cube("yellow"), home: new THREE.Vector3(2.95, 0.3, 0.8), scale: 0.35 },
        { object: cube("red"), home: new THREE.Vector3(1.9, 2.8, -0.6), scale: 0.25 },
      ];
      satellites.forEach(({object, home, scale}, i) => { object.position.copy(home); object.scale.setScalar(scale); object.rotation.set(0.25 + i * 0.2, 0.5, 0.15); world.add(object); });
      const pointer = { x: 0, y: 0 };
      let visible = true;
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.02 }); observer.observe(node);
      function resize() {
        if (!node) return;
        const width = Math.max(node.clientWidth, 1), height = Math.max(node.clientHeight, 1);
        const aspect = width/height, halfHeight = aspect < 0.8 ? 4.6 : 3.9;
        camera.left = -halfHeight*aspect; camera.right = halfHeight*aspect; camera.top = halfHeight; camera.bottom = -halfHeight; camera.updateProjectionMatrix();
        renderer.setSize(width,height);
      }
      const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(node); resize();
      function move(event: PointerEvent) { if (!node) return; const rect = node.getBoundingClientRect(); pointer.x = ((event.clientX-rect.left)/rect.width-0.5)*2; pointer.y = ((event.clientY-rect.top)/rect.height-0.5)*2; }
      function reset() { pointer.x=0; pointer.y=0; }
      node.addEventListener("pointermove",move); node.addEventListener("pointerleave",reset);
      const onLost = (event: Event) => { event.preventDefault(); setReady(false); };
      renderer.domElement.addEventListener("webglcontextlost",onLost);
      let frame = 0, previous = performance.now(), clock = 0, remixTime = -10, lastBurst = settings.current.burst;
      function animate(now: number) {
        if (cancelled) return;
        frame = requestAnimationFrame(animate);
        const delta = Math.min((now-previous)/1000,0.05); previous=now;
        if (!visible || document.hidden) return;
        const config = settings.current;
        if (!config.paused) clock += delta;
        if (config.burst !== lastBurst) { lastBurst=config.burst; remixTime=clock; if (config.paused || config.reducedMotion) { logo.rotation.y += Math.PI/8; } }
        if (!config.paused) {
          const elapsed = clock-remixTime;
          const amount = elapsed >= 0 && elapsed < 2 ? Math.sin(elapsed*Math.PI/2) : 0;
          logo.position.y = Math.sin(clock*0.9)*0.11 + 0.12;
          logo.rotation.y += (-0.12+pointer.x*0.2+Math.sin(clock*0.35)*0.06-logo.rotation.y)*0.055;
          logo.rotation.x += (pointer.y*0.07-logo.rotation.x)*0.055;
          for (const piece of pieces) { piece.object.position.copy(piece.home).addScaledVector(piece.spread, amount); piece.object.rotation.z=amount*(piece.index%2 ? 0.14 : -0.14); piece.object.rotation.y=amount*0.25; }
          satellites.forEach(({object, home},i) => { object.position.y=home.y+Math.sin(clock*0.8+i*2)*0.16; object.rotation.y=clock*0.18+i; object.rotation.z=Math.sin(clock*0.7+i)*0.18; });
        }
        renderer.render(scene,camera);
      }
      renderer.render(scene,camera); setReady(true); frame=requestAnimationFrame(animate);
      dispose = () => { cancelAnimationFrame(frame); observer.disconnect(); resizeObserver.disconnect(); node.removeEventListener("pointermove",move); node.removeEventListener("pointerleave",reset); renderer.domElement.removeEventListener("webglcontextlost",onLost); geometries.forEach(g=>g.dispose()); materials.forEach(m=>m.dispose()); renderer.dispose(); renderer.domElement.remove(); };
    }
    initialize().catch(() => { if (!cancelled) setReady(false); });
    return () => { cancelled = true; dispose(); };
  }, []);

  return <div className={`coding-world ${ready ? "world-ready" : ""}`} ref={host} role="img" aria-label="An interactive 3D K built from KiddyCody’s colorful blocks. Move your pointer to turn it, or use Remix to rearrange it."><img className="world-fallback" src={`${import.meta.env.BASE_URL}kiddycody-mark.svg`} alt="" width="507" height="417"/></div>;
}
