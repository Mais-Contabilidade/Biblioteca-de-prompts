import { prompts } from '../src/data/prompts.js';
import { sectors } from '../src/data/sectors.js';

export function validateCatalog(items = prompts) {
  const errors = [];
  const allowed = new Map(sectors.map((s) => [s.nome, s.prefixo]));
  if (items.length !== 36) errors.push(`Total inválido: ${items.length}`);
  for (const sector of sectors) {
    const count = items.filter((item) => item.setor === sector.nome).length;
    if (count !== 6) errors.push(`${sector.nome}: ${count}, esperado 6`);
  }
  for (const key of ['id', 'codigo']) {
    const values = items.map((item) => item[key]);
    if (new Set(values).size !== values.length) errors.push(`${key}s duplicados`);
  }
  for (const item of items) {
    const prefix = allowed.get(item.setor);
    if (!prefix) errors.push(`${item.codigo}: setor inválido`);
    if (!prefix || !new RegExp(`^${prefix}-0[1-6]$`).test(item.codigo)) errors.push(`${item.codigo}: código fora do padrão`);
    for (const field of ['titulo', 'descricao', 'prompt']) if (!item[field]?.trim()) errors.push(`${item.codigo}: ${field} vazio`);
    if (!Array.isArray(item.tags) || !item.tags.length) errors.push(`${item.codigo}: tags ausentes`);
    if (!['normal', 'moderado', 'alto'].includes(item.nivelAtencao)) errors.push(`${item.codigo}: atenção inválida`);
  }
  return errors;
}

const errors = validateCatalog();
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('Catálogo válido: 36 prompts, 6 setores e 6 prompts por setor.');
