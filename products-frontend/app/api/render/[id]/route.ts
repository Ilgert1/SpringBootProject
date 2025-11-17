import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const {id: businessId} = await params;

        // Fetch the generated code from your Spring Boot API
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/businesses/${businessId}/generated-code`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            return new NextResponse('Code not found', { status: 404 });
        }

        const data = await response.json();
        const generatedCode = data.generatedCode;

        // Transform the React component code to work in standalone HTML
        const transformedCode = transformCodeForBrowser(generatedCode);

        // Create a complete HTML document
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.businessName} - Preview</title>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- React and ReactDOM from CDN -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    
    <!-- Babel Standalone for JSX -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
    <!-- Lucide Icons Script -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, sans-serif;
        }
    </style>
</head>
<body>
    <div id="root"></div>

   <script type="text/babel">
    const { useState, useEffect } = React;
    
    // Create icon component factory
    const createIcon = (iconName) => {
        return (props) => {
            const ref = React.useRef();
            React.useEffect(() => {
                if (ref.current && window.lucide) {
                    const icon = window.lucide[iconName];
                    if (icon) {
                        ref.current.innerHTML = '';
                        const iconElement = window.lucide.createElement(icon);
                        iconElement.setAttribute('stroke-width', props.strokeWidth || 2);
                        if (props.className) {
                            iconElement.setAttribute('class', props.className);
                        }
                        if (props.size) {
                            iconElement.setAttribute('width', props.size);
                            iconElement.setAttribute('height', props.size);
                        }
                        ref.current.appendChild(iconElement);
                    }
                }
            }, [props.className, props.size, props.strokeWidth]);
            return React.createElement('i', { 
                ref,
                className: props.className,
                style: { display: 'inline-block', width: '1em', height: '1em', ...props.style }
            });
        };
    };
    
    // Create a Proxy that generates ANY Lucide icon automatically
    const IconProxy = new Proxy({}, {
        get: function(target, iconName) {
            if (typeof iconName === 'string') {
                // Create icon on-the-fly if it doesn't exist
                if (!target[iconName]) {
                    target[iconName] = createIcon(iconName);
                }
                return target[iconName];
            }
            return undefined;
        }
    });
    
    // Make ALL Lucide icons available via the Proxy
    // When Claude uses <Phone />, it becomes IconProxy.Phone
    ${generateIconExports()}

    ${transformedCode}

    const rootElement = document.getElementById('root');
    const root = ReactDOM.createRoot(rootElement);
    root.render(React.createElement(BusinessWebsite));
</script>
</body>
</html>
        `;

        return new NextResponse(html, {
            headers: {
                'Content-Type': 'text/html',
            },
        });

    } catch (error) {
        console.error('Error rendering preview:', error);
        return new NextResponse('Error rendering preview', { status: 500 });
    }
}

function transformCodeForBrowser(code: string): string {
    // Remove import statements
    let transformed = code
        .replace(/import\s+.*from\s+['"]react['"];?\n?/g, '')
        .replace(/import\s+.*from\s+['"]lucide-react['"];?\n?/g, '')
        .replace(/import\s+{[^}]*}\s+from\s+['"]lucide-react['"];?\n?/g, '');

    // Remove 'export default'
    transformed = transformed.replace(/export default /g, '');

    return transformed;
}
function generateIconExports(): string {
    // Common icons that Claude uses - proxy handles the rest
    const commonIcons = [
        'Phone', 'Mail', 'MapPin', 'MessageCircle', 'Facebook', 'Instagram',
        'Twitter', 'Linkedin', 'Youtube', 'Star', 'Heart', 'Clock', 'Calendar',
        'ChevronRight', 'ChevronDown', 'ChevronLeft', 'Menu', 'X', 'Check',
        'Users', 'Award', 'Trophy', 'Target', 'Briefcase', 'Building', 'Store',
        'Home', 'Car', 'Wrench', 'Hammer', 'Scissors', 'Paintbrush', 'Settings',
        'Dumbbell', 'Activity', 'Stethoscope', 'Pill', 'ShoppingBag', 'CreditCard',
        'DollarSign', 'Smile', 'Sparkles', 'Coffee', 'Pizza', 'Utensils',
        'Scale', 'Weight', 'Calculator', 'Ruler', 'Package', 'Gift', 'Zap'
    ];

    return commonIcons.map(icon => `const ${icon} = IconProxy.${icon};`).join('\n    ');
}