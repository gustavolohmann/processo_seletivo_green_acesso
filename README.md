# Projeto: Sistema de Gerenciamento de Boletos

Este projeto é uma API para gerenciar boletos, permitindo operações como importação de arquivos CSV e PDF, listagem de boletos com filtros e geração de relatórios em PDF. A API também está documentada utilizando o Swagger, permitindo fácil visualização e teste dos endpoints.

---

## Funcionalidades

### 1. **Importação de Arquivos CSV**
- Endpoint para importar boletos a partir de um arquivo CSV.
- O arquivo deve conter informações como:
    - Nome do sacado.
    - Valor.
    - ID do lote.
    - Linha digitável.

### 2. **Importação de Arquivos PDF**
- Endpoint para importar um arquivo PDF contendo boletos em várias páginas.
- O PDF é desmembrado em arquivos individuais, salvos localmente com base no ID do boleto.

### 3. **Listagem de Boletos**
- Endpoint para listar todos os boletos cadastrados.
- Suporte a filtros opcionais:
    - Nome do sacado.
    - Valor inicial e final.
    - ID do lote.

### 4. **Geração de Relatório em PDF**
- Endpoint para gerar um relatório em PDF com os boletos listados.
- O PDF é retornado em formato Base64.

### 5. **Documentação com Swagger**
- A API está documentada com Swagger, permitindo fácil acesso e teste dos endpoints.

---

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento.
- **Express.js**: Framework para criação de APIs.
- **Sequelize**: ORM para interação com o banco de dados.
- **MySQL**: Banco de dados utilizado.
- **Multer**: Middleware para upload de arquivos.
- **PDFKit**: Biblioteca para geração de PDFs.
- **Swagger**: Ferramenta para documentação da API.

---

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

1. **Node.js** (versão 14 ou superior).
2. **MySQL** (configurado e rodando).

---

## Configuração do Projeto

### 1. Instale as Dependências
Certifique-se de estar na pasta do projeto e execute:
```bash
npm install
```

### 2. Configure as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
DB_DIALECT=
```

---

## Endpoints Principais

### 1. **Importar CSV**
- **POST** `/document/import-csv`
- Envia um arquivo CSV contendo boletos para serem importados.

### 2. **Importar PDF**
- **POST** `/document/import-pdf`
- Envia um arquivo PDF contendo boletos em várias páginas. O PDF será desmembrado em arquivos individuais.

### 3. **Listar Boletos**
- **GET** `/boletos`
- Lista todos os boletos cadastrados.
- Filtros opcionais:
    - `nome`: Nome do sacado.
    - `valor_inicial`: Valor mínimo.
    - `valor_final`: Valor máximo.
    - `id_lote`: ID do lote.

### 4. **Gerar Relatório em PDF**
- **GET** `/boletos?relatorio=1`
- Retorna um relatório em PDF (Base64) com os boletos listados.

---

## Testando a API

### 1. **Postman**
- Use o Postman para testar os endpoints manualmente.
- Configure os parâmetros e envie arquivos para os endpoints de importação.

### 2. **Swagger**
- Acesse o Swagger para testar os endpoints diretamente na interface.