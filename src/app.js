import { prompts as initialPrompts, getPrompts } from './data/prompts.js';
import { sectors } from './data/sectors.js';
import { filterPrompts } from './utils/search.js';
import { copyText } from './utils/clipboard.js';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { QuickTips } from './components/QuickTips.js';
import { SearchBar } from './components/SearchBar.js';
import { SectorFilters } from './components/SectorFilters.js';
import { PromptCard } from './components/PromptCard.js';
import { PromptModal, modalContent } from './components/PromptModal.js';
import { BestPractices } from './components/BestPractices.js';
import { Footer } from './components/Footer.js';

const app = document.querySelector('#app');
let catalog = initialPrompts;
let activeSector = 'todos';
let query = '';
let activePrompt = null;
let previousFocus = null;

app.innerHTML = `${Header()}<main>${Hero(catalog.length, sectors.length)}${QuickTips()}
  <section class="catalog container" id="catalogo" aria-labelledby="catalog-title"><div class="catalog__heading"><div><p class="eyebrow">Catálogo</p><h2 id="catalog-title">Encontre o prompt certo</h2></div><p>Encontre prompts preparados para as principais atividades do escritório, adapte as informações e utilize na IA de sua preferência.</p></div>
  ${SearchBar()}<div id="filter-region">${SectorFilters(sectors, catalog)}</div><div class="results-line" aria-live="polite"><strong id="result-count"></strong><span>resultados encontrados</span></div><div id="prompt-grid" class="prompt-grid"></div></section>
  ${BestPractices()}</main>${Footer()}${PromptModal()}<div class="toast" role="status" aria-live="polite"></div>`;

const grid = document.querySelector('#prompt-grid');
const count = document.querySelector('#result-count');
const searchInput = document.querySelector('#search');
const modal = document.querySelector('#prompt-modal');
const modalPanel = modal.querySelector('.modal__panel');
const toast = document.querySelector('.toast');

function render() {
  const results = filterPrompts(catalog, activeSector, query);
  count.textContent = results.length;
  grid.innerHTML = results.length ? results.map(PromptCard).join('') : `<div class="empty"><div class="empty__symbol" aria-hidden="true">⌕</div><h3>Nenhum prompt encontrado</h3><p>Tente outra palavra-chave ou selecione outro setor.</p><button type="button" class="btn btn--primary" data-action="clear">Limpar filtros</button></div>`;
}

function setSector(sector) {
  activeSector = sector;
  document.querySelectorAll('.filter').forEach((button) => {
    const active = button.dataset.sector === sector;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  render();
}

function openModal(item, trigger) {
  activePrompt = item;
  previousFocus = trigger;
  document.querySelector('#modal-content').innerHTML = modalContent(item);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modalPanel.focus();
}

function closeModal() {
  if (!modal.classList.contains('is-open')) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  activePrompt = null;
  previousFocus?.focus();
}

function feedback(button, ok = true) {
  const original = button.textContent;
  button.textContent = ok ? 'Copiado ✓' : 'Não foi possível copiar';
  button.classList.toggle('copy-error', !ok);
  toast.textContent = ok ? 'Prompt copiado para a área de transferência.' : 'Não foi possível copiar. Selecione o texto e copie manualmente.';
  toast.classList.add('is-visible');
  window.setTimeout(() => { button.textContent = original; button.classList.remove('copy-error'); toast.classList.remove('is-visible'); }, 2200);
}

async function handleCopy(item, button) {
  try { await copyText(item.prompt); feedback(button); } catch { feedback(button, false); }
}

searchInput.addEventListener('input', (event) => { query = event.target.value; render(); });
document.querySelector('#filter-region').addEventListener('click', (event) => {
  const button = event.target.closest('[data-sector]');
  if (button) setSector(button.dataset.sector);
});
grid.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.action === 'clear') { query = ''; searchInput.value = ''; setSector('todos'); searchInput.focus(); return; }
  const item = catalog.find((prompt) => prompt.id === button.closest('.prompt-card')?.dataset.id);
  if (button.dataset.action === 'view') openModal(item, button);
  if (button.dataset.action === 'copy') handleCopy(item, button);
});
modal.addEventListener('click', (event) => {
  if (event.target.closest('[data-close]')) closeModal();
  const button = event.target.closest('[data-action="copy-modal"]');
  if (button && activePrompt) handleCopy(activePrompt, button);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
  if (event.key === 'Tab' && modal.classList.contains('is-open')) {
    const focusable = [...modalPanel.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')];
    if (!focusable.length) return;
    const first = focusable[0]; const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

getPrompts().then((items) => { catalog = items; render(); });
