# Producto — App CFL 404

Punto de partida para implementar la app de alumnos del CFL 404 (ciclo 2026).

Fuentes:

- `docs/specs-iniciales.txt` — secciones, paleta y tipografía
- `docs/flujos-app-cfl-404-2026.svg` — flujos y layouts de referencia (Excalidraw)
- Este documento — alcance acordado para el curso

Los números al lado de cada sección en las specs (`login 8`, `dashboard 13`, …) son **peso relativo de esfuerzo**, no IDs de ruta.

Si hay contradicción entre fuentes, **gana este documento**. En particular: Asistencia es credencial + QR (no un botón “Dar asistencia”); Beneficios son comercios, no una segunda credencial.

## Objetivo

App mobile (Expo) para que el alumno inicie sesión, vea su cursada, muestre una credencial con QR para asistencia, consulte beneficios, contacto institucional y datos de cooperadora.

## Paleta y tipografía

| Token | Hex | Uso |
| --- | --- | --- |
| azul (oscuro/claro en specs) | `#166193` | Primario, header, botones principales |
| celeste | `#37A6DE` | Acentos, links, tab/estado activo |
| amarillo | `#FDEA14` | Destacados, CTAs secundarios, badges |
| gris-oscuro | `#1D1E1C` | Texto principal |
| gris-claro | `#585856` | Texto secundario, bordes, captions |
| blanco | `#FFFFFF` | Fondos, texto sobre azul |

En las specs, `azul-oscuro` y `azul-claro` comparten el mismo hex. Usar un solo token `azul` hasta que haya un segundo tono definido.

Fuentes: **Roboto Flex** (cuerpo / UI), **Nunito** (títulos).

Implementar los tokens en `constants/theme.ts` y usarlos desde las pantallas. No hardcodear hex de la paleta en componentes.

## Pantallas

### Fuera de sesión

| Pantalla | Qué hace |
| --- | --- |
| Login | Entrada con **Google**. Link a Ayuda. |
| Ayuda | Cómo usar la app. También accesible logueado. |

### Dentro de sesión

| Pantalla | Qué hace |
| --- | --- |
| Dashboard | Home. Atajos a las demás secciones. |
| Perfil | Vista, carga y edición de datos del alumno. |
| Cursos | Listado de cursadas y notificaciones de cursada. |
| Curso | Datos del curso, recursos académicos, WhatsApp, **historial de asistencia**. |
| Contacto | Los mismos datos que la página web institucional. |
| Asistencia | Credencial + QR (ver salvedad abajo). |
| Beneficios | Comercios adheridos. |
| Cooperadora | Datos para copiar y compartir (CBU/alias, etc.). |

## Salvedad: Asistencia

En el diagrama de flujos aparece un botón **“Dar asistencia”**. **No se implementa así.**

La pantalla **Asistencia** es una **credencial de alumno**:

- Datos visibles (nombre, documento/legajo, foto si existe, curso/ciclo)
- **Código QR** que identifica al alumno para que el personal del instituto registre la asistencia

El alumno no marca asistencia con un botón en el teléfono. El historial de presentismo se ve en **Curso**.

La credencial vive **solo** en Asistencia. En **Beneficios** no se duplica otra credencial: ahí van los comercios.

## Fuera de alcance (v1 del curso)

- Panel de preceptor/docente para escanear el QR (puede mockearse el payload del QR)
- Backend propio (usar mocks o APIs que defina el docente)
- Pagos de cooperadora in-app (solo copiar/compartir datos)

## Referencia visual

Usar `docs/flujos-app-cfl-404-2026.svg` para composición y flujo entre pantallas. Si el SVG contradice este documento, **gana este documento** (credencial + QR en Asistencia).
