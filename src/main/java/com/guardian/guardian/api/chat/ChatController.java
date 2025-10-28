package com.guardian.guardian.api.chat;

import com.guardian.guardian.domain.chat.dto.ChatMessageRequest;
import com.guardian.guardian.domain.chat.dto.ChatMessageResponse;
import com.guardian.guardian.domain.chat.dto.ChatThreadResponse;
import com.guardian.guardian.domain.chat.service.ChatService;
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
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/threads")
    public ResponseEntity<List<ChatThreadResponse>> getThreads(@RequestParam("userId") Long userId) {
        return ResponseEntity.ok(chatService.getThreadsForUser(userId));
    }

    @GetMapping("/threads/{roomId}/messages")
    public ResponseEntity<List<ChatMessageResponse>> getMessages(@PathVariable Long roomId) {
        return ResponseEntity.ok(chatService.getMessages(roomId));
    }

    @PostMapping("/threads/{roomId}/messages")
    public ResponseEntity<ChatMessageResponse> sendMessage(
            @PathVariable Long roomId, @Valid @RequestBody ChatMessageRequest request) {
        ChatMessageRequest enriched = new ChatMessageRequest(
                roomId, request.senderId(), request.content(), request.messageType(), request.fileUrl());
        return ResponseEntity.ok(chatService.sendMessage(enriched));
    }

    @PutMapping("/threads/{roomId}/read")
    public ResponseEntity<Void> markThreadAsRead(
            @PathVariable Long roomId, @RequestParam("userId") Long userId) {
        chatService.markThreadAsRead(roomId, userId);
        return ResponseEntity.noContent().build();
    }
}
