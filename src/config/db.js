const mongooes = require("mongoose");
const config = require("./env.config");

module.exports = {
  connectDb: async () => {
    try {
      await mongooes.connect(config.MONGODB_URL);
      console.log(`Database connected !!`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  },
};
