package com.springportfolio.core.dtos.climbing;

import com.springportfolio.core.constraints.annotations.EitherPointOrPolygonAnnotation;
import com.springportfolio.core.constraints.annotations.ValidCoordinateAnnotation;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
@EitherPointOrPolygonAnnotation
public class ClimbingLocationMarkerDto {

    @NotEmpty(message = "The name of the climbing location marker is required.")
    private String name;

    @NotEmpty(message = "The description of the climbing location marker is required.")
    private String description;

    @ValidCoordinateAnnotation
    private List<Double> pointCoordinate;

    @Size(min = 3, message = "Polygon need to have at least three points")
    private List<@ValidCoordinateAnnotation List<Double>> polygonsCoordinates;
}
