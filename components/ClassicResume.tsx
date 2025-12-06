import React, { useState, useEffect } from 'react';

const ClassicResume: React.FC = () => {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    const userLang = navigator.language;
    if (userLang && !userLang.startsWith('fr')) {
      setLang('en');
    }

    const originalOverflow = document.body.style.overflow;
    const originalBg = document.body.style.backgroundColor;
    const originalFont = document.body.style.fontFamily;

    document.body.style.overflow = 'auto';
    document.body.style.backgroundColor = '#0b0b0b';
    document.body.style.fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";
    document.body.style.margin = '0';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.backgroundColor = originalBg;
      document.body.style.fontFamily = originalFont;
    };
  }, []);

  const toggleLang = () => setLang(prev => prev === 'fr' ? 'en' : 'fr');

  return (
    <div className="classic-resume-wrapper">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      <style>{`
        :root {
            --bg-color: #0b0b0b;
            --card-bg: #161616;
            --text-main: #e6e6e6;
            --text-muted: #999;
            --accent: #d4af37;
            --accent-hover: #f0c448;
        }

        .classic-resume-wrapper * { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }
        
        .classic-resume-wrapper {
            background-color: var(--bg-color);
            color: var(--text-main);
            line-height: 1.6;
            width: 100%;
            min-height: 100vh;
        }

        .lang-switch {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        .lang-btn {
            background: rgba(0,0,0,0.8);
            color: var(--accent);
            border: 1px solid var(--accent);
            padding: 10px 20px;
            cursor: pointer;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 1px;
            transition: 0.3s;
        }
        .lang-btn:hover { background: var(--accent); color: #000; }

        .hero-header {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            background: linear-gradient(to bottom, rgba(11,11,11,0.4), rgba(11,11,11,1)), 
                        url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
            padding: 20px;
        }

        .hero-title {
            font-size: 3.5rem;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 10px;
            font-weight: 800;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
            color: #e6e6e6;
        }

        .hero-subtitle {
            color: var(--accent);
            font-weight: 400;
            letter-spacing: 2px;
            margin-bottom: 40px;
            text-transform: uppercase;
            font-size: 1.2rem;
            background: rgba(0,0,0,0.6);
            padding: 5px 15px;
            border-radius: 4px;
        }

        .contact-info {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 30px;
            font-size: 0.9rem;
            color: #ccc;
        }
        
        .contact-info span { display: flex; align-items: center; gap: 8px; }

        .contact-link {
            color: #ccc;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: 0.3s;
        }
        .contact-link:hover {
            color: var(--accent);
        }

        .cta-container { margin-top: 20px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;}
        
        .resume-btn {
            display: inline-block;
            padding: 12px 30px;
            border: 1px solid var(--accent);
            color: var(--accent);
            text-decoration: none;
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 1px;
            transition: 0.3s;
            background: rgba(0,0,0,0.3);
            cursor: pointer;
        }
        
        .resume-btn:hover { background: var(--accent); color: #000; }
        .resume-btn-fill { background: var(--accent); color: #000; }
        .resume-btn-fill:hover { background: var(--accent-hover); }

        section { padding: 80px 20px; max-width: 1000px; margin: 0 auto; }
        
        .section-header {
            border-bottom: 1px solid #333;
            padding-bottom: 10px;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .section-title {
            font-size: 1.8rem;
            text-transform: uppercase;
            color: #fff;
            letter-spacing: 1px;
            border-left: 4px solid var(--accent);
            padding-left: 15px;
        }

        .about-text {
            font-size: 1.1rem;
            color: #ccc;
            max-width: 800px;
            margin: 0 auto;
            text-align: justify;
            line-height: 1.8;
        }

        .skills-wrapper {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
        }

        .skill-category h4 { color: var(--accent); margin-bottom: 15px; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1px;}
        .skill-list { list-style: none; }
        .skill-list li { 
            margin-bottom: 8px; 
            border-bottom: 1px solid #222; 
            padding-bottom: 5px;
            display: flex;
            justify-content: space-between;
            color: #bbb;
        }

        .job { 
            margin-bottom: 50px; 
            padding: 30px;
            background: var(--card-bg);
            border-radius: 4px;
            transition: transform 0.3s;
            border-left: 2px solid transparent;
        }

        .job:hover {
            transform: translateY(-5px);
            border-left: 2px solid var(--accent);
        }
        
        .job-head {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 15px;
            flex-wrap: wrap;
        }
        
        .job-title { font-size: 1.3rem; font-weight: bold; color: #fff; }
        .job-company { color: var(--accent); font-style: italic; margin-right: 10px; font-weight: 500;}
        .job-date { font-family: monospace; color: #777; border: 1px solid #333; padding: 2px 6px; font-size: 0.8rem; border-radius: 3px;}

        .job ul { margin-left: 20px; margin-top: 15px; color: #bbb; }
        .job li { margin-bottom: 8px; padding-left: 5px; }

        .project-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-top: 20px;
            font-size: 0.85rem;
            color: var(--accent);
            text-decoration: none;
            border: 1px solid var(--accent);
            padding: 5px 15px;
            border-radius: 20px;
            transition: 0.3s;
        }
        .project-link:hover { background: var(--accent); color: #000; }

        .interests-list {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: center;
        }
        
        .tag {
            background: #222;
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 0.9rem;
            border: 1px solid #333;
            color: #ddd;
            transition: 0.3s;
        }
        .tag:hover { border-color: var(--accent); color: #fff; }

        footer {
            text-align: center;
            padding: 60px 20px;
            background: #000;
            font-size: 0.8rem;
            color: #555;
            border-top: 1px solid #222;
        }

        @media (max-width: 768px) {
            .hero-title { font-size: 2.2rem; }
            .job-head { flex-direction: column; gap: 5px; }
            .job { padding: 20px; }
        }
      `}</style>

      <div className="lang-switch">
        <button className="lang-btn" onClick={toggleLang}>FR / EN</button>
      </div>

      <header className="hero-header">
        <h1 className="hero-title">Valentin Wattelet</h1>
        
        <div style={{ display: lang === 'fr' ? 'block' : 'none', textAlign: 'center' }}>
            <h2 className="hero-subtitle">Producteur / Directeur de Production</h2>
            <p style={{ color: '#ccc', fontSize: '1.1rem', marginTop: '-20px', marginBottom: '30px', letterSpacing: '1px', fontWeight: 300 }}>
                Création <span style={{ color: 'var(--accent)' }}>—</span> Terrain Extrême <span style={{ color: 'var(--accent)' }}>—</span> Narration
            </p>
        </div>

        <div style={{ display: lang === 'en' ? 'block' : 'none', textAlign: 'center' }}>
            <h2 className="hero-subtitle">Producer & Line Producer</h2>
            <p style={{ color: '#ccc', fontSize: '1.1rem', marginTop: '-20px', marginBottom: '30px', letterSpacing: '1px', fontWeight: 300 }}>
                Creative Leadership <span style={{ color: 'var(--accent)' }}>—</span> High-Risk Environments <span style={{ color: 'var(--accent)' }}>—</span> Storytelling
            </p>
        </div>
        
        <div className="contact-info">
            <span><i className="fas fa-map-marker-alt"></i> Paris, France</span>
            <a href="tel:+33670420088" className="contact-link">
                <i className="fas fa-phone"></i> +33 (0)6 70 42 00 88
            </a>
            <a href="mailto:valentin.wattelet@gmail.com" className="contact-link">
                <i className="fas fa-envelope"></i> valentin.wattelet@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/vwattelet" target="_blank" className="contact-link" rel="noreferrer">
                <i className="fab fa-linkedin"></i> @vwattelet
            </a>
        </div>

        <div className="cta-container">
            <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                <a href="mailto:valentin.wattelet@gmail.com" className="resume-btn resume-btn-fill">Me Contacter</a>
                <a href="#experience" className="resume-btn" style={{ marginLeft: '10px' }}>Voir Expérience</a>
            </div>
            
            <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                <a href="mailto:valentin.wattelet@gmail.com" className="resume-btn resume-btn-fill">Contact Me</a>
                <a href="#experience" className="resume-btn" style={{ marginLeft: '10px' }}>View Experience</a>
            </div>
        </div>
      </header>

      <section id="about">
        <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
            <div className="section-header"><h3 className="section-title">À Propos</h3></div>
            <div className="about-text">
                <p>
                    Producteur et Directeur de Production spécialisé dans les environnements extrêmes, les opérations internationales et les formats d’aventure premium. Depuis plus de dix ans, je dirige des productions de grande ampleur — équipes internationales 100+, équipes locales 250+, logistique lourde, protocoles Safety avancés — dans des zones isolées comme les Philippines, le Panama, les Fidji ou le Cambodge.
                </p>
                <br />
                <p>
                    Mon travail se situe à l’intersection du terrain, du narratif et de la création. J’ai un parcours marqué par les environnements hostiles, mais aussi par une vraie sensibilité artistique — développée notamment sur <strong>Canal Piu</strong>, où j’ai porté l’identité visuelle, le rythme et la direction des talents. Cette capacité à naviguer entre esthétique, culture et contraintes de terrain est devenue ma signature.
                </p>
                <br />
                <p>
                    Je conçois des mécaniques, affine le storytelling, construis des identités visuelles solides et veille à la cohérence éditoriale de bout en bout. Je suis autant à l’aise dans une salle de briefing au milieu d’une forêt tropicale que dans un studio parisien en train de régler un ton narratif ou une intention visuelle.
                </p>
                <br />
                <p>
                    Aujourd’hui, je développe plusieurs projets originaux — aventures, documentaires hybrides, formats à forte tension — avec une ambition claire : créer des œuvres immersives, ancrées dans le réel, nourries d’esthétique, de culture et d’exigence narrative.
                </p>
            </div>
        </div>

        <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
            <div className="section-header"><h3 className="section-title">About</h3></div>
            <div className="about-text">
                <p>
                    Producer and Line Producer specialised in extreme environments, large-scale international operations and premium adventure formats. For over a decade, I’ve led complex productions with 100+ international crew, 250+ local teams and high-risk logistics across remote locations such as the Philippines, Panama, Fiji and Cambodia.
                </p>
                <br />
                <p>
                    My work stands at the crossroads of field leadership, narrative design and creative producing. Alongside my experience in remote operations, I developed a strong artistic sensibility — notably on <strong>Canal Piu</strong>, where I shaped the visual identity, pacing and talent direction. This ability to blend aesthetics, culture and operational mastery has become my signature.
                </p>
                <br />
                <p>
                    I design challenges and format mechanics, craft narrative tone, build visual identities and ensure editorial coherence across the entire production pipeline. I’m as comfortable running safety protocols in a tropical basecamp as I am refining a creative concept in a Parisian studio.
                </p>
                <br />
                <p>
                    I’m currently developing a slate of original projects — adventure series, hybrid documentaries, narrative-driven formats — with a clear ambition: to craft immersive works rooted in reality, elevated by strong aesthetics, cultural depth and precise narrative intent.
                </p>
            </div>
        </div>
      </section>

      <section id="skills">
        <div style={{ display: lang === 'fr' ? 'block' : 'none' }}><div className="section-header"><h3 className="section-title">Compétences</h3></div></div>
        <div style={{ display: lang === 'en' ? 'block' : 'none' }}><div className="section-header"><h3 className="section-title">Skills</h3></div></div>

        <div className="skills-wrapper">
            <div className="skill-category">
                <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                    <h4>Production & Gestion</h4>
                    <ul className="skill-list">
                        <li>Direction de prod</li>
                        <li>Budgétisation</li>
                        <li>Logistique Internationale</li>
                        <li>Opérations à distance </li>
                        <li>Gestion de la sécurité (Safety)</li>
                        <li>Évaluation des risques</li>
                        <li>Protocoles d'urgence</li>
                        <li>Leadership d'équipe (100+ crew)</li>
                        <li>Partenariats gouvernementaux</li>
                        <li>Outils de production / Excel</li>
                    </ul>
                </div>
                <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                    <h4>Production & Management</h4>
                    <ul className="skill-list">
                        <li>Line Production</li>
                        <li>Budgeting</li>
                        <li>Logistics</li>
                        <li>Remote Operations</li>
                        <li>Safety Management</li>
                        <li>Risk Assessment</li>
                        <li>Emergency Protocols</li>
                        <li>Team Leadership (100+ crew)</li>
                        <li>Government Partnerships</li>
                        <li>Production Tools / Excel</li>
                    </ul>
                </div>
            </div>

            <div className="skill-category">
                <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                    <h4>Créatif & Éditorial</h4>
                    <ul className="skill-list">
                        <li>Creative Producing</li>
                        <li>Développement de formats</li>
                        <li>Storytelling</li>
                        <li>Identité Visuelle</li>
                        <li>Écriture Documentaire & Recherche</li>
                        <li>IA Générative</li>
                    </ul>
                    <h4 style={{ marginTop: '30px' }}>Langues</h4>
                    <ul className="skill-list">
                        <li>Français (Natif)</li>
                        <li>Anglais (Courant)</li>
                        <li>Espagnol (Courant)</li>
                        <li>Italien (Professionnel)</li>
                    </ul>
                </div>
                <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                    <h4>Creative & Editorial</h4>
                    <ul className="skill-list">
                        <li>Creative Producing</li>
                        <li>Format Development</li>
                        <li>Storytelling</li>
                        <li>Visual Identity</li>
                        <li>Documentary Writing & Research</li>
                        <li>Generative AI</li>
                    </ul>
                    <h4 style={{ marginTop: '30px' }}>Languages</h4>
                    <ul className="skill-list">
                        <li>French (Native)</li>
                        <li>English (Fluent)</li>
                        <li>Spanish (Fluent)</li>
                        <li>Italian (Working)</li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      <section id="experience">
        <div style={{ display: lang === 'fr' ? 'block' : 'none' }}><div className="section-header"><h3 className="section-title">Expérience</h3></div></div>
        <div style={{ display: lang === 'en' ? 'block' : 'none' }}><div className="section-header"><h3 className="section-title">Experience</h3></div></div>

        <div className="job">
            <div className="job-head">
                <div>
                    <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                        <span className="job-title">PRODUCTEUR EXÉCUTIF - KOH LANTA</span><br />
                    </div>
                    <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                        <span className="job-title">LINE PRODUCER - KOH LANTA (SURVIVOR)</span><br />
                    </div>
                    <span className="job-company">Adventure Line Productions</span>
                </div>
                <span className="job-date">Dec 2024 - Present</span>
            </div>
            <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                <ul>
                    <li>Direction de la production pour le format d'aventure prime-time (100+ équipe intl, 250+ locaux).</li>
                    <li>Supervision des budgets, de la logistique, du juridique et des protocoles de sécurité de haut niveau.</li>
                    <li>Coordination avec les autorités, repérages et infrastructures isolées.</li>
                    <li>Collaboration avec l'éditorial sur les épreuves, le ton narratif et la cohérence créative.</li>
                </ul>
                <a href="https://www.alp.tv/programmes/koh-lanta" target="_blank" className="project-link" rel="noreferrer"><i className="fas fa-external-link-alt"></i> Voir sur ALP.tv</a>
            </div>
            <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                <ul>
                    <li>Lead line production for prime-time adventure format (100+ intl crew, 250+ local).</li>
                    <li>Oversee budgets, logistics, legal and high-level safety protocols.</li>
                    <li>Coordinate authorities, scouting and remote infrastructures.</li>
                    <li>Collaborate with editorial on challenges, narrative tone and creative coherence.</li>
                </ul>
                <a href="https://www.alp.tv/programmes/koh-lanta" target="_blank" className="project-link" rel="noreferrer"><i className="fas fa-external-link-alt"></i> View on ALP.tv</a>
            </div>
        </div>

        <div className="job">
            <div className="job-head">
                <div>
                    <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                        <span className="job-title">DIRECTEUR DE PRODUCTION</span><br />
                    </div>
                    <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                        <span className="job-title">HEAD OF PRODUCTION / PRODUCTION MANAGER</span><br />
                    </div>
                    <span className="job-company">Adventure Line Productions (Koh Lanta)</span>
                </div>
                <span className="job-date">Feb 2022 - Dec 2024</span>
            </div>
            <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                <ul>
                    <li>Gestion complète du pipeline de production pour plusieurs saisons aux Philippines.</li>
                    <li>Construction de camps de base (remote) et de systèmes opérationnels à partir de zéro.</li>
                    <li>Supervision des budgets, de la logistique, des cadres de sécurité et des partenariats institutionnels.</li>
                </ul>
            </div>
            <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                <ul>
                    <li>Managed full production pipeline for multiple seasons in the Philippines.</li>
                    <li>Built remote basecamps and operational systems from scratch.</li>
                    <li>Oversaw budgets, logistics, safety frameworks and institutional partnerships.</li>
                </ul>
            </div>
        </div>

        <div className="job">
            <div className="job-head">
                <div>
                    <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                        <span className="job-title">PRODUCTEUR - CANAL PIU (SAISON 1)</span><br />
                    </div>
                    <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                        <span className="job-title">PRODUCER - CANAL PIU (SEASON 1)</span><br />
                    </div>
                    <span className="job-company">Canal+</span>
                </div>
                <span className="job-date">Sep 2023 - Sep 2024</span>
            </div>
            
            <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                <ul>
                    <li>Direction artistique : identité visuelle, rythme, direction des talents, raffinement éditorial.</li>
                    <li>Supervision du budget, du juridique et du flux de production.</li>
                    <li>Développement actuel de la Saison 2 (concepts, structure éditoriale, évolution du format).</li>
                </ul>
                <a href="https://www.canalplus.com/" target="_blank" className="project-link" rel="noreferrer"><i className="fas fa-tv"></i> Voir sur Canal+</a>
            </div>
            
            <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                <ul>
                    <li>Led artistic direction: visual identity, pacing, talent direction, editorial refinement.</li>
                    <li>Supervised budget, legal and production flow.</li>
                    <li>Currently developing Season 2 (concepts, editorial structure, format evolution).</li>
                </ul>
                <a href="https://www.canalplus.com/" target="_blank" className="project-link" rel="noreferrer"><i className="fas fa-tv"></i> View on Canal+</a>
            </div>
        </div>

        <div className="job">
            <div className="job-head">
                <div>
                    <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                        <span className="job-title">RÉGISSEUR GÉNÉRAL - KOH LANTA</span><br />
                    </div>
                    <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                        <span className="job-title">UNIT & LOCATION MANAGER - KOH LANTA</span><br />
                    </div>
                    <span className="job-company">Adventure Line Productions</span>
                </div>
                <span className="job-date">2016 - 2021</span>
            </div>
             <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                <ul>
                    <li>Régisseur Général Senior au Cambodge, aux Fidji et en Polynésie française.</li>
                    <li>Gestion de la logistique, des permis, des camps, de la construction des jeux et des équipes locales.</li>
                    <li>Garant de la sécurité sur le terrain dans des environnements tropicaux, maritimes et sauvages.</li>
                </ul>
            </div>
            <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                <ul>
                    <li>Served as senior unit/location manager across Cambodia, Fiji and French Polynesia.</li>
                    <li>Managed logistics, permits, camps, challenge builds and local crews.</li>
                    <li>Ensured field safety in tropical, maritime and wilderness environments.</li>
                </ul>
            </div>
        </div>

        <div className="job">
            <div className="job-head">
                <div>
                    <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                        <span className="job-title">RÉGISSEUR GÉNÉRAL - PROJETS INTERNATIONAUX</span><br />
                    </div>
                    <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                        <span className="job-title">UNIT & LOCATION MANAGER - VARIOUS PROJECTS</span><br />
                    </div>
                    <span className="job-company">Freelance</span>
                </div>
                <span className="job-date">2013 - 2016</span>
            </div>
            <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                <ul>
                    <li>A travaillé sur <strong>Survivor Sweden & Poland</strong>, <strong>Aventure Robinson</strong> et <strong>Fantasy Island (Blumhouse)</strong>.</li>
                    <li>Gestion des lieux, permis, repérages terrain, équipes locales, sécurité et logistique.</li>
                </ul>
                <a href="https://www.imdb.com/title/tt10834220/" target="_blank" className="project-link" rel="noreferrer"><i className="fab fa-imdb"></i> Voir Fantasy Island sur IMDb</a>
            </div>
            <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                <ul>
                    <li>Worked on Survivor Sweden & Poland, Aventure Robinson and Fantasy Island (Blumhouse).</li>
                    <li>Handled locations, permits, terrain scouting, local crews, safety and logistics.</li>
                </ul>
                <a href="https://www.imdb.com/title/tt10834220/" target="_blank" className="project-link" rel="noreferrer"><i className="fab fa-imdb"></i> View Fantasy Island on IMDb</a>
            </div>
        </div>

        <div className="job">
            <div className="job-head">
                <div>
                    <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                        <span className="job-title">ASSISTANT DE PRODUCTION - HUMAN & DOCUMENTAIRES</span><br />
                    </div>
                    <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                        <span className="job-title">PRODUCTION ASSISTANT - HUMAN & DOCUMENTARIES</span><br />
                    </div>
                    <span className="job-company">Hope Production</span>
                </div>
                <span className="job-date">2013 - 2015</span>
            </div>
            <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
                <ul>
                    <li>A travaillé sur <strong>Human</strong> (60+ pays, 2000 interviews), <strong>Terra</strong> et <strong>L'Algérie vue du ciel</strong>.</li>
                    <li>Contribution à l'écriture documentaire et à la recherche (thèmes sportifs, environnementaux et sociaux).</li>
                    <li>Soutien à la logistique internationale et coordination terrain.</li>
                </ul>
                <a href="http://www.human-themovie.org/" target="_blank" className="project-link" rel="noreferrer"><i className="fas fa-globe"></i> Site Officiel Human</a>
            </div>
            <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
                <ul>
                    <li>Worked on Human (60+ countries, 2000 interviews), Terra and Algeria From Above.</li>
                    <li>Contributed to documentary writing & research (sports, environmental & social themes).</li>
                    <li>Supported international logistics and field coordination.</li>
                </ul>
                <a href="http://www.human-themovie.org/" target="_blank" className="project-link" rel="noreferrer"><i className="fas fa-globe"></i> Official Site Human</a>
            </div>
        </div>

      </section>

      <section id="interests">
        <div style={{ display: lang === 'fr' ? 'block' : 'none' }}><div className="section-header"><h3 className="section-title">Intérêts</h3></div></div>
        <div style={{ display: lang === 'en' ? 'block' : 'none' }}><div className="section-header"><h3 className="section-title">Interests</h3></div></div>
        
        <div style={{ display: lang === 'fr' ? 'block' : 'none' }}>
            <div className="interests-list">
                <span className="tag">Cinéma & Photographie</span>
                <span className="tag">Danse & Musique Contemporaine</span>
                <span className="tag">Expositions</span>
                <span className="tag">Boxe & Entraînement</span>
                <span className="tag">Presse Internationale</span>
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <a href="https://boxd.it/fWwbR" target="_blank" className="resume-btn" rel="noreferrer">
                    <i className="fas fa-film"></i> Mon Profil Letterboxd
                </a>
            </div>
        </div>

        <div style={{ display: lang === 'en' ? 'block' : 'none' }}>
            <div className="interests-list">
                <span className="tag">Cinema & Photography</span>
                <span className="tag">Dance & Contemporary Music</span>
                <span className="tag">Exhibitions</span>
                <span className="tag">Boxing & Training</span>
                <span className="tag">International Press</span>
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <a href="https://boxd.it/fWwbR" target="_blank" className="resume-btn" rel="noreferrer">
                    <i className="fas fa-film"></i> My Letterboxd Profile
                </a>
            </div>
        </div>
      </section>

      <footer>
        <p>© 2025 Valentin Wattelet - Producer / Line Producer</p>
        <br />
        <p style={{ fontSize: '1.5rem' }}>
            <a href="https://www.linkedin.com/in/vwattelet" style={{ color: '#777', margin: '0 10px', transition: '0.3s' }} target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="mailto:valentin.wattelet@gmail.com" style={{ color: '#777', margin: '0 10px', transition: '0.3s' }}><i className="fas fa-envelope"></i></a>
        </p>
      </footer>
    </div>
  );
};

export default ClassicResume;