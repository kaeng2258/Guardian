package com.strongguardianman.guardian.domain.video.repository;

import com.strongguardianman.guardian.domain.video.VideoSession;
import com.strongguardianman.guardian.domain.video.VideoSessionStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoSessionRepository extends JpaRepository<VideoSession, Long> {

    List<VideoSession> findByCallerIdOrReceiverId(Long callerId, Long receiverId);

    List<VideoSession> findByStatus(VideoSessionStatus status);
}
