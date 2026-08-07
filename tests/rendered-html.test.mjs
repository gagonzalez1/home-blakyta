import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renderiza las aplicaciones activas y los otros proyectos", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Proyectos \| Blakyta 3D<\/title>/i);
  assert.match(html, /commits en los últimos 30 días/i);
  assert.match(html, /proyecto más activo/i);
  assert.match(html, /Último commit/i);
  assert.match(html, /en 30 días/i);
  assert.match(html, /totales/i);

  for (const project of [
    "Estación 3D",
    "MetaIA Demo",
    "MotorIA Repuestos",
    "Bot WhatsApp",
    "CV Builder ATS",
    "Recetario Heybez",
    "Prosperidad",
    "WooCommerce",
    "MetaIA Landing",
    "Tiendanube",
    "Vaquitas",
  ]) {
    assert.match(html, new RegExp(project));
  }

  assert.match(html, /Servicio en línea/i);
  assert.match(html, /8(?:<!-- -->)? aplicaciones disponibles/i);
  assert.match(html, /3(?:<!-- -->)? otros proyectos/i);
  assert.match(html, /Sitio institucional de MetaIA/i);
  assert.match(html, /Integración de catálogo y ventas de Tiendanube/i);
  assert.match(html, /conteo de ganado en videos de dron/i);
});

test("la instantánea contiene métricas válidas para los siete repositorios", async () => {
  const snapshot = JSON.parse(
    await readFile(new URL("app/project-activity.json", projectRoot), "utf8"),
  );

  assert.equal(Object.keys(snapshot.repositories).length, 7);
  assert.ok(Date.parse(snapshot.updatedAt));
  assert.ok(Date.parse(snapshot.windowStartedAt));

  for (const repository of Object.values(snapshot.repositories)) {
    assert.ok(Date.parse(repository.lastCommitAt));
    assert.ok(Number.isInteger(repository.commitsTotal));
    assert.ok(Number.isInteger(repository.commitsLast30Days));
    assert.ok(repository.commitsTotal >= repository.commitsLast30Days);
    assert.ok(repository.commitsLast30Days >= 0);
  }
});
