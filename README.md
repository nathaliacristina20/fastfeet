<p align="center">
    <img alt="Fastfeet" title="Fastfeet" src=".github/logo.svg" width="300px" />
</p>

<h3 align="center">
Plataforma de gerenciamento de entregas
</h3>

<p align="center">
  <a href="#rocket-sobre-o-projeto">Sobre o projeto</a> | <a href="#computer-tecnologias">Tecnologias</a> | <a href="#books-guia-de-instalação-e-execução">Guia de instalação e execução</a> | <a href="#pencil-como-contribuir">Como contribuir</a> | <a href="#page_with_curl-licença">Licença</a>
</p>

## Layout

<img src=".github/fastfeet.png">

## :rocket: Sobre o projeto

<p>Esta é uma plataforma para uma entregadora fictícia chamada Festfeet. A versão web é para os administradores onde eles podem gerenciar os destinários, entregas e problemas.</p>
<p>A versão mobile foi desenvolvida para os entregadores gerenciar suas entregas e informar problemas que podem ocorrer.</p>

<p>Este é o repositório da API do projeto.</p>
<ul>
  <li>Para a versão web, <a href="https://github.com/nathaliacristina20/fastfeet-web">clique aqui</a>.</li>
  <li>Para a versão mobile, <a href="https://github.com/nathaliacristina20/fastfeet-mobile">aqui</a>.</li>
</ul>

## :computer: Tecnologias

Além das tecnologias abaixo, esta aplicação foi desenvolvida com as melhores práticas de desenvolvimento!

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [ESLint-Airbnb](https://eslint.org/), [Prettier](https://prettier.io/) e [EditorConfig](https://editorconfig.org/)
- [Yup](https://github.com/jquense/yup)
- [Multer](https://github.com/expressjs/multer)
- [Datefns](https://date-fns.org/)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js/)
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [Sequelize](https://sequelize.org//)
- [Handlebars](https://handlebarsjs.com/)
- [Nodemailer](https://nodemailer.com/about/)
- [Cors](https://github.com/expressjs/cors)
- [Sucrase](https://github.com/alangpierce/sucrase)
- [Nodemon](https://nodemon.io/)
- [Bee Queue](https://github.com/bee-queue/bee-queue)

## :books: Guia de instalação e execução

### Pré-requisitos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) >= v10.20 
- [Yarn](https://yarnpkg.com/)
- Uma instância de [PostgreSQL](https://www.postgresql.org/)

** Ou [Docker](https://www.docker.com/)

### Como executar

<i>Antes de executar estes passos, você precisa ter uma instância dos bancos listados acima ou um Docker com as imagens e os databases e schemas criados.</i>

- Clone o repositório ```git clone https://github.com/nathaliacristina20/fastfeet.git```
- Vá até o diretório ```cd fastfeet```
- Execute ```yarn``` para instalar as dependências
- Copie o arquivo .env.example executando ```cp .env.example .env``` para linux ou mac e ```copy .env.example .env``` para windows
- Abra o arquivo .env e preencha com suas variáveis de ambiente
- Execute ```yarn sequelize db:migrate``` para rodar as migrations
- Execute ```yarn dev``` para rodar o servidor
- Em outro terminal, execute ```yarn queue``` para rodar uma fila

Você pode realizar requisições REST através do Insomnia

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Fasfeet&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fnathaliacristina20%2Ffastfeet%2Fmaster%2Finsomnia.json)

## :pencil: Como contribuir

<b>Faça um fork deste repositório</b>

```bash
# Clone o seu fork
$ git clone url-do-seu-fork && cd fastfeet

# Crie uma branch com sua feature ou correção de bugs
$ git checkout -b minha-branch

# Faça o commit das suas alterações
$ git commit -m 'feature/bugfix: minhas alterações'

# Faça o push para a sua branch
$ git push origin minha-branch
```

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## :page_with_curl: Licença

Esse projeto está sob a licença MIT. Veja o arquivo <a href="https://github.com/nathaliacristina20/fastfeet/blob/master/LICENSE">LICENSE</a> para mais detalhes.

<hr />
<p>by Nathalia Cristina :wave: <a href="https://linktr.ee/nathaliacristina20">Get in touch!</a></p>
