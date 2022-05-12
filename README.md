<p align="center">
  <a href="" rel="noopener">
 <img src=".github/capa.gif" alt="Imagem do Desafio Fullstack"></a>
</p>

<h3 align="center">PULSE - Desafio Fullstack</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Aplicação desenvolvida para testes de conhecimentos técnicos no "Desafio Fullstack da Pulse".
    <br>
</p>

## 📝 Índice

- [Sobre a aplicação](#sobre)
- [Layout](#layout)
- [Diagrama de Entidades e Relacionamento](#der)
- [Por onde começar?](#inicio)
- [Como usar?](#como_usar)
- [Testes](#tests)
- [Usuários](#users)
- [Tecnologias utilizadas](#techs)
- [Autor](#autores)
- [Agradecimentos](#agradecimentos)

## 🧐 Sobre a aplicação <a name = "sobre"></a>

A aplicação define-se como um __CRUD__ de usuários, espetáculos e reservas de poltronas para gerenciamento de um teatro. O objetivo desse projeto é comprovar conhecimentos técnicos e teóricos relacionados ao desenvolvimento fullstack. 

## 🎨 Layout <a name = "layout"></a>

Você pode utilizar a seguinte URL para visualizar um pequeno esboço das telas do app:
[Figma Layout - Desafio Fullstack](https://www.figma.com/file/7kHmGc8tcMixcOMvVfrzQz/Desafio-Full-Stack-Pulse?node-id=0%3A1)

## 📄 Diagrama de Entidades e Relacionamento <a name = "der"></a>

Você pode utilizar a seguinte URL para visualizar o **Diagrama de entidades e relacionamento** do banco de dados:
[ERD - Desafio Fullstack](https://whimsical.com/desafio-full-stack-WPSzikPS41KdLqLy3gdrby)

## 🏁 Por onde começar? <a name = "inicio"></a>

A aplicação foi desenvolvida com Node.js e Reactjs, utilizando sempre os padrões e boas práticas de desenvolvimento. Foi criado um __docker-compose__ para iniciar toda a aplicação de forma mais prática. Já existe um arquivo do sqlite configurado com alguns dados inseridos em **./server/databases/db_desafio_fullstack**.

### Pré-requisitos

- Node.js
- NPM
- Reactjs
- Docker
- Arquivo de configuração de váriáveis de ambiente *.env* (existe um arquivo de exemplo chamado *.env.example* nos dois ambientes)

## 🎈 Como usar? <a name="como_usar"></a>

### Iniciando o container

Para iniciar a aplicação utilizando o docker-compose execute o seguinte comando na raíz do projeto:

```bash
docker-compose up
```

### Iniciando o backend separadamente

Para iniciar o backend separadamente, entre no diretório *./server* e execute os comandos:

```bash
# Utilizando o NPM
npm i
npm run dev

# Ou utilizando o Yarn
yarn
yarn dev
```

Caso você tenha o desejo de recriar o banco de dados, foi utilizado o conceito de **migrations** para facilitar esse processo. Delete o arquivo **./server/databases/db_desafio_fullstack** e em seguida execute:

```bash
# Para recriar as tabelas e relacionamentos
yarn typeorm migration:run

# Para rodar as seeds necessárias (usuários, poltronas, etc..)
yarn seed
```

### Iniciando o frontend separadamente

Para iniciar o frontend separadamente, entre no diretório *./client* e execute os comandos:

```bash
# Utilizando o NPM
npm i
npm start

# Ou utilizando o Yarn
yarn
yarn start
```

Recomendo a utilização do yarn por questões de performance.

## ✅ Testes <a name = "tests"></a>

Foram implementados alguns **testes unitários** com o Jest e **testes de integração** com o Supertest no backend. Para rodar os testes, execute o seguinte comando na raíz do diretório server:

```bash
# Utilizando o NPM
npm run test

# Ou utilizando o Yarn
yarn test
```
## 👤 Usuários para testes <a name = "users"></a>

Foram criados dois usuários para testar a usabilidade da aplicação, são eles:

**Admin (com privilégios de administrador)**
- E-mail: admin@email.com
- Senha: admin

**Test (sem privilégios de administrador)**
- E-mail: test@email.com
- Senha: test

## ⛏️ Tecnologias utilizadas: <a name = "techs"></a>

- [React.js](https://nodejs.org/en/) - Javascript Interface Library
- [StyledComponents](https://styled-components.com/) - Styles library built for React
- [Typescript](https://www.mongodb.com/) - Superset JavaScript
- [ESLint](https://vuejs.org/) - JavaScript linter
- [Docker](https://www.docker.com/) - Containers and Virtualization

## ✍️ Autor <a name = "autores"></a>

- [@robertotics4](https://github.com/robertotics4) - Desenvolvimento | UI/UX

## 🎉 Agradecimentos <a name = "agradecimentos"></a>

Agradeço à Renata Martins por possibilitar a minha participação nesse processo seletivo e também a todos os meus amigos devs da PULSE. Apesar de não poder implementar tudo o que eu gostaria pelo tempo que tive disponível, foi muito gratificante e divertido.