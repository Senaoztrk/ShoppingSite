package com.example.intern.Service;

import com.example.intern.Repository.RoleRepository;
import org.springframework.stereotype.Service;
import com.example.intern.Entity.Role;

import java.util.List;

@Service
public class RoleService {
    private RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepesitory) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAllList(){
        return roleRepository.findAll();
    }
}
