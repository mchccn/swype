export const formatMacroCase = (s: string) =>
    s
        .split("_")
        .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
