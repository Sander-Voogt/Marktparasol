const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const MEDUSA_SERVER_PATH = path.join(process.cwd(), '.medusa', 'server');

// Check if .medusa/server exists - if not, build process failed
if (!fs.existsSync(MEDUSA_SERVER_PATH)) {
  throw new Error('.medusa/server directory not found. This indicates the Medusa build process failed. Please check for build errors.');
}

// === NIEUW: Kopieer de patches folder naar .medusa/server ===
const patchesSource = path.join(process.cwd(), 'patches');
const patchesTarget = path.join(MEDUSA_SERVER_PATH, 'patches');

if (fs.existsSync(patchesSource)) {
  fs.cpSync(patchesSource, patchesTarget, { recursive: true });
  console.log('Patches folder copied to .medusa/server');
} else {
  console.warn('No patches folder found in project root – skipping patch copy');
}
// === EINDE NIEUW ===

// Copy pnpm-lock.yaml
fs.copyFileSync(
  path.join(process.cwd(), 'pnpm-lock.yaml'),
  path.join(MEDUSA_SERVER_PATH, 'pnpm-lock.yaml')
);

// Copy .env if it exists
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  fs.copyFileSync(envPath, path.join(MEDUSA_SERVER_PATH, '.env'));
}

// Install dependencies
console.log('Installing dependencies in .medusa/server...');
execSync('pnpm i --prod --frozen-lockfile', {
  cwd: MEDUSA_SERVER_PATH,
  stdio: 'inherit'
});

// Apply patch-package
console.log('Applying patches in .medusa/server...');
execSync('npx patch-package', {  // je kunt eventueel --no-verify toevoegen als je dat wil
  cwd: MEDUSA_SERVER_PATH,
  stdio: 'inherit'
});