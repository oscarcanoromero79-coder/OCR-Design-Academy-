# ⚙️ CATIA V5 — Panel de Cursos Online

Panel de ventas para cursos de CATIA V5 (Básico, Intermedio y Avanzado), listo para desplegar en **Vercel** directamente desde GitHub.

## 🚀 Deploy rápido

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TU_USUARIO/catia-cursos)

## 📁 Estructura del proyecto

```
catia-cursos/
├── index.html      ← Página principal
├── styles.css      ← Estilos (dark theme industrial)
├── data.js         ← Cursos por defecto (editable)
├── app.js          ← Lógica de la app
└── README.md
```

## ✏️ Cómo editar cursos

### Opción 1 — Desde el navegador (panel visual)
1. Abre la página en tu navegador
2. Haz clic en **"Panel de Administración"**
3. Llena el formulario y guarda
4. Los cambios se guardan automáticamente en el navegador (localStorage)

### Opción 2 — En el código fuente (permanente)
Abre `data.js` y edita el array `DEFAULT_COURSES`:

```js
{
  id: 11,                           // ID único
  level: "avanzado",                // "basico" | "intermedio" | "avanzado"
  name: "Nombre del curso",
  type: "Categoría / descripción corta",
  items: [
    "Tema 1",
    "Tema 2",
    "Tema 3"
  ],
  price: 1500,                      // Precio en MXN (sin símbolo)
  wa: "521XXXXXXXXXX"               // Tu número de WhatsApp
},
```

## 📱 Configurar WhatsApp

En `data.js`, cambia el valor de `DEFAULT_WA`:

```js
const DEFAULT_WA = "521XXXXXXXXXX"; // ← Tu número aquí
```

Formato: código de país + número, **sin** el símbolo `+`.
- México: `521` + 10 dígitos → `5212212345678`

## 🌐 Publicar en Vercel

1. Sube el proyecto a un repositorio de GitHub
2. Entra a [vercel.com](https://vercel.com) y conéctalo
3. Vercel detecta automáticamente que es un sitio estático
4. ¡Listo! Tu panel estará en línea en segundos

No necesitas configurar nada más. No hay backend, no hay base de datos.

## 🎨 Personalización

| Qué cambiar | Dónde |
|---|---|
| Colores | `styles.css` → variables `:root` |
| Tu número de WhatsApp | `data.js` → `DEFAULT_WA` |
| Título y descripción | `index.html` → sección `.hero` |
| Cursos por defecto | `data.js` → array `DEFAULT_COURSES` |
| Fuentes tipográficas | `index.html` → Google Fonts link |

---

Hecho con ❤️ para vendedores de cursos técnicos.
