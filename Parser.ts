function PrepareURLForRegExp(url: string): string {
    const ReplacerObject = {
        ".": "\\.",
        "*": ".*",
        "?": "\\?",
        "=": "\\=",
        "+": "\\+"
    }
    const ReplacerPattern = new RegExp("\\" + Object.keys(ReplacerObject).join("|\\"), "gi");
    return url.replace(ReplacerPattern, matched => ReplacerObject[matched]);
}

function checkUrlValidity(urlCheck: string, currentHref: string): boolean {
    var urlCheckRE = new RegExp(PrepareURLForRegExp(urlCheck));
    return urlCheckRE.test(currentHref);
}

function ParseCSSForUserStyleDetails(CSS: string): string[][] {
    let options = [];
    CSS.split(/\=\=\/?UserStyle\=\=/g)[1].split(/\r?\n/g).forEach(val => {
        if (val == "")
            return;
        let option = val.trim().split(/\s{2,}/);
        options.push(option);
    });
    return options;
}
