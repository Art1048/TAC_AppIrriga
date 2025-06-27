package br.edu.utfpr.apispring.service;

import java.util.List;

import br.edu.utfpr.apispring.model.Irrigador;

public interface IrrigadorService {
    List<Irrigador> listarTodos();
    Irrigador buscarPorId(Long id);
    Irrigador salvar(Irrigador irrigador);
    Irrigador atualizar(long id, Irrigador irrigador);
    boolean deletar(Long id);
}
