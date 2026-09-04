import test from 'node:test';
import assert from 'node:assert/strict';
import { prompts } from '../src/data/prompts.js';
import { sectors } from '../src/data/sectors.js';
import { searchPrompts, filterPrompts, normalizeText } from '../src/utils/search.js';
import { validateCatalog } from '../scripts/validate-catalog.js';

test('catálogo possui 36 registros válidos em seis setores', () => {
  assert.equal(prompts.length, 36); assert.equal(sectors.length, 6); assert.deepEqual(validateCatalog(prompts), []);
});
test('busca ignora caixa e acentos', () => {
  assert.equal(normalizeText('APURAÇÃO'), 'apuracao');
  assert.equal(searchPrompts(prompts, 'rescisão')[0].codigo, 'DP-02');
  assert.equal(searchPrompts(prompts, 'DRE')[0].codigo, 'CON-02');
  assert.equal(searchPrompts(prompts, 'reforma')[0].codigo, 'FIS-01');
});
test('filtro e busca funcionam em conjunto', () => {
  assert.equal(filterPrompts(prompts, 'Fiscal / Tributário', '').length, 6);
  assert.equal(filterPrompts(prompts, 'Departamento Pessoal', '').length, 6);
  assert.deepEqual(filterPrompts(prompts, 'Fiscal / Tributário', 'cliente').map((p) => p.codigo), ['FIS-01', 'FIS-05']);
  assert.equal(filterPrompts(prompts, 'todos', 'termo-inexistente').length, 0);
});
