# CEP Helper

Projeto desenvolvido no processo seletivo da Eureka Labs, com o objetivo de fornecer ao usuário informações sobre um CEP ao digitar seu valor no campo do formulário.

## Overview

De forma geral, a aplicação é bem simples, basta o usuário digitar um CEP contendo apenas números, somando 8 caracteres no total e clicar no botão de busca. O input possui validação do número de caracteres, então caso possua menos ou mais de 8 números, o valor não será processado, e a busca não será feita, e o usuário será informado do erro abaixo do input.
Caso o valor passe pela validação, uma função é chamada, fazendo uma chamada ao backend passando o CEP informado. No backend é feito uma verificação se as informações daquele CEP já existem em cache, caso existam, é retornado o valor do cache, e caso não existam, é feito uma requisição ao serviço externo ViaCep. Caso o serviço retorne as informações, as mesmas são salvas em cache e retornadas ao usuário, caso não existam informações sobre aquele CEP é retornado um objeto vazio.
Voltando ao frontend, quando o backend retorna as informações do CEP, o estado contendo estas informações é atualizado e mostrado em tela, caso o retorno tenha sido vazio, ou seja, as informações daquele CEP não foram encontradas no serviço ViaCep, é exibido uma mensagem de que não foram encontradas informações sobre aquele CEP.

## Configurando o backend

Para testar a aplicação localmente, o backend pode ser clonado e acessado também localmente, ou pode ser acessado em produção.

- Acessando backend localmente:

  - Clonar repositório: `git clone https://github.com/luisfilipefa/viacep-eureka-backend.git`;
  - Instalar dependências: `yarn` ou `npm install`;
  - Copiar o arquivo .env.example como .env e setar a variável de ambiente DB_URI que é o endereço do banco de dados (precisa ser mongoDB no formato URI);
  - Iniciar o server com `yarn dev` ou `npm run dev`;

- Acessando backend em produção:
  - Criar um arquivo .env na raiz do projeto frontend contendo a variável `NEXT_PUBLIC_API_URL` com o valor `https://viacep-eureka-backend.herokuapp.com/api`;

## Como rodar a aplicação localmente

- Clonar repositório: `git clone https://github.com/luisfilipefa/viacep-eureka-frontend.git`;
- Instalar dependências: `yarn` ou `npm install`;
- Ter o backend configurado;
- Iniciar o app com `yarn dev` ou `npm run dev`;
