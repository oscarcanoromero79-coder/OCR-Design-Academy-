// ======================================================
//  DATA.JS — Cursos CATIA V5
//  Edita este archivo para agregar, quitar o modificar
//  cursos directamente en el código fuente.
// ======================================================

// Número de WhatsApp por defecto (cambia aquí el tuyo)
// Formato: código país + número, SIN el signo +
// Ejemplo México: 521XXXXXXXXXX
const DEFAULT_WA = "+5215649878014"; // ← CAMBIA ESTE NÚMERO

// ======================================================
//  CÓMO AGREGAR IMÁGENES
// ======================================================
//
//  Cada curso tiene un campo "image" con tres opciones:
//
//  1) IMAGEN LOCAL (recomendado para GitHub):
//     Sube tu imagen a la carpeta /img del proyecto.
//     image: "img/nombre-del-archivo.jpg"
//
//  2) URL EXTERNA (fácil, sin subir archivos):
//     Usa el link directo de cualquier imagen en internet.
//     image: "https://ejemplo.com/mi-imagen.jpg"
//     Para Google Drive: comparte la imagen como pública y
//     usa: "https://drive.google.com/uc?export=view&id=XXXXXXX"
//
//  3) SIN IMAGEN:
//     Deja el campo vacío o elimínalo.
//     image: ""
//     → Se mostrará un placeholder con ícono ⚙️
//
// ======================================================

const DEFAULT_COURSES = [
  // ─────────────────────────────────────────
  //  NIVEL BÁSICO
  // ─────────────────────────────────────────
  {
    id: 1,
    level: "basico",
    name: "CATIA para Principiantes",
    type: "Introducción / Fundamentos CATIA V5",
    image: "",   // URL o ruta local de imagen (ej: "img/curso1.jpg")
    video: "",   // URL del video preview (YouTube, Vimeo o .mp4)
    items: [
      "Instalación y configuración del entorno",
      "Navegación en el espacio 3D y vistas",
      "Árbol de operaciones (Feature Tree)",
      "Herramientas básicas del Sketcher 2D",
      "Primeros pasos con Part Design"
    ],
    price: 800,
    wa: DEFAULT_WA
  },
  {
    id: 2,
    level: "basico",
    name: "Diseño de Sólidos",
    type: "Modelado 3D / Part Design",
    image: "",
    video: "",
    items: [
      "Creación de sólidos: Pad, Pocket, Shaft, Groove",
      "Operaciones de redondeo, chaflán y vaciado",
      "Referencias planas y ejes de construcción",
      "Operaciones booleanas (Unión, Intersección, Sustracción)",
      "Buenas prácticas de modelado paramétrico"
    ],
    price: 900,
    wa: DEFAULT_WA
  },
  {
    id: 3,
    level: "basico",
    name: "Introducción al Diseño con Superficies",
    type: "Superficies / Generative Shape Design básico",
    image: "",
    video: "",
    items: [
      "Diferencia entre sólido y superficie",
      "Creación de superficies extruidas, revolucionadas y de barrido",
      "Superficies offset y multi-sección",
      "Unión y recorte de superficies",
      "Conversión de superficies a sólidos"
    ],
    price: 1000,
    wa: DEFAULT_WA
  },
  {
    id: 4,
    level: "basico",
    name: "Drafting — Planos 2D",
    type: "Documentación Técnica / Dibujo Industrial",
    image: "",
    video: "",
    items: [
      "Creación de vistas ortogonales y de corte",
      "Cotas, tolerancias y acabados superficiales",
      "Vistas auxiliares y de detalle",
      "Uso de plantillas y bloques de título",
      "Exportación a PDF y DXF"
    ],
    price: 850,
    wa: DEFAULT_WA
  },

  // ─────────────────────────────────────────
  //  NIVEL INTERMEDIO
  // ─────────────────────────────────────────
  {
    id: 5,
    level: "intermedio",
    name: "Diseño Híbrido",
    type: "Modelado Híbrido / Part Design + GSD",
    image: "",
    video: "",
    items: [
      "Integración de sólidos y superficies en el mismo modelo",
      "Flujo de trabajo híbrido eficiente",
      "Reparación y cosido de superficies complejas",
      "Técnicas avanzadas de recorte y operaciones booleanas mixtas",
      "Casos prácticos de piezas industriales"
    ],
    price: 1200,
    wa: DEFAULT_WA
  },
  {
    id: 6,
    level: "intermedio",
    name: "Diseño con Superficies",
    type: "Superficies / Generative Shape Design avanzado",
    image: "",
    video: "",
    items: [
      "Superficies complejas: Sweep, Blend, Loft",
      "Control de continuidad G0, G1, G2",
      "Diagnóstico de superficies y análisis de curvaturas",
      "Diseño de productos de consumo y ergonomía",
      "Técnicas de reparación de superficies importadas"
    ],
    price: 1300,
    wa: DEFAULT_WA
  },
  {
    id: 7,
    level: "intermedio",
    name: "Diseño de Ensambles",
    type: "Ensamblaje / Assembly Design",
    image: "",
    video: "",
    items: [
      "Inserción y administración de componentes",
      "Restricciones de ensamble: coincidencia, offset, ángulo",
      "Movimiento cinemático básico",
      "Lista de materiales (BOM) y propiedades de producto",
      "Detección de colisiones e interferencias"
    ],
    price: 1100,
    wa: DEFAULT_WA
  },

  // ─────────────────────────────────────────
  //  NIVEL AVANZADO
  // ─────────────────────────────────────────
  {
    id: 8,
    level: "avanzado",
    name: "Diseño de Superficies Avanzadas",
    type: "Class-A / Superficies NURBS industriales",
    image: "",
    video: "",
    items: [
      "Superficies Class-A para sector automotriz y aeronáutico",
      "Control de continuidad tangencial y de curvatura",
      "Herramientas de análisis: Zebra, Isophotes, Draft Analysis",
      "Flujo de trabajo desde concept hasta manufactura",
      "Exportación a IGES, STEP y formatos de intercambio"
    ],
    price: 2000,
    wa: DEFAULT_WA
  },
  {
    id: 9,
    level: "avanzado",
    name: "Diseño de Piezas Plásticas",
    type: "Plastics / Moldes de Inyección — Parte Pieza",
    image: "",
    video: "",
    items: [
      "Ángulos de desmoldeo y análisis Draft",
      "Espesores de pared y nervios estructurales",
      "Diseño de clips y encajes de plástico",
      "Texturizado superficial y acabados",
      "Consideraciones de proceso de inyección en diseño"
    ],
    price: 1800,
    wa: DEFAULT_WA
  },
  {
    id: 10,
    level: "avanzado",
    name: "Diseño de Lámina y Moldes de Inyección",
    type: "Sheet Metal + Mold Tooling Design",
    image: "",
    video: "",
    items: [
      "Plegado, corte y conformado de lámina metálica",
      "Desarrollos planos y tolerancias de plegado",
      "Diseño de cavidades, corazones y líneas de partición",
      "Sistemas de colada, enfriamiento y expulsión",
      "Simulación básica de llenado de molde"
    ],
    price: 2200,
    wa: DEFAULT_WA
  }
];
