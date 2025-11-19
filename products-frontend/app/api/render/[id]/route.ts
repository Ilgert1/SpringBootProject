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
        
        // Create all Lucide icons as React components
        const createIcon = (iconName) => {
            return (props) => {
                const ref = React.useRef();
                React.useEffect(() => {
                    if (ref.current && window.lucide) {
                        const icon = window.lucide[iconName];
                        if (icon) {
                            ref.current.innerHTML = '';
                            window.lucide.createElement(icon).setAttribute('stroke-width', props.strokeWidth || 2);
                            ref.current.appendChild(window.lucide.createElement(icon));
                        }
                    }
                }, []);
                return React.createElement('i', { 
                    ref,
                    className: props.className,
                    style: { display: 'inline-block', width: '1em', height: '1em' }
                });
            };
        };
        
        
        // Create all common icons - COMPREHENSIVE LIST
        const Scale = createIcon('Scale');
        const Balance = createIcon('Balance');
        // Contact & Social
        const Phone = createIcon('Phone');
        const Mail = createIcon('Mail');
        const MapPin = createIcon('MapPin');
        const MessageCircle = createIcon('MessageCircle');
        const Facebook = createIcon('Facebook');
        const Twitter = createIcon('Twitter');
        const Instagram = createIcon('Instagram');
        const Linkedin = createIcon('Linkedin');
        const Youtube = createIcon('Youtube');
        
        // UI & Navigation
        const Menu = createIcon('Menu');
        const X = createIcon('X');
        const Check = createIcon('Check');
        const CheckCircle = createIcon('CheckCircle');
        const ChevronRight = createIcon('ChevronRight');
        const ChevronDown = createIcon('ChevronDown');
        const ChevronUp = createIcon('ChevronUp');
        const ChevronLeft = createIcon('ChevronLeft');
        const ArrowRight = createIcon('ArrowRight');
        const ArrowLeft = createIcon('ArrowLeft');
        const ExternalLink = createIcon('ExternalLink');
        const Info = createIcon('Info');
        const AlertCircle = createIcon('AlertCircle');
        
        // Time & Calendar
        const Clock = createIcon('Clock');
        const Calendar = createIcon('Calendar');
        
        // People & Users
        const Users = createIcon('Users');
        const User = createIcon('User');
        const UserCheck = createIcon('UserCheck');
        
        // Ratings & Achievement
        const Star = createIcon('Star');
        const Award = createIcon('Award');
        const Trophy = createIcon('Trophy');
        const Target = createIcon('Target');
        const Medal = createIcon('Medal');
        
        // Food & Beverage
        const ChefHat = createIcon('ChefHat');
        const Pizza = createIcon('Pizza');
        const Utensils = createIcon('Utensils');
        const Coffee = createIcon('Coffee');
        const Wine = createIcon('Wine');
        const Cookie = createIcon('Cookie');
        const IceCream = createIcon('IceCream');
        const Soup = createIcon('Soup');
        const Salad = createIcon('Salad');
        
        // Medical & Health
        const Stethoscope = createIcon('Stethoscope');
        const Activity = createIcon('Activity');
        const Heart = createIcon('Heart');
        const HeartPulse = createIcon('HeartPulse');
        const Shield = createIcon('Shield');
        const Pill = createIcon('Pill');
        const Syringe = createIcon('Syringe');
        const Thermometer = createIcon('Thermometer');
        const Cross = createIcon('Cross');
        
        // Fitness & Sports
        const Dumbbell = createIcon('Dumbbell');
        const Bike = createIcon('Bike');
        const Flame = createIcon('Flame');
        const Timer = createIcon('Timer');
        const Footprints = createIcon('Footprints');
        
        // Business & Commerce
        const Briefcase = createIcon('Briefcase');
        const Building = createIcon('Building');
        const Building2 = createIcon('Building2');
        const Store = createIcon('Store');
        const ShoppingBag = createIcon('ShoppingBag');
        const ShoppingCart = createIcon('ShoppingCart');
        const CreditCard = createIcon('CreditCard');
        const DollarSign = createIcon('DollarSign');
        const Receipt = createIcon('Receipt');
        const Tag = createIcon('Tag');
        const Bed = createIcon('Bed');
        
        // Services & Tools
        const Wrench = createIcon('Wrench');
        const Hammer = createIcon('Hammer');
        const Scissors = createIcon('Scissors');
        const Paintbrush = createIcon('Paintbrush');
        const PaintBucket = createIcon('PaintBucket');
        const Car = createIcon('Car');
        const Home = createIcon('Home');
        const Key = createIcon('Key');
        const Zap = createIcon('Zap');
        const Settings = createIcon('Settings');
        const Tool = createIcon('Tool');
        const Drill = createIcon('Drill');
        
        // Beauty & Wellness
        const Sparkles = createIcon('Sparkles');
        const Smile = createIcon('Smile');
        const Eye = createIcon('Eye');
        
        // Education & Learning
        const Book = createIcon('Book');
        const BookOpen = createIcon('BookOpen');
        const GraduationCap = createIcon('GraduationCap');
        
        // Technology
        const Laptop = createIcon('Laptop');
        const Smartphone = createIcon('Smartphone');
        const Wifi = createIcon('Wifi');
        const Globe = createIcon('Globe');
        
        // Nature & Environment
        const Leaf = createIcon('Leaf');
        const Trees = createIcon('Trees');
        const Sun = createIcon('Sun');
        const Moon = createIcon('Moon');
        
        // Entertainment
        const Music = createIcon('Music');
        const Film = createIcon('Film');
        const Camera = createIcon('Camera');
        const Tv = createIcon('Tv');
        
        // Transportation
        const Plane = createIcon('Plane');
        const Train = createIcon('Train');
        const Bus = createIcon('Bus');
        
        // Miscellaneous
        const Gift = createIcon('Gift');
        const Package = createIcon('Package');
        const Image = createIcon('Image');
        const Lightbulb = createIcon('Lightbulb');
        const Percent = createIcon('Percent');
        const Banknote = createIcon('Banknote');

        ${transformedCode}

        // Render the component
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