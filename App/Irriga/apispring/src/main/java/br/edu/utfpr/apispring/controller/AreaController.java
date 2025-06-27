package br.edu.utfpr.apispring.controller;

import br.edu.utfpr.apispring.model.Area;
import br.edu.utfpr.apispring.service.AreaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Área", description = "Endpoints para gerenciamento de áreas")
@RestController
@RequestMapping("/areas")
@RequiredArgsConstructor
public class AreaController {

    private final AreaService areaService;

    @Operation(summary = "Listar todas as áreas", description = "Retorna uma lista de todas as áreas cadastradas")
    @ApiResponse(responseCode = "200", description = "Lista de áreas retornada com sucesso")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @GetMapping
    public ResponseEntity<List<Area>> listarTodos() {
        return ResponseEntity.ok(areaService.listarTodos());
    }

    @Operation(summary = "Buscar área por ID", description = "Retorna uma área específica com base no ID fornecido")
    @ApiResponse(responseCode = "200", description = "Área encontrada com sucesso")
    @ApiResponse(responseCode = "404", description = "Área não encontrada")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @GetMapping("/{id}")
    public ResponseEntity<Area> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(areaService.buscarPorId(id));
    }

    @Operation(summary = "Criar nova área", description = "Cria uma nova área com os dados fornecidos")
    @ApiResponse(responseCode = "200", description = "Área criada com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @PostMapping
    public ResponseEntity<Area> salvar(@RequestBody @Valid Area area) {
        //buscar o reservatorio por id
        //associar na area
        //var res = reservatorioRepository.findById(area.getReservatorio().getId());
        //area.setReservatorio(res);

        return ResponseEntity.ok(areaService.salvar(area));
    }


    @Operation(summary = "Atualizar área", description = "Atualiza uma área existente com os dados fornecidos")
    @ApiResponse(responseCode = "200", description = "Área atualizada com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    @ApiResponse(responseCode = "404", description = "Área não encontrada")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @PutMapping("/{id}")
    public ResponseEntity<Area> atualizar(@PathVariable Long id, @RequestBody Area area) {
        area.setId(id);
        return ResponseEntity.ok(areaService.salvar(area));
    }

    @Operation(summary = "Deletar área", description = "Remove uma área existente com base no ID fornecido")
    @ApiResponse(responseCode = "204", description = "Área removida com sucesso")
    @ApiResponse(responseCode = "404", description = "Área não encontrada")
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    @ApiResponse(responseCode = "403", description = "Acesso negado")
    @ApiResponse(responseCode = "401", description = "Não autorizado")
    @SecurityRequirement(name = "Authentication")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        areaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}