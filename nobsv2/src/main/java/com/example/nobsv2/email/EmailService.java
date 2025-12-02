package com.example.nobsv2.email;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${frontend.url}")
    private String frontendUrl;


    public void sendPasswordResetEmail(String toEmail , String resetToken){

        try{
            String resetLink = frontendUrl + "/reset-password?token=" + resetToken;


            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Reset Your Elevare Password");
            message.setText(String.format("""
                Hello,
                
                You requested to reset your password for Elevare.
                
                Click the link below to reset your password:
                %s
                
                This link will expire in 1 hour.
                
                If you didn't request this, please ignore this email.
                
                Best regards,
                The Elevare Team
                """, resetLink));
            mailSender.send(message);
            log.info("PASSWORD RESET email sent to {}" , toEmail);




        }catch (Exception e){
            log.error("FAILED TO SEND PASSW RESET EMAIL TO: {}" , toEmail , e);
            throw new RuntimeException("Failed to send email");
        }





    }





}
