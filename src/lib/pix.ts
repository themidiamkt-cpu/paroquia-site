export type PixKey = {
    type: "E-mail" | "CNPJ";
    key: string;
    icon: "mail" | "building";
};

export const pixKeys: PixKey[] = [
    {
        type: "E-mail",
        key: "saopiox@arquidiocesecampinas.com",
        icon: "mail",
    },
    {
        type: "CNPJ",
        key: "44588960/0014-04",
        icon: "building",
    },
];
