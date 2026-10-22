# Página de vendas e quiz — Lara Castelli

## Estado desta revisão
Base: atualização do usuário e5de2d3 (responsividade). Mantidas as cores verde/creme/lima, fontes Manrope e DM Sans, imagens, preço e melhorias de acessibilidade. Página reorganizada em hero com composição visual das entregas, explicação breve, entregáveis, público, convite ao quiz, oferta, FAQ e CTA final.

Todos os CTAs comerciais da landing levam a /quiz.html. Preço: de R$ 97,90 por R$ 37,90. Removidos avisos de configuração e o destaque de 30 dias. Isso não implica acesso vitalício nem muda o prazo operacional do produto: a duração continua pendente de definição.

## Quiz
Seis perguntas: percepção do corpo, dificuldade da nova fase, exercícios, alimentação, obstáculo e prioridade. Quatro resultados: clareza, treino, alimentação e constância. Pontuação ponderada; em empate, vence a prioridade explicitamente escolhida. Texto final também usa a resposta sobre rotina de exercícios. A lógica é executada no navegador, como no código do Yuri; não há backend de IA, diagnóstico clínico ou prescrição.

Voltar, refazer e retomar após atualização da página são suportados. Respostas ficam em sessionStorage, com validação e fallback caso o armazenamento esteja bloqueado. Não são incluídas em URLs, checkout, pixels ou serviços externos. Nenhuma coleta de nome/telefone/e-mail foi adicionada. Parâmetros UTM conhecidos são preservados apenas na navegação landing → quiz.

## Checkout
Definir conversionUrl em dist/config.js com a URL HTTPS real. Quando configurado, o botão final do resultado vira “Quero meu acesso agora”. Sem URL, o botão “Ver detalhes do plano” abre a explicação da entrega no próprio resultado. Não existe mensagem “Checkout em breve”, botão de compra inerte ou pagamento fictício.

## Decisões de oferta
O usuário confirmou que ainda não há bônus. Nenhum bônus foi anunciado. Garantia comercial e prazo de reembolso não foram definidos, portanto não há selo nem garantia inventada. Permanecem a validar: duração de acesso/experiência, profissionais, personalização, frequência/canais de apoio e termos comerciais. A proposta pública mantém apenas treino, alimentação e acompanhamento.

A composição visual do hero apresenta os três pilares; não representa prints reais do aplicativo ou materiais adicionais prometidos. Lara aparece como personagem visual, sem atribuição de formação, uso pessoal de medicamento ou resultado. Não há antes/depois, depoimentos fictícios, contagem regressiva ou promessa de remover excesso de pele.

## Referências analisadas
- https://lp.yuriconsorcio.com/quiz.html + código local do repositório yunknet/pg-vendas-playbook-yuri: perguntas em sequência, pesos por categoria, desempate por prioridade, resultado contextual e oferta. Adaptada a lógica, sem copiar rastreadores ou dados de consórcio.
- https://rainhadacasa.com.br/: entrada por desejo, sentimento, dificuldade, contexto, rotina, objetivo e resultado. Visual central, progresso e respostas em cartões. Não foram transpostas suas alegações de mídia/ciência, números, testemunhos ou transformações em prazo definido.
- https://bumbumlevantado.com.br/: quatro perguntas sobre adequação, percepção no treino, interesse e disposição; conclusão seguida de vídeo. Aproveitada a clareza do fluxo, sem copiar diagnóstico de ativação ou VSL.
- Captura fornecida pelo usuário: hierarquia do quiz, imagem contextual e respostas grandes. Adaptada para a identidade Lara Castelli.
- Referências anteriores: https://vemtreinar.com/, Instagram lara.castelli.oficial, proposito.fit e publicação DdjYFDVsbpY; utilizadas no posicionamento original.

## Verificação
node tests/quiz.test.cjs: 4.096 combinações, quatro perfis alcançáveis, desempates, respostas inválidas e quatro cenários representativos.
Verificação de sintaxe dos scripts. Navegação real pelo navegador: entrada, seis perguntas, resultado, detalhes, recarga e reinício. Auditoria de largura em iframes 320, 360, 375, 390, 414, 768, 820, 1024 e 1280px; sem elementos fora da largura nas telas verificadas. Isso não equivale a testes físicos em todos os aparelhos.

## Desenvolvimento
Site estático em dist/. Prévia: node dev-server.mjs (porta 5184). Publicação: .openai/hosting.json. Testes fora de dist/, sem inclusão no site publicado.

## Correção sobre o commit do usuário 3e2f84e
Domínio real informado pelo usuário: https://laracastelli.mivaia.com/ . Confirmada a correspondência entre seus arquivos publicados e o commit 3e2f84e em 21/10/2026. O servidor responde CSS e JS com Cache-Control max-age=2592000 (30 dias). A atualização anterior testava local e publicava em Sites, sem verificar esse domínio externo; as duas publicações devem ser distinguidas.

Mantidos os SVGs, a formatação, tipografia e ajustes do usuário. Corrigidos contraste do preço/título no resultado do quiz, contenção de grid/flex, apresentação dos cartões sem sobreposição no celular e coluna única do hero em tablets de 761–960px. Removido overflow-x:hidden do body: cortes não são escondidos como solução.

Antes de qualquer publicação com alterações em CSS ou JS, executar:
1. node scripts/build-assets.cjs
2. node tests/assets.test.cjs
3. node tests/quiz.test.cjs
O primeiro comando gera arquivos com hash em dist/assets e atualiza referências HTML. Isso evita reutilizar CSS/JS antigos do cache. Editar os arquivos fonte de dist/, não os arquivos com hash. Preservar assets publicados de versões anteriores para que páginas HTML ainda em cache continuem funcionando. Hashes normalizam quebras de linha para serem estáveis no Windows e no Linux.

Auditoria da correção: 14 larguras (320 a 2560px), em quatro estados (landing com FAQ aberto, primeira pergunta, última pergunta, resultado): 56 combinações sem overflow ou corte dos textos inspecionados. Contraste do título e preço confirmado no card verde do resultado. Verificação visual manual de cards e oferta em tela estreita. Não equivale a certificação de todos os modelos de celular/navegadores.

## Atualização de mídias — 21/10/2026
- O responsável confirmou que vídeos, fotos e relatos enviados são materiais da Lara; Propósito Fit é apenas referência de estrutura.
- Quatro prévias de treino em H.264/AAC, 720p, faststart, controles nativos e sem autoplay. Total aproximado: 4,9 MB; carregamento sob demanda.
- Cinco prints únicos de relatos, ampliáveis por diálogo acessível. Print repetido omitido. Conteúdo original preservado.
- Web app, receitas e acesso pelo navegador explicitados na apresentação, oferta, FAQ e resultado do quiz.
- Fotos nas perguntas 1 e 3; emojis contextuais nas 24 alternativas; pontuação preservada.
- QA: 56 combinações de estados/larguras de 320 a 2560 px sem overflow nem cortes detectados. Testes dos assets e das 4096 combinações do quiz aprovados.
