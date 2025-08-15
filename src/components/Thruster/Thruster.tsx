import React from "react";
import "@oicl/openbridge-webcomponents/dist/navigation-instruments/thruster/thruster.js";

// TypeScript: Add custom element to JSX
// Extend JSX for obc-thruster custom element
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'obc-thruster': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                thrust?: number;
                setpoint?: number;
                state?: string;
                touching?: boolean;
                'at-setpoint'?: boolean;
                'disable-auto-at-setpoint'?: boolean;
                'auto-at-setpoint-deadband'?: number;
                'setpoint-at-zero-deadband'?: number;
                tunnel?: boolean;
                'single-sided'?: boolean;
                'single-direction'?: boolean;
                'single-direction-half-size'?: boolean;
                advices?: string;
                'top-propeller'?: string;
                'bottom-propeller'?: string;
            };
        }
    }
}

const Thruster: React.FC<{ size?: number }> = ({ size = 400 }) => {
    return (
        <div className="wrapper" style={{ width: size, height: size }}>
            <obc-thruster
                thrust={90}
                setpoint={-100}
                state="inCommand"
                touching={false}
                at-setpoint={false}
                disable-auto-at-setpoint={false}
                auto-at-setpoint-deadband={1}
                setpoint-at-zero-deadband={0.5}
                tunnel={false}
                single-sided={false}
                single-direction={false}
                single-direction-half-size={false}
                advices={JSON.stringify([])}
            />
        </div>
    );
};

export default Thruster;
