# desafio-saude-id

Desafio técnico desenvolvido para a Saúde iD.

## Descrição

O projeto consiste em um API gateway e mais 4 microsserviços, sendo que 3 se comunicam diretamente com o gateway (*ms-users*, *ms-products* e *ms-orders*), enquanto o quarto é responsável por controlar o estoque dos produtos a partir do recebimento de novas ordens (*ms-stock-manager*). Todos os serviços se comunicam entre si por meio de filas implementadas no RabbitMQ. Seguindo o padrão da arquitetura, cada microsserviço possui o seu próprio banco de dados. Os 3 serviços principais utilizam o banco de dados PostgreSQL, enquanto o auxiliar mantém todas as informações em uma instância do Redis. Todos os serviços estão separados em contêineres.

## Se eu fosse continuar esse projeto...

Alguns pontos que eu buscaria melhorar:
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

## Documentação

Com a aplicação rodando, a documentação pode ser acessada em **http://localhost:3000/api**.

## Tecnologias 🚀

- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
