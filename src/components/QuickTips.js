const tips = [
  ['01', 'Dê contexto', 'Quanto mais informações relevantes você fornecer, melhor tende a ser a resposta.'],
  ['02', 'Adapte', 'Substitua os campos entre [COLCHETES] pelos dados necessários.'],
  ['03', 'Revise', 'A inteligência artificial auxilia o profissional, mas a validação técnica permanece com o escritório.'],
];
export const QuickTips = () => `<section class="quick-tips container" aria-label="Orientação rápida">${tips.map(([n,t,d]) => `<article><span>${n}</span><div><h2>${t}</h2><p>${d}</p></div></article>`).join('')}</section>`;
