# Agentes — CFL 404 mobile

App Expo **SDK 54** para alumnos del CFL 404 (ciclo 2026).

Antes de implementar, leer en este orden:

1. `docs/producto.md` — alcance, pantallas y salvedades (**fuente de verdad**)
2. `docs/navegacion.md` — rutas Expo Router
3. `docs/specs-iniciales.txt` — paleta, tipografía y peso de esfuerzo
4. `docs/flujos-app-cfl-404-2026.svg` — composición visual

Si hay contradicción, **gana `docs/producto.md`**. El SVG y las specs no pisan la salvedad de Asistencia.

APIs de Expo: [docs versionadas SDK 54](https://docs.expo.dev/versions/v54.0.0/).

## Stack

- Expo SDK 54 + Expo Router (rutas en `app/`, no `src/app/`)
- TypeScript; textos de UI en **español**
- Tokens de color y fuente en `constants/theme.ts`
- Deep link scheme: `cfl404mobile`

## Asistencia

La pantalla es una **credencial de alumno + QR**. El alumno no marca asistencia con un botón. El historial de presentismo vive en **Curso**. No duplicar la credencial en Beneficios.

## Fuera de alcance (v1)

- Panel de preceptor/docente para escanear el QR (se puede mockear el payload)
- Backend propio (mocks o APIs que defina el docente)
- Pagos de cooperadora in-app (solo copiar/compartir datos)
