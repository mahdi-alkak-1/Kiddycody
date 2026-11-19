import { MessageCircle, Quote } from "lucide-react";
import { videoFeedback } from "./content";
import "./video-feedback.css";

export default function VideoFeedback() {
  return (
    <section className="studio-feedback" id="feedback" aria-labelledby="studio-feedback-title">
      <div className="studio-shell">
        <h2 id="studio-feedback-title">Client feedback</h2>
        <div className="studio-feedback-grid">
          {videoFeedback.map(({ id, project, paragraphs }) => (
            <figure className="studio-feedback-card" key={id}>
              <figcaption>
                <MessageCircle size={17} aria-hidden="true" />
                {project}
              </figcaption>
              <Quote className="studio-feedback-quote-icon" size={37} aria-hidden="true" />
              <blockquote lang="ar" dir="rtl">
                {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
