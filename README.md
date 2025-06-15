# 🧠 Clínica Psicológica - API RESTful

API RESTful desenvolvida com **Node.js**, **Express** e **SQLite3**, que permite gerenciar pacientes e agendamentos de sessões com uma psicóloga. A aplicação também é **containerizada com Docker** para facilitar o desenvolvimento e a execução em diferentes ambientes.

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

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [SQLite3](https://www.sqlite.org/index.html)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

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

