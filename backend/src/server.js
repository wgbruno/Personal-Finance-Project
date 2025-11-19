import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyPostgres from "@fastify/postgres";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify({ logger: true });

app.register(fastifyCors, { origin: "*" });

app.register(fastifyPostgres, {
  connectionString: `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
});

// GET all entries
app.get("/api/entries", async (request, reply) => {
  const client = await app.pg.connect();
  const { rows } = await client.query("SELECT * FROM transactions ORDER BY id DESC");
  client.release();
  return rows;
});

// POST a new entry
app.post("/api/entries", async (request, reply) => {
  const { label, amount, type } = request.body;
  const client = await app.pg.connect();
  const { rows } = await client.query(
    "INSERT INTO transactions (label, amount, type) VALUES ($1, $2, $3) RETURNING *",
    [label, amount, type]
  );
  client.release();
  return rows[0];
});

// Start server
app.listen({ port: 3001 }, (err, address) => {
  if (err) throw err;
  console.log(`Server running at ${address}`);
});
