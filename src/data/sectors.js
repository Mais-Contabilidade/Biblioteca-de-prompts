export const sectors = [
  { id: 'fiscal', nome: 'Fiscal / Tributário', curto: 'Fiscal', prefixo: 'FIS' },
  { id: 'contabil', nome: 'Contábil', curto: 'Contábil', prefixo: 'CON' },
  { id: 'dp', nome: 'Departamento Pessoal', curto: 'DP', prefixo: 'DP' },
  { id: 'societario', nome: 'Societário / Legalização', curto: 'Societário', prefixo: 'SOC' },
  { id: 'financeiro', nome: 'Financeiro / BPO', curto: 'Financeiro', prefixo: 'FIN' },
  { id: 'atendimento', nome: 'Atendimento ao Cliente', curto: 'Atendimento', prefixo: 'ATD' },
];

export const sectorByName = (name) => sectors.find((sector) => sector.nome === name);
