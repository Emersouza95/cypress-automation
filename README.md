# Projeto de Automação de Testes com Cypress
Este projeto automatiza os principais fluxos de um sistema de compras online, cobrindo testes de interface (UI) e serviços (API) com funcionalidades do Cypress.


## Tecnologias Utilizadas
- Cypress
- JavaScript
- Node.js + NPM
- Mocha + Chai
- REST API
- Custom Commands
- Fixtures


## Testes Implementados

UI - Login
- Deve performar a ação de login com sucesso
- Deve acusar Email e/ou senha inválidos ao inserir dados incorretos
- Deve acusar a necessidade de preencher os campos obrigatórios

UI - Produtos
- Adiciona produto na lista de compras
- Realiza busca por produto inexistente


API
- Deve realizar login com sucesso
- Deve barrar login com email de formatação incorreta
- Deve informar email ou senha inválido
- Deve listar os produtos utilizando um token válido para fazer a consulta


## Contexto sobre as decisões tomadas

- Dados sensíveis que não foram versionados neste repositório (Arquivo cypress.env.json) foram adicionados no final deste documento, caso queira executar os testes da mesma forma que eu os executei é só criar o arquivo cypress.env.json e colar os dados fornecidos.

- Foram utilizados Custom Commands para reaproveitamento de código de uso repetitivo tanto para o frontend quanto para o backend.

- Implementei validações das chamadas de API mesmo no frontend como complemento e camada extra de assertividade, nem sempre é necessário mas é bom aplicar em casos que podem ser mais críticos, dependendo claro do contexto do projeto.

- Foram separados os testes de API e os de Frontend para melhor organização do projeto.

- Um arquivo simples de fixture foi adicionado para apresentar uma melhor organização e separação do que deve ser lógica da automação e o que é dado/material para execução dos testes.

- Assumo que está verbosa a parte dos testes do frontend, uma melhoria/boa prática seria entender os fluxos de validação e encapsular as asserções que são realizadas de forma recorrente, evitando a duplicação de código, o que deixaria os testes mais limpos e legíveis.

 - NPM scripts foram adicionados para facilitar a execução e validação dos testes.

## Arquivo não versionado para execução dos testes (cypress.env.json)
```json
{
    "email": "emerson.souza@mail.com",
    "password": "senhaSegura123",
    "frontendUrl": "https://front.serverest.dev",
    "apiUrl": "https://serverest.dev"
}
```

## Setup para execução
### Instale as dependências
```bash
npm install
```
### Rode os testes em modo interativo
```bash
npx cypress open
