const config = {
    app: {
        port: process.env.PORT || 3000,

    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb+srv://BackEnd2:<Backend2>@cluster0.4zavj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    }
};
module.exports = config;