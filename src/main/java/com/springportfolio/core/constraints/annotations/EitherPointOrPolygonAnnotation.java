package com.springportfolio.core.constraints.annotations;

import com.springportfolio.core.constraints.validators.EitherPointOrPolygonConstraintValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = EitherPointOrPolygonConstraintValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface EitherPointOrPolygonAnnotation {

    String message() default "Either pointCoordinate or polygonsCoordinates must be provided, but not both.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

