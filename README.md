# Panel de Riesgos - Pesquera Exalmar

Sistema de gestión financiera avanzada para análisis de riesgos de Pesquera Exalmar S.A.A.

## Estructura del Proyecto

```
.
├── index.html                 # Archivo principal (punto de entrada)
├── css/
│   └── styles.css            # Estilos personalizados
├── js/
│   └── app.js                # Lógica de la aplicación (React)
├── vercel.json               # Configuración de Vercel
├── .gitignore                # Archivos a ignorar en git
└── README.md                 # Este archivo
```

## Características

- ✅ **Información General**: Datos de la empresa, misión y visión
- ✅ **Estados Financieros**: Comparativo consolidado 2024-2025
- ✅ **Riesgo de Liquidez**: Matriz y mapa de calor
- ✅ **Riesgo Crediticio**: Análisis de exposición
- ✅ **Riesgo de Mercado**: Volatilidad y precios
- ✅ **Riesgo Operacional**: Gestión de operaciones
- ✅ **Conclusiones**: Resumen estratégico
- ✅ **Recomendaciones**: Planes de acción

## Tecnologías

- React 18 (via CDN)
- Tailwind CSS (via CDN)
- Phosphor Icons
- Babel Standalone

## Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. Push a tu repositorio de GitHub
2. Conecta el repo a Vercel: https://vercel.com/new
3. Vercel detectará automáticamente que es un sitio estático
4. ¡Listo! Tu aplicación estará en vivo

### Opción 2: CLI de Vercel

```bash
npm install -g vercel
vercel
```

## Requisitos para desplegar

- Servidor web estático (Vercel, Netlify, GitHub Pages, etc.)
- Conexión a internet (para las CDN de React, Tailwind, etc.)

## Notas

- La aplicación es **100% estática** - no requiere backend
- Todos los datos están embebidos en `index.html`
- La estructura de carpetas permite mantenimiento y escalabilidad futuros
- Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)

## Autor

Gestión Financiera Avanzada - Pesquera Exalmar S.A.A.
