package com.yanap.ecsite.security;

import com.yanap.ecsite.config.SecurityConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

// 管理者セキュリティ構成
@Configuration
@EnableWebSecurity
@Order(1)
public class AdminSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.mvcMatcher("/admin/**")
                .authorizeRequests()
                    .anyRequest().hasRole("ADMIN")
            .and()
                .formLogin()
                    .loginProcessingUrl("/admin/login")
                    .usernameParameter("name")
                    .passwordParameter("password")
                    .successHandler(new SimpleUrlAuthenticationSuccessHandler())
                    .failureHandler(new SimpleUrlAuthenticationFailureHandler())
                    .permitAll()
            .and()
                .logout()
                    .logoutRequestMatcher(new AntPathRequestMatcher("/admin/logout"))
                    .logoutSuccessHandler(new SimpleUrlLogoutSuccessHandler())
            .and()
                .csrf().disable().cors();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("admin").password(SecurityConfig.passwordEncoder().encode("password")).roles("ADMIN");
    }
}
