import { ArrowUpRight, Play, X } from "lucide-react";
import { Dialog } from "radix-ui";
import { videoSamples, type VideoSample } from "./content";

const youtubeUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

function VideoCard({ sample }: { sample: VideoSample }) {
  return (
    <article className="studio-video-card">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="studio-poster" type="button" aria-label={`Play ${sample.title}`}>
            <img src={sample.image} width="480" height="360" alt="" loading="lazy" />
            <span className="studio-play"><Play size={24} fill="currentColor" aria-hidden="true" /></span>
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="studio-dialog-overlay" />
          <Dialog.Content className="studio-dialog" aria-describedby={undefined}>
            <div className="studio-dialog-header">
              <Dialog.Title>{sample.title}</Dialog.Title>
              <Dialog.Close aria-label="Close video"><X size={24} aria-hidden="true" /></Dialog.Close>
            </div>
            <iframe
              className="studio-player"
              src={`https://www.youtube-nocookie.com/embed/${sample.id}?autoplay=1&rel=0`}
              title={sample.title}
              referrerPolicy="strict-origin-when-cross-origin"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
            <a className="studio-text-link" href={youtubeUrl(sample.id)} target="_blank" rel="noreferrer">Watch on YouTube <ArrowUpRight size={16} aria-hidden="true" /></a>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <div className="studio-video-copy">
        <p className="studio-category">{sample.category}</p>
        <h3>{sample.title}</h3>
        <p>{sample.description}</p>
        <a className="studio-text-link" href={youtubeUrl(sample.id)} target="_blank" rel="noreferrer">Watch on YouTube <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </article>
  );
}

export default function VideoPortfolio() {
  return (
    <section className="studio-work" id="work">
      <div className="studio-shell">
        <p className="studio-kicker">Selected work</p>
        <h2>See what we can make.</h2>
        <div className="studio-portfolio">
          {videoSamples.map((sample) => <VideoCard key={sample.id} sample={sample} />)}
        </div>
      </div>
    </section>
  );
}
