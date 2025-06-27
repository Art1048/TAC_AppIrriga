package br.edu.utfpr.apispring.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Entity
@Data
public class Irrigador extends BaseEntity {

    public boolean ligado;

    @NotBlank(message = "A intensidade é obrigatória")
    @Pattern(
        regexp = "^(Fraco|Médio|Forte)$",
        message = "A intensidade deve ser 'Fraco', 'Médio' ou 'Forte'"
    )
    public String intensidade; // exemplo: "Fraco", "Médio", "Forte"

    public LocalDateTime dataHoraUltimaIrrigacao;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "reservatorio_id")
    //@NotNull(message = "O irrigador deve estar vinculado a um reservatório")
    public Reservatorio reservatorio;



}
