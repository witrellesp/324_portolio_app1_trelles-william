import { readFileSync, writeFileSync } from 'fs';

// Chemin vers le manifest.json généré
const manifestPath = './.output/firefox/firefox-mv2/manifest.json';

// Charger et modifier le manifest.json
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
manifest.browser_specific_settings.gecko.id = "william.trelles1@eduvaud.ch"; // Remplacez par votre e-mail ou GUID

// Sauvegarder les modifications
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log("Manifest.json corrigé avec un ID valide pour Firefox.");
