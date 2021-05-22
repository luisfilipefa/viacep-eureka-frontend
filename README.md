# CEP Helper

Projeto desenvolvido no processo seletivo da Eureka Labs, com o objetivo de fornecer ao usuário informações sobre um CEP ao digitar seu valor no campo do formulário.

![image](https://user-images.githubusercontent.com/70351489/119241284-ab7cc200-bb2b-11eb-9848-470d8a192760.png) 
![image](https://user-images.githubusercontent.com/70351489/119241303-d535e900-bb2b-11eb-9ae8-d1d01bb7ec59.png)

## Overview

### Funcionamento

De forma geral, a aplicação é bem simples, o usuário digita um cep contendo apenas números no campo, clica no botão de buscar e mostra os resultados caso exista.

### Validação do campo

Para passar pela validação, o cep deve conter apenas números e ter 8 caracteres. Caso o valor não passe pela validação, uma mensagem de erro é exibida.

### Buscando dados

Caso o valor passe pela validação, uma requisição é feita ao backend passando o cep como parâmetro. No backend é feito uma verificação se as informações daquele CEP já existem em cache, caso existam, é retornado o valor em cache, e caso não existam, é feito uma requisição ao serviço externo ViaCep. Caso o serviço retorne as informações, as mesmas são salvas em cache e retornadas ao usuário, caso não existam informações sobre aquele CEP é retornado um objeto vazio.

### Validação dos dados no frontend

Quando o backend retorna as informações do CEP, estas são atribuídas a um estado (useState do React), caso o retorno tenha sido vazio, ou seja, as informações daquele CEP não foram encontradas no serviço ViaCep, é exibido uma mensagem de que não foram encontradas informações, caso contrário, as informações são exibidas.

## Tecnologias utilizadas

### Frontend

Para a parte do frontend foi utilizado Next.js com Typescript. Neste caso poderia ter sido utilizado o próprio CRA template, pois as funções específicas do Next acabaram não sendo utilizadas, optei por ele por não haver desvantagem se comparado ao CRA, e caso precisássemos de funções extras como Static Site Generation, Server Side Rendering, etc, já tínhamos tudo disponibilizado pelo Next.

### Backend

Para a construção do backend utilizei Node.js e também Typescript, e Express para criação das rotas e middlewares. Mais detalhes sobre o backend podem ser encontrados no repositório do mesmo: `https://github.com/luisfilipefa/viacep-eureka-backend.git`;

### Testes

Devido a simplicidade da estrutura do backend, não cheguei a criar testes automatizados, testei a única rota pelo Postman mesmo. Já para o frontend criei dois testes unitários, que testavam o componente de Form e o CepInfoItem, responsável por renderizar as informações do CEP. As bibliotecas que utilizei para escrever os testes foram o Jest e React Testing Library, juntas de alguns pacotes adicionais voltados a escrita de testes utilizando Typescript.

### Rodando os testes

Para rodar os testes, basta executar `yarn test`;

## Como rodar a aplicação localmente

- Clonar repositório: `git clone https://github.com/luisfilipefa/viacep-eureka-frontend.git`;
- Instalar dependências: `yarn` ou `npm install`;
- Configurar o backend;
- Iniciar o app com `yarn dev` ou `npm run dev`;
- ### Configurando o backend

  - Para testar a aplicação localmente, o backend pode ser clonado e acessado também localmente, ou pode ser acessado em produção.

    - Acessando backend localmente:

      - Clonar repositório: `git clone https://github.com/luisfilipefa/viacep-eureka-backend.git`;
      - Instalar dependências: `yarn` ou `npm install`;
      - Copiar o arquivo .env.example como .env e setar a variável de ambiente DB_URI que é o endereço do banco de dados (precisa ser mongoDB no formato URI);
      - Iniciar o server com `yarn dev` ou `npm run dev`;

    - Acessando backend em produção:
      - Criar um arquivo .env na raiz do projeto frontend contendo a variável `NEXT_PUBLIC_API_URL` com o valor `https://viacep-eureka-backend.herokuapp.com/api`;
