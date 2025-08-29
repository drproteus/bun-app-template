const BASE_PATH = "./dist";
const PORT = 3000;

console.log(`Starting development server: http://localhost:${PORT}`);
Bun.serve({
  port: PORT,
  routes: {
    "/api/version": Response.json("v1")
  },
  async fetch(req) {
    let path = new URL(req.url).pathname;
    console.log(`${req.method} ${path}`)
    if (path === "/") {
      path = "/index.html";
    }
    const file = Bun.file(`${BASE_PATH}${path}`);
    return new Response(file);
  },
  error(e) {
    return new Response(e, { status: 404 });
  },
});
