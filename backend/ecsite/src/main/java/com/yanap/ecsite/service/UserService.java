package com.yanap.ecsite.service;

import java.util.Optional;

import com.yanap.ecsite.auth.AuthUser;
import com.yanap.ecsite.entity.User;
import com.yanap.ecsite.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// ユーザサービス
@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository repository;

    public boolean save(User user) {
        boolean result = false;
        try {
            result = (repository.save(user) != null);
        } catch (Exception e) { return false; }
        return result;
    }

    public User find(long id) {
        Optional<User> user = repository.findById(id);
        if (user.isEmpty()) { return null; }
        return user.get();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = repository.findByEmail(email);
        if (user == null) { throw new UsernameNotFoundException("Not Registered."); }
        return new AuthUser(user);
    }
}
