package ru.itpark.lessons.tododemoback.service

import org.springframework.stereotype.Service
import ru.itpark.lessons.tododemoback.dto.CreateTodoDto
import ru.itpark.lessons.tododemoback.dto.Todo
import java.util.*
import java.util.concurrent.ConcurrentHashMap

@Service
class TodoService {
    private val todos = ConcurrentHashMap<UUID, Todo>()

    constructor() {
        for (i in (0..10)) {
            create(
                dto =
                    CreateTodoDto(
                        title = "title ${UUID.randomUUID().toString().substring(0, 5)}",
                        description = "description ${UUID.randomUUID().toString().substring(0, 20)}",
                        status = UUID.randomUUID().toString(),
                        category = UUID.randomUUID().toString(),
                    ),
            )
        }
    }

    fun findAll(): List<Todo> = todos.values.toList()

    fun create(dto: CreateTodoDto) {
        val id = UUID.randomUUID()
        todos[id] =
            Todo(
                id = id,
                title = dto.title,
                description = dto.description,
                status = dto.status,
                category = dto.category,
            )
    }
}
