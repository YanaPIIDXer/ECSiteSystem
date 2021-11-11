package com.yanap.ecsite.security;

import com.yanap.ecsite.handler.UserLoginSuccessHandler;
import com.yanap.ecsite.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

// ユーザセキュリティ構成
@Configuration
@EnableWebSecurity
@Order(2)
public class UserSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MappingJackson2HttpMessageConverter messageConverter;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.mvcMatcher("/user/**")
                .authorizeRequests()
                    .mvcMatchers("/user/register").permitAll()
                    .anyRequest().hasRole("USER")
            .and()
                .formLogin()
                    .loginProcessingUrl("/user/login")
                    .usernameParameter("email")
                    .passwordParameter("password")
                    .successHandler(new UserLoginSuccessHandler(messageConverter))
                    .failureHandler(new SimpleUrlAuthenticationFailureHandler())
                    .permitAll()
            .and()
                .logout()
                    .logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
                    .logoutSuccessHandler(new SimpleUrlLogoutSuccessHandler())
            .and()
                .csrf().disable().cors().configurationSource(corsConfigurationSource);
    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService)
                .passwordEncoder(passwordEncoder);
    }
}
