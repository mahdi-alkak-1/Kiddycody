const base = import.meta.env.BASE_URL;

export const aiVideoPath = `${base}ai-video/`;

export type VideoSample = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
};

export const videoSamples: readonly VideoSample[] = [
  {
    id: "GweDgvvN3UA",
    title: "Independence Story",
    category: "School celebration · Storytelling",
    description: "A short film for Lebanese Independence Day, told through cinematic scenes and Arabic captions.",
    image: `${aiVideoPath}independence-story.jpg`,
  },
  {
    id: "ljf83y8VoyE",
    title: "Independence Day Song",
    category: "Music video · Celebration",
    description: "A Lebanese Independence Day music video with scenes of children working and playing together.",
    image: `${aiVideoPath}independence-song.jpg`,
  },
];

export const productionSteps = [
  { id: "planning", title: "Plan the story", description: "We work from your idea, occasion, or existing script. If you need a script, we write one for your audience and format." },
  { id: "production", title: "Create the visuals and sound", description: "We generate the scenes, create voiceovers in the language you request, and make custom music or a song when the project calls for it." },
  { id: "editing", title: "Edit and deliver", description: "We cut the story, mix the audio, and add titles or captions in CapCut, then deliver the video in the format agreed for your project." },
] as const;

const inquiry = [
  "Hi KiddyCody! I’d like to request a custom video.",
  "Occasion or idea:",
  "Audience:",
  "Preferred language:",
  "Where it will be shown:",
  "Deadline:",
].join("\n");

export const videoInquiryUrl = `https://wa.me/96181954659?text=${encodeURIComponent(inquiry)}`;
export const videoEmailUrl = "mailto:kiddycody1@gmail.com?subject=Custom%20video%20inquiry";
