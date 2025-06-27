package br.edu.utfpr.apispring.controller;

import br.edu.utfpr.apispring.model.PessoaUser;
import br.edu.utfpr.apispring.service.PessoaUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Pessoa", description = "Endpoints para gerenciamento de pessoas")
@RestController
@RequestMapping("/pessoas")
public class PessoaController {

    @Autowired
    private PessoaUserService pessoaUserService;

    @Operation(summary = "Listar todas as pessoas", description = "Retorna uma lista de todas as pessoas cadastradas")
    @ApiResponse(responseCode = "200", description = "Lista de pessoas retornada com sucesso")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @GetMapping
    public List<PessoaUser> listar() {
        return pessoaUserService.listarTodos();
    }

    @Operation(summary = "Buscar pessoa por ID", description = "Retorna uma pessoa específica com base no ID fornecido")
    @ApiResponse(responseCode = "200", description = "Pessoa encontrada com sucesso")
    @ApiResponse(responseCode = "404", description = "Pessoa não encontrada")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @GetMapping("/{id}")
    public ResponseEntity<PessoaUser> buscarPorId(@PathVariable Long id) {
        return pessoaUserService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Criar nova pessoa", description = "Cria uma nova pessoa com os dados fornecidos")
    @ApiResponse(responseCode = "200", description = "Pessoa criada com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @PostMapping
    public PessoaUser criar(@RequestBody PessoaUser pessoaUser) {
        return pessoaUserService.salvar(pessoaUser);
    }

    @Operation(summary = "Atualizar pessoa", description = "Atualiza uma pessoa existente com os dados fornecidos")
    @ApiResponse(responseCode = "200", description = "Pessoa atualizada com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    @ApiResponse(responseCode = "404", description = "Pessoa não encontrada")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @PutMapping("/{id}")
    public ResponseEntity<PessoaUser> atualizar(@PathVariable Long id, @RequestBody PessoaUser pessoaUser) {
        PessoaUser atualizado = pessoaUserService.atualizar(id, pessoaUser);
        if (atualizado != null) {
            return ResponseEntity.ok(atualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Deletar pessoa", description = "Deleta uma pessoa com base no ID fornecido")
    @ApiResponse(responseCode = "204", description = "Pessoa deletada com sucesso")
    @ApiResponse(responseCode = "404", description = "Pessoa não encontrada")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        pessoaUserService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
