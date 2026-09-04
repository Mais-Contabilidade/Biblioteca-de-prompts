import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

test('fluxo completo da interface: busca, filtro, modal, ESC e cópia', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const dom = new JSDOM(html, { url: 'http://localhost', pretendToBeVisual: true });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.navigator = dom.window.navigator;
  let copied = '';
  Object.defineProperty(navigator, 'clipboard', { value: { writeText: async (text) => { copied = text; } } });
  await import('../src/app.js');
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.equal(document.querySelectorAll('.prompt-card').length, 36);
  const search = document.querySelector('#search');
  search.value = 'rescisão'; search.dispatchEvent(new window.Event('input', { bubbles: true }));
  assert.equal(document.querySelectorAll('.prompt-card').length, 1);
  assert.match(document.querySelector('.prompt-card h3').textContent, /rescisão/i);

  search.value = ''; search.dispatchEvent(new window.Event('input', { bubbles: true }));
  [...document.querySelectorAll('.filter')].find((button) => button.dataset.sector === 'Departamento Pessoal').click();
  assert.equal(document.querySelectorAll('.prompt-card').length, 6);
  search.value = 'férias'; search.dispatchEvent(new window.Event('input', { bubbles: true }));
  assert.equal(document.querySelectorAll('.prompt-card').length, 1);

  search.value = 'inexistente'; search.dispatchEvent(new window.Event('input', { bubbles: true }));
  assert.ok(document.querySelector('.empty'));
  document.querySelector('[data-action="clear"]').click();
  assert.equal(document.querySelectorAll('.prompt-card').length, 36);

  document.querySelector('[data-action="view"]').click();
  assert.ok(document.querySelector('#prompt-modal').classList.contains('is-open'));
  assert.ok(document.querySelector('.prompt-full mark'));
  const copyButton = document.querySelector('[data-action="copy-modal"]');
  copyButton.click(); await new Promise((resolve) => setTimeout(resolve, 0));
  assert.match(copied, /^PAPEL/); assert.equal(copyButton.textContent, 'Copiado ✓');
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  assert.ok(!document.querySelector('#prompt-modal').classList.contains('is-open'));

  document.querySelector('[data-action="view"]').click();
  document.querySelector('.modal__backdrop').click();
  assert.ok(!document.querySelector('#prompt-modal').classList.contains('is-open'));
  dom.window.close();
});
