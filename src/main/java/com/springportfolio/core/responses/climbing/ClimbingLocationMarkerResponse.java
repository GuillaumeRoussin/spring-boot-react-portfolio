package com.springportfolio.core.responses.climbing;

import com.springportfolio.core.entity.climbing.ClimbingLocationMarker;
import lombok.Builder;
import lombok.Data;
import org.locationtech.jts.geom.Polygon;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@Builder
public class ClimbingLocationMarkerResponse {
    private UUID id;
    private String name;
    private String description;
    private List<Double> pointCoordinate;
    private List<List<Double>> polygonsCoordinates;

    public static ClimbingLocationMarkerResponse fromEntity(ClimbingLocationMarker climbingLocationMarker) {
        List<Double> pointCoordinate = null;
        List<List<Double>> polygonsCoordinates = null;

        if (climbingLocationMarker.getPoint() != null) {
            pointCoordinate = List.of(
                    climbingLocationMarker.getPoint().getCoordinate().x,
                    climbingLocationMarker.getPoint().getCoordinate().y
            );
        }

        Polygon polygon = climbingLocationMarker.getPolygon();
        if (polygon != null) {
            polygonsCoordinates = Arrays.stream(polygon.getCoordinates())
                    .map(coordinate -> List.of(coordinate.x, coordinate.y))
                    .collect(Collectors.toList());
        }

        return ClimbingLocationMarkerResponse.builder()
                .id(climbingLocationMarker.getId())
                .name(climbingLocationMarker.getName())
                .description(climbingLocationMarker.getDescription())
                .pointCoordinate(pointCoordinate)
                .polygonsCoordinates(polygonsCoordinates)
                .build();
    }

    public static List<ClimbingLocationMarkerResponse> fromListEntity(List<ClimbingLocationMarker> climbingLocationMarkers) {
        return climbingLocationMarkers.stream()
                .map(ClimbingLocationMarkerResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
