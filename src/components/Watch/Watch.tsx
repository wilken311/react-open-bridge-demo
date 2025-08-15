// TypeScript: Add custom element to JSX
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'obc-watch': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                'angle-setpoint'?: number;
                state?: string;
                'at-angle-setpoint'?: boolean;
                padding?: number;
                'cut-angle-start'?: number;
                'cut-angle-end'?: number;
                'round-outside-cut'?: boolean;
                'round-inside-cut'?: boolean;
                'crosshair-enabled'?: boolean;
                'label-frame-enabled'?: boolean;
                tickmarks?: string;
                advices?: string;
            };
        }
    }
}
import React from "react";
import "@oicl/openbridge-webcomponents/dist/navigation-instruments/watch/watch.js";

const Watch: React.FC<{ size?: number }> = ({ size = 400 }) => {
    return (
        <div className="wrapper" style={{ width: size, height: size }}>
            <obc-watch
                angle-setpoint={90}
                state="inCommand"
                atangle-setpoint={true}
                padding={24}
                cut-angle-start={90}
                cut-angle-end={270}
                round-outside-cut={false}
                round-inside-cut={false}
                crosshair-enabled={false}
                label-frame-enabled={false}
                tickmarks={JSON.stringify([])}
                advices={JSON.stringify([
                    {
                        minAngle: 20,
                        maxAngle: 50,
                        type: "advice",
                        state: "hinted"
                    },
                    {
                        minAngle: 60,
                        maxAngle: 100,
                        type: "advice",
                        state: "regular"
                    },
                    {
                        minAngle: 110,
                        maxAngle: 140,
                        type: "advice",
                        state: "triggered"
                    },
                    {
                        minAngle: 190,
                        maxAngle: 230,
                        type: "caution",
                        state: "hinted"
                    },
                    {
                        minAngle: 240,
                        maxAngle: 280,
                        type: "caution",
                        state: "regular"
                    },
                    {
                        minAngle: 290,
                        maxAngle: 320,
                        type: "caution",
                        state: "triggered"
                    }
                ])}
            />
        </div>
    );
};

export default Watch;
