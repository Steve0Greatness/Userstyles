/**
 * Generates 32 random hexadecimal digits, then adds `files-` to the start.
 * @example `GenerateCSSLocation() // file-6bc45bc49a95336be144bbce68cedd3c`
 * @returns string
 */
function GenerateCSSLocation(): string {
    let randomDigits = Array.from(
        { length: 32 },
        _ => Math.floor(Math.random() * 15).toString(16)
    ).join("");
    return "file-" + randomDigits;
}

/**
 * Changes characters in preparation for `CheckURLValidity`
 * @returns string
 */
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

/**
 * Checks the current URL against a pre-defined one--can use wildcards(`*`).
 * @returns boolean
 */
function CheckUrlValidity(urlCheck: string, currentHref: string): boolean {
    var urlCheckRE = new RegExp(PrepareURLForRegExp(urlCheck));
    return urlCheckRE.test(currentHref);
}

/**
 * Gets the User-Style details from a userstyle file(`.user.css`), and returns it as a map of options.
 * @returns Map<string, string>
 */
function ParseCSSForUserStyleDetails(CSS: string): Map<string, string> {
    let options: Map<string, string> = new Map();
    CSS.split(/\=\=\/?UserStyle\=\=/g)[1].split(/\r?\n/g).forEach(val => {
        if (val == "")
            return;
        let option = val.trim().split(/\s{2,}/);
        options.set(option[0], option[1]);
    });
    return options;
}
