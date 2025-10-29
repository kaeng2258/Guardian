package com.guardian.guardian.global.config.securityconfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/", "/index",                       // 필요시
                                "/chat", "/chat/**",                // ✅ 채팅 페이지 허용
                                "/ws-stomp/**",                     // ✅ 웹소켓 핸드셰이크
                                "/topic/**", "/queue/**", "/app/**",// STOMP 경로 (서버 푸시/클라 전송)
                                "/css/**", "/js/**", "/images/**"   // 정적 리소스
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                // STOMP/웹소켓 경로는 CSRF 검사 제외 (개발 편의)
                .csrf(csrf -> csrf.ignoringRequestMatchers(
                        "/ws-stomp/**", "/topic/**", "/queue/**", "/app/**"
                ))
                .formLogin(form -> form
                        .loginPage("/login")               // 커스텀 로그인 화면 쓰는 경우
                        .defaultSuccessUrl("/chat", true)  // 로그인 성공 시 채팅으로
                        .permitAll()
                )
                .logout(logout -> logout.permitAll());

        return http.build();
    }
}
