import React from 'react';
import { ObcTopBar } from "@oicl/openbridge-webcomponents-react/components/top-bar/top-bar";
import { ObcButton } from "@oicl/openbridge-webcomponents-react/components/button/button";
import { ObcBadge } from "@oicl/openbridge-webcomponents-react/components/badge/badge";
import { ObcClock } from "@oicl/openbridge-webcomponents-react/components/clock/clock";
import { ObcBreadcrumb } from "@oicl/openbridge-webcomponents-react/components/breadcrumb/breadcrumb";
import { ObcInput } from "@oicl/openbridge-webcomponents-react/components/input/input";
import { ObcSelect } from "@oicl/openbridge-webcomponents-react/components/select/select";
import { ObiPlaceholder } from "@oicl/openbridge-webcomponents-react/icons/icon-placeholder";

const SampleUI: React.FC = () => {
    return (
    <div>
      <ObcTopBar>
        <ObcBadge>OpenBridge System</ObcBadge>
        <ObcClock />
      </ObcTopBar>
        <div >
          <h1>Breadcrumb Component Sample!</h1>
          <div className="obc-component-size-regular">
            <ObcBreadcrumb items={[
              { label: "Home" },
              { label: "Navigation" },
              { label: "Current Page" }
            ]} />
          </div>
        </div>
        
        <div>
          <h1>Button Component Sample!</h1>
          <ObcButton onClick={() => alert("OpenBridge button clicked!")}>
            <ObiPlaceholder slot="leading-icon"  />
            Button with Icon
          </ObcButton>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <h1>Input Field Component Sample!</h1>
          <div className="obc-component-size-regular">
            <ObcInput 
              style={{ width: '240px', display: 'block' }} 
              placeholder="Placeholder" 
              value=""
            />
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <h2>OpenBridge Input Examples:</h2>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', maxWidth: '400px' }}>
              <ObcInput placeholder="Default Input" style={{ width: '240px' }} />
              <ObcInput placeholder="Email Input" type="email" style={{ width: '240px' }} />
              <ObcInput placeholder="Password Input" type="password" style={{ width: '240px' }} />
              <ObcInput placeholder="Number Input" type="number" style={{ width: '240px' }} />
              <ObcInput placeholder="Read-only style" style={{ width: '240px', opacity: 0.6 }} />
              <ObcInput placeholder="Input with Value" value="Sample text" style={{ width: '240px' }} />
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <h1>Select/Dropdown Component Sample!</h1>
          <div className="obc-component-size-regular">
            <ObcSelect
              options={[
                { value: 'volvo', label: 'Volvo' },
                { value: 'xc90', label: 'XC 90', level: 2 },
                { value: 'mercedes', label: 'Mercedes' },
                { value: 'audi', label: 'Audi' }
              ]}
              value="volvo"
              onChange={(e) => console.log('Selected:', e.detail)}
            />
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <h2>OpenBridge Select Examples:</h2>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', maxWidth: '400px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Car Brands:</label>
                <ObcSelect
                  options={[
                    { value: 'volvo', label: 'Volvo' },
                    { value: 'xc90', label: 'XC 90', level: 2 },
                    { value: 'xc60', label: 'XC 60', level: 2 },
                    { value: 'mercedes', label: 'Mercedes' },
                    { value: 'c-class', label: 'C-Class', level: 2 },
                    { value: 'e-class', label: 'E-Class', level: 2 },
                    { value: 'audi', label: 'Audi' },
                    { value: 'a4', label: 'A4', level: 2 },
                    { value: 'a6', label: 'A6', level: 2 }
                  ]}
                  value="mercedes"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Countries:</label>
                <ObcSelect
                  options={[
                    { value: 'us', label: 'United States' },
                    { value: 'uk', label: 'United Kingdom' },
                    { value: 'de', label: 'Germany' },
                    { value: 'fr', label: 'France' },
                    { value: 'jp', label: 'Japan' }
                  ]}
                  value="us"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Width Select:</label>
                <ObcSelect
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' }
                  ]}
                  value="option1"
                  fullWidth={true}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <h1>Pagination Component Sample!</h1>
          <div className="obc-component-size-regular">
            {/* Custom pagination using OpenBridge buttons since obc-pagination is not available */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
              <ObcButton disabled>‹ Previous</ObcButton>
              <ObcButton style={{ backgroundColor: 'var(--obc-color-on-surface-medium)', color: 'white' }}>1</ObcButton>
              <ObcButton>2</ObcButton>
              <ObcButton>3</ObcButton>
              <ObcButton>4</ObcButton>
              <ObcButton>5</ObcButton>
              <ObcButton>Next ›</ObcButton>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
            Note: Using OpenBridge buttons to create pagination since obc-pagination component is not available in this version
          </p>
        </div>
        
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <h2>OpenBridge Button Examples:</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <ObcButton variant="normal">Normal Button</ObcButton>
            <ObcButton variant="raised">Raised Button</ObcButton>
            <ObcButton variant="flat">Flat Button</ObcButton>
            <ObcButton variant="check">Check Button</ObcButton>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <ObcButton disabled>Disabled Button</ObcButton>
            <ObcButton fullWidth>Full Width Button</ObcButton>
          </div>
        </div>
    </div>
    );
};

export default SampleUI;