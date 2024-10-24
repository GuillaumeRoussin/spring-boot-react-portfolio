package com.springportfolio.core.constraints.validators;

import com.springportfolio.core.constraints.annotations.ValidCoordinateAnnotation;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;

public class CoordinateConstraintValidator implements ConstraintValidator<ValidCoordinateAnnotation, List<Double>> {

    @Override
    public boolean isValid(List<Double> value, ConstraintValidatorContext context) {
        if (value == null) {//can be null because of @EitherPointOrPolygonAnnotation
            return true;
        }
        if (value.size() != 2) {
            return false;
        }

        // ensure lat lon consistency
        Double lat = value.get(0);
        Double lon = value.get(1);

        if (!(lat >= -90 && lat <= 90)) {
            context.buildConstraintViolationWithTemplate("Latitude must be between -90 and 90.")
                    .addConstraintViolation()
                    .disableDefaultConstraintViolation();
            return false;
        }

        if (!(lon >= -180 && lon <= 180)) {
            context.buildConstraintViolationWithTemplate("Longitude must be between -180 and 180.")
                    .addConstraintViolation()
                    .disableDefaultConstraintViolation();
            return false;
        }

        return true;
    }

}
