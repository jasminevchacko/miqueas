import React from 'react';

let englishToSpanish = {
  "Profile": "Perfil",
  "Inventory": "Inventario",
  "Category": "Categoría",
  "Item": "Articulo",
  "Calculator": "Calculadora",
  "Basic": "Básica",
  "Name": "Nombre",
  "Size": "Tamaño",
  "Small": "Pequeño",
  "Location": "Lugar",
  "Quantity Changed": "Cambio de Cantidad"
}

/**
 * The translate function
 * @param {string} props the phrase
 * @param {object} props the current language
 * @return the phrase in the desired language
 */
function translate(phrase, language) {
  if (language == "English") {
    return phrase;
  } else {
    console.log(englishToSpanish)
    return englishToSpanish[phrase] || "Error Translating";
  }
}

module.exports = translate
