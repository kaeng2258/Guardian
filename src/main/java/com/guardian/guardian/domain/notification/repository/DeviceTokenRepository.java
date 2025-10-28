package com.strongguardianman.guardian.domain.notification.repository;

import com.strongguardianman.guardian.domain.notification.DeviceToken;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceTokenRepository extends JpaRepository<DeviceToken, Long> {

    Optional<DeviceToken> findByToken(String token);

    List<DeviceToken> findByUserIdAndActiveTrue(Long userId);
}
