# Referencia Rápida - Base App

Guía de consulta rápida para desarrollo diario.

## ⚡ Comandos Rápidos

```bash
# Desarrollo
npm run dev              # Iniciar servidor (localhost:3000)
npm run build            # Build para producción
npm run start            # Servidor de producción
npm run lint             # Linter
npm run format           # Formatear código

# Git
git add .
git commit -m "mensaje"
git push

# Limpieza
rm -rf node_modules .next
npm install
```

## 🔥 Firebase - Comandos Comunes

### Autenticación
```typescript
// Login
const { user, error } = await signIn(email, password);

// Registro
const { user, error } = await signUp(email, password, name);

// Google
const { user, error } = await signInWithGoogle();

// Logout
await signOut();

// Reset password
await resetPassword(email);
```

### Firestore
```typescript
// Crear
await createDocument("posts", "id", { title: "..." });

// Leer uno
const { data } = await getDocument("posts", "id");

// Leer múltiples
const { data } = await getDocuments("posts", [
  where("author", "==", userId),
  orderBy("createdAt", "desc"),
  limit(10)
]);

// Actualizar
await updateDocument("posts", "id", { title: "nuevo" });

// Eliminar
await deleteDocument("posts", "id");
```

## 🎨 Componentes UI - Uso Rápido

### Button
```tsx
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
```

### Input
```tsx
<Input type="text" placeholder="Nombre" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input disabled />
```

### Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descripción</CardDescription>
  </CardHeader>
  <CardContent>
    Contenido
  </CardContent>
  <CardFooter>
    Footer
  </CardFooter>
</Card>
```

### Loading
```tsx
// Skeleton
<Skeleton className="h-12 w-full" />

// Spinner
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

## 🔔 Notificaciones

```typescript
import { toast } from "sonner";

toast.success("Éxito");
toast.error("Error");
toast.info("Info");
toast.warning("Advertencia");

toast.success("Título", {
  description: "Descripción",
  action: {
    label: "Acción",
    onClick: () => console.log("Click"),
  },
});
```

## 🎯 Hooks Comunes

### useAuth
```typescript
const { user, loading, logout } = useAuth();

if (loading) return <Spinner />;
if (!user) return <LoginPrompt />;
```

### useRouter
```typescript
const router = useRouter();

router.push("/dashboard");
router.back();
router.refresh();
```

### useState
```typescript
const [value, setValue] = useState("");
const [loading, setLoading] = useState(false);
const [data, setData] = useState<Type[]>([]);
```

### useEffect
```typescript
useEffect(() => {
  // Código que se ejecuta
  
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

## 📝 Formularios con React Hook Form

```typescript
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof formSchema>;

const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(formSchema),
});

const onSubmit = async (data: FormData) => {
  // Procesar
};

// En el JSX
<form onSubmit={handleSubmit(onSubmit)}>
  <Input {...register("email")} />
  {errors.email && <p>{errors.email.message}</p>}
</form>
```

## 🎨 Tailwind - Clases Útiles

### Layout
```
flex, grid, block, inline-block
flex-col, flex-row
items-center, items-start, items-end
justify-center, justify-between, justify-around
gap-2, gap-4, gap-6
```

### Spacing
```
p-4, px-4, py-4, pt-4, pr-4, pb-4, pl-4
m-4, mx-4, my-4, mt-4, mr-4, mb-4, ml-4
space-x-4, space-y-4
```

### Sizing
```
w-full, w-1/2, w-64
h-full, h-screen, h-64
max-w-md, max-w-lg, max-w-xl
min-h-screen
```

### Typography
```
text-sm, text-base, text-lg, text-xl, text-2xl
font-normal, font-medium, font-semibold, font-bold
text-center, text-left, text-right
```

### Colors
```
text-primary, text-secondary, text-muted-foreground
bg-primary, bg-secondary, bg-background
border-primary, border-secondary
```

### Responsive
```
md:flex, lg:grid, xl:block
md:text-lg, lg:text-xl
md:w-1/2, lg:w-1/3
```

## 🔗 Navegación

```tsx
// Link
<Link href="/about">Acerca de</Link>

// Con botón
<Link href="/dashboard">
  <Button>Dashboard</Button>
</Link>

// Programática
router.push("/dashboard");
```

## 🎭 Estilos Condicionales

```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  variant === "primary" && "primary-classes"
)}>
```

## 📱 Responsive Breakpoints

```
sm:  640px   @media (min-width: 640px)
md:  768px   @media (min-width: 768px)
lg:  1024px  @media (min-width: 1024px)
xl:  1280px  @media (min-width: 1280px)
2xl: 1536px  @media (min-width: 1536px)
```

## 🔐 Proteger Páginas

```typescript
"use client";

export default function ProtectedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <Spinner />;
  if (!user) return null;

  return <div>Contenido protegido</div>;
}
```

## 📊 React Query

```typescript
// Query
const { data, isLoading, error } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
});

// Mutation
const mutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});
```

## 🎯 Zustand Store

```typescript
// Crear store
export const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Usar
const { count, increment } = useStore();
```

## 🖼️ Imágenes

```tsx
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="Descripción"
  width={500}
  height={300}
  priority  // Para above the fold
/>
```

## 🔍 SEO

```typescript
export const metadata: Metadata = {
  title: "Título",
  description: "Descripción",
};
```

## 🐛 Debug

```typescript
// Console
console.log("valor:", valor);
console.error("error:", error);
console.table(array);

// React DevTools
// Instalar extensión en Chrome/Firefox
```

## 📦 Imports Comunes

```typescript
// Next.js
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// React
import { useState, useEffect } from "react";

// Componentes UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

// Firebase
import { signIn, signUp } from "@/lib/firebase/auth";
import { createDocument } from "@/lib/firebase/firestore";

// Hooks
import { useAuth } from "@/lib/hooks/useAuth";

// Utils
import { cn } from "@/lib/utils";
import { toast } from "sonner";
```

## 🚨 Errores Comunes

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Hydration failed"
```typescript
// Usar "use client" en componentes con hooks del navegador
"use client";
```

### Firebase not initialized
```bash
# Verificar .env.local
# Reiniciar servidor
```

## 📞 Links Útiles

```
Localhost:      http://localhost:3000
Firebase:       https://console.firebase.google.com
Vercel:         https://vercel.com
Tailwind:       https://tailwindcss.com/docs
shadcn/ui:      https://ui.shadcn.com
Lucide Icons:   https://lucide.dev
```

## 💡 Tips Rápidos

1. **Siempre usa TypeScript** - Te ahorrará bugs
2. **Usa "use client"** solo cuando sea necesario
3. **Componentes pequeños** - Más fáciles de mantener
4. **Nombres descriptivos** - El código se lee más que se escribe
5. **Git commits frecuentes** - Mejor control de versiones
6. **Prueba en móvil** - No solo en desktop
7. **Usa el linter** - Mantiene código limpio
8. **Lee los errores** - Suelen decir exactamente qué está mal

---

**Guarda este archivo como favorito** 📌

Para más detalles, consulta:
- README.md
- CODE_EXAMPLES.md
- Documentación oficial de cada librería

