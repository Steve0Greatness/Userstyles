var testCSS = `/*
==UserStyle==
@name   Hey Mom!
==/UserStyle==
*/`;

function ParseCSSForUserStyleDetails(CSS: string): string[][] {
    let options = []
    CSS.split(/\=\=\/?UserStyle\=\=/g)[1].split(/\r?\n/g).forEach(val => {
        if (val == "")
            return;
        let option = val.trim().split(/\s{2,}/);
        options.push(option)
    })
    return options;
}

console.log(ParseCSSForUserStyleDetails(testCSS))