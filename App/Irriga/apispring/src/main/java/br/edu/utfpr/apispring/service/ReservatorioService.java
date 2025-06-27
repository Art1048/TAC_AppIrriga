package br.edu.utfpr.apispring.service;

import java.util.List;
import br.edu.utfpr.apispring.model.Reservatorio;

public interface ReservatorioService {
    Reservatorio save(Reservatorio reservatorio);
    Reservatorio update(Long id, Reservatorio reservatorio);
    void delete(Long id);
    Reservatorio findById(Long id);
    List<Reservatorio> findAll();
}
