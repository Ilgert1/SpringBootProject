package com.example.nobsv2;
/*
This interface makes sure the same logic is used through different classes
 */
import org.springframework.http.ResponseEntity;

public interface Command <I , O>{
    ResponseEntity<O> execute(I input);
}
