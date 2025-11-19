export default async function (fastify, opts) {
    fastify.get("/", async () => {
      return { message: "Fastify backend running!" };
    });
  }