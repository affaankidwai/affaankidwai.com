import { ArrowUpRight, BriefcaseBusiness, GraduationCap, MapPin } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { profile, upcomingInterests } from "../data";

export const metadata = { title: "About Affaan Kidwai", description: "About Affaan Kidwai: Oracle application developer, CSE with AIML graduate, and wildlife photography storyteller." };

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero compact-hero"><div><p className="eyebrow"><MapPin size={16} /> About</p><h1>Developer mind, wildlife eye.</h1></div><p>Affaan Kidwai is an Associate Application Developer at Oracle Financial Services Software, a Computer Science graduate specialized in AIML from SRM University, and the person behind this emerging photography world.</p></section>
      <section className="section-shell about-layout"><article className="about-story"><h2>A site that can hold both craft and curiosity.</h2><p>The professional side is systems-minded: back-end web development, databases, Oracle Database, React, cloud operations, and machine learning. The personal side is more open-ended: travel, wildlife, cars, music, cards, and the kind of hobbies that become their own little universes.</p><p>For now, the website starts with wildlife photography because it has the strongest visual gravity. The rest of the interests are already accounted for in the structure, so the site can expand without feeling patched together later.</p><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn profile <ArrowUpRight size={17} /></a></article><aside className="credentials-panel"><div><BriefcaseBusiness size={22} /><span>Current role</span><strong>{profile.role}</strong></div><div><GraduationCap size={22} /><span>Education</span><strong>{profile.education}</strong></div><div><MapPin size={22} /><span>Base</span><strong>Lucknow, Uttar Pradesh, India</strong></div></aside></section>
      <section className="section-shell skill-section"><div><p className="eyebrow">Source: LinkedIn PDF</p><h2>Professional palette</h2></div><div className="skill-cloud">{profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>
      <section className="section-shell interest-grid">{upcomingInterests.map((interest) => <article key={interest}><span>{interest}</span><p>Coming later as its own polished section.</p></article>)}</section>
    </main>
  );
}
