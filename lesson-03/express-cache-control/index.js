import express from "express";
import path from "path";
// Uncomment to use GZIP compression for all responses
// import compression from "compression";

const app = express();

// Uncomment to use GZIP compression for all responses
// app.use(compression());

app.get("/", (req, res) => {
	res.sendFile(path.resolve("./pages/index.html"), {
		cacheControl: false,
		headers: {
			"Cache-Control": "no-store",
		},
	});
});

app.get("/about", (req, res) => {
	res.sendFile(path.resolve("./pages/about.html"), {
		cacheControl: false,
		headers: {
			"Cache-Control": "no-store",
		},
	});
});

app.get("/style.css", (req, res) => {
	res.sendFile(path.resolve("./assets/style.css"), {
		cacheControl: false,
		headers: {
			"Cache-Control": "no-store",
		},
	});
});

const listener = app.listen("3000", () => {
	console.log("Running on http://localhost:" + listener.address().port);
});
