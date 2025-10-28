package com.guardian.guardian.domain.profile.repository;

import com.guardian.guardian.domain.profile.ClientProfile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientProfileRepository extends JpaRepository<ClientProfile, Long> {

    Optional<ClientProfile> findByClientId(Long clientId);
}
