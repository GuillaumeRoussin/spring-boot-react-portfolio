package com.springportfolio.core.entity.user;

import com.springportfolio.core.enums.EscaladeType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

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

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private boolean profilPublic;

    @Column(nullable = false, length = 2)
    private String maxCotation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EscaladeType preferedEscaladeType;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;
}
