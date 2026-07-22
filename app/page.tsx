const projects = [
  {
    name: "Estación 3D",
    description: "Publicaciones de Mercado Libre y gestión del taller de impresión 3D.",
    href: "https://estacion.blakyta3d.duckdns.org",
    tag: "Taller",
    accent: "amber",
    icon: "E3",
  },
  {
    name: "MetaIA Demo",
    description: "Demostración interactiva de asistentes de inteligencia artificial para negocios.",
    href: "https://demo.metaia.pro",
    tag: "Inteligencia artificial",
    accent: "violet",
    icon: "IA",
  },
  {
    name: "Bot WhatsApp",
    description: "Panel y servicios del asistente conversacional conectado con WhatsApp.",
    href: "https://bot.blakyta3d.duckdns.org/docs",
    tag: "Automatización",
    accent: "green",
    icon: "WA",
  },
  {
    name: "CV Builder ATS",
    description: "Creador de currículums optimizados para sistemas de selección de personal.",
    href: "https://cv.blakyta3d.duckdns.org",
    tag: "Herramientas",
    accent: "blue",
    icon: "CV",
  },
  {
    name: "Recetario Heybez",
    description: "Recetas, planificación semanal y listas de compras para el robot de cocina.",
    href: "https://heybez.blakyta3d.duckdns.org",
    tag: "Cocina",
    accent: "coral",
    icon: "HB",
  },
];

export default function Home() {
  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="hero">
        <div className="brand" aria-label="Blakyta 3D">
          <span className="brand-mark">B3</span>
          <span>Blakyta 3D</span>
        </div>
        <p className="eyebrow"><span /> Centro de proyectos</p>
        <h1>Todo en un solo lugar.</h1>
        <p className="intro">
          Acceso rápido a las herramientas, demos y aplicaciones que están activas.
        </p>
      </header>

      <section className="project-grid" aria-label="Proyectos disponibles">
        {projects.map((project, index) => (
          <a
            className={`project-card ${project.accent}`}
            href={project.href}
            key={project.name}
            target="_blank"
            rel="noreferrer"
            style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
          >
            <div className="card-top">
              <span className="project-icon" aria-hidden="true">{project.icon}</span>
              <span className="arrow" aria-hidden="true">↗</span>
            </div>
            <div>
              <span className="tag">{project.tag}</span>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
            </div>
            <span className="open-label">Abrir proyecto <span>→</span></span>
          </a>
        ))}
      </section>

      <footer>
        <span className="status-dot" />
        <span>{projects.length} proyectos disponibles</span>
        <span className="separator">·</span>
        <span>Blakyta 3D</span>
      </footer>
    </main>
  );
}
