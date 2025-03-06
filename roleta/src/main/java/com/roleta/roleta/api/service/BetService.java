package com.roleta.roleta.api.service;

import com.roleta.roleta.api.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.roleta.roleta.api.repositories.*;


@Service
public class BetService {

    @Autowired
    private SaldoRepository saldoRepository;

    public Integer processBet(AtualizarSaldoDto atualizarSaldoDto) {
         return saldoRepository.atualizarSaldo(atualizarSaldoDto);
    }

    public Integer getSaldo() {
          return saldoRepository.getSaldo();
    }

     public Integer resetSaldo() {
          return saldoRepository.resetSaldo();
     }

}
