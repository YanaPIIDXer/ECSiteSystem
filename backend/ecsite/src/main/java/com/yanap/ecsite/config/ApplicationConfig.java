package com.yanap.ecsite.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class ApplicationConfig implements WebMvcConfigurer {
    // １ページ毎の商品表示数
    public static final int PRODUCT_COUNT_BY_PAGE = 20;

    // 1ページ事の購入履歴表示数
    public static final int HISTORY_COUNT_BY_PAGE = 5;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost")
                .allowedOrigins("https://ecsite-system.web.app/")
                .allowCredentials(true);
    }
    
    // 参考：https://sebenkyo.com/2020/11/16/post-1649/
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        var configuration = new CorsConfiguration();
        List<String> allowedOrigins = new ArrayList<String>();
        allowedOrigins.add("http://localhost");
        allowedOrigins.add("https://ecsite-system.web.app/");
        configuration.setAllowedOrigins(allowedOrigins);
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
