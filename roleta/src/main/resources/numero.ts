export class NumeroRoleta {
    ordem: number;
    valor: number;
    cor: string;

    constructor(ordem: number, valor: number, cor: string) {
        this.valor = valor;
        this.ordem = ordem;
        this.cor = cor;
    }


    static getNumerosRoleta(): NumeroRoleta[] {
        return [
            new NumeroRoleta(0, 10, "#FF0000"),
            new NumeroRoleta(1, 23, "#000000"),
            new NumeroRoleta(2, 8, "#FF0000"),
            new NumeroRoleta(3, 30, "#000000"),
            new NumeroRoleta(4, 11, "#FF0000"),
            new NumeroRoleta(5, 36, "#000000"),
            new NumeroRoleta(6, 13, "#FF0000"),
            new NumeroRoleta(7, 34, "#000000"),
            new NumeroRoleta(8, 6, "#FF0000"),
            new NumeroRoleta(9, 27, "#000000"),
            new NumeroRoleta(10, 17, "#FF0000"),
            new NumeroRoleta(11, 25, "#000000"),
            new NumeroRoleta(12, 2, "#FF0000"),
            new NumeroRoleta(13, 21, "#000000"),
            new NumeroRoleta(14, 4, "#FF0000"),
            new NumeroRoleta(15, 19, "#000000"),
            new NumeroRoleta(16, 16, "#FF0000"),
            new NumeroRoleta(17, 32, "#000000"),
            new NumeroRoleta(18, 0, "#00FF00"),
            new NumeroRoleta(19, 26, "#FF0000"),
            new NumeroRoleta(20, 3, "#000000"),
            new NumeroRoleta(21, 35, "#FF0000"),
            new NumeroRoleta(22, 12, "#000000"),
            new NumeroRoleta(23, 28, "#FF0000"),
            new NumeroRoleta(24, 7, "#000000"),
            new NumeroRoleta(25, 29, "#FF0000"),
            new NumeroRoleta(26, 18, "#000000"),
            new NumeroRoleta(27, 22, "#FF0000"),
            new NumeroRoleta(28, 9, "#000000"),
            new NumeroRoleta(29, 31, "#FF0000"),
            new NumeroRoleta(30, 14, "#000000"),
            new NumeroRoleta(31, 20, "#FF0000"),
            new NumeroRoleta(32, 1, "#000000"),
            new NumeroRoleta(33, 33, "#FF0000"),
            new NumeroRoleta(34, 15, "#000000"),
            new NumeroRoleta(35, 24, "#FF0000"), 
            new NumeroRoleta(36, 5, "#000000")
        ]
    }
}

export class AtualizarSaldoDto {
    valorAposta: number;
    numeroSelecionado: number;

    constructor(valorAposta: number, numeroSelecionado: number) {
        this.valorAposta = valorAposta;
        this.numeroSelecionado = numeroSelecionado;
    }
}