package com.guardian.guardian.api.video;

import com.guardian.guardian.domain.video.dto.VideoSessionRequest;
import com.guardian.guardian.domain.video.dto.VideoSessionResponse;
import com.guardian.guardian.domain.video.dto.VideoSessionStatusUpdateRequest;
import com.guardian.guardian.domain.video.service.VideoSessionService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/video-sessions")
public class VideoSessionController {

    private final VideoSessionService videoSessionService;

    public VideoSessionController(VideoSessionService videoSessionService) {
        this.videoSessionService = videoSessionService;
    }

    @PostMapping
    public ResponseEntity<VideoSessionResponse> createSession(
            @Valid @RequestBody VideoSessionRequest request) {
        return ResponseEntity.ok(videoSessionService.create(request));
    }

    @PutMapping
    public ResponseEntity<VideoSessionResponse> updateSession(
            @Valid @RequestBody VideoSessionStatusUpdateRequest request) {
        return ResponseEntity.ok(videoSessionService.updateStatus(request));
    }

    @GetMapping
    public ResponseEntity<List<VideoSessionResponse>> getSessions(@RequestParam("userId") Long userId) {
        return ResponseEntity.ok(videoSessionService.findSessions(userId));
    }
}
