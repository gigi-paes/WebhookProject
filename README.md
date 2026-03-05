# Integração RD Station & Waboosty 🚀

Este projeto é uma API intermediária desenvolvida em Node.js (Express) para conectar o RD Station Marketing e a plataforma Waboosty. 

[cite_start]O objetivo é estruturar duas integrações bidirecionais[cite: 4, 5]:
1. [cite_start]**Ida (RD Station -> Waboosty):** Capturar dados de um lead recém-convertido no RD Station e enviá-los para a Waboosty.
2. [cite_start]**Volta (Waboosty -> RD Station):** Receber a atualização de status desse lead na Waboosty e atualizar o seu cadastro original no RD Station[cite: 5].

---

## 🛠️ Tecnologias Utilizadas
* **Node.js** com **Express** (Criação do servidor web e rotas)
* **Axios** (Consumo das APIs externas)
* **Dotenv** (Gerenciamento seguro de variáveis de ambiente e credenciais)

---

## 📁 Estrutura do Projeto
A arquitetura foi baseada no Princípio de Responsabilidade Única (MVC simplificado):
```text
WABOOSTPROJECT/
├── src/
│   ├── controllers/
│   │   ├── rdController.js       # Regra de negócio: RD -> Waboosty
│   │   └── waboostyController.js # Regra de negócio: Waboosty -> RD
│   ├── routes/
│   │   └── webhookRoutes.js      # Mapeamento dos endpoints (/webhook/...)
│   └── index.js                  # Ponto de entrada e configuração do servidor
├── .env                          # Variáveis de ambiente (NÃO versionado)
├── package.json
└── README.md
```

---

## ⚙️ Pré-requisitos e Instalação
1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.
2. Clone este repositório:
   ```bash
   git clone [https://github.com/gigi-paes/WebhookProject.git](https://github.com/gigi-paes/WebhookProject.git)
   ```
3. Acesse a pasta do projeto e instale as dependências:
   * cd WABOOSTPROJECT
   * npm install

---

## 📡 Endpoints (Rotas)
1. POST /webhook/rd-station
Função: Recebe o Webhook do RD Station, formata o payload validando a integridade dos dados, adiciona o DDI ao telefone e envia via POST para a Waboosty.

2. POST /webhook/waboosty
Função: Recebe o Webhook de atualização da Waboosty e faz uma requisição PATCH autenticada para o RD Station, atualizando o campo personalizado do lead correspondente.
