package br.edu.utfpr.apispring.service;

import br.edu.utfpr.apispring.model.PessoaUser;

import java.util.List;
import java.util.Optional;

public interface PessoaUserService {
    PessoaUser salvar(PessoaUser pessoaUser);
    List<PessoaUser> listarTodos();
    Optional<PessoaUser> buscarPorId(Long id);
    PessoaUser atualizar(Long id, PessoaUser pessoaUser);
    void deletar(Long id);
}
