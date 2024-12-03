# Desafio 3 - Semana 12

## 📍 Descrição do Desafio

O desafio consiste na recriação das páginas do *Furniro*, um site de compras de móveis, com base em um design no Figma. O projeto deve ser desenvolvido de forma fiel ao layout fornecido, utilizando **HTML**, **CSS**, **JavaScript**, **TypeScript**, **React** e um framework de sua escolha (ex: **Tailwind CSS** ou **Bootstrap**). Este é um projeto individual e envolve funcionalidades como navegação, autenticação, carrinho de compras e integração com uma API para preencher dados automaticamente.

## 📍 Como Rodar o Projeto

Para rodar o projeto localmente, siga os seguintes passos:

1. **Instalar as dependências:**
    ```bash
    npm i
    ```

2. **Inicializar o repositório Git:**
    ```bash
    git init
    ```

3. **Iniciar o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4. **Iniciar o servidor JSON para simular o banco de dados:**
    ```bash
    npm run json-server
    ```

Após isso, o projeto estará rodando localmente. Acesse o site em [http://localhost:3000](http://localhost:3000) para visualizar o projeto em funcionamento.

## 📍 Definições do Projeto

O projeto segue o layout disponibilizado no [Figma](https://www.figma.com/design/E1F9AbyIRppkO2Ro1oP2tj/Desafio-3?node-id=0-1&t=LrMxN8bwcSbYKhGC-1). É importante duplicar o projeto no Figma para evitar qualquer modificação no arquivo original.

### 🛑 Requisitos Obrigatórios

- **Header** e **Footer** em todas as páginas, conforme o design.
- Funcionalidades de **autenticação** usando [Clerk](https://clerk.com/docs/quickstarts/react).
- **Carrossel de produtos** na página inicial.
- Funcionalidades de **carrinho de compras** e **checkout**, com proteção de rotas.
- **Validações de formulários** para garantir entradas corretas.
- **JSON Server** para simulação do banco de dados, com filtros e paginação.
- **Responsividade** garantida para diferentes dispositivos.

### 🛑 Requisitos Opcionais

- **Cobertura de testes** com **Jest** para garantir a qualidade do código.

## 📍 Tecnologias Utilizadas

- **React** e **TypeScript**.
- **Tailwind CSS** (ou outro framework de sua escolha).
- **React Router** para navegação.
- **JSON Server** para simulação do backend.
- **Clerk** para autenticação de usuários.

## ⚠️ Data de Entrega

O projeto deve ser entregue até **09/12/2024**, às **17h30**. A apresentação terá duração máxima de **5 minutos**.

## 📍 Instruções de Implantação

Para realizar o deploy, basta seguir as instruções do [Create React App](https://facebook.github.io/create-react-app/docs/deployment). O código está preparado para ser executado em uma instância EC2 e pode ser hospedado no **S3** para as imagens.
