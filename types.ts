export type Ponto = {
    id: number;
    tipo: string;
    datahora: Date;
};

export interface iModalProps {
    lstPonto: Ponto[];
}

export interface iConfig {
    horarioEntradaPadrao: Date;
    horarioSaidaPadrao: Date;
}