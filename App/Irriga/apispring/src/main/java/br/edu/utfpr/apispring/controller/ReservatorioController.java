package br.edu.utfpr.apispring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.edu.utfpr.apispring.model.Reservatorio;
import br.edu.utfpr.apispring.service.ReservatorioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Reservatório", description = "Endpoints para gerenciamento de reservatórios")	
@RestController
@RequestMapping("/reservatorios")
@CrossOrigin(origins = "*")
public class ReservatorioController {

    @Autowired
    private ReservatorioService service;

    @Operation(summary = "Listar todos os reservatórios", description = "Retorna uma lista de todos os reservatórios cadastrados")
    @ApiResponse(responseCode = "200", description = "Lista de reservatórios retornada com sucesso")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @PostMapping
    public ResponseEntity<Reservatorio> save(@RequestBody @Valid Reservatorio reservatorio) {
        return ResponseEntity.ok(service.save(reservatorio));
    }

    @Operation(summary = "Atualizar reservatório", description = "Atualiza um reservatório existente com os dados fornecidos")
    @ApiResponse(responseCode = "200", description = "Reservatório atualizado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @PutMapping("/{id}")
    public ResponseEntity<Reservatorio> update(@PathVariable Long id, @RequestBody Reservatorio reservatorio) {
        return ResponseEntity.ok(service.update(id, reservatorio));
    }

    @Operation(summary = "Deletar reservatório", description = "Remove um reservatório existente com base no ID fornecido")
    @ApiResponse(responseCode = "204", description = "Reservatório removido com sucesso")
    @ApiResponse(responseCode = "404", description = "Reservatório não encontrado")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Buscar reservatório por ID", description = "Retorna um reservatório específico com base no ID fornecido")
    @ApiResponse(responseCode = "200", description = "Reservatório encontrado com sucesso")
    @ApiResponse(responseCode = "404", description = "Reservatório não encontrado")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @GetMapping("/{id}")
    public ResponseEntity<Reservatorio> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @Operation(summary = "Listar todos os reservatórios", description = "Retorna uma lista de todos os reservatórios cadastrados")
    @ApiResponse(responseCode = "200", description = "Lista de reservatórios retornada com sucesso")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @GetMapping
    public ResponseEntity<List<Reservatorio>> getAll() {
        System.out.println("Fetching all reservatorios");
        return ResponseEntity.ok(service.findAll());
    }
}
