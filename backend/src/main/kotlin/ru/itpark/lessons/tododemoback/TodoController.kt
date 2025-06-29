package ru.itpark.lessons.tododemoback

import org.springframework.web.bind.annotation.*
import ru.itpark.lessons.tododemoback.dto.CreateTodoDto
import ru.itpark.lessons.tododemoback.dto.ResponseContainer
import ru.itpark.lessons.tododemoback.dto.Todo
import ru.itpark.lessons.tododemoback.service.TodoService

@RestController
@RequestMapping("/todos")
@CrossOrigin(
    origins = ["*"],
    allowedHeaders = ["*"],
)
class TodoController(
    private val service: TodoService,
) {
    @GetMapping
    fun findAll(): List<Todo> = service.findAll()

    @PostMapping
    fun create(
        @RequestBody dto: CreateTodoDto,
    ): ResponseContainer {
        service.create(dto)
        return ResponseContainer(
            message = "Task created successfully",
        )
    }
}
