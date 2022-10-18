const path = require("node:path");
const sharp = require("sharp");
const file = process.argv[2];
const config = require("./config.json");

if(!file) {
    console.log("ファイルを指定してください");
} else {
    const filename = path.basename(file);
    const outputTo = config.output+filename;

    const startms = new Date();
    console.log(`${filename} を ${config.width},${config.height}px に変換します`);
    sharp(file).resize(config.width, config.height).toFile(outputTo);
    console.log(`${outputTo} を ${config.width},${config.height}px に変換しました(${(new Date() - startms).toFixed(2)}ms)`)
}
