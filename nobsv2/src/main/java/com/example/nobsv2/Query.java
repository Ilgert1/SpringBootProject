package com.example.nobsv2;
/*
this interface makes sure the same logic is used throughout classes
 */
import org.springframework.http.ResponseEntity;

public interface Query <I , O>{
    ResponseEntity<O> execute(I input);
}
