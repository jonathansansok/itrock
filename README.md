Social Basic — Challenge Técnico Next.js 15 + Tailwind CSS 4 + Redux

Desarrollador: Jonathan Sansó
Repositorio: https://github.com/jonathansansok/itrock.git

Deploy: https://itrock-jonathan-sanso.vercel.app/

Branch principal: main

🚀 Deploy

Hosting: Vercel
Branch principal: main
Build automático: en cada push
Variables configuradas: (NextAuth + Google OAuth)

🧾 Variables de entorno (.env)
NEXTAUTH_URL=http://localhost:3000  
NEXTAUTH_SECRET=secret  

GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com  
GOOGLE_CLIENT_SECRET=secret  

# Callback
http://localhost:3000/api/auth/callback/google

🧪 Despliegue local
	
Instalar dependencias:	npm install
Ejecutar en desarrollo:	npm run dev
Build producción:	npm run build && npm start
Lint	npm run lint
Storybook:	npm run storybook
💬 Uso rápido

1️⃣ npm run dev
2️⃣ Ir a http://localhost:3000

3️⃣ Registrarse o loguearse
4️⃣ Publicar texto o imagen
5️⃣ Comentar, dar like y cerrar sesión

🎯 Objetivo del challenge

El challenge tiene como objetivo evaluar conocimientos en Next.js 15, Tailwind CSS 4 y Redux Toolkit, observando:

Estructura y organización del código

SSR efectivo con mínima carga cliente

Buenas prácticas con TypeScript

Diseño responsive y moderno

Manejo de autenticación y estado global

A continuación, se listan las consignas oficiales junto con su implementación real en Social Basic 👇

🧩 Vistas
1️⃣ Login

Requerido:

Permitir login con formulario de email y contraseña.

Validaciones básicas (campos requeridos, formato de email).

Usar NextAuth para autenticación y sesión.

Simular autenticación sin backend (redux-persist/localStorage).

Incluir una RRSS como método de logueo (OAuth).

Redirigir al Feed una vez autenticado.

✅ Implementado:

Formulario validado con email y contraseña seguras.

Sesión manejada con NextAuth (Credentials + Google OAuth).

Simulación local sin backend: usuarios registrados en redux-persist con contraseña hasheada (SHA-256).

Redirección automática al Feed tras login exitoso.

SweetAlert2 para mensajes visuales de error/éxito.

2️⃣ Feed

Requerido:

Mostrar publicaciones con comentarios mockeados.

Permitir crear nuevas publicaciones o comentarios en tiempo real.

Incluir botón de logout con redirección al login.

✅ Implementado:

Publicaciones mockeadas cargadas por SSR desde getInitialPosts.

Nuevos posts, likes y comentarios en tiempo real con Redux Toolkit.

Persistencia global del estado con redux-persist.

Botón de logout funcional con signOut() → redirección a /login.

⚙️ Funcionalidades requeridas
1️⃣ SSR y CSR

Requerido: las pages deben ser SSR y minimizar el CSR.
✅ Implementado: /login, /register y /feed renderizadas en SSR.
CSR limitado a componentes interactivos con "use client" solo donde es necesario.

2️⃣ Estado Global

Requerido: manejar autenticación, publicaciones y comentarios con Redux.
✅ Implementado: Redux Toolkit centralizado en /store/slices/ + redux-persist para mantener el estado tras recarga.

3️⃣ Diseño

Requerido: usar Tailwind CSS 4 con diseño responsive.
✅ Implementado: tema oscuro total, layout fluido, tipografía clara, sombras sutiles y proporciones ajustadas.

4️⃣ TypeScript

Requerido: definir interfaces centralizadas en carpeta aparte.
✅ Implementado: tipado completo con interfaces en /src/interfaces/
(Post, Comment, User, SessionUser, payloads de Redux).

5️⃣ Arquitectura

Requerido: usar Atomic Design.
✅ Implementado:

Atoms: TextInput, HeartButton

Molecules: LoginForm, RegisterForm, PostCard, PostComposer

Organisms: FeedList

Providers: ReduxProvider, SessionProvider, FeedHydrator

🧱 Requisitos extra (opcionales)
1️⃣ Storybook

Requerido: documentar al menos dos componentes.
✅ Implementado: Storybook configurado con LoginForm y PostCard, con ejemplos interactivos y documentación visual.

2️⃣ Interacciones

Requerido: incorporar likes, favoritos o acciones sociales.
✅ Implementado: sistema de likes, comentarios y contador dinámico, estilo Instagram.

3️⃣ Deploy

Requerido: publicar la app y documentar la configuración.
✅ Implementado: deploy en Vercel, con build automático desde main.
🔗 https://itrock-jonathan-sanso.vercel.app/

Variables documentadas en .env.local.

🧾 Entregables

Requerido:

Repositorio público en GitHub.

Instrucciones de instalación y ejecución.

Detalle del deploy.

✅ Implementado:

Repositorio público: https://github.com/jonathansansok/itrock.git

README completo con pasos de instalación, entorno y despliegue.

Deploy activo y documentado.

🧠 Puntos a Evaluar

Requerido: código limpio, buenas prácticas, UI clara, SSR eficiente y extras funcionales.
✅ Implementado:

Estructura modular limpia y 100 % tipada.

Buenas prácticas en Next.js + Redux + TypeScript.

Diseño responsivo y coherente.

SSR real con mínima carga cliente.

Storybook operativo y deploy productivo.

🧩 Funcionalidades principales
🔐 Login

Validación de email y contraseña.

NextAuth (Credentials + Google OAuth).

Validaciones activas y SweetAlert2 visual.

Redirección automática al Feed.

📰 Feed

Publicaciones mockeadas por SSR.

Nuevos posts en tiempo real.

Likes y comentarios instantáneos.

Persistencia local con redux-persist.

Autor y fecha visibles en cada post.

📷 PostComposer

Publicación de texto o imagen.

Previsualización antes de enviar.

Limpieza automática tras posteo.

💬 Comentarios

Agregar o eliminar comentarios propios.

Envío con Enter o botón “Comentar”.

❤️ Interacciones

Botón de like (toggle instantáneo).

Contador dinámico de likes.

🚪 Logout

Cierre de sesión con signOut() → redirección a /login.

🧱 Arquitectura

SSR / CSR híbrido:
/login, /register, /feed → SSR.
CSR limitado a componentes interactivos.

Atomic Design:

Atoms: TextInput, HeartButton

Molecules: LoginForm, PostCard, PostComposer

Organisms: FeedList

Providers: SessionProvider, ReduxProvider, FeedHydrator

⚡ SSR + Redux integración

getServerSession() protege rutas.

getInitialPosts() hidrata Redux desde el servidor.

Reducers: addPost, toggleLike, addComment, removeComment.

Estado persistido con redux-persist.

💅 Diseño (Tailwind CSS 4)

Tema oscuro moderno (bg-black, texto claro).

Bordes suaves y sombras sutiles.

Layout centrado (max-w-[680px]).

Responsive total (mobile → desktop).

🧠 Tipado (TypeScript)

Interfaces centralizadas (src/interfaces/).

Tipado completo para reducers, payloads y props.

📘 Storybook

Configuración en .storybook/.

Componentes documentados: LoginForm y PostCard.

Comando:

npm run storybook

✅ Cumplimiento global del challenge

Todas las funcionalidades requeridas implementadas.

SSR real + CSR mínimo.

Autenticación simulada segura.

Estado global persistente con Redux Toolkit.

Atomic Design aplicado correctamente.

Storybook y deploy operativos.

Diseño moderno y responsive.

📋 Resultado final:

El proyecto cumple y supera todas las consignas del challenge, demostrando dominio completo de Next.js, Redux Toolkit, Tailwind CSS y TypeScript, con foco en arquitectura, SSR efectivo y experiencia de usuario fluida.