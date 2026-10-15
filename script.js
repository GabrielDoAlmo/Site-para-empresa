/* ===== DADOS DA EMPRESA (edite aqui) ===== */
const PAGES=[['index.html','Home'],['quem-somos.html','Quem somos'],['servicos.html','Serviços'],['portfolio.html','Portfólio'],['contato.html','Contato']];
const T1='21 96410-2652',T2='21 98291-3851',ZAP='5521964102652',MAIL='asdrubalf@asasnit.com.br';

/* Obras em destaque: [categoria, nome, cliente, descrição, endereço] — para incluir uma obra, basta adicionar uma linha */
const OBRAS=[
['Saúde','Hospital do Câncer (INCA)','Santa Barbara Engenharia','Reforma na maior unidade hospitalar do INCA e a de maior complexidade.','Praça Cruz Vermelha – Centro, Rio de Janeiro/RJ'],
['Industrial','AMBEV – Cachoeira de Macacu','Construtora Solidum Ltda.','Instalações elétricas e hidráulicas com fornecimento de mão de obra, equipamentos e material.','Rod. RJ 122, km 35, nº 3500 – Cachoeira de Macacu/RJ'],
['Residencial','Rio Marina Resort','João Fortes Engenharia','Condomínio com 7 blocos, clube e marina, com vista para o mar.','Av. do Canal s/nº – Itacuruçá, Mangaratiba/RJ'],
['Saúde','Hospital Modular Emergencial','Carraca Engenharia','Instalações elétricas e hidráulicas com fornecimento de mão de obra.','Av. Baltimore, 22-92 – Jardim Esplanada, Nova Iguaçu/RJ'],
['Comercial','Peninsula Open Mall','Construtora Dominus / Carvalho Hosken','29 salas e 19 lojas.','Rua Flamboyants, Lote 01, Quadra 06 – Barra da Tijuca/RJ'],
['Residencial','Grandvalley Niterói','Construtora Gafisa','Instalações elétricas e hidráulicas com fornecimento de mão de obra, equipamentos e material.','Rua Dr. Paulo Cesar, 137 – Niterói/RJ'],
['Comercial','Touch Escritórios Inteligentes','João Fortes Engenharia S/A','Lojas com jirau, salas comerciais e salas duplex.','Rua Jardim Botânico, 568 – Rio de Janeiro/RJ'],
['Residencial','Vila Pan-Americana','Construtora Agenco','Conjunto inaugurado em 2007, com 17 prédios e 1.480 apartamentos, construído para os Jogos Pan-Americanos.','Rio de Janeiro/RJ']
];
const PARCEIROS='Santa Barbara Engenharia,Paulitec,Agenco,Delta,Conasa,Carvalho Hosken,Rossi,Dominus,Gafisa,João Fortes Engenharia,Perpetuum,São Bento,Alcance,Carraca Engenharia,Solidum'.split(',');

/* ===== CABEÇALHO E RODAPÉ (iguais em todas as páginas) ===== */
const tel=t=>'tel:+55'+t.replace(/\D/g,'');
const cur=(location.pathname.split('/').pop()||'index').replace('.html','');
document.body.insertAdjacentHTML('afterbegin',`<header><div class="c nav"><a href="index.html"><img src="assets/logo.png" alt="ASAS – Asas da Elétrica Hidráulica"></a><button class="mb" aria-label="Abrir menu" aria-expanded="false">☰</button><nav><ul>${PAGES.map(([h,t])=>`<li><a href="${h}" class="${h.replace('.html','')===cur?'on':''}${h=='contato.html'?' cta':''}">${t}</a></li>`).join('')}</ul></nav></div></header>`);
document.body.insertAdjacentHTML('beforeend',`<footer><div class="c fg"><div><div class="fl"><img src="assets/logo.png" alt="ASAS"></div><p>Asas da Elétrica Hidráulica Ltda.<br>Instalações elétricas e hidrossanitárias em todo o Brasil desde 1997.</p></div><div><h4>Navegação</h4><ul>${PAGES.map(([h,t])=>`<li><a href="${h}">${t}</a></li>`).join('')}</ul></div><div><h4>Contato</h4><ul><li><a href="${tel(T1)}">${T1}</a> (Asdrubal Filho)</li><li><a href="${tel(T2)}">${T2}</a> (Augusto Santa Roza)</li><li><a href="mailto:${MAIL}">${MAIL}</a></li><li>Trav. Lengruber Filho, 770 – Engenhoca<br>Niterói/RJ – CEP 24.110-498</li></ul></div></div><div class="c cp">© ${new Date().getFullYear()} Asas da Elétrica Hidráulica Ltda. Todos os direitos reservados.</div></footer><a class="wa" href="https://wa.me/${ZAP}" target="_blank" rel="noopener">WhatsApp</a>`);

/* ===== OBRAS E CONSTRUTORAS ===== */
document.querySelectorAll('[data-obras]').forEach(el=>{
  const n=el.dataset.obras;
  el.innerHTML=OBRAS.slice(0,n=='all'?OBRAS.length:+n).map(o=>`<article class="w"><div class="wh">${o[0]}</div><div class="wb"><h3>${o[1]}</h3><p class="cl">${o[2]}</p><p>${o[3]}</p><small>${o[4]}</small></div></article>`).join('');
});
const pc=document.getElementById('parc');
if(pc)pc.innerHTML=PARCEIROS.map(t=>`<span>${t}</span>`).join('');

/* ===== MENU MOBILE E SOMBRA DO CABEÇALHO ===== */
const hd=document.querySelector('header'),mb=hd.querySelector('.mb'),nv=hd.querySelector('nav');
mb.onclick=()=>mb.setAttribute('aria-expanded',nv.classList.toggle('open'));
nv.onclick=e=>{if(e.target.tagName=='A')nv.classList.remove('open')};
addEventListener('scroll',()=>hd.classList.toggle('sc',scrollY>10));

/* ===== FORMULÁRIO (abre o e-mail ou o WhatsApp já preenchido) ===== */
const f=document.getElementById('f');
if(f){
  const txt=()=>{const d=new FormData(f);return `Olá! Sou ${d.get('nome')} (${d.get('tel')}, ${d.get('email')}).\n\n${d.get('msg')}`};
  f.onsubmit=e=>{e.preventDefault();location.href=`mailto:${MAIL}?subject=${encodeURIComponent('Contato pelo site')}&body=${encodeURIComponent(txt())}`};
  document.getElementById('wz').onclick=()=>f.reportValidity()&&open(`https://wa.me/${ZAP}?text=${encodeURIComponent(txt())}`);
}
