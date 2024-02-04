# desafio-saude-id

Desafio técnico desenvolvido para a Saúde iD em 01/02/2023.

## Descrição

O projeto inclui um API gateway e quatro microsserviços. Três desses microsserviços se comunicam diretamente com o gateway (ms-users, ms-products e ms-orders), enquanto o quarto, ms-stock-manager, é responsável por controlar o estoque dos produtos a partir do recebimento de novas ordens. Todos os serviços se comunicam entre si através de filas de mensagens implementadas usando RabbitMQ. Seguindo o padrão da arquitetura, cada microsserviço possui seu próprio banco de dados. Os três serviços principais utilizam o banco de dados PostgreSQL, enquanto o serviço auxiliar mantém todas as informações em uma instância do Redis. Todos os serviços estão separados em contêineres.

## Se eu fosse continuar esse projeto...

Eu consideraria melhorar os seguintes aspectos:

- Testes de integração entre os serviços;
- Tratamento de exceções e mensagens de erro mais amigáveis;
- Validação de dados mais robusta, tanto na entrada quanto no armazenamento (utilizando constraints do SQL);
- Persistência de dados do Redis.

## Executando a aplicação com o Docker Compose

Após clonar o projeto, execute o seguinte comando:

```bash
$ sudo docker-compose up
```

> Se preferir executar a aplicação em segundo plano, utilize a flag **-d**.

Com isso, a aplicação estará disponível em **http://localhost:3000/api/v1**.

## Documentação 📖

Com a aplicação rodando, a documentação pode ser acessada em **http://localhost:3000/swagger-ui**.

## Tecnologias 🚀

- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [NestJS](https://nestjs.com)
- [TypeORM](https://typeorm.io)
- [RabbitMQ](https://www.rabbitmq.com)
- [PostgreSQL](https://www.postgresql.org)
- [Redis](https://redis.io)
- [Docker](https://www.docker.com)
- [Swagger](https://swagger.io)
