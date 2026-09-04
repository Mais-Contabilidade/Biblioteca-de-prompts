import { escapeHtml, highlightFields } from '../utils/html.js';

const attentionLabel = { normal: 'Normal', moderado: 'Moderado', alto: 'Alto' };
export const PromptModal = () => `<div class="modal" id="prompt-modal" aria-hidden="true"><div class="modal__backdrop" data-close></div>
  <section class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
    <button type="button" class="modal__close" data-close aria-label="Fechar modal">×</button><div id="modal-content"></div>
  </section></div>`;

export function modalContent(item) {
  return `<header class="modal__header"><div class="prompt-card__meta"><span class="code">${item.codigo}</span><span>${escapeHtml(item.setor)}</span></div><h2 id="modal-title">${escapeHtml(item.titulo)}</h2><p>${escapeHtml(item.descricao)}</p></header>
    <div class="modal__body"><section class="how-to"><h3>Como usar</h3><p>${escapeHtml(item.comoUsar)}</p></section>
    ${item.precisaAtualidade ? '<aside class="update-note"><strong>Requer consulta atualizada</strong><p>Este tema pode mudar por legislação, regulamentação ou prazo. Utilize fontes oficiais atualizadas antes de considerar a resposta definitiva.</p></aside>' : ''}
    <div class="prompt-heading"><h3>Prompt completo</h3><span>Campos destacados devem ser substituídos</span></div><pre class="prompt-full">${highlightFields(item.prompt)}</pre>
    <div class="modal__details"><div><span>Nível de atenção</span><strong class="attention attention--${item.nivelAtencao}">${attentionLabel[item.nivelAtencao]}</strong></div><div><span>Tags</span><div class="tags">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div></div></div></div>
    <footer class="modal__footer"><span>Revise tecnicamente antes de utilizar.</span><button type="button" class="btn btn--primary" data-action="copy-modal">Copiar prompt</button></footer>`;
}
