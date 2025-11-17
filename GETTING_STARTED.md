# Guía de Inicio Rápido - Base App

Esta guía te ayudará a poner en marcha tu proyecto en menos de 10 minutos.

## ⚡ Inicio Rápido

### 1. Instalar Dependencias (2 minutos)

```bash
npm install
```

### 2. Configurar Firebase (5 minutos)

#### a) Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Nombra tu proyecto (ej: "mi-base-app")
4. Deshabilita Google Analytics si no lo necesitas
5. Haz clic en "Crear proyecto"

#### b) Configurar Authentication

1. En el menú lateral, ve a **Authentication**
2. Haz clic en "Comenzar"
3. Habilita **Email/Password**:
   - Activa el primer switch
   - Guarda
4. Habilita **Google**:
   - Activa el switch
   - Ingresa un email de soporte
   - Guarda

#### c) Crear Base de Datos Firestore

1. En el menú lateral, ve a **Firestore Database**
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba"
4. Elige una ubicación cercana
5. Haz clic en "Habilitar"

#### d) Obtener Credenciales

1. Ve a **Configuración del proyecto** (ícono de engranaje)
2. En la sección "Tus apps", haz clic en el ícono web `</>`
3. Registra tu app con un nombre
4. Copia las credenciales que aparecen

### 3. Configurar Variables de Entorno (1 minuto)

Crea un archivo `.env.local` en la raíz del proyecto y pega tus credenciales:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

NEXT_PUBLIC_APP_NAME="Mi App"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Iniciar el Proyecto (1 minuto)

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## ✅ Verificar que Todo Funciona

### Probar Registro de Usuario

1. Ve a [http://localhost:3000/register](http://localhost:3000/register)
2. Crea una cuenta con email y contraseña
3. Deberías ser redirigido al dashboard

### Probar Login con Google

1. Ve a [http://localhost:3000/login](http://localhost:3000/login)
2. Haz clic en "Continuar con Google"
3. Selecciona tu cuenta de Google
4. Deberías ser redirigido al dashboard

### Verificar Protección de Rutas

1. Cierra sesión
2. Intenta acceder a [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
3. Deberías ser redirigido al login

## 🎨 Personalización Básica

### Cambiar el Nombre de la App

**En `.env.local`:**
```env
NEXT_PUBLIC_APP_NAME="Tu App Increíble"
```

**En `app/layout.tsx`:**
```tsx
export const metadata: Metadata = {
  title: "Tu App Increíble",
  description: "Descripción de tu app",
};
```

**En `components/layout/header.tsx`:**
```tsx
<span className="text-xl font-bold">Tu App Increíble</span>
```

### Cambiar los Colores

Edita `app/globals.css` y modifica las variables CSS:

```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Azul por defecto */
}
```

Usa [esta herramienta](https://uicolors.app/create) para generar paletas de colores en formato HSL.

### Agregar tu Logo

1. Coloca tu logo en `public/logo.svg`
2. Edita `components/layout/header.tsx`:

```tsx
import Image from "next/image";

<Link href="/" className="flex items-center space-x-2">
  <Image src="/logo.svg" alt="Logo" width={32} height={32} />
  <span className="text-xl font-bold">Tu App</span>
</Link>
```

## 🔐 Reglas de Seguridad de Firestore

Por defecto, Firestore está en modo de prueba. Antes de producción, actualiza las reglas:

1. Ve a **Firestore Database** → **Reglas**
2. Reemplaza con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Solo usuarios autenticados pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Agrega más reglas según tus necesidades
  }
}
```

3. Haz clic en "Publicar"

## 📱 Probar en Móvil

1. Encuentra tu IP local:
   ```bash
   # En Linux/Mac
   ifconfig | grep "inet "
   
   # En Windows
   ipconfig
   ```

2. Actualiza `.env.local`:
   ```env
   NEXT_PUBLIC_APP_URL=http://TU_IP:3000
   ```

3. Accede desde tu móvil a `http://TU_IP:3000`

## 🚀 Desplegar a Producción

### Opción 1: Vercel (Recomendado)

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Agrega las variables de entorno
5. Despliega

### Opción 2: Netlify

1. Sube tu código a GitHub
2. Ve a [netlify.com](https://netlify.com)
3. Importa tu repositorio
4. Configura:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Agrega las variables de entorno
6. Despliega

## 🆘 Problemas Comunes

### Error: "Firebase: Error (auth/configuration-not-found)"

**Solución:** Verifica que hayas habilitado Email/Password en Firebase Authentication.

### Error: "Firebase: Error (auth/unauthorized-domain)"

**Solución:** 
1. Ve a Firebase Console → Authentication → Settings → Authorized domains
2. Agrega tu dominio (ej: `localhost`, `tu-app.vercel.app`)

### La página se queda en "Cargando..."

**Solución:** Verifica que las variables de entorno en `.env.local` sean correctas.

### Error de CORS al hacer login con Google

**Solución:** Asegúrate de que tu dominio esté autorizado en Firebase Console.

## 📚 Siguientes Pasos

- [ ] Personalizar el diseño y colores
- [ ] Agregar tu logo
- [ ] Configurar reglas de seguridad de Firestore
- [ ] Agregar más páginas según tus necesidades
- [ ] Implementar funcionalidades específicas
- [ ] Configurar dominio personalizado
- [ ] Agregar analytics (Google Analytics, Vercel Analytics)
- [ ] Configurar SEO (meta tags, sitemap, robots.txt)

## 💡 Recursos Útiles

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Firebase](https://firebase.google.com/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Componentes shadcn/ui](https://ui.shadcn.com/)
- [Iconos Lucide](https://lucide.dev/)

¡Listo! Ya tienes tu aplicación base funcionando. 🎉

