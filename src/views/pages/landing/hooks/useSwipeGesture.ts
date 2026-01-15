/**
 * @fileoverview Enhanced custom hook for swipe gesture detection
 * Supports touch and mouse events for slider navigation with improved performance
 */

import { useEffect, useRef, useState, useCallback } from 'react';

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  preventDefaultTouchmoveEvent?: boolean;
  trackMouse?: boolean;
  trackTouch?: boolean;
  delta?: number;
  // NEW: Enhanced options
  velocityThreshold?: number;
  timeThreshold?: number;
  disabled?: boolean;
}

interface TouchPoint {
  x: number;
  y: number;
  time: number;
}

interface SwipeData {
  distance: { x: number; y: number };
  velocity: { x: number; y: number };
  duration: number;
}

export const useSwipeGesture = (options: SwipeGestureOptions = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    preventDefaultTouchmoveEvent = false,
    trackMouse = false,
    trackTouch = true,
    delta = 10,
    // Enhanced options
    velocityThreshold = 0.3,
    timeThreshold = 300,
    disabled = false
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeData, setSwipeData] = useState<SwipeData | null>(null);
  const startPoint = useRef<TouchPoint | null>(null);
  const currentPoint = useRef<TouchPoint | null>(null);

  const updateTouchPoint = useCallback(
    (clientX: number, clientY: number): TouchPoint => ({
      x: clientX,
      y: clientY,
      time: Date.now()
    }),
    []
  );

  const calculateSwipeData = useCallback((start: TouchPoint, end: TouchPoint): SwipeData => {
    const distance = {
      x: end.x - start.x,
      y: end.y - start.y
    };
    const duration = end.time - start.time;
    const velocity = {
      x: duration > 0 ? Math.abs(distance.x) / duration : 0,
      y: duration > 0 ? Math.abs(distance.y) / duration : 0
    };

    return { distance, velocity, duration };
  }, []);

  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      if (disabled) return;

      startPoint.current = updateTouchPoint(clientX, clientY);
      currentPoint.current = startPoint.current;
      setIsSwiping(true);
      setSwipeData(null);
    },
    [disabled, updateTouchPoint]
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (disabled || !startPoint.current) return;

      currentPoint.current = updateTouchPoint(clientX, clientY);
      const swipeInfo = calculateSwipeData(startPoint.current, currentPoint.current);
      setSwipeData(swipeInfo);

      if (preventDefaultTouchmoveEvent) {
        const absX = Math.abs(swipeInfo.distance.x);
        const absY = Math.abs(swipeInfo.distance.y);
        if (absX > delta || absY > delta) {
          return false; // This will be used to preventDefault
        }
      }
    },
    [disabled, calculateSwipeData, preventDefaultTouchmoveEvent, delta, updateTouchPoint]
  );

  const handleEnd = useCallback(() => {
    if (disabled || !startPoint.current || !currentPoint.current) {
      setIsSwiping(false);
      setSwipeData(null);
      return;
    }

    const finalSwipeData = calculateSwipeData(startPoint.current, currentPoint.current);
    const { distance, velocity, duration } = finalSwipeData;
    const absX = Math.abs(distance.x);
    const absY = Math.abs(distance.y);

    // Enhanced swipe detection with velocity consideration
    const isValidSwipe =
      Math.max(absX, absY) > threshold && duration < timeThreshold && (velocity.x > velocityThreshold || velocity.y > velocityThreshold);

    if (isValidSwipe) {
      if (absX > absY) {
        // Horizontal swipe
        if (distance.x > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      } else {
        // Vertical swipe
        if (distance.y > 0) {
          onSwipeDown?.();
        } else {
          onSwipeUp?.();
        }
      }
    }

    startPoint.current = null;
    currentPoint.current = null;
    setIsSwiping(false);
    setSwipeData(null);
  }, [disabled, calculateSwipeData, threshold, timeThreshold, velocityThreshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || disabled) return;

    // Touch event handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (!trackTouch) return;
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!trackTouch || !startPoint.current) return;
      const touch = e.touches[0];
      const shouldPrevent = handleMove(touch.clientX, touch.clientY);
      if (shouldPrevent === false && preventDefaultTouchmoveEvent) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      if (!trackTouch) return;
      handleEnd();
    };

    // Mouse event handlers
    const handleMouseDown = (e: MouseEvent) => {
      if (!trackMouse) return;
      handleStart(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!trackMouse || !startPoint.current) return;
      const shouldPrevent = handleMove(e.clientX, e.clientY);
      if (shouldPrevent === false && preventDefaultTouchmoveEvent) {
        e.preventDefault();
      }
    };

    const handleMouseUp = () => {
      if (!trackMouse) return;
      handleEnd();
    };

    // Add event listeners with passive option for better performance
    if (trackTouch) {
      element.addEventListener('touchstart', handleTouchStart, { passive: false });
      element.addEventListener('touchmove', handleTouchMove, { passive: false });
      element.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    if (trackMouse) {
      element.addEventListener('mousedown', handleMouseDown, { passive: true });
      element.addEventListener('mousemove', handleMouseMove, { passive: false });
      element.addEventListener('mouseup', handleMouseUp, { passive: true });
      element.addEventListener('mouseleave', handleMouseUp, { passive: true });
    }

    return () => {
      if (trackTouch) {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
      }

      if (trackMouse) {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mouseleave', handleMouseUp);
      }
    };
  }, [trackTouch, trackMouse, disabled, handleStart, handleMove, handleEnd, preventDefaultTouchmoveEvent]);

  return {
    ref: elementRef,
    isSwiping,
    swipeData,
    // Enhanced return values
    isSwipeActive: isSwiping && swipeData !== null,
    swipeDirection: swipeData
      ? Math.abs(swipeData.distance.x) > Math.abs(swipeData.distance.y)
        ? swipeData.distance.x > 0
          ? 'right'
          : 'left'
        : swipeData.distance.y > 0
          ? 'down'
          : 'up'
      : null,
    swipeProgress: swipeData ? Math.min(Math.max(Math.abs(swipeData.distance.x), Math.abs(swipeData.distance.y)) / threshold, 1) : 0
  };
};

export default useSwipeGesture;
