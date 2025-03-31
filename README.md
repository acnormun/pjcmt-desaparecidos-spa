# 🕵️‍♀️ Desaparecidos MT — SPA | PSS 02/2025/SEPLAG (Analista de TI - Perfil Junior, Pleno e Sênior)

Por: Ana Clara Noronha (CPF: 044.***.***-40)

Aplicação Single Page Application desenvolvida como parte do desafio técnico da **Secretaria de Estado de Planejamento e Gestão de Mato Grosso (SEPLAG-MT)**.

A proposta é oferecer uma interface moderna e acessível para consulta e envio de informações sobre pessoas desaparecidas, utilizando dados da API pública da **Polícia Judiciária Civil de Mato Grosso**.

---

## 🎯 Objetivo

- Facilitar o acesso às informações de desaparecidos no estado do MT
- Possibilitar que cidadãos colaborem com investigações por meio do envio de dados e imagens
- Visualizar informações de maneira responsiva e georreferenciada

---

## 🧠 Arquitetura e princípios adotados

O projeto foi desenvolvido com base em boas práticas de engenharia de software, com foco em legibilidade, manutenibilidade e evolução contínua:

### 🧼 Clean Architecture

- Separação entre **camada de domínio**, **interface de dados** (API/adapters) e **camada de apresentação** (componentes Vue)
- Utilização de **adapters** para transformar os dados da API em estruturas internas reutilizáveis, desacoplando a aplicação da estrutura externa

### 🔁 Continuous Development

- **GitHub Actions** configurado para CI em todas as branches
- Build e lint verificados automaticamente em push
- Estrutura escalável e pronta para integração contínua (CI/CD)

---

## 🛠️ Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) — gerenciamento de estado
- [TailwindCSS](https://tailwindcss.com/) — estilização
- [Axios](https://axios-http.com/) — requisições HTTP
- [Leaflet.js](https://leafletjs.com/) — mapa georreferenciado
- [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/) — testes unitários

---

## ⚙️ Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pjcmt-desaparecidos-spa.git
cd pjcmt-desaparecidos-spa

# Instale as dependências
yarn

# Rode o servidor de desenvolvimento
yarn dev
