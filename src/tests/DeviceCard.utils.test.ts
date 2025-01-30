import { describe, expect, test } from 'vitest'
import { getHddCapacityUnit, formatHddCapacity } from "./DeviceCard";

describe('DeviceCard utils', () => {
    test('should return the correct unit for HDD capacity', () => {
        expect(getHddCapacityUnit(1000)).toBe('TB');
        expect(getHddCapacityUnit(100)).toBe('GB');
    });
});

describe('formatHddCapacity', () => {
    test('should format the HDD capacity to the correct unit', () => {
        expect(formatHddCapacity(1000)).toBe('1');
        expect(formatHddCapacity(100)).toBe('100');
    });
});
