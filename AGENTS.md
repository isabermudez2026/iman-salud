# IMAN Salud — Generador de Carruseles para Médicos

## Descripción del Proyecto

IMAN Salud es una aplicación web interna desarrollada para **Grupo Impacters** que genera carruseles estratégicos de contenido para redes sociales, orientados a profesionales de la salud (médicos especialistas). La app utiliza inteligencia artificial (Claude de Anthropic) para producir contenido de marketing médico que convierte visibilidad en intención de consulta.

### ¿Qué hace?

1. **Autenticación simple**: El usuario ingresa una contraseña (almacenada en `PASSWORD_KEY` en `.env`) para acceder a la herramienta.
2. **Aviso legal**: Presenta términos de uso antes de permitir la generación.
3. **Formulario de entrada**: El médico (o su equipo de marketing) completa un formulario con datos clínicos y de marca personal:
   - Especialidad médica
   - Paciente ideal
   - Problema a tratar
   - Enfoque diferenciador
   - Tipo de servicio
   - Tono de voz
   - Frase real del médico
   - Tipo de hook (automático o seleccionado)
4. **Generación con IA**: Envía los datos a la API de Anthropic (Claude Sonnet) con un prompt de sistema altamente especializado en marketing médico, que produce un carrusel de 6-10 láminas en formato JSON.
5. **Visualización y copiado**: Muestra las láminas generadas con opción de copiar individualmente o todas juntas.

## Stack Técnico

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Lenguaje**: TypeScript
- **UI**: React 19 con estilos inline (sin CSS framework)
- **Iconos**: lucide-react
- **IA**: API REST de Anthropic (Claude Sonnet 4.6)
- **Package manager**: pnpm (workspace)
- **Deploy**: `pnpm run dev` para desarrollo, `pnpm run build` para producción

## Estructura del Proyecto

```
src/
├── app/
│   ├── actions/
│   │   ├── auth.ts          # Server Action: verificación de contraseña
│   │   └── carrousel.ts     # Server Action: llamada a Anthropic API
│   ├── layout.tsx            # Layout raíz
│   └── page.tsx              # Página principal (client component, orquesta todo el flujo)
├── components/
│   ├── FormScreen.tsx        # Formulario de entrada del médico
│   ├── HeaderNode.tsx        # Header con branding IMAN
│   ├── Legal.tsx             # Pantalla de aviso legal
│   ├── OutputScreen.tsx      # Visualización de láminas generadas
│   └── SignIn.tsx            # Pantalla de autenticación
├── utils/
│   ├── constants.ts          # Constantes (opciones de tono, hooks, etc.)
│   ├── prompts.ts            # System prompt y user prompt para Claude
│   └── style.ts              # Constantes de estilo y colores (BRAND)
└── types.d.ts                # Tipos: FormType, OutputType, SlideType
```

## Variables de Entorno

```
ANTHROPIC_API_KEY=sk-ant-...   # API key de Anthropic
PASSWORD_KEY=...               # Contraseña de acceso a la app
```

## Convenciones de Desarrollo

- **Server Actions**: Todos los archivos en `src/app/actions/` DEBEN incluir `"use server"` al inicio. Sin esto, Next.js ejecuta el código en el cliente, causando errores de CORS y exponiendo API keys.
- **Modelo de IA**: Usar `claude-sonnet-4-6` (verificar modelos disponibles con la API si se necesita cambiar).
- **Manejo de errores API**:
  - Error 403: Mostrar mensaje de VPN al usuario ("Por favor, activa tu VPN e intenta nuevamente.")
  - Otros errores: Loggear en consola del servidor y mostrar detalle al usuario.
- **Estilos**: Se usan estilos inline con constantes de `src/utils/style.ts` (objeto `BRAND`). No se usa CSS framework.
- **Idioma**: La interfaz y el contenido generado están en español neutro (sin regionalismos).

## Comandos

```bash
pnpm run dev    # Inicia servidor de desarrollo (localhost:3000)
pnpm run build  # Build de producción
pnpm run start  # Sirve el build de producción
pnpm run lint   # Ejecuta ESLint
```
