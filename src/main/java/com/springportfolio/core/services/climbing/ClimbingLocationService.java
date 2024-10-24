package com.springportfolio.core.services.climbing;

import com.springportfolio.core.dtos.climbing.ClimbingLocationDto;
import com.springportfolio.core.dtos.climbing.ClimbingLocationMarkerDto;
import com.springportfolio.core.entity.climbing.ClimbingLocation;
import com.springportfolio.core.entity.climbing.ClimbingLocationMarker;
import com.springportfolio.core.repository.climbing.ClimbingLocationRepositoryInterface;
import com.springportfolio.core.responses.climbing.ClimbingLocationResponse;
import org.locationtech.jts.geom.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClimbingLocationService {
    private final ClimbingLocationRepositoryInterface climbingLocationRepository;

    public ClimbingLocationService(ClimbingLocationRepositoryInterface climbingLocationRepository) {
        this.climbingLocationRepository = climbingLocationRepository;
    }

    public ClimbingLocationResponse createClimbingLocation(ClimbingLocationDto climbingLocationDto) {
        List<ClimbingLocationMarkerDto> climbingLocationMarkerDtoList = climbingLocationDto.getClimbingLocationMarkers();
        List<ClimbingLocationMarker> climbingLocationMarkers = new ArrayList<>();
        for (ClimbingLocationMarkerDto climbingLocationMarkerDto : climbingLocationMarkerDtoList) {
            climbingLocationMarkers.add(ClimbingLocationMarker.builder().name(climbingLocationMarkerDto.getName()).description(climbingLocationMarkerDto.getDescription()).point(createPoint(climbingLocationMarkerDto)).polygon(createPolygon(climbingLocationMarkerDto)).build());
        }
        ClimbingLocation climbingLocation = ClimbingLocation.builder().name(climbingLocationDto.getName()).description(climbingLocationDto.getDescription()).validated(false).climbingLocationMarkers(climbingLocationMarkers).build();
        return ClimbingLocationResponse.fromEntity(climbingLocationRepository.save(climbingLocation));
    }

    public Point createPoint(ClimbingLocationMarkerDto climbingLocationMarkerDto) {
        GeometryFactory geometryFactory = new GeometryFactory();
        if (climbingLocationMarkerDto.getPointCoordinate() != null) {
            Coordinate coord = new Coordinate(climbingLocationMarkerDto.getPointCoordinate().getFirst(), climbingLocationMarkerDto.getPointCoordinate().getLast());
            return geometryFactory.createPoint(coord);
        } else {
            return null;
        }
    }

    public Polygon createPolygon(ClimbingLocationMarkerDto climbingLocationMarkerDto) {
        GeometryFactory geometryFactory = new GeometryFactory();
        List<List<Double>> polygonCoordinates = climbingLocationMarkerDto.getPolygonsCoordinates();

        if (polygonCoordinates != null && !polygonCoordinates.isEmpty()) {
            Coordinate[] coordinates = new Coordinate[polygonCoordinates.size() + 1]; // to close the polygon

            for (int i = 0; i < polygonCoordinates.size(); i++) {
                List<Double> polygonCoordinate = polygonCoordinates.get(i);
                coordinates[i] = new Coordinate(polygonCoordinate.get(0), polygonCoordinate.get(1));
            }
            coordinates[coordinates.length - 1] = coordinates[0]; // closing the polygon

            LinearRing linearRing = geometryFactory.createLinearRing(coordinates);
            return geometryFactory.createPolygon(linearRing, null);
        } else {
            return null;
        }
    }
}
