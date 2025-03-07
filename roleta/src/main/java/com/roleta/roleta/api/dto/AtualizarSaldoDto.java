package com.roleta.roleta.api.dto;


public record AtualizarSaldoDto(
        Integer valorAposta,
        Integer numeroSelecionado
) {
        public Integer getValorAposta() {
                return valorAposta;
        }

        public Integer getNumeroSelecionado() {
                return numeroSelecionado;
        }
}
