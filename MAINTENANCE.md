# Guía de Mantenimiento

Esta guía te ayudará a mantener tu proyecto actualizado y funcionando correctamente.

## 🔄 Actualizaciones de Dependencias

### Verificar Actualizaciones Disponibles

```bash
npm outdated
```

### Actualizar Todas las Dependencias (Cuidado)

```bash
# Actualizar a versiones menores/patch
npm update

# Actualizar a versiones mayores (puede romper cosas)
npx npm-check-updates -u
npm install
```

### Actualizar Dependencias Específicas

```bash
# Next.js
npm install next@latest react@latest react-dom@latest

# Firebase
npm install firebase@latest

# Tailwind
npm install -D tailwindcss@latest autoprefixer@latest postcss@latest

# TypeScript
npm install -D typescript@latest @types/react@latest @types/node@latest
```

### Después de Actualizar

1. **Probar la aplicación**
   ```bash
   npm run dev
   ```

2. **Verificar errores**
   ```bash
   npm run lint
   npm run build
   ```

3. **Revisar breaking changes**
   - Lee los changelogs de cada librería
   - Busca en la documentación oficial

## 🐛 Solución de Problemas Comunes

### Error: "Module not found"

**Causa**: Dependencia faltante o ruta incorrecta

**Solución**:
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Firebase not initialized"

**Causa**: Variables de entorno incorrectas

**Solución**:
1. Verifica que `.env.local` existe
2. Verifica que todas las variables están configuradas
3. Reinicia el servidor de desarrollo

### Error: "Hydration failed"

**Causa**: Diferencia entre SSR y cliente

**Solución**:
- Usa `"use client"` en componentes que usan hooks del navegador
- Evita usar `window` o `document` en el render inicial
- Usa `useEffect` para código del cliente

### Error de Build

**Solución**:
```bash
# Limpiar caché
rm -rf .next
npm run build
```

## 🔒 Seguridad

### Actualizar Reglas de Firestore

Antes de producción, actualiza las reglas en Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Función helper para verificar autenticación
    function isSignedIn() {
      return request.auth != null;
    }
    
    // Función helper para verificar que es el dueño
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    // Colección de usuarios
    match /users/{userId} {
      allow read: if isSignedIn();
      allow write: if isSignedIn() && isOwner(userId);
    }
    
    // Ejemplo: Colección de posts
    match /posts/{postId} {
      allow read: if true; // Público
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn() && 
        resource.data.authorId == request.auth.uid;
    }
  }
}
```

### Actualizar Reglas de Storage

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Archivos de usuario
    match /users/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Archivos públicos
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Variables de Entorno Sensibles

**NUNCA** commits estos archivos:
- `.env.local`
- `.env.production`
- Archivos con credenciales

**SIEMPRE** usa variables de entorno en Vercel/Netlify para producción.

## 📊 Monitoreo

### Firebase Usage

1. Ve a Firebase Console
2. Revisa el uso de:
   - Authentication (usuarios activos)
   - Firestore (lecturas/escrituras)
   - Storage (almacenamiento usado)
3. Configura alertas de uso

### Vercel Analytics

1. Ve a tu proyecto en Vercel
2. Habilita Analytics
3. Revisa métricas:
   - Visitantes
   - Page views
   - Core Web Vitals

### Error Tracking (Opcional)

Considera usar:
- **Sentry** para tracking de errores
- **LogRocket** para sesiones de usuario
- **Hotjar** para heatmaps

## 🧪 Testing

### Agregar Tests (Opcional)

```bash
# Instalar Jest y React Testing Library
npm install -D jest @testing-library/react @testing-library/jest-dom
```

**jest.config.js**:
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

**jest.setup.js**:
```javascript
import '@testing-library/jest-dom'
```

**Ejemplo de test**:
```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

## 📝 Backups

### Backup de Firestore

**Opción 1: Exportación Manual**
1. Ve a Firebase Console
2. Firestore Database → Importar/Exportar
3. Exportar datos

**Opción 2: Automatizado (Firebase CLI)**
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Exportar
firebase firestore:export gs://tu-bucket/backups/$(date +%Y%m%d)
```

### Backup de Código

```bash
# Crear tag de versión
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0

# Backup en GitHub
# Asegúrate de hacer push regularmente
```

## 🔄 CI/CD (Opcional)

### GitHub Actions

Crea `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Lint
        run: npm run lint
        
      - name: Build
        run: npm run build
```

## 📈 Performance

### Optimizar Imágenes

```bash
# Instalar sharp para optimización automática
npm install sharp
```

### Analizar Bundle

```bash
# Instalar analyzer
npm install -D @next/bundle-analyzer

# Agregar a next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Ejecutar análisis
ANALYZE=true npm run build
```

### Lighthouse Audit

1. Abre Chrome DevTools
2. Ve a la pestaña "Lighthouse"
3. Ejecuta audit
4. Sigue las recomendaciones

## 🗄️ Base de Datos

### Índices de Firestore

Cuando veas errores de índices faltantes:

1. Firebase te dará un link
2. Haz clic en el link
3. Crea el índice automáticamente

O crea `firestore.indexes.json`:

```json
{
  "indexes": [
    {
      "collectionGroup": "posts",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "authorId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

### Limpieza de Datos

Crea un script para limpiar datos antiguos:

```typescript
// scripts/cleanup.ts
import { db } from './lib/firebase/config';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';

async function cleanupOldData() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const q = query(
    collection(db, 'temp_data'),
    where('createdAt', '<', thirtyDaysAgo)
  );

  const snapshot = await getDocs(q);
  
  for (const doc of snapshot.docs) {
    await deleteDoc(doc.ref);
  }
  
  console.log(`Deleted ${snapshot.size} old documents`);
}
```

## 📅 Checklist de Mantenimiento

### Semanal
- [ ] Revisar errores en consola
- [ ] Verificar uso de Firebase
- [ ] Revisar analytics
- [ ] Responder feedback de usuarios

### Mensual
- [ ] Actualizar dependencias menores
- [ ] Revisar y optimizar queries de Firestore
- [ ] Revisar logs de errores
- [ ] Backup de base de datos
- [ ] Revisar costos de Firebase

### Trimestral
- [ ] Actualizar dependencias mayores
- [ ] Revisar y actualizar documentación
- [ ] Auditoría de seguridad
- [ ] Performance audit con Lighthouse
- [ ] Revisar y actualizar contenido

### Anual
- [ ] Revisar toda la arquitectura
- [ ] Considerar migraciones necesarias
- [ ] Actualizar políticas de privacidad
- [ ] Renovar dominios y certificados
- [ ] Revisar plan de Firebase

## 🆘 Contactos de Emergencia

### Servicios Críticos

**Firebase**
- Console: https://console.firebase.google.com/
- Status: https://status.firebase.google.com/
- Support: Firebase Console → Support

**Vercel**
- Dashboard: https://vercel.com/dashboard
- Status: https://www.vercel-status.com/
- Support: https://vercel.com/support

**Next.js**
- Docs: https://nextjs.org/docs
- GitHub: https://github.com/vercel/next.js
- Discord: https://nextjs.org/discord

## 📚 Recursos Adicionales

- [Next.js Upgrade Guide](https://nextjs.org/docs/upgrading)
- [Firebase Release Notes](https://firebase.google.com/support/release-notes/js)
- [React Migration Guide](https://react.dev/blog)
- [Tailwind CSS Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)

---

**Mantén tu proyecto saludable y actualizado** 🚀

