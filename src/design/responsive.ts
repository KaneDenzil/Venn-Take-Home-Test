import { Dimensions, PixelRatio } from 'react-native';

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 14 Pro as reference: 393 x 852)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

/**
 * Scale size based on screen width
 * @param size - The base size to scale
 * @returns Scaled size based on screen width
 */
export const scaleWidth = (size: number): number => {
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH / BASE_WIDTH) * size);
};

/**
 * Scale size based on screen height
 * @param size - The base size to scale
 * @returns Scaled size based on screen height
 */
export const scaleHeight = (size: number): number => {
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT / BASE_HEIGHT) * size);
};

/**
 * Scale font size - uses a moderate scale factor for better readability
 * @param size - The base font size to scale
 * @returns Scaled font size
 */
export const scaleFont = (size: number): number => {
  const scale = Math.min(SCREEN_WIDTH / BASE_WIDTH, 1.2); // Cap at 1.2x for very large screens
  return PixelRatio.roundToNearestPixel(size * scale);
};

/**
 * Get percentage of screen width
 * @param percentage - Percentage value (0-100)
 * @returns Calculated width
 */
export const widthPercent = (percentage: number): number => {
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * percentage) / 100);
};

/**
 * Get percentage of screen height
 * @param percentage - Percentage value (0-100)
 * @returns Calculated height
 */
export const heightPercent = (percentage: number): number => {
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * percentage) / 100);
};

// Export screen dimensions for direct use
export const screenDimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

