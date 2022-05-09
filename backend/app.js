const { server } = require("./server");
const PORT = 443 ;

server.listen(PORT, () => console.log(`HTTPS running at port ${PORT}`));
