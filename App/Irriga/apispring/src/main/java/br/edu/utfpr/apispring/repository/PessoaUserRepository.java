package br.edu.utfpr.apispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.utfpr.apispring.model.PessoaUser;

public interface PessoaUserRepository extends JpaRepository<PessoaUser, Long> {
    // Custom query methods can be defined here if needed
    // For example, you can add methods to find users by email or other criteria

}
