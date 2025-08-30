import { S3Client, sql, SQL } from "bun";

let s3host = "http://localhost:9000";
let accessKeyId = "minioadmin";
let secretAccessKey = "minioadmin";

const pg = new SQL("postgres://postgres@localhost:5432/test")
const s3client = new S3Client({
	endpoint: s3host,
	bucket: "images",
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
});

Bun.serve({
	routes: {
		"/items": async req => {
			const items = await pg`SELECT * FROM items`;
			return Response.json({ items: items });
		},
		"/items/:id/image": async req => {
			let id = Number(req.params.id);
			console.log(id);
			const items = await pg`SELECT * FROM items WHERE id = ${id}`;
			if (items.length < 1) {
				return new Response("Item not found!", { status: 404 });
			}
			if (!items[0].image) {
				return new Response("Item has no image!", { status: 404 });
			}
			const s3file = s3client.file(items[0].image);
			const data = await s3file.arrayBuffer()
			return new Response(data, { headers: { "Content-Type": "image" } });
		}
	}
});
