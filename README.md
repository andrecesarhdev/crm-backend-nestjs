🚀 CRM Backend – NestJS + MySQL
API backend desenvolvida em NestJS como projeto de consolidação de conhecimentos em desenvolvimento backend, com foco em boas práticas, autenticação JWT, autorização por roles, arquitetura modular e documentação com Swagger.
Este projeto simula um sistema CRM, permitindo o gerenciamento de usuários, categorias e produtos, com controle de acesso baseado em perfil.

🧠 Objetivo do Projeto
Consolidar fundamentos de backend com NestJS
Aplicar JWT Authentication
Implementar Role-Based Access Control (RBAC)
Trabalhar com MySQL + TypeORM
Documentar a API com Swagger
Estruturar o projeto de forma escalável e profissional

🛠️ Tecnologias Utilizadas
Node.js
NestJS
TypeScript
MySQL
TypeORM
JWT (JSON Web Token)
Passport.js
Bcrypt
Swagger (OpenAPI)
Class-validator / Class-transformer

📂 Arquitetura do Projeto
O projeto segue uma arquitetura modular, separando responsabilidades por domínio:
src/
 ├── auth/
 │   ├── controllers
 │   ├── dto
 │   ├── guards
 │   ├── decorators
 │   ├── strategies
 │   └── services
 ├── users/
 ├── categories/
 ├── products/
 ├── app.module.ts
 └── main.ts
 
Padrões adotados
Controllers → apenas controle de requisição
Services → regras de negócio
DTOs → validação e contrato de dados
Guards → autenticação e autorização
Decorators customizados (@CurrentUser, @Roles)

🔐 Autenticação e Autorização

🔑 Autenticação
Autenticação baseada em JWT
Login via email e senha
Token retornado no login

👤 Autorização por Role
Controle de acesso baseado em perfil do usuário:
ADMIN
MANAGER
SELLER
OPERATOR

Exemplo:
Apenas ADMIN pode criar produtos
Outras roles têm acesso restrito conforme regras da aplicação

🧩 Principais Funcionalidades

👥 Usuários
Cadastro de usuários
Criptografia de senha com bcrypt
Definição de role

📦 Produtos
CRUD completo
Status automático (ATIVO / INATIVO)
Associação com categoria
Associação com usuário criador
Filtros por status e categoria

🗂️ Categorias
Cadastro de categorias
Associação com produtos

Documentação com Swagger
A API está totalmente documentada utilizando Swagger.
Após rodar o projeto, acesse:
http://localhost:4000/swagger

No Swagger é possível:
Visualizar todas as rotas
Testar endpoints
Realizar login
Autorizar requisições com JWT via Authorize 🔐

⚙️ Configuração de Ambiente
O projeto utiliza variáveis de ambiente.

📄 Arquivos de ambiente
.env.development → ambiente local
.env.production → ambiente de produção
.env.example → modelo (versionado)
Exemplo de .env.example:

NODE_ENV=
PORT=

DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=

JWT_SECRET=
JWT_EXPIRES_IN=

▶️ Como Rodar o Projeto
1️⃣ Clonar o repositório
git clone https://github.com/seu-usuario/crm-backend.git
2️⃣ Instalar dependências
npm install
3️⃣ Configurar o banco de dados
Criar um banco MySQL
Ajustar o .env.development
4️⃣ Rodar a aplicação
npm run start:dev

🧪 Testes

O projeto está preparado para:
Testes unitários (Jest)
Testes e2e (Jest + Supertest)

📌 Status do Projeto

✔ Backend funcional
✔ Autenticação JWT
✔ Autorização por roles
✔ Swagger documentado
✔ Pronto para integração com frontend

🧠 Observação Final
Este projeto foi desenvolvido com foco em aprendizado, boas práticas e evolução profissional, servindo como base para aplicações reais e como material de portfólio.

👨‍💻 Autor
André César Henrique
📍 Recife – PE
🔗 GitHub: https://github.com/andrecesarhdev
📧 Email: andrecesarhenrique@gmail.com

