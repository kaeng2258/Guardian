package com.guardian.guardian.api.admin;

import com.guardian.guardian.domain.notification.dto.NotificationResponse;
import com.guardian.guardian.domain.notification.dto.NotificationRetryRequest;
import com.guardian.guardian.domain.notification.dto.NotificationSearchRequest;
import com.guardian.guardian.domain.notification.service.NotificationService;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<NotificationResponse>> search(
            @RequestParam(value = "recipientId", required = false) Long recipientId,
            @RequestParam(value = "type", required = false)
                    com.guardian.guardian.domain.notification.NotificationType type,
            @RequestParam(value = "status", required = false)
                    com.guardian.guardian.domain.notification.NotificationStatus status,
            @RequestParam(value = "from", required = false)
                    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
                    LocalDateTime from,
            @RequestParam(value = "to", required = false)
                    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
                    LocalDateTime to) {
        NotificationSearchRequest request = new NotificationSearchRequest(recipientId, type, status, from, to);
        return ResponseEntity.ok(notificationService.search(request));
    }

    @PutMapping("/mark-read")
    public ResponseEntity<Void> markRead(@RequestParam("id") Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/retry")
    public ResponseEntity<NotificationResponse> retry(@Valid @RequestBody NotificationRetryRequest request) {
        return ResponseEntity.ok(notificationService.retry(request));
    }
}
