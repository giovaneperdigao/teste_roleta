package com.roleta.roleta.api.service;

import com.roleta.roleta.api.dto.*;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.roleta.roleta.api.repositories.*;


@Service
public class BetService {

    @Autowired
    private SaldoRepository saldoRepository;

    public Integer processBet(AtualizarSaldoDto atualizarSaldoDto) {
         Integer numeroSorteado = sortearNumero();

         saldoRepository.atualizarSaldo(
               atualizarSaldoDto.getValorAposta(),
               (numeroSorteado == atualizarSaldoDto.getNumeroSelecionado())
         );
         return numeroSorteado;
    }

    public Integer sortearNumero() {
       Random rand = new Random();
       return rand.nextInt(37);
    }

    public Integer getSaldo() {
          return saldoRepository.getSaldo();
    }

     public Integer resetSaldo() {
          return saldoRepository.resetSaldo();
     }

}
