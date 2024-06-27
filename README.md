# API Autenticação e Autorização

Uma API desenvolvida para praticar conceitos de autenticação e autorização

Rode o comando abaixo para executar a migração do banco de dados:

```bash
npm run migrate:dev
```

**Será essencial ter um banco de dados criado e referenciado nas variáveis de ambiente**

Rode o comando abaixo para inciar a aplicação em modo de desenvolvimento

```bash
npm run dev
```

## Rotas da aplicação

### Registrar usuário /users POST

Padrão de corpo:

```json
{
   "name": "John Doe",
   "email": "johndoe@email.com",
   "password": "1234"
}
```

Padrão de resposta (STATUS 201)

```json
{
   "id:": 1,
   "name": "John Doe",
   "email": "johndoe@email.com"
}
```

### Login de usuário /users/login POST

Padrão de corpo

```json
{
   "email": "johndoe@email.com",
   "password": "1234"
}
```

Padrão de resposta (STATUS 200)

```json
{
   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAxMDkzMTA4LCJleHAiOjE3MDExMzYzMDh9.KiE6aaW7Vmu0ebp-0NXpfnuIcbfKbuIwTYk8pU__Js4",
   "user": {
      "id": 1,
      "name": "Alex",
      "email": "alex@email.com"
   }
}
```

#### Possíveis erros

404 NOT FOUND - Usuário não cadastrado

```json
{
   "message": "User not registered"
}
```

403 FORBIDDEN - E-mail e senha não correspondem

```json
{
   "message": "E-mail and password doesn't match."
}
```

### Recuperar usuário GET /users (Precisa de autorização)

Autorização

```json
{
   "headers": {
      "authorization": "Bearer token"
   }
}
```

Padrão de resposta

```json
{
   "id": 1,
   "name": "Alex",
   "email": "alex@email.com"
}
```

#### Possíveis erros

401 UNAUTHORIZED