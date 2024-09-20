package com.springportfolio.core.services.user;

import com.springportfolio.core.responses.user.ProfileResponse;
import org.springframework.data.domain.Page;

public interface PagableProfileService {
    Page<ProfileResponse> getAll(int page, int size);
}
