package com.springportfolio.core.services.authentication;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    // Extract the username (subject) from the token
    public String extractUsername(String token) {
        return decodeToken(token).getSubject();
    }

    // Generate a JWT token for a user with default claims
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    // Generate a JWT token for a user with extra claims
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    // Validate the JWT token
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Check if the token is expired
    private boolean isTokenExpired(String token) {
        Date expiration = decodeToken(token).getExpiresAt();
        return expiration != null && expiration.before(new Date());
    }

    // Build the JWT token with custom claims and expiration time
    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration) {
        Date issuedAt = new Date();
        Date expiresAt = new Date(issuedAt.getTime() + expiration);

        return JWT.create()
                .withSubject(userDetails.getUsername())
                .withIssuedAt(issuedAt)
                .withExpiresAt(expiresAt)
                .withPayload(extraClaims) // Adding extra claims to the token
                .sign(getAlgorithm());
    }

    // Decode and verify the JWT token
    private DecodedJWT decodeToken(String token) {
        JWTVerifier verifier = JWT.require(getAlgorithm())
                .build();
        try {
            return verifier.verify(token);
        } catch (JWTVerificationException e) {
            throw new JWTVerificationException("Invalid or expired token", e);
        }
    }

    // Generate the algorithm with the secret key (HMAC SHA-256)
    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(secretKey);
    }

    public long getExpirationTime() {
        return jwtExpiration;
    }
}
