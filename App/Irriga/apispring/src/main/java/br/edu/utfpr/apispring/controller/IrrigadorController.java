package br.edu.utfpr.apispring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.utfpr.apispring.model.Irrigador;
import br.edu.utfpr.apispring.service.IrrigadorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Irrigador", description = "Endpoints para gerenciamento de irrigadores")
@RestController
@RequestMapping("/irrigadorres")
public class IrrigadorController {

    @Autowired
    private IrrigadorService irrigadorService;

    @Operation(summary = "Listar todos os irrigadores", description = "Retorna uma lista de todos os irrigadores cadastrados")
    @ApiResponse(responseCode = "200", description = "Lista de irrigadores retornada com sucesso")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @GetMapping
    public ResponseEntity<List<Irrigador>> getAllIrrigadores() {
        List<Irrigador> irrigadores = irrigadorService.listarTodos();
        return ResponseEntity.ok(irrigadores);
    }

    @Operation(summary = "Criar novo irrigador", description = "Cria um novo irrigador com os dados fornecidos")
    @ApiResponse(responseCode = "200", description = "Irrigador criado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @PostMapping
    public ResponseEntity<Irrigador> createIrrigador(@RequestBody @Valid Irrigador irrigador) {
        Irrigador createdIrrigador = irrigadorService.salvar(irrigador);
        return ResponseEntity.ok(createdIrrigador);
    }

    @Operation(summary = "Buscar irrigador por ID", description = "Retorna um irrigador específico com base no ID fornecido")
    @ApiResponse(responseCode = "200", description = "Irrigador encontrado com sucesso")
    @ApiResponse(responseCode = "404", description = "Irrigador não encontrado")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @GetMapping("/{id}")
    public ResponseEntity<Irrigador> getIrrigadorById(@PathVariable Long id) {
        try {
            Irrigador irrigador = irrigadorService.buscarPorId(id);
            return ResponseEntity.ok(irrigador);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @Operation(summary = "Atualizar irrigador", description = "Atualiza um irrigador existente com os dados fornecidos")
    @ApiResponse(responseCode = "200", description = "Irrigador atualizado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    @ApiResponse(responseCode = "404", description = "Irrigador não encontrado")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @PutMapping("/{id}")
    public ResponseEntity<Irrigador> updateIrrigador(@PathVariable Long id, @RequestBody Irrigador irrigador) {
        try {
            Irrigador updatedIrrigador = irrigadorService.atualizar(id, irrigador);
            return ResponseEntity.ok(updatedIrrigador);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Deletar irrigador", description = "Remove um irrigador existente com base no ID fornecido")
    @ApiResponse(responseCode = "204", description = "Irrigador removido com sucesso")
    @ApiResponse(responseCode = "404", description = "Irrigador não encontrado")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIrrigador(@PathVariable Long id) {
        if (irrigadorService.deletar(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    // Implementar os métodos do controlador aqui, utilizando o irrigadorService para as operações necessárias.




}
