import Fastify from 'fastify';
const app = Fastify();
const PORT = process.env.PORT || 8080;
const AI_URL = process.env.AI_URL || 'http://ai:8000';

app.post('/ask', async (req, reply) => {
  const { query, mode } = req.body || {};
  if (!query) return reply.code(400).send({ error: 'query is required' });
  try {
    const res = await fetch(`${AI_URL}/answer`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ query, mode })
    });
    const data = await res.json();
    return { answer: data.answer, sources: data.sources || [] };
  } catch (e) {
    return reply.code(500).send({ error: 'AI service not reachable', detail: String(e) });
  }
});

app.get('/health', async (_req, _reply) => ({ ok: true }));
app.listen({ host:'0.0.0.0', port: PORT });
