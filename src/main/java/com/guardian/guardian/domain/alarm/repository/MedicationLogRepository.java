package com.guardian.guardian.domain.alarm.repository;

import com.guardian.guardian.domain.alarm.MedicationLog;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicationLogRepository extends JpaRepository<MedicationLog, Long> {

    List<MedicationLog> findByClientIdAndLogTimestampBetween(Long clientId, LocalDateTime start, LocalDateTime end);
}
