# Desafio MongoDb Node
Aplicação Node.js responsável pelo cadastro, login e busca autenticada de usuários.


## Live app

  É possível acessar todas as rotas definidas [nesta sessão](#as-seguintes-rotas-estarão-disponíveis) através da URL https://mongo-node-challenge.herokuapp.com .


## Download e Build local

### Clone o repositório, instale os pacotes node e verifique as rotas localmente

```
git clone https://github.com/aline-camargo/mongo-node-challenge.git
cd mongo-node-challenge
npm install
npm run build
npm run start-dev
```

Você pode definir as seguintes variáveis de ambiente:

   - **PORT**= [3000] (porta de entrada da API)

   - **JWT_PRIVATE_KEY**= [sercet] (chave privada de assinatura do token de autenticação)

   - **MONGO_CONNECTION_URI**= [] (uri de conexão ao banco MongoDb, você pode configurar [aqui](https://docs.mongodb.com/manual/installation/))

   - **TOKEN_TOLERANCE_AMOUNT**= [30] (tempo em que o token JWT ainda poderá ser usado, a partir de sua criação)



## As seguintes rotas estarão disponíveis:

`POST http://localhost:{{PORT}}/user` (criação de usuário)

> Body:

```
{
  "nome": "Nome Teste",
  "email": "1234@gmail.com",
  "senha": "senha",
  "telefones": [
      {
          "numero": 123456789,
          "ddd": 11
      }
  ]
}
```

> Response:

```
{
  "data": {
      "id": "7fc64101-e692-42c6-bbee-b656fda26986",
      "nome": "Nome Teste",
      "email": "1234@gmail.com",
      "senha": "$2b$10$/MlgptvODVs0NptzQzx9ieMNvuzomdUNZhxQDpffaMSW.GTu07apC",
      "telefones": [
          {
              "numero": 123456789,
              "ddd": 11
          }
      ],
      "data_atualizacao": "2021-10-03T18:12:38.268Z",
      "data_criacao": "2021-10-03T18:12:38.245Z",
      "ultimo_login": "2021-10-03T18:12:38.238Z",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdmYzY0MTAxLWU2OTItNDJjNi1iYmVlLWI2NTZmZGEyNjk4NiIsIm5hbWUiOiJOb21lIFRlc3RlIiwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTYzMzI5NTU1OH0.2rvnrTl-k12B2vztYcnse1Zry0OFakYSss1hTMqTX-8"
  }
}
```

`POST http://localhost:{{PORT}}/signIn` (login de usuário)

> Body

```
{
  "email": "1234@gmail.com.com",
  "senha": "senha"
}
```


> Response
```
{
  "data": {
      "id": "7fc64101-e692-42c6-bbee-b656fda26986",
      "nome": "Nome Teste",
      "email": "1234@gmail.com",
      "senha": "$2b$10$/MlgptvODVs0NptzQzx9ieMNvuzomdUNZhxQDpffaMSW.GTu07apC",
      "telefones": [
          {
              "numero": 123456789,
              "ddd": 11
          }
      ],
      "data_atualizacao": "2021-10-03T18:12:38.268Z",
      "data_criacao": "2021-10-03T18:12:38.245Z",
      "ultimo_login": "2021-10-03T18:12:38.238Z",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdmYzY0MTAxLWU2OTItNDJjNi1iYmVlLWI2NTZmZGEyNjk4NiIsIm5hbWUiOiJOb21lIFRlc3RlIiwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTYzMzI5NTU1OH0.2rvnrTl-k12B2vztYcnse1Zry0OFakYSss1hTMqTX-8"
  }
}
```

`GET http://localhost:{{PORT}}/user/{{userId}}` (listagem de usuário)

> Header

```
Authentication - Bearer {{JwtToken}}
```

> Response
```
{
  "data": {
      "id": "7fc64101-e692-42c6-bbee-b656fda26986",
      "nome": "Nome Teste",
      "email": "1234@gmail.com",
      "senha": "$2b$10$/MlgptvODVs0NptzQzx9ieMNvuzomdUNZhxQDpffaMSW.GTu07apC",
      "telefones": [
          {
              "numero": 123456789,
              "ddd": 11
          }
      ],
      "data_atualizacao": "2021-10-03T18:12:38.268Z",
      "data_criacao": "2021-10-03T18:12:38.245Z",
      "ultimo_login": "2021-10-03T18:12:38.238Z",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdmYzY0MTAxLWU2OTItNDJjNi1iYmVlLWI2NTZmZGEyNjk4NiIsIm5hbWUiOiJOb21lIFRlc3RlIiwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTYzMzI5NTU1OH0.2rvnrTl-k12B2vztYcnse1Zry0OFakYSss1hTMqTX-8"
  }
}
```


> Erros

```
{
  "mensagem": {{mesagem de erro}}
}
```
