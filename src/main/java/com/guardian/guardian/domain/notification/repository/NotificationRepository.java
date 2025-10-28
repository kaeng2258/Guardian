package com.strongguardianman.guardian.domain.notification.repository;

import com.strongguardianman.guardian.domain.notification.Notification;
import com.strongguardianman.guardian.domain.notification.NotificationStatus;
import com.strongguardianman.guardian.domain.notification.NotificationType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByRecipientIdOrderByCreatedAtDesc(Long recipientId);

    List<Notification> findByTypeAndStatus(NotificationType type, NotificationStatus status);
}
