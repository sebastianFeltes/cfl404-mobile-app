# Navegación — Expo Router

Rutas file-based en `app/` (template Expo SDK 57; no usar `src/app/`). El starter `(tabs)/index` + `explore` se reemplaza por esta estructura.

## Árbol propuesto

```text
app/
  _layout.tsx                 # root: fonts, theme, auth gate
  (auth)/
    _layout.tsx               # stack sin tabs
    login.tsx
    ayuda.tsx
  (app)/
    _layout.tsx               # tabs (o drawer) post-login
    index.tsx                 # Dashboard
    cursos/
      index.tsx               # listado + notificaciones
      [id].tsx                # detalle de curso
    asistencia.tsx            # credencial + QR
    beneficios.tsx            # comercios
    perfil.tsx
    contacto.tsx
    cooperadora.tsx
    ayuda.tsx
```

## Tabs sugeridos (barra inferior)

1. Inicio → `/(app)` dashboard
2. Cursos → `/(app)/cursos`
3. Credencial → `/(app)/asistencia`
4. Más → perfil, contacto, beneficios, cooperadora, ayuda  
   (o un quinto tab si el grupo prefiere Beneficios a la vista)

## Flujos

```text
Login (Google)
  ├─ Ayuda
  └─ Dashboard
        ├─ Perfil
        ├─ Cursos → Curso (recursos, WhatsApp, historial asistencia)
        ├─ Asistencia (credencial + QR)
        ├─ Beneficios
        ├─ Contacto
        ├─ Cooperadora
        └─ Ayuda
```

## Convenciones

- Una pantalla = un archivo de ruta (o carpeta con `index.tsx`).
- Params de curso: `/(app)/cursos/[id]`.
- Deep links con el scheme de `app.json`: `cfl404mobile`.
- Textos de UI en español.
