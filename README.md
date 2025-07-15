🧠 Clínica API – Backend
Este backend foi desenvolvido como parte de um projeto de extensão universitária com o propósito de oferecer uma solução prática, acessível e eficiente para a gestão de pacientes e sessões clínicas, com foco especial no acompanhamento terapêutico psicológico.
A API segue os princípios RESTful.

📲 Link do Frontend:
Você pode acessar o repositório do aplicativo mobile, desenvolvido com React Native, [aqui](https://github.com/reynaldo-hendson/clinic-app).

---

## 🚀 Funcionalidades

- 📋 **Cadastro de pacientes**
- 📆 **Agendamento de sessões**
- 📅 **Listagem de sessões por data ou paciente**
- ✏️ **Atualização e cancelamento de agendamentos**
- 🔍 **Validações de conflito de horário**
- 🧪 **Testes automatizados com Jest**
- 🐳 **Ambiente Docker e Docker Compose**

---

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/) Estrutura principal da aplicação
- [Express.js](https://expressjs.com/) Framework para criação das rotas e gerenciamento de requisições HTTP
- [SQLite3](https://www.sqlite.org/index.html) Banco de dados leve e integrado
- [Jest](https://jestjs.io/) Testes
- [Docker](https://www.docker.com/) Containerização da aplicação, facilitando seu deploy e funcionamento em diferentes ambientes de desenvolvimento

---

⚙️ Como rodar o projeto com Docker
1. Clonar o repositório

git clone https://github.com/reynaldo-hendson/GestaoSessaoAPI.git
cd GestaoSessaoAPI

2. Build e start com Docker Compose

docker-compose up --build

A aplicação ficará disponível em: http://localhost:3000

📮 Endpoints da API

🔐 Autenticação
| Método | Rota     | Descrição       |
|--------|----------|-----------------|
| POST   | `/login` | Realiza o login |

👤 Pacientes
| Método | Rota             | Descrição                   |
|--------|------------------|-----------------------------|
| POST   | `/patients`      | Criar paciente              |
| GET    | `/patients/:id`  | Buscar paciente por ID      |
| GET    | `/patients`      | Listar todos os pacientes   |
| PUT    | `/patients/:id`  | Atualizar dados do paciente |

📦 Payload (POST/PUT):
   ```json
    {
        "name": "João da Silva",
        "cpf": "12345678900",
        "birthdate": "1990-01-01",
        "email": "joao@email.com",
        "phone": "11999999999",
        "gender": "Masculino",
        "address": "Rua Exemplo, 123"
    }
   ```

📆 Agendamentos

| Método | Rota                            | Descrição                               |
| ------ | ------------------------------- | --------------------------------------- |
| POST   | `/appointments`                 | Criar agendamento                       |
| GET    | `/appointments?date=YYYY-MM-DD` | Listar agendamentos por data            |
| GET    | `/appointments/patient/:id`     | Listar agendamentos de um paciente      |
| PUT    | `/appointments/:id`             | Atualizar data e hora de um agendamento |
| DELETE | `/appointments/:id`             | Cancelar (remover) um agendamento       |

📦 Payload (POST):
   ```json
    { 
        "patient_id": 1,
        "date": "2025-06-20",
        "time": "10:00",
        "status_appointment": "agendado",
        "appointment_type": "sessao",
        "value_appointment": 150
    }
   ```
📦 Payload (PUT):
```json
    {
        "date": "2025-06-21",
        "time": "11:30"
    }
```

🚫 Regras de agendamento:

    Só é possível agendar um horário por vez, mesmo se for para pacientes diferentes.

    Não é permitido repetir a mesma hora e data em dois agendamentos.

    O método de update só altera data e hora.

## 🧪 Executando os testes

Para rodar os testes com Jest:

**Localmente:**
```bash
npm install
npm test
```
**Docker (com container ativo):**
```bash
docker exec -it gestao-sessao-api-app npm test
```

## 🗃️ Banco de Dados
Utiliza SQLite3 (arquivo local) para simplicidade e persistência.

📌 Regras de negócio

    ❌ Impede agendamentos duplicados no mesmo horário

    🕒 Atualização de sessões restringida a data e hora

    📧 Validação de dados obrigatórios para pacientes e sessões

    ✅ Suporte a autenticação via endpoint de login (simples)

🐳 Dockerfile (resumo)

FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]


📄 Licença
Este projeto está sob a licença MIT.

👩‍💻 Autor
Desenvolvido por Reynaldo Hendson 💚

