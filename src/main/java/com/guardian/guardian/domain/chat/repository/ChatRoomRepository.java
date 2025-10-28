package com.strongguardianman.guardian.domain.chat.repository;

import com.strongguardianman.guardian.domain.chat.ChatRoom;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    Optional<ChatRoom> findByClientIdAndProviderId(Long clientId, Long providerId);
}
