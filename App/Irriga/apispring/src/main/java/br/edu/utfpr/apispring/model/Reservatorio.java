package br.edu.utfpr.apispring.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Entity
@Data
public class Reservatorio extends BaseEntity {

    @Min(value = 1, message = "A quantidade de água deve ser no mínimo 1 litro")
    public long quantidadeAguaLitros;
    
    @OneToMany(mappedBy = "reservatorio", fetch = FetchType.EAGER)
    public List<Irrigador> irrigadores;
}
