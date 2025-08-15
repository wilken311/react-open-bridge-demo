import React from "react";
import "@oicl/openbridge-webcomponents/dist/navigation-instruments/azimuth-thruster/azimuth-thruster-labeled.js";

// TypeScript: Add custom element to JSX
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'obc-azimuth-thruster-labeled': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

const AzimuthThruster: React.FC<{ size?: number }> = ({ size = 400 }) => {
    return (
        <div className="wrapper" style={{ width: size, height: size }}>
            <obc-azimuth-thruster-labeled />
        </div>
    );
};

export default AzimuthThruster;
