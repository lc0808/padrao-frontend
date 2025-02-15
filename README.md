# E-commerce de Vestuário

Este projeto é um desafio para implementar um e-commerce de vestuário utilizando a API disponibilizada pelos organizadores do desafio. O objetivo é criar uma plataforma onde os usuários possam visualizar produtos, filtrá-los por categoria, adicionar/remover itens do carrinho e navegar entre as páginas de produtos de forma paginada.

## 🚀 Tecnologias Utilizadas

- **Next.js** (React)
- **TypeScript**
- **Tailwind CSS**
- **Heroicons e Lucide-react** (para ícones)
- **Context API** para gerenciamento de estado do carrinho, search e produtos
- **LocalStorage** para persistência do carrinho
- **Playwright** para testes end-to-end (E2E)

## 📦 Funcionalidades

- ✅ Listagem de produtos com paginação (realizada no frontend)
- ✅ Filtragem por categorias fixas (Camisetas, Calças, Tênis)
- ✅ Busca de produtos por nome, com gerenciamento de estado usando Context API
- ✅ Página de detalhes do produto
- ✅ Adicionar e remover produtos do carrinho
- ✅ Exibição dinâmica do número de itens no carrinho
- ✅ Interface responsiva e acessível
- ✅ Testes end-to-end (E2E) para validação automatizada

## 🛠 Como rodar o projeto

1. **Clone o repositório**

```sh
git clone https://github.com/lc0808/projeto-frontend.git
```

2. **Instale as dependências**

```sh
yarn install
```

3. **Inicie o servidor de desenvolvimento**

```sh
yarn dev
```

4. **Acesse a aplicação** Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🧪 Testes End-to-End (E2E)

O projeto inclui testes automatizados utilizando **Playwright** para garantir a qualidade da aplicação.

### 🔍 Como executar os testes

Para rodar os testes E2E, utilize o seguinte comando:

```sh
yarn test:e2e
```

Isso garantirá que todas as funcionalidades críticas sejam testadas automaticamente.

## 🔗 API

A aplicação consome a API JSON Server disponibilizada pelos organizadores do desafio, sem necessidade de rodar um backend local.

## 📌 Diferenciais Implementados

- Estruturação modular e componentização eficiente.
- Gerenciamento de estado do carrinho, search e produtos com Context API e LocalStorage.
- Interface responsiva e acessível para diferentes dispositivos.
- Testes automatizados com Playwright para validação da aplicação.
- Histórico de commits seguindo o padrão **Conventional Commits**.

## 📝 Licença

Este projeto é apenas para fins de aprendizado e não possui uma licença específica.

---

Caso tenha dúvidas ou sugestões, fique à vontade para contribuir! 😊
