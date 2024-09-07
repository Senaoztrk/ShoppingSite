package com.example.intern.Service;

import com.example.intern.Repository.UserRepository;
import org.springframework.stereotype.Service;
import com.example.intern.Entity.User;
import java.util.List;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllList(){
        return userRepository.findAll();
    }
}
