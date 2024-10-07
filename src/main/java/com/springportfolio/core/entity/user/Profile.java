package com.springportfolio.core.entity.user;

import com.springportfolio.core.enums.ClimbingType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "profil")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false, length = 250)
    private String description;

    @Column(nullable = false)
    private boolean profilePublic;

    @Column(nullable = false)
    private String maxRating;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClimbingType preferredClimbingType;

    @Column()
    private LocalDate birthDate;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
