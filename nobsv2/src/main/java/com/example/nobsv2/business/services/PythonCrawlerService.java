package com.example.nobsv2.business.services;

import com.example.nobsv2.business.dto.BusinessImportDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class PythonCrawlerService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Execute Python crawler script and return business results
     */
    public List<BusinessImportDTO> crawl(String location, int radius, String businessType) throws Exception {
        log.info("Starting Python crawler for location: {}, radius: {}, type: {}", location, radius, businessType);

        // Get the path to the Python script
        String scriptPath = getScriptPath();
        log.info("Python script path: {}", scriptPath);

        // Build the command to execute Python
        List<String> command = new ArrayList<>();
        command.add("python3");  // or "python" depending on your system
        command.add(scriptPath);
        command.add("--location");
        command.add(location);
        command.add("--radius");
        command.add(String.valueOf(radius));

        // Add business type if specified
        if (businessType != null && !businessType.trim().isEmpty()) {
            command.add("--type");
            command.add(businessType);
        }

        log.info("Executing command: {}", String.join(" ", command));

        // Execute the Python script
        ProcessBuilder processBuilder = new ProcessBuilder(command);
        processBuilder.redirectErrorStream(true);  // Combine stdout and stderr

        Process process = processBuilder.start();

        // Read the output
        StringBuilder output = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
                log.debug("Python output: {}", line);
            }
        }

        // Wait for process to complete
        int exitCode = process.waitFor();
        log.info("Python script completed with exit code: {}", exitCode);

        if (exitCode != 0) {
            log.error("Python script failed with output: {}", output);
            throw new RuntimeException("Python crawler failed with exit code: " + exitCode);
        }

        // Parse the JSON output
        String jsonOutput = output.toString();
        log.debug("Parsing JSON output: {}", jsonOutput);

        List<BusinessImportDTO> businesses = objectMapper.readValue(
                jsonOutput,
                new TypeReference<List<BusinessImportDTO>>() {}
        );

        log.info("Successfully crawled {} businesses", businesses.size());
        return businesses;
    }

    /**
     * Get the absolute path to the Python script
     */
    private String getScriptPath() {
        // Get the path relative to the project root
        return "/Users/ilgertshehaj/PycharmProjects/PythonProject/busniness_crawler.py";
    }
}