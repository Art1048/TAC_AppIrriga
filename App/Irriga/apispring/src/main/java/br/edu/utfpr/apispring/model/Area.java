package br.edu.utfpr.apispring.model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Entity
@Data
public class Area extends BaseEntity {

    @NotBlank(message = "O nome é obrigatório")
    public String nome;

    @Positive(message = "O tamanho da área deve ser positivo")
    public Double tamanhoEmHectares;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "reservatorio_id")
    //@NotNull(message = "A área deve estar vinculada a um reservatório")
    public Reservatorio reservatorio;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    //@NotNull(message = "A área deve estar vinculada a um usuário")
    public PessoaUser user;
}