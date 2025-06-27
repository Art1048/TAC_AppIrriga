package br.edu.utfpr.apispring.service;

import br.edu.utfpr.apispring.model.Area;

import java.util.List;

public interface AreaService {
    List<Area> listarTodos();
    Area buscarPorId(Long id);
    Area salvar(Area area);
    void deletar(Long id);
}