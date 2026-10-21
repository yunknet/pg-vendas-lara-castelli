# Página de vendas — Lara Castelli

## Referências efetivamente consultadas
- https://github.com/yunknet/pg-vendas-playbook-yuri — código da página: promessa segmentada, apresentação da entrega, identificação, mecanismo, oferta, dúvidas e repetição dos CTAs. A biografia, números, provas, preços e bônus não se transferem à nova oferta.
- https://vemtreinar.com/ — observação visual e leitura pelo navegador: benefício relacionado à rotina, entrega concreta, objeções e oferta. Não copiamos funcionalidades, preços, garantias ou depoimentos.
- https://www.instagram.com/lara.castelli.oficial/ — leitura e visualização do perfil: treino, alimentação, autocuidado, organização e tom acolhedor. Aproveitada a frase de continuidade usada nas publicações.
- https://www.instagram.com/proposito.fit — leitura do perfil: constância, objetivos e conexão entre treino e alimentação.
- https://www.instagram.com/p/DdjYFDVsbpY/ — publicação de lucasstaconi sobre treino híbrido, organização e acompanhamento. Não transferimos a entrega presencial ou personalização para o produto.
- Materiais locais: lara-castelli.json e referências visuais lara-castelli-01.png e lara-castelli-02.png. Imagens preexistentes; não foram geradas imagens novas.

## Decisões de copy
Foco na próxima etapa depois do emagrecimento. Imagens da personagem como identidade visual, sem atribuição de formação, experiência pessoal ou resultado. Sem seção de biografia. Sem antes/depois, números, depoimentos, escassez ou garantias inventadas. Sem destaque ao web app. Página comercial sem avisos sobre ausência de estudos próprios.

## Propostas a validar (notas internas, fora da página)
- A oferta de 30 dias segue a hipótese já fornecida pelo criador; precisa de confirmação da operação e do conteúdo antes de abrir inscrições.
- “Sua próxima etapa” é uma linha de comunicação, não um nome comercial definido.
- Confirmar responsáveis, qualificações, formato de treino e alimentação, personalização, frequência e canais de acompanhamento, critérios de entrada, pagamento e termos antes da venda.
- Não há checkout, coleta de dados ou compra implementada. As chamadas apresentam a entrega e a oferta. Preço confirmado pelo criador: de R$ 97,90 por R$ 37,90. Botões de compra desativados, sem redirecionamento, até receber o link do checkout. Configurar `dist/config.js` com o destino comercial aprovado para conectar os botões finais.

## Estrutura
Site estático em dist/. Prévia com `node dev-server.mjs`. Configuração de publicação em .openai/hosting.json. Nenhum pixel de rastreamento do Yuri foi reutilizado.

