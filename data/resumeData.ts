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
        "Lead line production for prime-time adventure format",
        "100+ intl crew, 250+ local",
        "Oversee budgets, logistics, legal & safety",
        "Coordinate authorities & remote infrastructures"
      ]
    },
    {
      id: "job2",
      title: "HEAD OF PRODUCTION",
      company: "KOH LANTA",
      period: "Feb 2022 – Dec 2024",
      type: 'experience',
      details: [
        "Managed full production pipeline in Philippines",
        "Built remote basecamps & operational systems",
        "Oversaw budgets, logistics & safety frameworks"
      ]
    },
    {
      id: "job3",
      title: "PRODUCER",
      company: "CANAL PIU",
      period: "Sep 2023 – Sep 2024",
      type: 'experience',
      details: [
        "Led artistic direction: visual identity, pacing",
        "Supervised budget, legal and production flow",
        "Currently developing Season 2"
      ]
    },
    {
      id: "job4",
      title: "UNIT & LOCATION MGR",
      company: "KOH LANTA",
      period: "2016 – 2021",
      type: 'experience',
      details: [
        "Senior manager across Cambodia, Fiji, Polynesia",
        "Ensured field safety in tropical environments",
        "Managed permits, camps & challenge builds"
      ]
    },
    {
      id: "job5",
      title: "PRODUCTION ASSISTANT",
      company: "HOPE PRODUCTION",
      period: "2013 – 2015",
      type: 'experience',
      details: [
        "Worked on Human (60+ countries)",
        "Terra and Algeria From Above",
        "Supported international logistics"
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