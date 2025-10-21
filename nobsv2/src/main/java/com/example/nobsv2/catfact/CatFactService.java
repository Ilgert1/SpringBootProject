package com.example.nobsv2.catfact;

import com.example.nobsv2.Query;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
public class CatFactService implements Query<Integer , CatFactDTO> {

    private final RestTemplate restTemplate;
    private final String url = "https://catfact.ninja/fact";
    private final String MAX_LENGTH = "max_length";
    public CatFactService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public ResponseEntity<CatFactDTO> execute(Integer input) {
        //sets up our URL with query string params
        URI uri = UriComponentsBuilder
                .fromHttpUrl(url)
                .queryParam(MAX_LENGTH , input)
                .build()
                .toUri();

        //headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept" , "application/json");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        //handle error
        try{
            ResponseEntity<CatFactResponse> response = restTemplate
                    .exchange(uri, HttpMethod.GET, entity, CatFactResponse.class);
            //get for object is a GET request
            CatFactDTO catFactDTO = new CatFactDTO(response.getBody().getFact());
            return ResponseEntity.ok(catFactDTO);
        }catch (Exception e){
            //can throw custom if we want
            throw new RuntimeException("Cat API is down");

        }




    }
}
