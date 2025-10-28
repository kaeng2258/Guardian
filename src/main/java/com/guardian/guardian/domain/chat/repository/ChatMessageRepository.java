package com.strongguardianman.guardian.domain.chat.repository;

import com.strongguardianman.guardian.domain.chat.ChatMessage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByRoomIdOrderBySentAtAsc(Long roomId);
}
