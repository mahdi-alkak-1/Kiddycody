import { useState } from "react";
import { ArrowDown, Heart, MessageCircle, Pause, Play, Sparkles, Star } from "lucide-react";
import "./parents-feedback.css";

const feedback = [
  { color: "cream", text: "أسلوب الأستاذ كتير واضح." },
  { color: "blue", text: "المعلومات عم يقدّمها بطريقة كتير مبسّطة وسلسة." },
  { color: "green", text: "ابني كتير حبّ الدورة، شكراً كتير إلكن." },
  { color: "purple", text: "بنتي صارت عم تطبّق حتى بعد انتهاء الحصة، قدّ ما حبّتها." },
  { color: "pink", text: "ابني صار واثق بحالو أكتر وهو عم يعمل ألعابه وقصصه، وعم يحكي عن مشاريعه بكل فخر." },
  { color: "cream", text: "الدورة مرتّبة والمحتوى حلو ومناسب للأولاد، عم يتعلّموا ويطبّقوا بنفس الوقت." },
  { color: "cream", text: "شرح الأستاذ واضح وحلو، ابني فهم البرمجة بسهولة وحبّ كل درس." },
  { color: "blue", text: "بنتي كتير انبسطت بالدورة، وعم تنطر كل حصة بفارغ الصبر!" },
  { color: "pink", text: "حتى بعد ما تخلص الحصة، ابني بيضلّ يجرّب ويعمل ألعاب جديدة. كتير تحمّس مع الدورة!" },
  { color: "green", text: "الشرح بسيط وواضح، والمشاريع عم تساعد الأولاد يفهموا ويجرّبوا أفكار من عندن." },
];

function FeedbackBubble({ item, index }: { item: typeof feedback[number]; index: number }) {
  return (
    <figure className={`feedback-bubble feedback-${item.color}`}>
      <div className="feedback-bubble-top" aria-hidden="true">
        <span className="feedback-quote-mark">“</span>
        <span className="feedback-stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} fill="currentColor" />)}</span>
      </div>
      <blockquote lang="ar" dir="rtl"><p>{item.text}</p></blockquote>
      <figcaption><span className="feedback-avatar" aria-hidden="true">{index % 2 ? <Heart size={15} /> : <MessageCircle size={15} />}</span><span>A Scratch parent<small>KiddyCody community</small></span></figcaption>
    </figure>
  );
}

export default function ParentsFeedback() {
  const [paused, setPaused] = useState(false);
  return (
    <section id="parents-feedback" className={`parents-feedback${paused ? " feedback-paused" : ""}`} aria-labelledby="feedback-heading">
      <div className="section-container">
        <header className="feedback-heading">
          <span className="eyebrow"><Heart size={15} /> LITTLE MOMENTS. BIG DIFFERENCES.</span>
          <h2 id="feedback-heading">Happy kids.<br /><span className="serif-word">Even happier parents.</span></h2>
          <p>A little confidence. A new favourite class. A project they can’t stop talking about.<br className="desktop-break" /> Here’s what our Scratch families have to say.</p>
          <span className="feedback-arabic-label" lang="ar" dir="rtl">من قلوب الأهل <Heart size={14} aria-hidden="true" /></span>
        </header>
        <div className="feedback-space">
          <div className="feedback-orbit" aria-hidden="true" />
          <Sparkles className="feedback-spark feedback-spark-one" size={31} aria-hidden="true" />
          <Sparkles className="feedback-spark feedback-spark-two" size={25} aria-hidden="true" />
          <div className="feedback-grid">
            {feedback.slice(0, 6).map((item, index) => <FeedbackBubble key={item.text} item={item} index={index} />)}
          </div>
        </div>
        <div className="feedback-bottom">
          <p><Heart size={16} aria-hidden="true" /> Their words. Our favourite kind of encouragement.</p>
          <button className="feedback-motion" type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            {paused ? "Resume floating" : "Pause floating"}
          </button>
        </div>
        <details className="feedback-more">
          <summary>More love from our parents <span>04</span><ArrowDown size={16} aria-hidden="true" /></summary>
          <div className="feedback-extra-grid">
            {feedback.slice(6).map((item, index) => <FeedbackBubble key={item.text} item={item} index={index} />)}
          </div>
        </details>
      </div>
    </section>
  );
}
