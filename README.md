Social Basic — Challenge Técnico Next.js 15 + Tailwind CSS 4 + Redux

Desarrollador: Jonathan Sansó
Repositorio: https://github.com/jonathansansok/itrock.git

Deploy: https://itrock-jonathan-sanso.vercel.app/

🧭 Descripción general

Social Basic es una aplicación tipo red social desarrollada como parte de un challenge técnico para evaluar el uso de Next.js 15, Redux Toolkit, Tailwind CSS 4 y TypeScript siguiendo Atomic Design.

La app simula un entorno social básico con autenticación, feed de publicaciones, likes, comentarios y persistencia local.
Está construida con enfoque SSR (Server-Side Rendering), reduciendo el CSR (Client-Side Rendering) al mínimo necesario. 
No se incluyeron comentarios en el código porque no fue solicitado, si lo necesitan lo puedo hacer con gusto.

⚙️ Stack principal

Next.js 15 (App Router)

TypeScript

Tailwind CSS 4

NextAuth (JWT strategy)

Redux Toolkit + redux-persist

Storybook

Vercel (deploy)

🎯 Objetivo del challenge

Evaluar la capacidad de:

Implementar autenticación segura con NextAuth (Credentials + OAuth).

Gestionar estado global con Redux Toolkit.

Aplicar SSR y optimizar el uso de CSR.

Estructurar un proyecto con Atomic Design.

Diseñar una UI clara, responsiva y funcional.

Documentar componentes con Storybook.

🧩 Funcionalidades principales
🔐 Login

Formulario con validación de email y contraseña.

Uso de NextAuth con Credentials y Google OAuth.

Validaciones activas (email válido y contraseña con mayúscula + número).

SweetAlert2 para notificaciones de error o éxito.

Redirección automática al feed tras autenticación.

📰 Feed

Publicaciones mockeadas cargadas por SSR (getInitialPosts).

Nuevas publicaciones creadas en tiempo real desde el cliente.

Likes y comentarios con actualización instantánea.

Persistencia local mediante redux-persist.

Visualización del autor (“Publicado por [nombre o email]”) y fecha formateada debajo del contenido.

📷 PostComposer

Permite publicar texto e imagen.

Previsualización antes de publicar.

Reseteo automático de inputs tras publicación.

💬 Comentarios

Añadir o eliminar comentarios propios.

Envío con Enter o botón “Comentar”.

❤️ Interacciones

Botón de like tipo Instagram (toggle instantáneo).

Contador de likes dinámico.

🚪 Logout

Cierre de sesión con signOut() → redirección a /login.

🧱 Arquitectura
SSR / CSR

/login, /register, /feed → renderizadas en servidor (SSR).

Componentes interactivos → CSR mínimo ("use client" solo donde se necesita).

Atomic Design

Atoms: TextInput, HeartButton

Molecules: LoginForm, PostCard, PostComposer

Organisms: FeedList

Providers: SessionProvider, ReduxProvider, FeedHydrator

Estructura general
src/
  app/
    (auth)/
      login/
      register/
    feed/
  components/
    atoms/
    molecules/
    organisms/
    providers/
  store/
    slices/
  interfaces/
  lib/
    mockDb.ts
    server/
      getInitialPosts.ts

⚡ SSR + Redux integración

getServerSession() protege rutas.

getInitialPosts() inyecta publicaciones SSR → FeedHydrator sincroniza Redux.

addPost, toggleLike, addComment, removeComment controlan el estado global.

redux-persist conserva el estado tras recarga.

💅 Diseño (Tailwind CSS 4)

Tema oscuro total (bg-black, tipografía clara).

Bordes suaves, sombras sutiles y elementos “pill”.

Layout responsive hasta mobile vertical.

Feed centrado (max-w-[680px]).

Imagen del post con aspect-ratio: 1/1 y bordes redondeados.

🧠 Tipado (TypeScript)

Interfaces centralizadas en src/interfaces/:

Post, Comment, User, SessionUser

Payloads Redux (AddCommentPayload, etc.)

Todos los reducers y props están completamente tipados.

📘 Storybook

Documentación visual en .storybook/
Incluye ejemplos interactivos de:

LoginForm

PostCard

Comando:

pnpm storybook

🚀 Deploy

Hosting: Vercel

Branch: main (producción) / dev (pre-release)

Build automático con cada push.
Configuración de entorno en Settings > Environment Variables (NextAuth + Google OAuth).

🧾 Variables de entorno

Archivo .env.local:

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=pon_un_secret_seguro

GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=yyy

Callback URL de Google:
http://localhost:3000/api/auth/callback/google

🧪 Scripts
Acción	Comando
Instalar dependencias	pnpm install
Ejecutar en dev	pnpm dev
Build producción	pnpm build && pnpm start
Lint	pnpm lint
Storybook	pnpm storybook
💬 Uso rápido

1️⃣ pnpm dev
2️⃣ Ir a http://localhost:3000

3️⃣ Registrarse o loguearse (mock)
4️⃣ Publicar texto o imagen
5️⃣ Comentar, dar like, y cerrar sesión

🧩 Extras

Validaciones visuales con SweetAlert2.

Prehidratado SSR del feed.

Carga mínima CSR para optimizar TTFB.

Autoría dinámica: los nuevos posts muestran el nombre o email del usuario autenticado.

Feedback UX inmediato (transiciones y estados de carga).

🧠 Evaluación esperada

Organización clara de código y carpetas.

Buenas prácticas en Next.js, Redux y TypeScript.

Diseño responsive funcional y coherente.

SSR efectivo con mínima carga cliente.

Storybook y deploy funcionando.