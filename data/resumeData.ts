import { ResumeData } from '../types';

export const RESUME: ResumeData = {
  name: "VALENTIN WATTELET",
  role: "PRODUCER / LINE PRODUCER",
  about: "Producer & Line Producer with 10+ years of experience leading premium adventure formats and large-scale international shoots. Strong blend of creative instincts and rigorous production leadership. Specialized in remote, high-risk environments.",
  contact: {
    email: "valentin.wattelet@gmail.com",
    phone: "+33 (0)6 70 42 00 88",
    location: "Paris, France",
    linkedin: "@vwattelet"
  },
  jobs: [
    {
      id: "job1",
      title: "LINE PRODUCER",
      company: "KOH LANTA (SURVIVOR)",
      period: "Dec 2024 – Present",
      type: 'experience',
      details: [
        "Commanding a 350+ crew fleet under high pressure.",
        "Bridging creative vision with operational reality.",
        "Ensuring prime-time quality & top-tier safety standards."
      ]
    },
    {
      id: "job2",
      title: "HEAD OF PRODUCTION",
      company: "KOH LANTA",
      period: "Feb 2022 – Dec 2024",
      type: 'experience',
      details: [
        "Engineered complex remote production pipelines from scratch.",
        "Transformed raw jungle into a high-tech broadcast hub.",
        "Optimized massive budgets while boosting team morale."
      ]
    },
    {
      id: "job3",
      title: "PRODUCER",
      company: "CANAL PIU",
      period: "Sep 2023 – Sep 2024",
      type: 'experience',
      details: [
        "Unlocked creative skills: visual identity, pacing & direction.",
        "Harmonized artistic ambition with strict budget logic.",
        "Designed the narrative arc for the show's identity."
      ]
    },
    {
      id: "job4",
      title: "UNIT & LOCATION MGR",
      company: "KOH LANTA",
      period: "2016 – 2021",
      type: 'experience',
      details: [
        "Mastered field operations in hostile tropical biomes.",
        "Shielded the crew with advanced safety protocols.",
        "Constructed massive challenge arenas from ground zero."
      ]
    },
    {
      id: "job5",
      title: "PRODUCTION ASSISTANT",
      company: "HOPE PRODUCTION",
      period: "2013 – 2015",
      type: 'experience',
      details: [
        "Forged first weapons on global documentary sets (Human).",
        "Absorbed the discipline of high-stakes storytelling.",
        "Grinded logistics XP across 60+ countries."
      ]
    }
  ],
  skills: [
    { category: "Production", items: ["Creative Producing", "Budgeting", "Logistics", "Safety Mgmt", "Remote Ops"] },
    { category: "Technical", items: ["Excel", "Risk Assessment", "Emergency Protocols", "Production Tools"] },
    { category: "Languages", items: ["French (Native)", "English (Fluent)", "Spanish (Fluent)", "Italian (Working)"] }
  ],
  interests: ["Cinema", "Photography", "Boxing", "Travel"]
};
