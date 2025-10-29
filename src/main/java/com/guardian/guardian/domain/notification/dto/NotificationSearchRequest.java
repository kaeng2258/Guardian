package com.guardian.guardian.domain.notification.dto;

import com.guardian.guardian.domain.notification.NotificationStatus;
import com.guardian.guardian.domain.notification.NotificationType;
import java.time.LocalDateTime;

public record NotificationSearchRequest(
        Long recipientId,
        NotificationType type,
        NotificationStatus status,
        LocalDateTime from,
        LocalDateTime to) {}
