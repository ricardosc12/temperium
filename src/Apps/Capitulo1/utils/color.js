export function createBackgroundColor(cor, fator=0.85){

    var hex = cor.replace("#", "");
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    var corClaraR = Math.round(r + (255 - r) * fator);
    var corClaraG = Math.round(g + (255 - g) * fator);
    var corClaraB = Math.round(b + (255 - b) * fator);

    return "#" + ((1 << 24) | (corClaraR << 16) | (corClaraG << 8) | corClaraB).toString(16).slice(1);
}

export function createDarkBackgroundColor(cor, fator=0.4){

    var hex = cor.replace("#", "");
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    var corClaraR = Math.round(r * fator);
    var corClaraG = Math.round(g * fator);
    var corClaraB = Math.round(b * fator);

    return "#" + ((1 << 24) | (corClaraR << 16) | (corClaraG << 8) | corClaraB).toString(16).slice(1);
}