<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="./.github/logo.svg" width="300px" />
</h1>

<p>Este repositório faz parte de um desafio final, que é uma aplicação completa (Back-end, Front-end e Mobile) avaliada para emissão do certificado do Bootcamp GoStack #10 da Rocketseat. 

<blockquote align="center">"Se te oferecem um lugar em um foguete, não pergunte qual é o assento, apenas embarque!"</blockquote>

## Sobre o projeto

<p>Este é um projeto para gerenciamento de uma entregadora fictícia chamada Fastfeet. A versão web é para administradores e permite gerenciar os destinatários, entregadores, entregas e problemas ocorridos nesta etapa. A versão mobile foi desenvolvida para os entregadores gerenciar suas entregas e informar problemas ocorridos.</p>

## Tecnologias

<ul>
  <li><a href="https://nodejs.org/en/">Node.js</a></li>
  <li><a href="https://pt-br.reactjs.org/">React</a></li>
  <li><a href="https://reactnative.dev/">React Native</a></li>
  <li><a href="https://www.docker.com/">Docker</a></li>
</ul>

## Guia de instalação

### Pré-requisitos

<ul>
  <li><a href="https://nodejs.org/en/">Node.js</a></li> 
  <li><a href="https://git-scm.com/">Git</a></a></li>  
  <li><a href="https://www.npmjs.com/">npm</a> ou <a href="https://yarnpkg.com/">yarn</a></li>
  <li><a href="https://expo.io/">Expo</a> ou Emulador Android</li>
  <li><a href="https://mailtrap.io//">Mailtrap</a></li>
   <li>Docker ou PostgreSQL, MongoDB, Redis</li>
</ul>

### Instalação e execução

#### Docker

<p>Caso você deseje utilizar o Docker, é possível rodar os bancos de dados utilizados em containers para a criação dos databases. Siga a documentação oficial de cada um.</p>

<ul>
  <li><a href="https://hub.docker.com/_/postgres">PostgreSQL</a></li>
  <li><a href="https://hub.docker.com/_/mongo">MongoDB</a></li>  
  <li><a href="https://hub.docker.com/_/redis/">Redis</a></li>
</ul>

#### Backend 

- Execute os comandos em seu terminal:
```bash
# Clone o repositório
$ git clone https://github.com/nathaliacristina20/fastfeet.git

# Vá até o repositório do backend
$ cd fastfeet/server
```
-  Copie o arquivo de environment
```bash
# comando linux ou mac
cp .env.example .env

# ou comando windows
copy .env.example .env
```
- Acesse o arquivo <b>.env</b> gerado na raiz do repositório e preencha com suas variáveis de ambiente. 
- Instale as dependências com seu gerenciador de pacotes:
```bash
# com yarn 
yarn 

# ou com npm 
npm install 
```
- Execute as migrations (se estiver utilizando Docker, rode-o neste passo e certifique-se que o database esteja criado):

```bash
# com yarn
yarn sequelize db:migrate 

# ou com npm
npx sequelize db:migrate 
```
- Execute os seeds para gerar um administrador para a aplicação:
```bash
# com yarn
yarn sequelize db:seed:all

# ou com npm
npx sequelize db:seed:all
```
- Execute a aplicação:
```bash
# com yarn
yarn dev

# ou com npm
npm run dev
```
- Em outro terminal, rode uma fila
```bash
# com yarn
yarn queue

# ou com npm
npm run queue
```
<p>:warning: Caso esteja utilizando Docker é necessário que os containers estejam em execução antes de executar a aplicação.</p>
<p>:envelope: Caso deseje testar o backend sem o frontend, você pode acessar as requisições baixando o arquivo "Insomnia.json" disponível dentro do repositório "server" e importá-las no <a href="https://insomnia.rest/">Insomnia</a>.</p>
<p>Atente-se em mudar as variáveis <b>base_url</b> e <b>token</b> (após executar a rota de login para gerar a autenticação) no environment do Insomnia.</p>

#### Frontend Web

- Vá até o repositório "web" e instale as dependências com seu gerenciador de pacotes:
```bash
# com yarn 
yarn 

# ou com npm 
npm install 
```
- Execute a aplicação:
```bash
# com yarn
yarn start

# ou com npm
npm start 
```

#### Mobile

<p>:warning: Este projeto, no momento, está disponível somente para ambiente Android.</p>

<p>Para um ambiente mobile com emulador, siga o tutorial disponibilizado pela Rocketseat com o passo-a-passo e erros mais comuns de acordo com seu sistema operacional. Clique <a href="https://docs.rocketseat.dev/ambiente-react-native/introducao">aqui</a> para acessar.</p>

- Vá até o repositório "mobile" e instale as dependências com seu gerenciador de pacotes:
```bash
# com yarn 
yarn 

# ou com npm 
npm install 
```
-  Copie o arquivo de environment 
```bash
# comando linux ou mac
cp .env.example .env

# ou comando windows
copy .env.example .env
```
- Acesse o arquivo <b>.env</b> gerado na raiz do repositório e preencha com suas variáveis de ambiente. 
- Abra um emulador android e rode o comando no terminal:
```
# com yarn 
yarn android

# ou com npm 
npm run android 
```
- Execute a aplicação:
```bash
# com yarn
yarn start

# ou com npm
npm start 
```  
---
console.log('Feito com :heart: por [Nathalia](https://www.linkedin.com/in/nathaliagomesoliveira/)'); 
