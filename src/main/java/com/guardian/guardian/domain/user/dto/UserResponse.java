package com.guardian.guardian.domain.user.dto;

import com.guardian.guardian.domain.user.UserRole;
import com.guardian.guardian.domain.user.UserStatus;

public record UserResponse(Long id, String email, String name, UserRole role, UserStatus status) {}
