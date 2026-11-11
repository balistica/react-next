const projects = [
  {
    number: "01",
    name: "Relay",
    type: "TEAM WORKSPACE · SAAS",
    description: "A collaborative workspace for turning team updates, decisions and action items into one clear operating rhythm.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    link: "https://github.com/balistica/relay-workspace"
  },
  {
    number: "02",
    name: "Forma",
    type: "COMMERCE · STOREFRONT",
    description: "A design-led commerce experience with curated collections, considered product pages and a frictionless checkout flow.",
    stack: ["Next.js", "Shopify Storefront API", "CSS"],
    link: "https://github.com/balistica/forma-commerce"
  },
  {
    number: "03",
    name: "Metric",
    type: "ANALYTICS · DASHBOARD",
    description: "An analytics workspace that turns product events into clear trends, useful cohorts and decisions teams can act on.",
    stack: ["TypeScript", "REST API", "Recharts"],
    link: "https://github.com/balistica/metric-analytics"
  }
];

const skills = ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "HTML & CSS", "REST APIs", "Git"];

export default function Home() {
  return (
    <main>
      <nav className="nav wrap">
        <a className="brand" href="#top" aria-label="Home">DM<span>.</span></a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact" className="nav-cta">Let’s talk <span>↗</span></a>
        </div>
      </nav>

      <section className="hero wrap" id="top">
        <div className="eyebrow"><span className="status-dot" /> AVAILABLE FOR SELECT PROJECTS</div>
        <h1>Building digital<br />things that <em>matter.</em></h1>
        <div className="hero-bottom">
          <p className="hero-copy">I’m Denis, a full-stack developer turning complex ideas into useful, beautifully considered products.</p>
          <a className="round-link" href="#work" aria-label="Explore selected work">↓</a>
        </div>
        <div className="hero-meta"><span>BASED IN SAINT-PETERSBURG, RU</span><span>DESIGN-MINDED · ENGINEERING-LED</span><span>2026 ©</span></div>
      </section>

      <section className="work-section" id="work">
        <div className="wrap">
          <div className="section-head">
            <div><div className="eyebrow">SELECTED WORK</div><h2>Things I’ve<br /><em>put into the world.</em></h2></div>
            <p>A few projects exploring useful interfaces, reliable systems and the details in between.</p>
          </div>
          <div className="projects">
            {projects.map((project) => (
              <article className="project" key={project.number}>
                <div className="project-top"><span>{project.number} / 03</span><span>{project.type}</span></div>
                <div className={`project-art art-${project.number}`}>
                  {project.number === "01" ? <div className="mock-window"><div className="mock-bar"><i /><i /><i /></div><div className="mock-content"><div className="mock-sidebar" /><div className="mock-main"><b /><b /><b /></div></div></div> :
                   project.number === "02" ? <div className="orbit"><span>F</span><i /><b /></div> :
                   <div className="chart-art"><div className="chart-label">ACTIVITY / 30 DAYS</div><div className="bars">{[32,54,42,75,48,88,62,96,70,82,58,100].map((v,i)=><i key={i} style={{height:`${v}%`}} />)}</div></div>}
                </div>
                <div className="project-info">
                  <div><h3>{project.name}</h3><p>{project.description}</p></div>
                  <div className="project-side"><div className="tags">{project.stack.map((item)=><span key={item}>{item}</span>)}</div><a href={project.link} target="_blank" rel="noreferrer" aria-label={`View ${project.name}`}>↗</a></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section wrap" id="about">
        <div className="eyebrow">A LITTLE ABOUT ME</div>
        <div className="about-grid">
          <h2>Curious by<br />nature. <em>Builder</em><br /><em>by choice.</em></h2>
          <div className="about-copy">
            <p>I enjoy the whole journey: understanding a problem, shaping a clear experience, and engineering the details that make it work. I care about maintainable code, accessible interfaces and products that feel simple to use.</p>
            <p>When I’m not at my desk, I’m usually collecting ideas, learning something new or getting outside.</p>
            <div className="skills"><div className="eyebrow">TOOLS I WORK WITH</div><div className="skill-list">{skills.map((skill)=><span key={skill}>{skill}</span>)}</div></div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="wrap contact-inner">
          <div className="eyebrow">HAVE A GOOD ONE IN MIND?</div>
          <h2>Let’s make<br /><em>it happen.</em></h2>
          <a className="email-link" href="mailto:mazzask@proton.me">mazzask@proton.me <span>↗</span></a>
          <div className="contact-foot"><span>OPEN TO FREELANCE & FULL-TIME</span><div><a href="https://github.com/balistica" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://github.com/balistica" target="_blank" rel="noreferrer">GITHUB PROFILE ↗</a></div><span>BUILT WITH CARE · 2026</span></div>
        </div>
      </section>
    </main>
  );
}
