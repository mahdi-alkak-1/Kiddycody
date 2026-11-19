import {
  BoxGeometry, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry,
  Scene, SRGBColorSpace, Texture, TextureLoader, WebGLRenderer,
} from "three";
import type { VideoSample } from "./content";

export async function createFilmScene(
  host: HTMLDivElement,
  samples: readonly VideoSample[],
  onContextLost: () => void,
) {
  const loader = new TextureLoader();
  const results = await Promise.allSettled(samples.map(({ image }) => loader.loadAsync(image)));
  const textures = results.flatMap((result) => result.status === "fulfilled" ? [result.value] : []);
  const disposeTextures = () => textures.forEach((texture) => texture.dispose());
  if (textures.length !== samples.length || !host.isConnected) {
    disposeTextures();
    throw new Error("Film previews are unavailable");
  }

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  } catch (error) {
    disposeTextures();
    throw error;
  }

  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.65));
  const scene = new Scene();
  const camera = new PerspectiveCamera(37, 1, 0.1, 40);
  const strip = new Group();
  strip.rotation.set(0.24, -0.65, -0.22);
  scene.add(strip);

  const frameGeometry = new BoxGeometry(2.94, 2.25, 0.12);
  const imageGeometry = new PlaneGeometry(2.68, 1.53);
  const notchGeometry = new PlaneGeometry(0.16, 0.095);
  const frameMaterial = new MeshBasicMaterial({ color: "#172431" });
  const notchMaterial = new MeshBasicMaterial({ color: "#f8d583" });
  const imageMaterials = textures.map((texture) => createImageMaterial(texture));

  imageMaterials.forEach((material, index) => {
    const panel = new Group();
    const offset = index - (imageMaterials.length - 1) / 2;
    panel.position.set(offset * 2.94, 0, -Math.abs(offset) * 0.2);
    panel.rotation.y = offset * -0.24;
    panel.add(new Mesh(frameGeometry, frameMaterial));
    const poster = new Mesh(imageGeometry, material);
    poster.position.z = 0.064;
    panel.add(poster);
    for (let column = 0; column < 9; column++) {
      for (const edge of [-1, 1]) {
        const notch = new Mesh(notchGeometry, notchMaterial);
        notch.position.set((column - 4) * 0.29, edge * 0.95, 0.064);
        panel.add(notch);
      }
    }
    strip.add(panel);
  });

  let targetX = -0.09;
  let targetY = -0.24;
  let frame = 0;
  let lost = false;
  const render = () => { if (!lost) renderer.render(scene, camera); };

  function animate() {
    frame = 0;
    strip.rotation.x += (targetX - strip.rotation.x) * 0.13;
    strip.rotation.y += (targetY - strip.rotation.y) * 0.13;
    render();
    if (Math.abs(targetX - strip.rotation.x) + Math.abs(targetY - strip.rotation.y) > 0.002) {
      frame = requestAnimationFrame(animate);
    }
  }

  function turn(x: number, y: number) {
    if (lost) return;
    targetX = x;
    targetY = y;
    if (!frame) frame = requestAnimationFrame(animate);
  }

  function move(event: PointerEvent) {
    if (event.pointerType === "touch") return;
    const bounds = host.getBoundingClientRect();
    turn(-0.09 + ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.52,
      -0.24 + ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.9);
  }

  const reset = () => turn(-0.09, -0.24);
  const contextLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    cancelAnimationFrame(frame);
    onContextLost();
  };
  function resize() {
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    camera.aspect = width / height;
    camera.position.z = Math.max(7.6, 10.3 / camera.aspect);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    render();
  }

  const observer = new ResizeObserver(resize);
  function dispose() {
    cancelAnimationFrame(frame);
    observer.disconnect();
    host.removeEventListener("pointermove", move);
    host.removeEventListener("pointerleave", reset);
    renderer.domElement.removeEventListener("webglcontextlost", contextLost);
    [frameGeometry, imageGeometry, notchGeometry, frameMaterial, notchMaterial, ...imageMaterials].forEach((resource) => resource.dispose());
    disposeTextures();
    renderer.dispose();
    renderer.domElement.remove();
  }

  try {
    host.append(renderer.domElement);
    observer.observe(host);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", reset);
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    resize();
    frame = requestAnimationFrame(animate);
    return { dispose };
  } catch (error) {
    dispose();
    throw error;
  }
}

function createImageMaterial(texture: Texture) {
  texture.colorSpace = SRGBColorSpace;
  // The 4:3 YouTube poster has encoded letterboxing around its 16:9 preview.
  texture.repeat.y = 0.76;
  texture.offset.y = 0.12;
  return new MeshBasicMaterial({ map: texture });
}
