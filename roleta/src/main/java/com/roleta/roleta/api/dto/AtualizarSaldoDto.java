package com.roleta.roleta.api.dto;


public record AtualizarSaldoDto(

        Integer valor,
        Boolean vitoria

) {
        public Integer getValor() {
                return valor;
        }

        public Boolean getVitoria() {
                return vitoria;
        }
}
