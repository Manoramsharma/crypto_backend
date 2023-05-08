const pino = require("pino");
module.exports = pino({
  name: "warrantyNFT",
  level: "debug",
  prettyPrint: {
    colorize: true, // colorizes the log
    levelFirst: true,
    translateTime: "yyyy-dd-mm, h:MM:ss TT",
  },
});
