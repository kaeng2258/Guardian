package com.guardian.guardian.api.notification;

import com.guardian.guardian.domain.notification.dto.DeviceTokenRequest;
import com.guardian.guardian.domain.notification.dto.DeviceTokenResponse;
import com.guardian.guardian.domain.notification.service.DeviceTokenService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/device-tokens")
public class DeviceTokenController {

    private final DeviceTokenService deviceTokenService;

    public DeviceTokenController(DeviceTokenService deviceTokenService) {
        this.deviceTokenService = deviceTokenService;
    }

    @PostMapping
    public ResponseEntity<DeviceTokenResponse> registerToken(@Valid @RequestBody DeviceTokenRequest request) {
        return ResponseEntity.ok(deviceTokenService.register(request));
    }

    @DeleteMapping("/{tokenId}")
    public ResponseEntity<Void> deactivateToken(@PathVariable Long tokenId) {
        deviceTokenService.deactivate(tokenId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<DeviceTokenResponse>> getActiveTokens(@RequestParam("userId") Long userId) {
        return ResponseEntity.ok(deviceTokenService.getActiveTokens(userId));
    }
}
