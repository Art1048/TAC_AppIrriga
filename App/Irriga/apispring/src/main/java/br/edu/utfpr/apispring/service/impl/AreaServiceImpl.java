package br.edu.utfpr.apispring.service.impl;

import br.edu.utfpr.apispring.model.Area;
import br.edu.utfpr.apispring.repository.AreaRepository;
import br.edu.utfpr.apispring.service.AreaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AreaServiceImpl implements AreaService {

    private final AreaRepository areaRepository;

    @Override
    public List<Area> listarTodos() {
        return areaRepository.findAll();
    }

    @Override
    public Area buscarPorId(Long id) {
        return areaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Área não encontrada com id: " + id));
    }

    @Override
    public Area salvar(Area area) {
        return areaRepository.save(area);
    }

    @Override
    public void deletar(Long id) {
        areaRepository.deleteById(id);
    }
}
