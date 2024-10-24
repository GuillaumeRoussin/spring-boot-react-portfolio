package com.springportfolio.core.constraints.annotations;

import com.springportfolio.core.constraints.validators.CoordinateConstraintValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = CoordinateConstraintValidator.class)
@Target({FIELD, ANNOTATION_TYPE, TYPE_USE, PARAMETER})
@Retention(RUNTIME)
public @interface ValidCoordinateAnnotation {

    String message() default "Coordinate must contain exactly 2 values [latitude, longitude].";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
