package br.edu.utfpr.apispring.service.impl;

import br.edu.utfpr.apispring.model.PessoaUser;
import br.edu.utfpr.apispring.repository.PessoaUserRepository;
import br.edu.utfpr.apispring.service.PessoaUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaUserServiceImpl implements PessoaUserService {

    @Autowired
    private PessoaUserRepository pessoaUserRepository;

    @Override
    public PessoaUser salvar(PessoaUser pessoaUser) {
        return pessoaUserRepository.save(pessoaUser);
    }

    @Override
    public List<PessoaUser> listarTodos() {
        return pessoaUserRepository.findAll();
    }

    @Override
    public Optional<PessoaUser> buscarPorId(Long id) {
        return pessoaUserRepository.findById(id);
    }

    @Override
    public PessoaUser atualizar(Long id, PessoaUser pessoaUser) {
        if (pessoaUserRepository.existsById(id)) {
            pessoaUser.setId(id);
            return pessoaUserRepository.save(pessoaUser);
        }
        return null;
    }

    @Override
    public void deletar(Long id) {
        pessoaUserRepository.deleteById(id);
    }
}
