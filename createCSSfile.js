const fs = require('fs')
const path = require('path')
let common_file_name = "ext-styles.css"
function createCSS(dir_path, class_arr) {
    let final_path = path.join(dir_path,'/',common_file_name)
    console.log(final_path)
    try {
        class_arr.forEach(item => {
            let dummy_text = `.${item} { }\n`

            fs.appendFileSync(final_path,dummy_text)
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports = createCSS