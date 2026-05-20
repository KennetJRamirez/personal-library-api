import app from "./app.js";

const PORT = process.env.PORT;

const startServer = async () => {
	try {
		app.listen(PORT, () => {
			console.info(`Server is running on port ${PORT} `);
		});
	} catch (error) {
		console.error(`Error starting the server ${error}`);
	}
};

startServer();
