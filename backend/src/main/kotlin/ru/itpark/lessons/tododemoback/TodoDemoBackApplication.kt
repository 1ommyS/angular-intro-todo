package ru.itpark.lessons.tododemoback

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TodoDemoBackApplication

fun main(args: Array<String>) {
    runApplication<TodoDemoBackApplication>(*args)
}
