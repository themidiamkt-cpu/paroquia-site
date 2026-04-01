export function formatDateOnly(value: string | null | undefined, locale: string = "pt-BR") {
    if (!value) {
        return "";
    }

    const datePart = value.split("T")[0];
    const [year, month, day] = datePart.split("-").map(Number);

    if (!year || !month || !day) {
        return datePart;
    }

    return new Intl.DateTimeFormat(locale, {
        timeZone: "UTC",
    }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function toDateInputValue(value: string | null | undefined) {
    return value ? value.split("T")[0] : "";
}

export function getTodayDateInputValue() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
