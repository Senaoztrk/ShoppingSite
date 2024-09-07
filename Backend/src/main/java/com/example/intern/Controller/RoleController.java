package com.example.intern.Controller;
import com.example.intern.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import com.example.intern.Entity.Role;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/getallroles")
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @GetMapping("/getrole/{id}")
    public Role getRoleById(@PathVariable Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    @PostMapping("/createrole")
    public Role createRole(@RequestBody Role role) {
        return roleRepository.save(role);
    }

    @PutMapping("/updaterole/{id}")
    public Role updateRole(@PathVariable Long id, @RequestBody Role roleDetails) {
        Role role = roleRepository.findById(id).orElse(null);
        if (role != null) {
            role.setRole_name(roleDetails.getRole_name());
            return roleRepository.save(role);
        } else {
            return null;
        }
    }

    @DeleteMapping("/deleterole/{id}")
    public void deleteRole(@PathVariable Long id) {
        roleRepository.deleteById(id);
    }
}


