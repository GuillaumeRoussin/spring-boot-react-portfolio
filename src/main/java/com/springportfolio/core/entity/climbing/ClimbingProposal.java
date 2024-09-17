package com.springportfolio.core.entity.climbing;

import com.springportfolio.core.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "climbing_proposal")
public class ClimbingProposal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;

    @ManyToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "climbing_location", nullable = false)
    private ClimbingLocation climbingLocation;

    @Column(name = "start_date_time")
    private LocalDateTime startDateTime;

    @Column(name = "end_date_time")
    private LocalDateTime endDateTime;

    @Column()
    private boolean carpooling;

    @Column()
    private boolean available;

    @ManyToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "creator", nullable = false)
    private User creator;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    @JoinTable(
            name = "climbing_proposal_join_requests",
            joinColumns = @JoinColumn(name = "climbing_proposal_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> joinRequests = new ArrayList<>();

    @Column(nullable = false)
    private int maxJoinRequests;
}
