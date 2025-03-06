package com.roleta.roleta.api.repositories;

import com.roleta.roleta.api.dto.*;

import org.springframework.stereotype.Repository;

@Repository
public class SaldoRepository {

    Integer saldo = 1000;

    public Integer atualizarSaldo(AtualizarSaldoDto atualizarSaldoDto) {
        if (atualizarSaldoDto.getVitoria()){
            saldo += atualizarSaldoDto.getValor();
        } else  {
            saldo -= atualizarSaldoDto.getValor();
        }
        
        return getSaldo();
    }

    public Integer getSaldo() {
        return saldo;
    }

    public Integer resetSaldo() {
        return saldo = 1000;
    }
}
