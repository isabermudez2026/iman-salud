# IMAN Salud — Generador de Carruseles para Médicos

## Descripción del Proyecto

IMAN Salud es una aplicación web desarrollada para **Grupo Impacters** que
genera carruseles estratégicos de contenido para redes sociales, orientados a
profesionales de la salud (médicos especialistas). Usa inteligencia artificial
(Claude de Anthropic) vía Server Actions para producir contenido de marketing
médico que convierte visibilidad en intención de consulta.

Los médicos se registran libremente, operan bajo un **plan freemium con límites
configurables por un administrador** (N generaciones O tiempo de acceso, lo que
se agote primero), y un **panel admin** gestiona usuarios, límites, acceso VIP
y consumo de tokens. El plan de trabajo vigente son los issues `E1-01` a
`E1-12` del repo `isabermudez2026/iman-salud` (alcance CERRADO).

> **Nota de transición:** en el código puede existir todavía la autenticación
> legada por contraseña única (`SignIn.tsx`, `PASSWORD_KEY`). Se ELIMINA al
> completar E1-04. No extenderla ni preservarla en código nuevo.

## ¿Qué hace? (funcionamiento objetivo)

1. **Registro abierto** (Supabase Auth): nombre, apellido, correo,
   especialidad (valores en español), teléfono y contraseña. El registro crea
   automáticamente un perfil con los límites freemium por defecto
   (trigger sobre `auth.users` + valores de `app_settings`).
2. **Login / logout** por email y contraseña; **recuperación de contraseña**
   end-to-end. Emails transaccionales en español vía **Resend** desde el
   dominio del cliente.
3. **Aviso legal**: términos de uso antes de permitir la generación.
4. **Formulario de entrada**: especialidad médica, paciente ideal, problema a
   tratar, enfoque diferenciador, tipo de servicio, tono de voz, frase real del
   médico, tipo de hook (automático o seleccionado).
5. **Generación con IA con gating freemium**: la Server Action verifica sesión
   y límites ANTES de llamar a Anthropic; tras una respuesta exitosa registra
   el consumo con la RPC transaccional `consume_generation` (tokens reales de
   entrada/salida). Si el usuario está bloqueado, NO se llama a Anthropic y se
   muestra un mensaje claro en español. La UI muestra generaciones restantes y
   fecha de expiración.
6. **Visualización y copiado**: carrusel de 6-10 láminas en JSON, con copia
   individual o total.
7. **Panel admin** (`/admin`, solo administradores): lista de usuarios con sus
   datos, edición de `generation_limit` y `access_expires_at` (acceso VIP),
   defaults globales en `app_settings`, consumo por usuario, contador global de
   tokens y crédito estimado restante de Anthropic (precios editables en
   `app_settings`).

## Modelo de datos (Supabase Postgres)

- `profiles`: datos personales + `plan`, `status`, `generation_limit`,
  `generations_used`, `access_expires_at`, `cycle_started_at`.
- `usage_log`: `user_id`, `input_tokens`, `output_tokens`, `created_at`.
- `errors`: `user_id` (nullable), `context`, `message`, `stack`, `created_at`.
- `app_settings`: key/value (jsonb) para defaults freemium, precios de
  Anthropic, crédito inicial y allowlist de admins.
- **RPC `consume_generation`**: en UNA transacción bloquea la fila del perfil
  (`FOR UPDATE`), valida ambas reglas freemium, incrementa el contador e
  inserta en `usage_log`. Atómica y segura ante concurrencia.
- **RLS activo en todas las tablas**: el usuario solo lee/edita su propio
  perfil (los campos de límites NO son editables por el cliente); `usage_log`
  solo lectura propia; `errors` y `app_settings` solo servidor/admin.
- Todo el esquema vive en `supabase/migrations/` (SQL numerado).

## Stack Técnico

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Lenguaje**: TypeScript
- **UI**: React 19 con estilos inline (sin CSS framework, sin librerías de UI)
- **Iconos**: lucide-react
- **IA**: API REST de Anthropic (Claude Sonnet 4.6)
- **Backend**: Supabase (Auth + Postgres, free tier)
- **Emails**: Resend (dominio del cliente)
- **Errores**: Sentry (`@sentry/nextjs`, free tier) + tabla `errors`
- **Package manager**: pnpm (workspace)
- **Deploy**: Vercel (free tier)

## Estructura del Proyecto (objetivo)

```
src/
├── app/
│   ├── actions/              # Server Actions ("use server" obligatorio)
│   │   ├── auth.ts           # Registro, login, logout, recuperación
│   │   └── carrousel.ts      # Gating freemium + Anthropic + consume_generation
│   ├── admin/                # Panel admin — solo administradores
│   ├── login/  registro/  recuperar/  restablecer/   # Rutas de auth
│   ├── layout.tsx
│   └── page.tsx              # Generador (protegido por sesión)
├── components/               # FormScreen, HeaderNode, Legal, OutputScreen...
├── lib/
│   ├── supabase/             # server.ts, client.ts, admin.ts (solo servidor)
│   └── log-error.ts          # Doble sink: Sentry + tabla errors
├── utils/
│   ├── constants.ts          # Tonos, hooks, especialidades (valores en español)
│   ├── prompts.ts            # System/user prompt para Claude
│   └── style.ts              # ÚNICA fuente de estilos (objeto BRAND)
└── types.d.ts
middleware.ts                 # Refresco de sesión + protección de rutas
supabase/
└── migrations/               # SQL numerado — nunca aplicar en silencio
```

## Variables de Entorno

Se usa el **sistema nuevo de API keys de Supabase** (publishable/secret), NO
las keys legadas `anon` / `service_role`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...   # cliente, pasa por RLS
SUPABASE_SECRET_KEY=sb_secret_...                          # SOLO servidor, bypass RLS
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=...
SENTRY_DSN=...
```

Placeholders en `.env.example` (commiteado); valores reales solo en `.env.local`
(gitignoreado). **Nunca commitear secretos.**

## Reglas duras (no violar nunca)

- **Estilos**: SOLO estilos inline centralizados en `src/utils/style.ts`.
  NO Tailwind, NO archivos CSS, NO librerías de componentes. Iconos: lucide-react.
- **Idioma**: TODO el código, nombres de archivo, identificadores, comentarios y
  mensajes de commit en INGLÉS. TODOS los valores visibles al usuario en
  ESPAÑOL neutro (sin regionalismos): copy de UI, labels, placeholders,
  mensajes de validación y error, plantillas de email, datos semilla y valores
  de contenido (especialidades médicas, etc.).
- **Alcance cerrado**: no agregar features, tablas, paquetes ni abstracciones
  fuera del issue en curso. No refactorizar código no relacionado. Ante
  ambigüedad: DETENERSE y preguntar.
- **Seguridad**: `SUPABASE_SECRET_KEY` y el cliente admin
  (`src/lib/supabase/admin.ts`) son solo de servidor — nunca importarlos en
  componentes cliente ni prefijarlos con `NEXT_PUBLIC_`. Los campos de límites
  (`generation_limit`, `generations_used`, `access_expires_at`, `plan`,
  `status`) nunca son escribibles desde el cliente. Toda acción de admin
  re-verifica en servidor que quien llama es admin.
- **Server Actions**: todos los archivos en `src/app/actions/` DEBEN incluir
  `"use server"` al inicio. Sin esto, Next.js ejecuta el código en el cliente,
  causando errores de CORS y exponiendo API keys.
- **Reproducibilidad y traspaso**: el proyecto debe poder recrearse en otra
  cuenta/organización de Supabase en cualquier momento. Por eso: NINGÚN cambio
  de esquema fuera de `supabase/migrations/`, y todo paso manual de dashboard
  (Supabase, Resend, Sentry, Vercel) queda documentado con valores exactos.

## Convenciones de Desarrollo

- **Modelo de IA**: `claude-sonnet-4-6` (verificar modelos disponibles con la
  API si se necesita cambiar).
- **Manejo de errores**: helper único (`log-error.ts`) que captura en Sentry E
  inserta en la tabla `errors` (con `context`, `user_id` si existe). Mensajes
  al usuario genéricos y en español, sin filtrar internals
  ("Ocurrió un error, intenta de nuevo.").
  - Error 403 de Anthropic: mostrar mensaje de VPN ("Por favor, activa tu VPN
    e intenta nuevamente.").
- **Consumo**: una llamada fallida a Anthropic NUNCA consume una generación.
  El consumo se registra solo tras éxito, con tokens reales, vía la RPC.

## Flujo de trabajo por issue (para el agente)

1. Leer el issue primero: `gh issue view <número>` (repo
   `isabermudez2026/iman-salud`).
2. Inspeccionar el código existente y reutilizar patrones (Server Actions,
   helpers de `style.ts`, estructura de carpetas) antes de escribir algo nuevo.
3. Proponer un plan corto y esperar aprobación antes de implementar.
4. Implementar y verificar: `pnpm run build` debe pasar; correr `pnpm run lint`.
5. El SQL va en archivos de migración numerados en `supabase/migrations/` —
   nunca se aplica en silencio. Mostrar el SQL; el desarrollador lo ejecuta en
   el SQL editor de Supabase (o via CLI).
6. Commit con mensaje convencional terminando en `Closes #<número>`. Un issue
   por commit (o serie corta). No hacer push salvo indicación explícita.

## Tareas humanas (el agente no puede hacerlas — entregar instrucciones exactas)

- Dashboard de Supabase: crear proyecto y organización, generar las API keys
  nuevas (publishable/secret), configuración de Auth, redirect URLs, SMTP
  custom (Resend), plantillas de email, ejecutar SQL.
- Dashboard de Resend (dominio/remitente), creación del proyecto en Sentry
  (DSN), proyecto de Vercel + variables de entorno.
- Recibir/abrir enlaces de email y verificación visual en un teléfono real.

## Definición de hecho

Un issue está terminado solo cuando cada checkbox de criterios de aceptación
del issue de GitHub se puede marcar. Al final, recitarlos e indicar cómo se
verificó cada uno.

## Comandos

```bash
pnpm run dev    # Servidor de desarrollo (localhost:3000)
pnpm run build  # Build de producción
pnpm run start  # Sirve el build de producción
pnpm run lint   # ESLint
```
