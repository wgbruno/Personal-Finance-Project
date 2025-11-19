export default async function (fastify, opts) {
  // GET all transactions
  fastify.get('/transactions', async (request, reply) => {
    const { rows } = await fastify.pg.query('SELECT * FROM transactions ORDER BY date DESC');
    return rows;
  });

  // POST a new transaction
  fastify.post('/transactions', async (request, reply) => {
    const { amount, type, description } = request.body;
    const { rows } = await fastify.pg.query(
      'INSERT INTO transactions (amount, type, description) VALUES ($1, $2, $3) RETURNING *',
      [amount, type, description]
    );
    return rows[0];
  });
}