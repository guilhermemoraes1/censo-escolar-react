# Censo Escolar

**Aplicação Web - Cadastro e Listagem de Instituições de Ensino da Paraíba**

Este projeto tem como objetivo desenvolver uma aplicação web para listar e cadastrar Instituições de Ensino (IEs) da Paraíba extraídas do **Censo Escolar**. A aplicação é desenvolvida utilizando **ReactJS** e permite ao usuário visualizar as IEs em uma tabela, além de cadastrar novas Instituições através de um formulário modal.

A aplicação também interage com um servidor REST para consumir e enviar dados em formato JSON.

## Funcionalidades

- **Landing Page**: A aplicação exibe uma landing page com um menu horizontal, carrossel de imagens e cartões de apresentação.
- **Listagem de Instituições de Ensino**: Exibe as Instituições de Ensino da Paraíba extraídas do Censo Escolar em uma tabela.
- **Cadastro de Instituição de Ensino**: O usuário pode cadastrar novas Instituições de Ensino clicando no botão **Adicionar (+)**, que abre um formulário modal.
- **Validação de Formulário**: O formulário de cadastro realiza a validação de todos os campos, que são obrigatórios.
- **Integração com Backend**: A aplicação realiza requisições ao backend via métodos **GET** e **POST** utilizando JSON para manipular as informações.
- **Gerenciamento de Layout**: O layout é gerenciado utilizando **React-Bootstrap** para componentes como tabela, modal, e carrossel.
- **Gerenciamento de Estado**: O gerenciamento de estado da aplicação é feito utilizando **Context API** (ContextProvider) para compartilhamento de dados entre componentes.

## Tecnologias Utilizadas

- **ReactJS**: Framework principal para construção da interface.
- **React-Bootstrap**: Biblioteca de componentes Bootstrap para React, usada para gerenciar o layout.
- **Formik**: Biblioteca para gerenciamento e validação de formulários.
- **Context API**: Utilizada para gerenciar e compartilhar o estado global entre os componentes.
- **CSS**: Estilização da aplicação.

## Como Executar

Para rodar o projeto, siga os seguintes passos:

1. **Clone o repositório**:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

2. **Instale as dependências**:

```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**:

```bash
npm start
```

A aplicação estará disponível em `http://localhost:5000`.

## Backend da aplicação

A aplicação depende de um servidor REST para o envio e recebimento dos dados das Instituições de Ensino. A aplicação utiliza o backend abaixo:

[![Gist Card](https://github-readme-stats.vercel.app/api/pin/?username=guilhermemoraes1&repo=censo-escolar-fake-api&theme=dark)](https://gist.github.com/guilhermemoraes1/censo-escolar-fake-api/)

## Validação de Formulário

O formulário de cadastro de uma nova Instituição de Ensino utiliza **Formik** para gerenciar o estado dos campos e validar que todos os campos são obrigatórios. Caso algum campo não seja preenchido corretamente, o formulário exibe uma mensagem de erro.

## Como Contribuir

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```

2. **Crie uma branch para sua feature**:
   ```bash
   git checkout -b minha-feature
   ```

3. **Faça suas alterações** e commit:
   ```bash
   git commit -am 'Adiciona nova feature'
   ```

4. **Envie suas alterações para o repositório remoto**:
   ```bash
   git push origin minha-feature
   ```

5. **Abra um Pull Request**.

## Licença

Este projeto é de código aberto e pode ser utilizado e modificado conforme a licença [MIT](LICENSE).
