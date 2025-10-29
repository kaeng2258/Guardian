package com.guardian.guardian.domain.user.dto;

import com.guardian.guardian.domain.user.UserRole;

public record LoginResponse(
        Long userId,
        UserRole role,
        String accessToken,
        String refreshToken,
        String redirectPath) {}
