import { useEffect, useRef, useState } from "react";
import { videoSamples } from "./content";

export default function FilmHero() {
  const stage = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = stage.current;
    if (!host) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = matchMedia("(any-pointer: fine)");
    let revision = 0;
    let dispose: (() => void) | undefined;

    function update() {
      if (!host) return;
      const current = ++revision;
      dispose?.();
      dispose = undefined;
      setReady(false);
      if (motion.matches || !pointer.matches) return;

      void import("./film-scene").then(async ({ createFilmScene }) => {
        if (current !== revision) return;
        const scene = await createFilmScene(host, videoSamples, () => setReady(false));
        if (current !== revision) {
          scene.dispose();
          return;
        }
        dispose = scene.dispose;
        setReady(true);
      }).catch(() => {
        if (current === revision) setReady(false);
      });
    }

    update();
    motion.addEventListener("change", update);
    pointer.addEventListener("change", update);
    return () => {
      revision++;
      dispose?.();
      motion.removeEventListener("change", update);
      pointer.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className={`studio-film${ready ? " studio-film-ready" : ""}`} aria-hidden="true">
      <div className="studio-film-glow" />
      <div className="studio-film-fallback">
        {videoSamples.map(({ id, image }) => (
          <div className="studio-film-frame" key={id}><img src={image} alt="" width="480" height="360" /></div>
        ))}
      </div>
      <div className="studio-film-canvas" ref={stage} />
    </div>
  );
}
