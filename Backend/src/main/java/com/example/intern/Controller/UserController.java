package com.example.intern.Controller;
import com.example.intern.Entity.Role;
import com.example.intern.Entity.User;
import com.example.intern.Repository.RoleRepository;
import com.example.intern.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/getalluser")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/getuser/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @PostMapping("/createuser")
    public User createUser(@RequestBody User user) {
        Role role=roleRepository.findById(12L).get();
        user.setRole(role);
        return userRepository.save(user);
    }

    @PutMapping("/updateuser/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setUsername(userDetails.getUsername());
            user.setPassword(userDetails.getPassword());
            user.setEmail(userDetails.getEmail());
            user.setRole(userDetails.getRole());
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    @DeleteMapping("/deleteuser/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
