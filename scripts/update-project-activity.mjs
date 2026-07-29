import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";

const repositories = [
  "publicador-ml",
  "metaia-demo",
  "template-agente-whatsapp",
  "cv-builder-ats",
  "heybez-recetario",
  "prosperidad-sheets",
];

const owner = "gagonzalez1";
const updatedAt = new Date();
const windowStartedAt = new Date(updatedAt);
windowStartedAt.setUTCDate(windowStartedAt.getUTCDate() - 30);

const repositoryFields = repositories
  .map(
    (repository, index) => `
      r${index}: repository(owner: "${owner}", name: "${repository}") {
        defaultBranchRef {
          target {
            ... on Commit {
              committedDate
              history { totalCount }
              recent: history(since: "${windowStartedAt.toISOString()}") {
                totalCount
              }
            }
          }
        }
      }
    `,
  )
  .join("\n");

const query = `query { ${repositoryFields} }`;
const response = JSON.parse(
  execFileSync("gh", ["api", "graphql", "-f", `query=${query}`], {
    encoding: "utf8",
  }),
);

if (response.errors?.length) {
  throw new Error(response.errors.map((error) => error.message).join("\n"));
}

const activity = Object.fromEntries(
  repositories.map((repository, index) => {
    const commit = response.data[`r${index}`]?.defaultBranchRef?.target;
    if (!commit) {
      throw new Error(`No se pudo leer la rama principal de ${repository}`);
    }

    return [
      repository,
      {
        lastCommitAt: commit.committedDate,
        commitsTotal: commit.history.totalCount,
        commitsLast30Days: commit.recent.totalCount,
      },
    ];
  }),
);

const snapshot = {
  updatedAt: updatedAt.toISOString(),
  windowStartedAt: windowStartedAt.toISOString(),
  repositories: activity,
};

const outputUrl = new URL("../app/project-activity.json", import.meta.url);
await writeFile(outputUrl, `${JSON.stringify(snapshot, null, 2)}\n`);

console.log(
  `Actividad actualizada: ${repositories.length} proyectos, ${Object.values(activity).reduce(
    (total, repository) => total + repository.commitsLast30Days,
    0,
  )} commits en 30 días.`,
);
