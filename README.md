# Home Blakyta 3D

Portal de acceso a las aplicaciones desplegadas para Blakyta 3D.

## Producción

- URL: `https://home.blakyta3d.duckdns.org`
- Stack: React + vinext
- Despliegue: Dockerfile mediante Coolify
- Puerto interno: `3000`

## Desarrollo

```bash
npm install
npm run dev
```

## Actividad de proyectos

Cada tarjeta muestra la fecha del último commit, los commits de los últimos
30 días y el total histórico de su repositorio. Los repositorios son privados,
por lo que el portal usa una instantánea sin credenciales.

Antes de publicar una actualización del portal:

```bash
npm run activity:update
```

El comando consulta GitHub con la sesión activa de `gh` y actualiza
`app/project-activity.json`.
