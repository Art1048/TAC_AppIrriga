package br.edu.utfpr.apispring.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.utfpr.apispring.model.Irrigador;
import br.edu.utfpr.apispring.repository.IrrigadorRepository;
import br.edu.utfpr.apispring.service.IrrigadorService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IrrigadorServiceImpl implements IrrigadorService {

    @Autowired
    private final IrrigadorRepository irrigadorRepository;

    @Override
    public List<Irrigador> listarTodos() {
        return irrigadorRepository.findAll();
    }

    @Override
    public Irrigador buscarPorId(Long id) {
        return irrigadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Irrigador não encontrado com id: " + id));
    }

    @Override
    public Irrigador salvar(Irrigador irrigador) {
        return irrigadorRepository.save(irrigador);
    }

    @Override
    public boolean deletar(Long id) {
        if (irrigadorRepository.existsById(id)) {
            irrigadorRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Irrigador atualizar(long id, Irrigador irrigador) {
        if (irrigadorRepository.existsById(id)) {
            irrigador.setId(id);
            return irrigadorRepository.save(irrigador);
        } else {
            throw new RuntimeException("Irrigador não encontrado com id: " + id);
        }
    }

}
