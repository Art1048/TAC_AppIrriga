package br.edu.utfpr.apispring.model;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class PessoaUser extends BaseEntity{

    @NotBlank(message = "O nome é obrigatório")
    @NotNull(message = "O nome não pode ser nulo")
    public String nome;

    @NotNull(message = "O e-mail não pode ser nulo")
    @Email(message = "O e-mail deve ser válido")
    @NotBlank(message = "O e-mail é obrigatório")
    public String email;

    @NotNull(message = "A senha não pode ser nula")
    @NotBlank(message = "A senha é obrigatória")
    @Size(min = 8, max = 20, message = "A senha deve ter entre 8 e 20 caracteres")
    public String senha;
}
