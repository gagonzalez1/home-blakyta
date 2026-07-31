import activitySnapshot from "./project-activity.json";

const projects = [
  {
    name: "Estación 3D",
    description: "Publicaciones de Mercado Libre y gestión del taller de impresión 3D.",
    href: "https://estacion.blakyta3d.duckdns.org",
    tag: "Taller",
    accent: "amber",
    icon: "E3",
    repository: "publicador-ml",
  },
  {
    name: "MetaIA Demo",
    description: "Demostración interactiva de asistentes de inteligencia artificial para negocios.",
    href: "https://demo.metaia.pro",
    tag: "Inteligencia artificial",
    accent: "violet",
    icon: "IA",
    repository: "metaia-demo",
  },
  {
    name: "Bot WhatsApp",
    description: "Panel y servicios del asistente conversacional conectado con WhatsApp.",
    href: "https://bot.blakyta3d.duckdns.org/docs",
    tag: "Automatización",
    accent: "green",
    icon: "WA",
    repository: "template-agente-whatsapp",
  },
  {
    name: "CV Builder ATS",
    description: "Creador de currículums optimizados para sistemas de selección de personal.",
    href: "https://cv.blakyta3d.duckdns.org",
    tag: "Herramientas",
    accent: "blue",
    icon: "CV",
    repository: "cv-builder-ats",
  },
  {
    name: "Recetario Heybez",
    description: "Recetas, planificación semanal y listas de compras para el robot de cocina.",
    href: "https://heybez.blakyta3d.duckdns.org",
    tag: "Cocina",
    accent: "coral",
    icon: "HB",
    repository: "heybez-recetario",
  },
  {
    name: "Prosperidad",
    description: "Finanzas personales, consumos de tarjetas, presupuestos y objetivos de ahorro.",
    href: "https://prosperidad.blakyta3d.duckdns.org",
    tag: "Finanzas",
    accent: "green",
    icon: "PR",
    repository: "prosperidad-sheets",
  },
  {
    name: "WooCommerce",
    description: "Tienda online de Blakyta 3D con catálogo, pagos y opciones de envío.",
    href: "https://tienda.blakyta3d.duckdns.org",
    tag: "Tienda online",
    accent: "teal",
    icon: "WC",
  },
] as const;

type Activity = {
  lastCommitAt: string;
  commitsTotal: number;
  commitsLast30Days: number;
};

const otherProjects = ["MetaIA Landing", "Tiendanube", "Vaquitas"] as const;

const activity = activitySnapshot.repositories as Record<string, Activity>;
const projectsWithActivity = projects.map((project) => ({
  ...project,
  activity: "repository" in project ? activity[project.repository] : undefined,
}));
const trackedProjects = projectsWithActivity.filter(
  (project): project is typeof project & { activity: Activity } => Boolean(project.activity),
);
const recentCommits = trackedProjects.reduce(
  (total, project) => total + project.activity.commitsLast30Days,
  0,
);
const mostActive = trackedProjects.reduce((current, project) =>
  project.activity.commitsLast30Days > current.activity.commitsLast30Days
    ? project
    : current,
);
const peakActivity = mostActive.activity.commitsLast30Days;

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "America/Argentina/Buenos_Aires",
});

const updatedFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Argentina/Buenos_Aires",
});

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
          Acceso rápido a las herramientas, demos y aplicaciones que están activas,
          con una mirada simple a dónde está yendo el trabajo.
        </p>

        <section className="work-pulse" aria-label="Resumen de actividad">
          <div>
            <span className="pulse-value">{recentCommits}</span>
            <span className="pulse-label">commits en los últimos 30 días</span>
          </div>
          <div>
            <span className="pulse-value">{mostActive.name}</span>
            <span className="pulse-label">
              proyecto más activo · {mostActive.activity.commitsLast30Days} commits
            </span>
          </div>
          <div>
            <span className="pulse-value">{projects.length}</span>
            <span className="pulse-label">aplicaciones activas</span>
          </div>
        </section>
      </header>

      <section className="project-grid" aria-label="Proyectos disponibles">
        {projectsWithActivity.map((project, index) => {
          const activityWidth =
            !project.activity || peakActivity === 0
              ? 0
              : Math.max(
                  5,
                  Math.round(
                    (project.activity.commitsLast30Days / peakActivity) * 100,
                  ),
                );

          return (
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
              <div className="project-copy">
                <span className="tag">{project.tag}</span>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
              </div>
              {project.activity ? (
                <div className="activity-block">
                  <div className="activity-date">
                    <span className="activity-dot" aria-hidden="true" />
                    <span>Último commit</span>
                    <time dateTime={project.activity.lastCommitAt}>
                      {dateFormatter.format(new Date(project.activity.lastCommitAt))}
                    </time>
                  </div>
                  <div
                    className="activity-meter"
                    role="img"
                    aria-label={`${project.activity.commitsLast30Days} commits en los últimos 30 días`}
                  >
                    <span style={{ width: `${activityWidth}%` }} />
                  </div>
                  <div className="commit-counts">
                    <span>
                      <strong>{project.activity.commitsLast30Days}</strong> en 30 días
                    </span>
                    <span>
                      <strong>{project.activity.commitsTotal}</strong> totales
                    </span>
                  </div>
                </div>
              ) : (
                <div className="activity-block service-activity">
                  <div className="service-status">
                    <span className="activity-dot" aria-hidden="true" />
                    <span>Servicio en línea</span>
                  </div>
                  <span className="service-platform">WordPress + WooCommerce</span>
                </div>
              )}
              <span className="open-label">Abrir proyecto <span>→</span></span>
            </a>
          );
        })}
      </section>

      <section className="other-projects" aria-labelledby="other-projects-title">
        <div>
          <p className="section-kicker">En desarrollo e integraciones</p>
          <h2 id="other-projects-title">Otros proyectos</h2>
        </div>
        <ul>
          {otherProjects.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </ul>
      </section>

      <footer>
        <span className="status-dot" />
        <span>{projects.length} aplicaciones disponibles</span>
        <span className="separator">·</span>
        <span>{otherProjects.length} otros proyectos</span>
        <span className="separator">·</span>
        <span>
          Actividad actualizada{" "}
          <time dateTime={activitySnapshot.updatedAt}>
            {updatedFormatter.format(new Date(activitySnapshot.updatedAt))}
          </time>
        </span>
        <span className="separator">·</span>
        <span>Blakyta 3D</span>
      </footer>
    </main>
  );
}
