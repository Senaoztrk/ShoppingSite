package com.example.intern.Repository;
import com.example.intern.Entity.Role;


import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
}
