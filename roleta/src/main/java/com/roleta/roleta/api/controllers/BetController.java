package com.roleta.roleta.api.controllers;

import com.roleta.roleta.api.dto.*;
import com.roleta.roleta.api.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/bets")
public class BetController {

    @Autowired
    private BetService betService;

    @PostMapping
    public ResponseEntity<Integer> processBet(@RequestBody AtualizarSaldoDto saldoDto) {
        return new ResponseEntity<>(betService.processBet(saldoDto), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Integer> getSaldo() {
        return new ResponseEntity<>(betService.getSaldo(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/reset")
    public ResponseEntity<Integer> resetSaldo() {
        return new ResponseEntity<>(betService.resetSaldo(), HttpStatus.OK);
    }
    
}