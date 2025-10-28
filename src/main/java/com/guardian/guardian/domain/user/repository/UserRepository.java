package com.strongguardianman.guardian.domain.user.repository;

import com.strongguardianman.guardian.domain.user.User;
import com.strongguardianman.guardian.domain.user.UserRole;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByRole(UserRole role);
}
