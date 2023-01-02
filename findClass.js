function findClassandValue(data) {
    const regex = /class="([^"]+)"/gm;

    // Alternative syntax using RegExp constructor
    // const regex = new RegExp('class="([^"]+)"', 'gm')

    let m;
    let class_arr = new Set()
    while ((m = regex.exec(data)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
            if(groupIndex == 1) {
                let final_match = match.trim().split(/\s+/)
                console.log(final_match)
                if(final_match.length > 1) {
                    final_match.forEach(item => class_arr.add(item))
                }
                else {
                    class_arr.add(match)
                }
            }
        });
    }
    return class_arr
}

module.exports = findClassandValue