# Campos de lectura — API para app mobile (alumnos)

Documento de referencia para consumir datos del backend CFL 404 desde la app Expo (`cfl404-mobile-app`).

**Alcance mobile v1**

- Usuarios: rol `ALUMNO` (lectura únicamente).
- Una vez matriculado, los datos filiatorios no se editan desde la app (igual que la web).
- Pantallas según `docs/producto.md` y `docs/navegacion.md`.

**Fuente de verdad del modelo:** `server/prisma/schema.prisma`  
**Base URL dev:** `http://localhost:4000`  
**Auth:** `Authorization: Bearer <jwt>` (excepto login y rutas públicas de cursos).

---

## Resumen por pantalla

| Pantalla | Lectura principal | Endpoint recomendado | Estado hoy |
| --- | --- | --- | --- |
| Login | Sesión + perfil | `POST /api/auth/google` | ✅ Implementado |
| Dashboard | Perfil + resumen cursadas | `GET /api/auth/me` + cursos del alumno | ⚠️ Cursos sin filtro por alumno |
| Perfil | Datos del alumno | `GET /api/auth/me` | ✅ Implementado |
| Cursos (listado) | Inscripciones del alumno | `GET /api/mobile/me/courses` *(propuesto)* | ❌ Pendiente |
| Curso (detalle) | Curso + asistencia + docente | `GET /api/mobile/courses/:id` *(propuesto)* | ⚠️ Parcial (`GET /courses/:id` sin asistencia) |
| Asistencia (credencial QR) | Identidad + payload QR | `GET /api/mobile/credential` *(propuesto)* | ❌ Pendiente |
| Beneficios | Comercios adheridos | `GET /api/mobile/beneficios` *(propuesto)* | ❌ Solo mock en web |
| Contacto | Datos institucionales | `GET /api/mobile/contacto` *(propuesto)* | ❌ Solo estático en web |
| Cooperadora | CBU/alias + cuotas propias | `GET /api/mobile/cooperadora` *(propuesto)* | ⚠️ Pagos solo para staff hoy |
| Ayuda | Texto estático | Local en app o `Setting` | ❌ Sin API |

---

## Autenticación

### `POST /api/auth/google`

Body (escritura; solo login):

```json
{ "credential": "<id_token_google>" }
```

Respuesta — campos a leer:

| Campo | Tipo | Origen DB | Uso en app |
| --- | --- | --- | --- |
| `token` | string | JWT | Guardar sesión |
| `isNewAccount` | boolean | — | Flujo postulante / onboarding |
| `message` | string | — | Feedback UI |
| `user.id` | string (uuid) | `users.id` | Identidad, QR |
| `user.firstName` | string | `users.first_name` | Credencial, perfil |
| `user.lastName` | string | `users.last_name` | Credencial, perfil |
| `user.email` | string | `users.email` | Perfil (solo lectura) |
| `user.dni` | string \| null | `users.dni` | Credencial, perfil |
| `user.role` | string | `role.name` | Gate: solo `ALUMNO` |
| `user.roleId` | number | `users.role_id` | `8` = ALUMNO |
| `user.statusId` | number | `users.status_id` | Ver catálogo abajo |
| `user.status` | string | derivado | `"Activo"`, `"Pendiente"`, etc. |
| `user.emailVerified` | boolean | `users.email_verified` | Perfil |
| `user.profilePhotoUrl` | string \| null | `users.profile_photo_url` | Credencial, avatar |
| `user.locale` | string \| null | `users.locale` | Opcional |
| `user.lastLoginAt` | string (ISO) \| null | `users.last_login_at` | Opcional |
| `user.acceptedTerms` | boolean | `users.accepted_terms` | Perfil |
| `user.type` | string | derivado | `"STUDENT"` |
| `user.detail` | object \| null | `user_detail` | Ver UserDetail abajo |

### `GET /api/auth/me`

Misma forma de `user` que el login + `token` renovado.

### `POST /api/auth/dev-login` (solo desarrollo)

Body: `{ "accountType": "alumno" }` — cuenta seed `alumno.test@cfl404.edu.ar`.

---

## Perfil del alumno (`user` + `user.detail`)

Objeto anidado en `GET /api/auth/me` → `user.detail` (`UserDetail`).

| Campo API | Tipo | Columna DB | Mostrar en Perfil |
| --- | --- | --- | --- |
| `id` | string | `user_detail.id` | — |
| `userId` | string | `user_detail.user_id` | — |
| `address` | string \| null | `address` | Sí |
| `phone` | string \| null | `phone` | Sí |
| `dob` | string (ISO) \| null | `dob` | Sí (fecha nacimiento) |
| `extraPhone` | string \| null | `extra_phone` | Sí (contacto emergencia) |
| `extraEmail` | string \| null | `extra_email` | Sí |
| `academicLevel` | string \| null | `academic_level` | Sí |
| `gender` | string \| null | `gender` | Sí |
| `nacionality` | string \| null | `nacionality` | Sí |
| `dniCopy` | string \| null | `dni_copy` | Solo staff (no mobile) |
| `formCopy` | string \| null | `form_copy` | Solo staff |
| `titleCopy` | string \| null | `title_copy` | Solo staff |
| `createdAt` | string (ISO) | `created_at` | — |
| `updatedAt` | string (ISO) | `updated_at` | — |

Campos de `user` ya listados en auth (nombre, DNI, foto, estado, rol).

**Nota:** `PATCH /api/auth/me` existe en el servidor pero la app mobile **no debe usarlo** para alumnos matriculados.

---

## Cursos del alumno (listado)

Pantalla: `/(app)/cursos` — cursadas inscritas + avisos de cursada.

Relación: `UserCourse` (`user_course`) filtrada por `userId` del JWT.

### Endpoint propuesto: `GET /api/mobile/me/courses`

Respuesta sugerida — cada ítem del array `courses`:

| Campo | Tipo | Origen | Uso |
| --- | --- | --- | --- |
| `userCourseId` | string | `user_course.id` | Asistencia, QR interno |
| `enrollmentDate` | string (ISO) | `user_course.created_at` | Listado |
| `course.id` | string | `course.id` | Navegación `[id]` |
| `course.name` | string | `course.name` | Título |
| `course.statusId` | number | `course.status_id` | Badge estado cursada |
| `course.status.name` | string | `status.name` | Texto: ACTIVO, etc. |
| `course.startDate` | string \| null | `course.start_date` | Fechas |
| `course.endDate` | string \| null | `course.end_date` | Fechas |
| `course.startTime` | string \| null | `course.start_time` | Horario |
| `course.endTime` | string \| null | `course.end_time` | Horario |
| `course.isAnnual` | boolean | `course.is_annual` | Ciclo |
| `course.maxAbsences` | number | `course.max_absences` | Límite faltas |
| `course.instructorId` | string | `course.instructor_id` | — |
| `course.instructor.firstName` | string | `users.first_name` | Docente |
| `course.instructor.lastName` | string | `users.last_name` | Docente |
| `course.courseDetail.description` | string \| null | `course_detail.description` | Resumen |
| `course.courseDetail.hourQuantity` | number | `hour_quantity` | Detalle |
| `course.courseDetail.classesQuantity` | number | `classes_quantity` | Detalle |
| `course.courseDetail.sponsorName` | string \| null | `sponsor_name` | Patrocinador |
| `course.courseDetail.sponsorLogo` | string \| null | `sponsor_logo` | URL logo |
| `absenceCount` | number | **calculado** | Faltas consumidas |
| `absenceLimit` | number | `course.max_absences` | Máximo permitido |
| `attendanceSummary.present` | number | **calculado** | Resumen dashboard |
| `attendanceSummary.absent` | number | **calculado** | Resumen |
| `attendanceSummary.late` | number | **calculado** | Resumen |
| `notification` | string \| null | futuro / derivado | Aviso de cursada |

**Hoy:** `GET /courses` devuelve todos los cursos del instituto (público), sin filtro por alumno ni resumen de faltas. Para mobile hace falta endpoint scoped al usuario.

### Días y aulas (opcional en listado, útil en detalle)

| Campo | Tipo | Origen |
| --- | --- | --- |
| `days[].id` | number | `day.id` |
| `days[].name` | string | `day.name` (ej. "Lunes") |
| `classrooms[].id` | number | `classroom.id` |
| `classrooms[].name` | string | `classroom.name` |
| `classrooms[].capacity` | number | `classroom.capacity` |

Tablas: `course_day`, `classroom_course`, `classroom`.

---

## Detalle de curso + historial de asistencia

Pantalla: `/(app)/cursos/[id]`.

### Endpoint propuesto: `GET /api/mobile/courses/:courseId`

Incluye todo lo del listado más:

| Campo | Tipo | Origen | Uso |
| --- | --- | --- | --- |
| `course.courseDetail.quota` | number | `quota` | Cupo |
| `course.courseDetail.titleRequired` | boolean | `title_required` | Requisitos |
| `course.courseDetail.endorsementBy` | string \| null | `endorsement_by` | Aval institucional |
| `course.preEnrollmentDate` | string \| null | `pre_enrollment_date` | Preinscripción |
| `instructor.email` | string | `users.email` | Contacto docente |
| `instructor.profilePhotoUrl` | string \| null | `profile_photo_url` | UI |
| `whatsappGroupUrl` | string \| null | **pendiente DB** | Botón WhatsApp |
| `resourcesUrl` | string \| null | **pendiente DB** | Recursos académicos |
| `attendanceHistory[]` | array | ver abajo | Historial |

### Historial de asistencia (`attendanceHistory[]`)

Registro por clase tomada (`attendance` + `attendance_code`).

| Campo | Tipo | Origen | Uso |
| --- | --- | --- | --- |
| `id` | string | `attendance.id` | — |
| `date` | string (ISO) | `attendance.created_at` | Fecha del registro |
| `codeId` | number | `attendance.id_code` | — |
| `codeName` | string | `attendance_code.name` | Texto en UI |
| `countsAsAbsence` | boolean | **calculado** | Ver reglas abajo |

**Códigos sembrados** (`attendance_code.name`):

| id (seed) | name | Cuenta como falta |
| --- | --- | --- |
| — | `presente` | No |
| — | `tarde` | No (configurable) |
| — | `media falta` | Sí |
| — | `ausente` | Sí |
| — | `justificado` | No |
| — | `feriado` | No |

**Cálculo de faltas:**

```text
absenceCount = registros donde codeName ∈ { 'ausente', 'media falta' }
restantes = course.maxAbsences - absenceCount
```

**Hoy:** `GET /attendance` es un stub sin datos. No hay endpoint de historial por alumno/curso.

---

## Credencial + QR (Asistencia)

Pantalla: `/(app)/asistencia` — **solo mostrar**, el personal escanea el QR.

### Endpoint propuesto: `GET /api/mobile/credential`

| Campo | Tipo | Origen | UI credencial |
| --- | --- | --- | --- |
| `studentId` | string | `users.id` | Interno |
| `firstName` | string | `users.first_name` | Nombre |
| `lastName` | string | `users.last_name` | Apellido |
| `dni` | string \| null | `users.dni` | Documento |
| `profilePhotoUrl` | string \| null | `profile_photo_url` | Foto |
| `role` | string | `role.name` | `"ALUMNO"` |
| `status` | string | derivado | Regular / estado |
| `courseName` | string | `course.name` | Cursada activa |
| `courseId` | string | `course.id` | — |
| `cycleLabel` | string | derivado | Ej. "2026" o etapa |
| `institution` | string | constante | `"CFL N°404 Berisso"` |
| `qrPayload` | string | **generado** | Contenido del QR |
| `qrVersion` | number | constante | Compatibilidad futura |

**Payload QR sugerido (JSON stringificado):**

```json
{
  "v": 1,
  "type": "cfl404-student",
  "userId": "<uuid>",
  "userCourseId": "<uuid>",
  "dni": "40123456",
  "iat": 1756848000
}
```

El escáner de preceptoría validará `userId` / `userCourseId` contra la DB al implementar el panel de lectura.

---

## Cooperadora

Pantalla: `/(app)/cooperadora` — copiar datos bancarios + ver estado de cuotas **propias** (solo lectura).

### Datos bancarios (hoy en web, no en DB)

| Campo | Valor referencia web | Futuro: `Setting.key` |
| --- | --- | --- |
| `banco` | `Banco Provincia de Buenos Aires` | `cooperadora.banco` |
| `alias` | `coop.cfl.404` | `cooperadora.alias` |
| `cbu` | `0140032801503305438550` | `cooperadora.cbu` |
| `cuit` | `30-71753985-7` | `cooperadora.cuit` |
| `whatsappNumber` | `5492213192360` | `cooperadora.whatsapp` |
| `whatsappMessage` | texto comprobante | `cooperadora.whatsapp_message` |
| `monthlyAmount` | `3000` (seed) | `cooperadora.cuota_mensual` |

### Cuotas del alumno — `cooperadora_payment`

Endpoint propuesto: `GET /api/mobile/cooperadora/me?year=2026`

| Campo API | Tipo | Columna DB | Uso |
| --- | --- | --- | --- |
| `year` | number | filtro | Año lectivo |
| `months[]` | array | — | 1–12 |
| `months[].month` | number | `month` | Mes |
| `months[].paid` | boolean | existe registro | UI check |
| `months[].amount` | number \| null | `amount` | Monto abonado |
| `months[].paymentDate` | string \| null | `payment_date` | Fecha |
| `months[].notes` | string \| null | `notes` | Notas |

Modelo completo (staff):

| Campo | Columna |
| --- | --- |
| `id` | `id` |
| `userId` | `user_id` |
| `month` | `month` |
| `year` | `year` |
| `amount` | `amount` |
| `paymentDate` | `payment_date` |
| `notes` | `notes` |

**Hoy:** `GET /api/v1/cooperadora/pagos` requiere rol staff. Mobile necesita endpoint restringido al `userId` del JWT.

---

## Contacto institucional

Pantalla: `/(app)/contacto` — mismos datos que la web (`Footer.jsx`).

Endpoint propuesto: `GET /api/mobile/contacto` o claves en tabla `setting`.

| Campo | Valor referencia | Uso |
| --- | --- | --- |
| `phone` | `0800-348-0111` | Teléfono |
| `phoneHref` | `tel:08003480111` | Link |
| `email` | `cfp404berisso@abc.gob.ar` | Correo |
| `addressLine1` | `Calle La Portada N.º 4120 (Acceso 4 al Puerto)` | Dirección |
| `addressLine2` | `Berisso, Buenos Aires, Argentina` | Ciudad |
| `mapsEmbedUrl` | URL Google Maps | Mapa |
| `social.facebook` | URL | Redes |
| `social.instagram` | URL | Redes |
| `social.twitter` | URL | Redes |
| `social.youtube` | URL | Redes |
| `social.whatsapp` | URL / número | WhatsApp institucional |
| `institutionName` | `Centro de Formación Laboral N.º 404` | Texto |
| `institutionDescription` | texto pie de página | Texto |

Tabla `setting` (`key` / `value`) puede centralizar esto en el futuro.

---

## Beneficios (comercios adheridos)

Pantalla: `/(app)/beneficios`.

**Hoy no hay tabla en DB** — la web usa `client/src/utils/mockData.js` → `comercios[]`.

Endpoint propuesto: `GET /api/mobile/beneficios`

| Campo | Tipo | Uso |
| --- | --- | --- |
| `id` | number \| string | Identificador |
| `nombre` | string | Nombre comercio |
| `rubro` | string | Categoría |
| `direccion` | string | Ubicación |
| `descuento` | string | Badge ("10% OFF") |
| `descuentoDetalle` | string | Texto largo |
| `telefono` | string | WhatsApp (sin `+`) |
| `descripcion` | string | Descripción |
| `catalogo` | string[] | Ítems / rubros |

Futuro: modelo `Beneficio` o `ComercioAdherido` en Prisma.

---

## Ayuda

Contenido estático en la app o `GET /api/mobile/ayuda` con markdown/HTML. Sin campos de DB hoy.

---

## Dashboard (agregados)

Datos derivados de otros endpoints — no requieren tablas nuevas:

| Campo | Fuente |
| --- | --- |
| `greetingName` | `user.firstName` |
| `activeCoursesCount` | count `userCourses` |
| `primaryCourseName` | primer `userCourse.course.name` |
| `absenceCount` / `absenceLimit` | curso principal |
| `cooperadoraPendingMonths` | meses sin pago en año actual |
| `quickLinks` | rutas locales de la app |

---

## Catálogos fijos

### Roles (`role`)

| id | name | Mobile |
| --- | --- | --- |
| 8 | `ALUMNO` | ✅ Permitido |
| 9 | `POSTULANTE` | ❌ Fuera de alcance v1 |
| 1–7 | staff | ❌ |

### Estados usuario (`status`)

| id | name | Texto API `user.status` |
| --- | --- | --- |
| 1 | `ACTIVO` | Activo |
| 2 | `INACTIVO` | Inactivo |
| 3 | `PENDIENTE` | Pendiente |
| 4 | `EGRESADO` | Egresado |

### Estados curso (`status` en `course`)

Misma tabla `status` — ids 1–4 según seed.

---

## Endpoints existentes útiles hoy (sin mobile-specific)

| Método | Ruta | Auth | Notas |
| --- | --- | --- | --- |
| GET | `/health` | No | Healthcheck |
| POST | `/api/auth/google` | No | Login |
| GET | `/api/auth/me` | JWT | Perfil |
| GET | `/courses` | No | Todos los cursos (sin filtro alumno) |
| GET | `/courses/:id` | No | Detalle curso sin asistencia |
| GET | `/api/alumnos/:id` | No | **Evitar** — expone todos los alumnos sin auth en rutas actuales |

---

## Convenciones para la app

1. **Nombres:** el API de auth usa **camelCase** (`firstName`, `profilePhotoUrl`). Algunos endpoints de alumnos usan **snake_case** (`first_name`). Normalizar en un mapper del cliente mobile.
2. **Fechas:** ISO 8601 en JSON; mostrar con locale `es-AR`.
3. **Imágenes:** URLs absolutas (`profilePhotoUrl`, `sponsorLogo`).
4. **Errores:** `{ "error": "mensaje" }` con HTTP 4xx/5xx.
5. **CORS:** el origen de Expo dev debe estar en `CLIENT_URL` del servidor.

---

## Próximos pasos backend (para cerrar mobile)

1. `GET /api/mobile/me/courses` — cursos + resumen faltas del JWT.
2. `GET /api/mobile/courses/:id` — detalle + `attendanceHistory`.
3. `GET /api/mobile/credential` — datos credencial + `qrPayload`.
4. `GET /api/mobile/cooperadora/me` — datos bancarios + cuotas del alumno.
5. `GET /api/mobile/contacto` y `GET /api/mobile/beneficios` — migrar estáticos/mock a `setting` o tablas nuevas.
6. Campos opcionales en `course_detail`: `whatsappGroupUrl`, `resourcesUrl`.

---

*Generado para el ciclo 2026 — CFL 404. Alineado con `docs/producto.md` y `server/prisma/schema.prisma`.*
