# Ejemplos de Código Útiles

Esta guía contiene ejemplos de código comunes que necesitarás al desarrollar con Base App.

## 🔐 Autenticación

### Obtener Usuario Actual

```tsx
import { useAuth } from "@/lib/hooks/useAuth";

function MyComponent() {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>No autenticado</div>;

  return <div>Hola, {user.displayName}</div>;
}
```

### Proteger una Página

```tsx
"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <div>Cargando...</div>;
  if (!user) return null;

  return <div>Contenido protegido</div>;
}
```

### Cerrar Sesión

```tsx
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";

function LogoutButton() {
  const { logout } = useAuth();

  return <Button onClick={logout}>Cerrar Sesión</Button>;
}
```

## 🗄️ Firestore

### Crear Documento

```tsx
import { createDocument } from "@/lib/firebase/firestore";

async function createPost() {
  const { error } = await createDocument("posts", "post-id", {
    title: "Mi Post",
    content: "Contenido del post",
    author: user.uid,
  });

  if (error) {
    console.error("Error:", error);
  }
}
```

### Leer Documento

```tsx
import { getDocument } from "@/lib/firebase/firestore";

async function getPost(postId: string) {
  const { data, error } = await getDocument("posts", postId);

  if (error) {
    console.error("Error:", error);
    return null;
  }

  return data;
}
```

### Actualizar Documento

```tsx
import { updateDocument } from "@/lib/firebase/firestore";

async function updatePost(postId: string) {
  const { error } = await updateDocument("posts", postId, {
    title: "Título Actualizado",
  });

  if (error) {
    console.error("Error:", error);
  }
}
```

### Eliminar Documento

```tsx
import { deleteDocument } from "@/lib/firebase/firestore";

async function deletePost(postId: string) {
  const { error } = await deleteDocument("posts", postId);

  if (error) {
    console.error("Error:", error);
  }
}
```

### Obtener Múltiples Documentos

```tsx
import { getDocuments } from "@/lib/firebase/firestore";
import { where, orderBy, limit } from "firebase/firestore";

async function getPosts() {
  const { data, error } = await getDocuments("posts", [
    where("author", "==", user.uid),
    orderBy("createdAt", "desc"),
    limit(10),
  ]);

  if (error) {
    console.error("Error:", error);
    return [];
  }

  return data;
}
```

## 📝 Formularios

### Formulario Básico con Validación

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    
    try {
      // Procesar formulario
      console.log(data);
      toast.success("Formulario enviado correctamente");
      reset();
    } catch (error) {
      toast.error("Error al enviar el formulario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          {...register("name")}
          disabled={loading}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          disabled={loading}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensaje</Label>
        <textarea
          id="message"
          {...register("message")}
          disabled={loading}
          rows={4}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
```

## 🔔 Notificaciones

### Toast Básico

```tsx
import { toast } from "sonner";

// Éxito
toast.success("Operación exitosa");

// Error
toast.error("Ocurrió un error");

// Información
toast.info("Información importante");

// Advertencia
toast.warning("Ten cuidado");

// Con descripción
toast.success("Título", {
  description: "Descripción detallada",
});

// Con acción
toast("Evento creado", {
  action: {
    label: "Deshacer",
    onClick: () => console.log("Deshacer"),
  },
});
```

## 🎨 Componentes UI

### Card Personalizada

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Título</CardTitle>
        <CardDescription>Descripción</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Contenido de la card</p>
      </CardContent>
    </Card>
  );
}
```

### Botón con Loading

```tsx
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

function LoadingButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    // Hacer algo
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? (
        <div className="flex items-center gap-2">
          <Spinner size="sm" />
          Cargando...
        </div>
      ) : (
        "Hacer algo"
      )}
    </Button>
  );
}
```

### Skeleton Loading

```tsx
import { Skeleton } from "@/components/ui/skeleton";

function LoadingState() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
```

## 🔄 React Query

### Fetch Data

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "@/lib/firebase/firestore";

function PostsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await getDocuments("posts");
      if (error) throw new Error(error);
      return data;
    },
  });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((post: any) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

### Mutation

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDocument } from "@/lib/firebase/firestore";
import { toast } from "sonner";

function CreatePostButton() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newPost: any) => {
      const { error } = await createDocument("posts", newPost.id, newPost);
      if (error) throw new Error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post creado");
    },
    onError: (error) => {
      toast.error("Error al crear post");
    },
  });

  return (
    <button
      onClick={() =>
        mutation.mutate({
          id: Date.now().toString(),
          title: "Nuevo Post",
        })
      }
    >
      Crear Post
    </button>
  );
}
```

## 🎯 Zustand (Estado Global)

### Crear Store

```tsx
// lib/store/useStore.ts
import { create } from "zustand";

interface Store {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

### Usar Store

```tsx
import { useStore } from "@/lib/store/useStore";

function Counter() {
  const { count, increment, decrement } = useStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## 🖼️ Imágenes

### Next Image

```tsx
import Image from "next/image";

function MyImage() {
  return (
    <Image
      src="/image.jpg"
      alt="Descripción"
      width={500}
      height={300}
      className="rounded-lg"
      priority // Para imágenes above the fold
    />
  );
}
```

### Imagen de Firebase Storage

```tsx
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/lib/firebase/config";
import { useState, useEffect } from "react";
import Image from "next/image";

function FirebaseImage({ path }: { path: string }) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const getUrl = async () => {
      const imageRef = ref(storage, path);
      const downloadUrl = await getDownloadURL(imageRef);
      setUrl(downloadUrl);
    };
    getUrl();
  }, [path]);

  if (!url) return <div>Cargando imagen...</div>;

  return <Image src={url} alt="Imagen" width={500} height={300} />;
}
```

## 🔗 Links y Navegación

### Link Básico

```tsx
import Link from "next/link";

function MyLink() {
  return <Link href="/about">Acerca de</Link>;
}
```

### Link con Botón

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ButtonLink() {
  return (
    <Link href="/dashboard">
      <Button>Ir al Dashboard</Button>
    </Link>
  );
}
```

### Navegación Programática

```tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function NavigateButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/dashboard")}>
      Ir al Dashboard
    </Button>
  );
}
```

## 🎨 Estilos Condicionales

### Con cn()

```tsx
import { cn } from "@/lib/utils";

function MyComponent({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg",
        isActive ? "bg-primary text-white" : "bg-secondary"
      )}
    >
      Contenido
    </div>
  );
}
```

## 📱 Responsive

### Clases Responsive de Tailwind

```tsx
function ResponsiveComponent() {
  return (
    <div className="
      grid 
      grid-cols-1 
      md:grid-cols-2 
      lg:grid-cols-3 
      gap-4
    ">
      {/* Contenido */}
    </div>
  );
}
```

### Hook useMediaQuery

```tsx
"use client";

import { useState, useEffect } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// Uso
function MyComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return <div>{isMobile ? "Móvil" : "Desktop"}</div>;
}
```

## 🔍 SEO

### Metadata en Página

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Título de la Página",
  description: "Descripción de la página",
  openGraph: {
    title: "Título para redes sociales",
    description: "Descripción para redes sociales",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <div>Contenido</div>;
}
```

---

¿Necesitas más ejemplos? Revisa la documentación oficial de cada librería:
- [Next.js](https://nextjs.org/docs)
- [Firebase](https://firebase.google.com/docs)
- [React Query](https://tanstack.com/query/latest/docs/react/overview)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Hook Form](https://react-hook-form.com/get-started)

