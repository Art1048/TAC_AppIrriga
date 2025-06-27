package br.edu.utfpr.apispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.utfpr.apispring.model.Area;

public interface AreaRepository extends JpaRepository<Area, Long> {
    
}

