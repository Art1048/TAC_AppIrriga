package br.edu.utfpr.apispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.utfpr.apispring.model.Irrigador;

public interface IrrigadorRepository extends JpaRepository<Irrigador, Long> {

    
}