export type HighCalculation = {
    elevationGain: number;
    totalAltitudeChange: number;
};

type HighTracker = {
    update: (relativeAltitude: number | null, timestampMs?: number) => HighCalculation;
    reset: () => void;
};

//Logik generieren lassen, da es komplex ist.
export function createHighTracker(sampleIntervalMs = 3000): HighTracker {
    let lastRelativeAltitude: number | null = null;
    let lastSampleTimestampMs: number | null = null;
    let elevationGain = 0;
    let totalAltitudeChange = 0;

    return {
        update(relativeAltitude, timestampMs = Date.now()) {
            if (relativeAltitude === null || Number.isNaN(relativeAltitude)) {
                return {elevationGain, totalAltitudeChange};
            }

            if (lastRelativeAltitude === null || lastSampleTimestampMs === null) {
                lastRelativeAltitude = relativeAltitude;
                lastSampleTimestampMs = timestampMs;
                return {elevationGain, totalAltitudeChange};
            }

            if (timestampMs - lastSampleTimestampMs < sampleIntervalMs) {
                return {elevationGain, totalAltitudeChange};
            }

            const delta = relativeAltitude - lastRelativeAltitude;
            totalAltitudeChange += Math.abs(delta);

            if (delta > 0) {
                elevationGain += delta;
            }

            lastRelativeAltitude = relativeAltitude;
            lastSampleTimestampMs = timestampMs;
            return {elevationGain, totalAltitudeChange};
        },
        reset() {
            lastRelativeAltitude = null;
            lastSampleTimestampMs = null;
            elevationGain = 0;
            totalAltitudeChange = 0;
        },
    };
}
