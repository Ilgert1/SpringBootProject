package com.example.nobsv2.security;

import java.util.List;
import java.util.Arrays;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="custom_user")
@Data
@NoArgsConstructor
public class CustomUser {


    @Id
    @Column(name = "username")
    private String username;


    @Column(name = "password")
    private String password;

    @Column(name = "roles")
    private String roles;

    public CustomUser(String username, String password, String roles) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    //helper method returing a list
    public List<String> getRoleList(){
        if(roles == null || roles.isBlank()) return List.of();
        return Arrays.stream(roles.split(","))
                .map(String::trim)
                .toList();



    }


}
