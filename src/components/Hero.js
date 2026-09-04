export const Hero = (promptCount, sectorCount) => `
  <section class="hero" aria-labelledby="hero-title"><div class="container hero__inner">
    <div><p class="eyebrow">Inteligência artificial aplicada à rotina da Mais.</p><h1 id="hero-title">Biblioteca de Prompts</h1>
    <p class="hero__lead">Prompts profissionais preparados para apoiar a rotina da Mais Contabilidade.</p>
    <p class="hero__support">Escolha seu setor, encontre a atividade e copie o prompt.</p></div>
    <dl class="stats"><div><dt>${promptCount}</dt><dd>prompts</dd></div><div><dt>${sectorCount}</dt><dd>setores</dd></div><div><dt>Interna</dt><dd>biblioteca</dd></div></dl>
  </div></section>`;
