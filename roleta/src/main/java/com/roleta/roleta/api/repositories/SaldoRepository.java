package com.roleta.roleta.api.repositories;

import org.springframework.stereotype.Repository;

@Repository
public class SaldoRepository {

    Integer saldo = 1000;

    public Integer atualizarSaldo(Integer valorAposta, Boolean vitoria) {
        if (vitoria) {
            saldo += valorAposta;
        } else  {
            saldo -= valorAposta;
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
