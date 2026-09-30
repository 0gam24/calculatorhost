import { pageFileToRoute } from './date-modified-core.mjs';

export const SNAPSHOT_FILES = [
  'bok-rates.json',
  'exchange-rates.json',
  'finance-products.json',
  'kosis-income.json',
  'property-market.json',
  'sync-metadata.json',
];

export function validateBuildInputs(documents, pageFiles) {
  const errors = [];
  for (const name of SNAPSHOT_FILES) {
    const value = documents[name];
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      errors.push(`Missing or invalid committed data snapshot: ${name}`);
    }
  }
  const manifest = documents['date-modified-manifest.json'];
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    return [...errors, 'Missing or invalid date-modified-manifest.json'];
  }
  const expected = new Set(pageFiles.map(pageFileToRoute).filter(Boolean));
  for (const route of expected) {
    const date = manifest[route];
    if (
      typeof date !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(date) ||
      !Number.isFinite(Date.parse(date)) ||
      new Date(`${date.slice(0, 10)}T00:00:00Z`).toISOString().slice(0, 10) !== date.slice(0, 10)
    ) {
      errors.push(`Missing or invalid committed modification date: ${route}`);
    }
  }
  for (const route of Object.keys(manifest)) {
    if (!expected.has(route)) errors.push(`Modification date references a missing page: ${route}`);
  }
  return errors;
}
