package br.edu.utfpr.apispring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.utfpr.apispring.model.Reservatorio;

public interface ReservatorioRepository extends JpaRepository<Reservatorio, Long> {

}
