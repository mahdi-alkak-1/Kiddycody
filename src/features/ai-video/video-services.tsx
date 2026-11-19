import { ArrowDown, ArrowLeft, ArrowUpRight, Clapperboard, Film, Mail, MessageCircle, PenLine } from "lucide-react";
import { productionSteps, videoEmailUrl, videoInquiryUrl } from "./content";
import FilmHero from "./film-hero";
import VideoFeedback from "./video-feedback";
import VideoPortfolio from "./video-portfolio";

const stepIcons = { planning: PenLine, production: Clapperboard, editing: Film };
const home = import.meta.env.BASE_URL;

export default function VideoServices() {
  return (
    <>
      <a className="studio-skip" href="#main">Skip to content</a>
      <header className="studio-header studio-shell">
        <a className="studio-brand" href={home}>
          <img src={`${home}kiddycody-mark.svg`} width="36" height="33" alt="" />
          <span>Kiddy<span>Cody</span><small>ACADEMY</small></span>
        </a>
        <nav aria-label="Video services navigation">
          <a className="studio-back" href={home}><ArrowLeft size={16} aria-hidden="true" /> <span>Academy</span></a>
          <a className="studio-nav-work" href="#work">Our work</a>
          <a className="studio-nav-contact" href="#contact">Get in touch <ArrowUpRight size={15} aria-hidden="true" /></a>
        </nav>
      </header>
      <main id="main">
        <section className="studio-hero studio-shell" aria-labelledby="studio-title">
          <div className="studio-hero-copy">
            <p className="studio-kicker"><Clapperboard size={17} aria-hidden="true" /> Custom AI video production</p>
            <h1 id="studio-title">Your story.<br /><em>On screen.</em></h1>
            <p>Custom videos for schools, brands, events, and social media. We take your idea from the first script to the final cut.</p>
            <div className="studio-actions">
              <a className="studio-button" href={videoInquiryUrl} target="_blank" rel="noreferrer">Request a video <ArrowUpRight size={19} aria-hidden="true" /></a>
              <a className="studio-text-link" href="#work">See our work <ArrowDown size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <FilmHero />
        </section>
        <VideoPortfolio />
        <VideoFeedback />
        <section className="studio-process studio-shell" id="process">
          <p className="studio-kicker">Our production process</p>
          <h2>From idea to final cut.</h2>
          <ol className="studio-steps">
            {productionSteps.map(({ id, title, description }) => {
              const Icon = stepIcons[id];
              return <li key={id}><Icon size={25} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></li>;
            })}
          </ol>
        </section>
        <section className="studio-contact studio-shell" id="contact" aria-labelledby="studio-contact-title">
          <div className="studio-contact-panel">
            <div><h2 id="studio-contact-title">What would you like to make?</h2><p>Tell us about your audience, preferred language, and deadline. Any language is welcome.</p></div>
            <div className="studio-contact-actions">
              <a className="studio-button" href={videoInquiryUrl} target="_blank" rel="noreferrer"><MessageCircle size={19} aria-hidden="true" /> Request a video on WhatsApp</a>
              <a className="studio-text-link" href={videoEmailUrl}><Mail size={18} aria-hidden="true" /> Email us</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="studio-footer studio-shell"><a href={home}>KiddyCody Academy</a><span>© {new Date().getFullYear()} KiddyCody</span></footer>
    </>
  );
}
