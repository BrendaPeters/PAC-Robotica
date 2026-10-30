# PAC Robótica

Mini site educativo em português para quem está começando em robótica e Arduino. Inspirado na identidade visual do projeto Dicas de JavaScript: fundo escuro, destaques amarelos, títulos em Jersey 10 e conteúdo em cartões.

## Conteúdo
- Fundamentos: sensores, processamento e atuadores.
- Arduino Uno R3 e componentes básicos.
- Exemplo Blink explicado e demonstração visual com velocidade ajustável.
- Curiosidades, quiz com correção e materiais oficiais.

## Abrir o site
Abra `index.html` no navegador. Não precisa instalar dependências nem compilar. As fontes do Google precisam de internet; se estiver offline, fontes alternativas são usadas. O botão de copiar possui seleção manual como alternativa quando a área de transferência estiver indisponível.

## Arquivos
- `index.html`: conteúdo e estrutura semântica.
- `style.css`: identidade visual e adaptação para celular.
- `script.js`: demonstração do LED, cópia de código e quiz.

O LED é apenas uma representação no navegador, sem comunicação com hardware. Nenhum dado do quiz é enviado ou salvo.

## Publicar no GitHub
1. Entre na sua conta e crie um repositório chamado `pac-robotica`, sem adicionar README, licença ou .gitignore, pois o projeto local já está preparado.
2. Na pasta deste projeto, execute os comandos abaixo substituindo SEU-USUARIO pelo nome da sua conta:

```sh
git remote add origin https://github.com/SEU-USUARIO/pac-robotica.git
git push -u origin main
```

Se o Git solicitar autenticação, use o fluxo de login do GitHub. Não coloque senhas ou tokens nos arquivos.

## Ativar o GitHub Pages
No repositório, vá a **Settings → Pages → Build and deployment**. Selecione **Deploy from a branch**, escolha a branch **main** e a pasta **/(root)** e salve. O GitHub exibirá o endereço quando a publicação terminar. A disponibilidade depende da visibilidade do repositório e do seu plano.

## Referências
- [Arduino Uno R3](https://docs.arduino.cc/hardware/uno-rev3/)
- [Blink](https://docs.arduino.cc/built-in-examples/basics/Blink/)
- [Arduino IDE](https://www.arduino.cc/en/software)

## Créditos
Projeto educacional PAC Robótica • 2026. Arduino é uma marca de seus respectivos titulares; este é um material educacional independente.