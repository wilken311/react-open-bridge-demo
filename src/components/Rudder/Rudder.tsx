import React, { useState, useEffect, useCallback, useRef } from "react";
import "@oicl/openbridge-webcomponents/dist/navigation-instruments/rudder/rudder.js";

// Extend JSX IntrinsicElements to include the custom obc-rudder element
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'obc-rudder': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                angle?: number;
                setpoint?: number;
                'max-angle'?: number;
                'at-setpoint'?: boolean;
                'disable-auto-at-setpoint'?: boolean;
                'auto-at-setpoint-deadband'?: number;
                touching?: boolean;
            };
        }
    }
}

interface RudderProps {
    // Basic properties
    angle?: number; // Current rudder angle (-maxAngle to +maxAngle)
    setpoint?: number; // Target rudder angle setpoint
    maxAngle?: number; // Maximum rudder angle (default: 35 degrees)
    
    // Status indicators
    atSetpoint?: boolean; // Whether rudder is at setpoint
    disableAutoAtSetpoint?: boolean; // Disable automatic at-setpoint calculation
    autoAtSetpointDeadband?: number; // Deadband for setpoint calculation (default: 2 degrees)
    touching?: boolean; // Whether rudder is being touched/controlled
    
    // Animation properties
    animated?: boolean; // Enable animation
    animationSpeed?: number; // Animation speed multiplier
    oscillationRange?: number; // Degrees of oscillation for animation
    
    // Style properties
    size?: number; // Container size in pixels
}

const Rudder: React.FC<RudderProps> = ({
    angle = 31,
    setpoint,
    maxAngle = 35,
    atSetpoint = false,
    disableAutoAtSetpoint = false,
    autoAtSetpointDeadband = 2,
    touching = false,
    animated = false,
    animationSpeed = 1,
    oscillationRange = 10,
    size = 256
}) => {
    const [currentAngle, setCurrentAngle] = useState(angle);
    const [currentSetpoint, setCurrentSetpoint] = useState(setpoint || 0);
    const animationRef = useRef<number>();

    // Animation logic for realistic rudder movement
    const animateRudder = useCallback(() => {
        if (!animated) return;

        setCurrentAngle(() => {
            // Simulate realistic rudder movement with oscillation
            const oscillation = Math.sin(Date.now() * 0.002 * animationSpeed) * oscillationRange;
            let newAngle = angle + oscillation;
            
            // Keep within bounds
            newAngle = Math.max(-maxAngle, Math.min(maxAngle, newAngle));
            return newAngle;
        });

        setCurrentSetpoint(() => {
            // Setpoint changes more slowly
            const setpointOscillation = Math.sin(Date.now() * 0.001 * animationSpeed) * (oscillationRange * 0.7);
            let newSetpoint = (setpoint || 0) + setpointOscillation;
            
            // Keep within bounds
            newSetpoint = Math.max(-maxAngle, Math.min(maxAngle, newSetpoint));
            return newSetpoint;
        });

        animationRef.current = requestAnimationFrame(animateRudder);
    }, [animated, animationSpeed, angle, setpoint, maxAngle, oscillationRange]);

    // Start/stop animation
    useEffect(() => {
        if (animated) {
            animationRef.current = requestAnimationFrame(animateRudder);
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            // Reset to static values when animation is disabled
            setCurrentAngle(angle);
            setCurrentSetpoint(setpoint || 0);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [animated, animateRudder, angle, setpoint]);

    // Use animated values if animation is enabled, otherwise use props
    const displayAngle = animated ? currentAngle : angle;
    const displaySetpoint = animated ? currentSetpoint : setpoint;

    return (
        <div style={{ 
            width: size, 
            height: size,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <obc-rudder 
                angle={displayAngle}
                setpoint={displaySetpoint}
                max-angle={maxAngle}
                at-setpoint={atSetpoint}
                disable-auto-at-setpoint={disableAutoAtSetpoint}
                auto-at-setpoint-deadband={autoAtSetpointDeadband}
                touching={touching}
                style={{ 
                    width: `${size}px`, 
                    height: `${size}px` 
                }}
            />
        </div>
    );
};

export default Rudder;