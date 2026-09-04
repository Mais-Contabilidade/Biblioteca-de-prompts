import { escapeHtml } from '../utils/html.js';

export const PromptCard = (item) => `<article class="prompt-card" data-id="${item.id}">
  <div class="prompt-card__meta"><span class="code">${item.codigo}</span><span>${escapeHtml(item.setor)}</span></div>
  <h3>${escapeHtml(item.titulo)}</h3><p>${escapeHtml(item.descricao)}</p>
  <div class="tags">${item.tags.slice(0, 3).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
  ${item.precisaAtualidade ? '<div class="freshness"><span aria-hidden="true"></span> Requer consulta atualizada</div>' : ''}
  <div class="prompt-card__actions"><button class="btn btn--primary" data-action="view" type="button">Ver prompt</button><button class="btn btn--secondary" data-action="copy" type="button">Copiar prompt</button></div>
</article>`;
