package br.edu.utfpr.apispring.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.utfpr.apispring.model.Reservatorio;
import br.edu.utfpr.apispring.repository.ReservatorioRepository;
import br.edu.utfpr.apispring.service.ReservatorioService;

@Service
public class ReservatorioServiceImpl implements ReservatorioService {

    @Autowired
    private ReservatorioRepository repository;

    @Override
    public Reservatorio save(Reservatorio reservatorio) {
        return repository.save(reservatorio);
    }

    @Override
    public Reservatorio update(Long id, Reservatorio reservatorio) {
        Optional<Reservatorio> existing = repository.findById(id);
        if (existing.isPresent()) {
            reservatorio.setId(id);
            return repository.save(reservatorio);
        }
        throw new RuntimeException("Reservatório não encontrado");
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Reservatorio findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservatório não encontrado"));
    }

    @Override
    public List<Reservatorio> findAll() {
        return repository.findAll();
    }
}
