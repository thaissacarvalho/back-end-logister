# Logister

## Sobre

O projeto "Logister" é uma API back-end projetada para gerenciar o registro e o login de usuários. Utiliza bcrypt para criptografar senhas e JWT para autenticação e autorização, garantindo que os dados dos usuários sejam protegidos e que o acesso à API seja seguro.

## Funcionalidades

- **Registro de Usuários**: Permite que novos usuários se registrem.
- **Login de Usuários**: Autentica usuários e gera um token JWT para acesso.
- **Atualização de Usuários**: Permite atualizar informações de usuários.
- **Exclusão de Usuários**: Permite excluir usuários.
- **Visualização de Usuário**: Permite visualizar informações de um usuário específico.

## Endpoints da API

- `GET /`: Retorna uma lista de todos os usuários. (`userController.index`)
- `POST /register`: Registra um novo usuário. (`userController.register`)
- `PATCH /edit/:_id`: Atualiza informações de um usuário específico. (`userController.edit`)
- `DELETE /delete/:username`: Exclui um usuário específico. (`userController.delete`)
- `POST /login`: Realiza o login de um usuário e retorna um token JWT. (`loginController`)
- `GET /user/:_id`: Retorna informações de um usuário específico. Requer autenticação via token JWT. (`authMiddleware`, `privateController`)

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- bcrypt
- JWT (JSON Web Token)
- ESLint

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/thaissacarvalho/back-end-logister.git
   
2. Navegue até o diretório do projeto:
    ```bash
    cd logister
    
3. Instale as dependências:
    ```bash
    npm install

4. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
  ```
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  ```
  
5. Inicie o servidor:
    ```bash
    npm run start

## Contato

- Linkedin: www.linkedin.com/in/thaissacarvalho-ti
- Email: thaissa-carvalho@outlook.com
- Github: www.github.com/thaissacarvalho
- X: https://x.com/thaissadev

👉🏾 FINALIZADO EM JULHO DE 2024.