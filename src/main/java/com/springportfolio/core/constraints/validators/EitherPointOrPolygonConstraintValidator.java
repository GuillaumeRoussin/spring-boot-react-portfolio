package com.springportfolio.core.constraints.validators;

import com.springportfolio.core.constraints.annotations.EitherPointOrPolygonAnnotation;
import com.springportfolio.core.dtos.climbing.ClimbingLocationMarkerDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EitherPointOrPolygonConstraintValidator implements ConstraintValidator<EitherPointOrPolygonAnnotation, ClimbingLocationMarkerDto> {

    @Override
    public boolean isValid(ClimbingLocationMarkerDto dto, ConstraintValidatorContext context) {
        boolean hasPointCoordinate = dto.getPointCoordinate() != null && !dto.getPointCoordinate().isEmpty();
        boolean hasPolygonsCoordinates = dto.getPolygonsCoordinates() != null && !dto.getPolygonsCoordinates().isEmpty();

        return hasPointCoordinate != hasPolygonsCoordinates;
    }
}
