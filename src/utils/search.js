export const normalizeText = (value = '') => String(value)
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('pt-BR');

export function searchPrompts(prompts, query) {
  const terms = normalizeText(query).trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return prompts;
  return prompts.filter((item) => {
    const haystack = normalizeText([
      item.codigo, item.titulo, item.descricao, item.setor, item.tags.join(' '), item.prompt,
    ].join(' '));
    return terms.every((term) => haystack.includes(term));
  });
}

export const filterPrompts = (prompts, sector, query) => searchPrompts(
  sector === 'todos' ? prompts : prompts.filter((item) => item.setor === sector), query,
);
