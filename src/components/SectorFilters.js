import { escapeHtml } from '../utils/html.js';

export function SectorFilters(sectors, prompts, active = 'todos') {
  const filters = [{ nome: 'todos', curto: 'Todos' }, ...sectors];
  return `<div class="filters" role="group" aria-label="Filtrar por setor">${filters.map((sector) => {
    const count = sector.nome === 'todos' ? prompts.length : prompts.filter((p) => p.setor === sector.nome).length;
    return `<button type="button" class="filter ${active === sector.nome ? 'is-active' : ''}" data-sector="${escapeHtml(sector.nome)}" aria-pressed="${active === sector.nome}"><span>${escapeHtml(sector.curto)}</span><strong>${count}</strong></button>`;
  }).join('')}</div>`;
}
