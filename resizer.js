const path = require("node:path");
const fs = require("node:fs");
const sharp = require("sharp");
const file = process.argv[2];
const config = require("./config.json");

if(!file) {
    console.log("ファイル、またはフォルダを指定してください");
} else {
    if(fs.statSync(file).isDirectory()) {
        fs.readdirSync(file).filter(i => {
            return i.endsWith(".png") === true;
        }).forEach(filename => {
            conversion(file+"\\"+filename);
        });
    } else {
        conversion(path.basename(file));
    }
}

function conversion(filepath) {
    const filename = path.basename(filepath);
    const outputTo = config.output+filename;

    const startms = new Date();
    console.log(`${filename} を ${config.width},${config.height}px に変換します`);
    sharp(filepath).resize(config.width, config.height).toFile(outputTo).then(response => {
        console.log(`${outputTo} を ${config.width},${config.height}px に変換しました(${(new Date() - startms).toFixed(2)}ms)`);
    }).catch(error => {
        console.log(`${path.basename(filename)} の変換に失敗しました: ${error}`);
    });
}