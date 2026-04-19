# Yanina De Martino

## Descripción del proyecto

**Sitio institucional** de la artista visual Yanina De Martino: obra, galería, premios y navegación por secciones definidas en `app/`, con posibilidad de contenido dinámico vía Firebase.

## Problema que resuelve

Da una presencia web curada y mantenible frente a perfiles sociales solos, para que curadores, medios y público encuentren obra, contexto y recorrido en un dominio propio.

## Stack

- Next.js, TypeScript, React
- Firebase, TanStack Query, Zustand, React Hook Form, Zod

## Requisitos

- Node.js LTS

## Instalación

```bash
npm install
npm run dev
```

Scripts: `build`, `start`, `lint`, `format`.

## Variables de entorno

`.env.local` con `NEXT_PUBLIC_FIREBASE_*` si usás Firebase en este despliegue.

## Rutas principales

- `/` — inicio, obra destacada, mapa, premios
- `/obras` — galería
- Otras rutas: revisá la carpeta `app/`
