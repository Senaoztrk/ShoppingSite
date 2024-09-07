package com.example.intern.Repository;
import com.example.intern.Entity.User;


import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
