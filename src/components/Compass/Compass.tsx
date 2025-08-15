import React, { useEffect, useState, useCallback, useRef } from "react";
import "@oicl/openbridge-webcomponents/dist/navigation-instruments/compass/compass.js";
import type { AngleAdvice } from "@oicl/openbridge-webcomponents/dist/navigation-instruments/watch/advice";

// Extend JSX IntrinsicElements to include the custom obc-compass element
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'obc-compass': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                heading?: number;
                'course-over-ground'?: number;
                'heading-advices'?: string;
            };
        }
    }
}

// Define the enum types for better type safety
export enum VesselImage {
    PSV_TOP = "psv-top",
    CARGO_TOP = "cargo-top",
    TANKER_TOP = "tanker-top"
}

export enum CompassDirection {
    NORTH_UP = "northUp",
    HEAD_UP = "headUp"
}

interface CompassProps {
    // Basic properties (supported by React wrapper)
    heading?: number; // degrees, 0-360, Default: 0
    courseOverGround?: number; // degrees, 0-360, Default: 0
    headingAdvices?: AngleAdvice[]; // Default: []
    
    // Animation properties
    animated?: boolean; // Enable animation
    animationSpeed?: number; // Animation speed multiplier
    headingChangeRate?: number; // Degrees per second for heading changes
    courseChangeRate?: number; // Degrees per second for course changes
    
    // Style properties
    size?: number; // px for container size
}

const Compass: React.FC<CompassProps> = ({
    heading = 100,
    courseOverGround = 258,
    headingAdvices = [],
    animated = false,
    animationSpeed = 1,
    headingChangeRate = 30, // degrees per second
    courseChangeRate = 25,  // degrees per second
    size = 400
}) => {
    const [currentHeading, setCurrentHeading] = useState(heading);
    const [currentCOG, setCurrentCOG] = useState(courseOverGround);
    const animationRef = useRef<number>();

    // Animation logic for realistic vessel movement
    const animateCompass = useCallback(() => {
        if (!animated) return;

        setCurrentHeading(() => {
            // Smooth heading changes with realistic maritime movement
            const headingDelta = Math.sin(Date.now() * 0.001 * animationSpeed) * headingChangeRate;
            let newHeading = (heading + headingDelta) % 360;
            if (newHeading < 0) newHeading += 360;
            return newHeading;
        });

        setCurrentCOG(() => {
            // Course over ground follows heading with some lag and drift
            const cogDelta = Math.sin(Date.now() * 0.0008 * animationSpeed) * courseChangeRate;
            let newCOG = (courseOverGround + cogDelta) % 360;
            if (newCOG < 0) newCOG += 360;
            return newCOG;
        });

        animationRef.current = requestAnimationFrame(animateCompass);
    }, [animated, animationSpeed, heading, courseOverGround, headingChangeRate, courseChangeRate]);

    // Start/stop animation
    useEffect(() => {
        if (animated) {
            animationRef.current = requestAnimationFrame(animateCompass);
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            // Reset to static values when animation is disabled
            setCurrentHeading(heading);
            setCurrentCOG(courseOverGround);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [animated, animateCompass, heading, courseOverGround]);

    // Use animated values if animation is enabled, otherwise use props
    const displayHeading = animated ? currentHeading : heading;
    const displayCOG = animated ? currentCOG : courseOverGround;

    return (
        <div style={{ 
            width: size, 
            height: size,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <obc-compass 
                heading={displayHeading}
                course-over-ground={displayCOG}
                heading-advices={JSON.stringify([
                  {
                    minAngle: 100,
                    maxAngle: 60,
                    type: "advice",
                    hinted: false
                  }
                ])}
                style={{ 
                    width: `${size}px`, 
                    height: `${size}px` 
                }}
            />
        </div>
    );
};

export default Compass;