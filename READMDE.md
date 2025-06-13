# 🧾 RecipeHub API

Una API RESTful desarrollada en Node.js con Express y MongoDB para gestionar recetas de cocina. Este proyecto forma parte de un entorno de aprendizaje para desarrollar habilidades de backend profesional.

---

## 🚀 Características

- Obtener todas las recetas disponibles (`GET /api/recipes`)
- Crear una nueva receta (`POST /api/recipes`)
- Crear múltiples recetas en lote (`POST /api/recipes/bulk`)
- Base de datos MongoDB integrada
- Código organizado por capas (modelo, rutas, controlador)
- Soporte para carga de recetas desde archivos `.json` 

---

## 🛠️ Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- dotenv
- nodemon (para desarrollo)
- node-fetch

---

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/recipehub.git
cd recipehub
npm install

--- 

## Scripts disponibles: 
npm run dev     # Ejecuta con nodemon (modo desarrollo)
npm start       # Ejecuta con Node (modo producción)


---

## Seed de recetas:

## Puedes poblar la base de datos de dos formas:

Localmente desde un archivo JSON:

node seed/seedLocal.js

Importación de dataset en bulk:

node seed/importDataset.js

---

## Estructura del proyecto: 
recipehub/
│
├── controllers/         # Controladores de rutas
├── models/              # Esquemas de Mongoose
├── routes/              # Rutas de Express
├── seed/                # Scripts para poblar datos
├── server.js            # Punto de entrada
├── .env                 # Variables de entorno
└── README.md

---

## Variables de entorno:
Debes crear un archivo .env en la raíz con lo siguiente:
PORT=3000
MONGO_URI=tu_conexion_de_mongo

---

## Licencia MIT License. Proyecto educativo y de desarrollo profesional.

---
##Autor:
##Gabriel Iturrieta - Desarrollador Backend & Full Stack en formación.