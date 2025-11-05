# Social Basic — Challenge Next.js 15 + Tailwind CSS 4 + Redux

App tipo red social con:
- **Login** vía **NextAuth** (Credentials + GitHub)
- **Feed** con publicaciones mockeadas, **likes**, **comentarios** y **fotos**
- **Estado global** con **Redux Toolkit** + **redux-persist**
- **SSR** en páginas, **CSR** sólo donde es necesario (formularios/UX)
- **Atomic Design** (atoms / molecules / organisms)
- **Storybook** para documentar componentes
- **Dark theme total** (fondo #000 y tipografía clara)

## Tech
- Next.js **15** (App Router)
- TypeScript
- Tailwind CSS **v4**
- NextAuth (JWT strategy)
- Redux Toolkit + redux-persist
- Storybook

---

## Estructura (resumen)


src/
app/
(auth)/
login/
register/
feed/
api/auth/[...nextauth]/route.ts
layout.tsx
page.tsx
globals.css
components/
atoms/
HeartButton.tsx
TextInput.tsx
molecules/
LoginForm.tsx
PostCard.tsx
PostComposer.tsx
ImagePicker.tsx
organisms/
FeedList.tsx
providers/
SessionProvider.tsx
ReduxProvider.tsx
AuthHydrator.tsx
store/
slices/
authSlice.ts
feedSlice.ts
usersSlice.ts
index.ts
interfaces/
index.ts
lib/
mockDb.ts


---

## Requisitos previos
- Node.js 18+
- Cuenta de GitHub para OAuth (Client ID/Secret)

---

## Variables de entorno

Crea `.env.local` en la raíz:


NextAuth

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=poné_un_secret_seguro

GitHub OAuth

GITHUB_ID=tu_client_id
GITHUB_SECRET=tu_client_secret


> **GitHub OAuth**: en https://github.com/settings/developers → New OAuth App  
> Callback URL: `http://localhost:3000/api/auth/callback/github`

---

## Scripts

**Instalar**
```bash
pnpm i   # o npm i / yarn


Dev

pnpm dev


Storybook

pnpm storybook


Build

pnpm build && pnpm start


Lint

pnpm lint

Uso (Dev)

Levantá pnpm dev

Abrí http://localhost:3000

Registrate (mock) o logueate:

Credentials: cualquier email válido y password ≥ 3 chars

GitHub: con el botón “Entrar con GitHub”

En Feed:

Posteá texto y/o imagen (drag & drop o file picker)

Dale like (corazón estilo Instagram)

Comentá (Enter o botón Comentar)

Borrá tus propios comentarios (botón ×)

Salir: botón Salir (signout)

Persistencia: mock local en Redux + localStorage (no hay backend real).

SSR vs CSR

Páginas (/login, /register, /feed) se renderizan en server.

Componentes interactivos usan "use client" (CSR mínimo):

PostComposer, PostCard, LoginForm, ImagePicker

Autenticación en server con getServerSession para gatear rutas.

Diseño / Atomic Design

Atoms: TextInput, HeartButton

Molecules: LoginForm, PostCard, PostComposer, ImagePicker

Organisms: FeedList

Providers: SessionProvider, ReduxProvider, AuthHydrator

Dark total: fondo #000, texto claro, inputs “pill” para comentarios.

Storybook

Configurado en .storybook/

Docs y controles básicos

Historias incluidas:

LoginForm.stories.tsx

PostCard.stories.tsx

Correr:

pnpm storybook