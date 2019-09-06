const server = require("./server");

const port = 5555;
server.listen(port, () => console.log(`server is running on ${port}`));
