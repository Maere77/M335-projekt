import { useEffect, useMemo, useState } from 'react';
import * as Location from 'expo-location';

type Coordinate = {
  latitude: number;
  longitude: number;
};

type DistanceState = {
  distanceMeters: number;
  status: 'loading' | 'ready' | 'denied' | 'error';
  errorMessage: string | null;
};

function toRadians(degree: number): number {
  return (degree * Math.PI) / 180;
}

function calculateDistanceMeters(from: Coordinate, to: Coordinate): number {
  const earthRadiusMeters = 6371000;
  const deltaLatitude = toRadians(to.latitude - from.latitude);
  const deltaLongitude = toRadians(to.longitude - from.longitude);
  const fromLatitude = toRadians(from.latitude);
  const toLatitude = toRadians(to.latitude);

  const a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(fromLatitude) *
      Math.cos(toLatitude) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusMeters * c;
}

export function useDistanceTracking(): DistanceState {
  const [distanceMeters, setDistanceMeters] = useState(0);
  const [status, setStatus] = useState<DistanceState['status']>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let lastCoordinate: Coordinate | null = null;
    let locationSubscription: Location.LocationSubscription | null = null;

    const startTracking = async () => {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!isMounted) {
        return;
      }

      if (!permission.granted) {
        setStatus('denied');
        setErrorMessage('Location permission denied');
        return;
      }

      setStatus('ready');

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 3000,
          distanceInterval: 1,
        },
        (location) => {
          if (!isMounted) {
            return;
          }

          const nextCoordinate: Coordinate = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };

          if (lastCoordinate !== null) {
            const deltaMeters = calculateDistanceMeters(lastCoordinate, nextCoordinate);
            setDistanceMeters((currentDistance) => currentDistance + deltaMeters);
          }

          lastCoordinate = nextCoordinate;
        }
      );
    };

    startTracking().catch((error: unknown) => {
      if (!isMounted) {
        return;
      }

      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Location tracking failed');
    });

    return () => {
      isMounted = false;
      locationSubscription?.remove();
    };
  }, []);

  return useMemo(
    () => ({
      distanceMeters,
      status,
      errorMessage,
    }),
    [distanceMeters, status, errorMessage]
  );
}