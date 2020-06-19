const path = require('path');
const fs = require('fs');

const file = path.resolve(__dirname, 'assets', 'scripts','bundle.js');

fs.readFile(file, "utf-8", (err, data) => {

    fs.writeFile(file, '---\n---\n'+ data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });

});