import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const {id: businessId} = await params;

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

        const transformedCode = transformCodeForBrowser(generatedCode);
//language=HTML
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${data.businessName || 'Business'} - Preview</title>

                <script src="https://cdn.tailwindcss.com"></script>
                <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
                <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
                <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
                <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

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
                const { useState, useEffect, useRef } = React;

                // FIXED: Simpler approach - just render SVG directly
                // Fallback for any missing icon
                const createIcon = (iconName) => {
                    return ({size = 24, className = '', strokeWidth = 2, ...props}) => {
                        const svgRef = useRef();

                        useEffect(() => {
                            if (svgRef.current && window.lucide) {
                                try {
                                    window.lucide.createIcons({
                                        icons: {
                                            [iconName]: window.lucide[iconName]
                                        },
                                        attrs: {
                                            'stroke-width': strokeWidth
                                        }
                                    });
                                } catch (e) {
                                    console.warn(\`Icon not found\`);
                                }
                            }
                        }, []);

                        return (
                                <i
                                        ref={svgRef}
                                        data-lucide={iconName.toLowerCase()}
                                        className={className}
                                        style={{width: size, height: size, display: 'inline-block'}}
                                        {...props}
                                />
                        );
                    };
                };

                // Auto-create icons for common names
                const iconNames = ['phone', 'mail', 'map-pin', 'star', 'clock', 'calendar', 'users', 'user',
                    'facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'heart', 'activity', 'coffee',
                    'layers', 'grid', 'award', 'briefcase', 'shopping-bag', 'shopping-cart', 'building',
                    'building-2', 'sparkles', 'zap', 'shield', 'target', 'trending-up', 'check-circle',
                    'chevron-right', 'chevron-down', 'chevron-up', 'chevron-left', 'arrow-right', 'arrow-left',
                    'menu', 'x', 'check', 'info', 'alert-circle', 'external-link', 'message-circle', 'user-check',
                    'trophy', 'medal', 'chef-hat', 'pizza', 'utensils', 'wine', 'cookie', 'ice-cream', 'soup',
                    'salad', 'stethoscope', 'heart-pulse', 'pill', 'syringe', 'thermometer', 'cross', 'dumbbell',
                    'bike', 'flame', 'timer', 'footprints', 'store', 'credit-card', 'dollar-sign', 'receipt',
                    'tag', 'bed', 'wrench', 'hammer', 'scissors', 'paintbrush', 'paint-bucket', 'car', 'home',
                    'key', 'settings', 'tool', 'drill', 'smile', 'eye', 'book', 'book-open', 'graduation-cap',
                    'laptop', 'smartphone', 'wifi', 'globe', 'leaf', 'trees', 'sun', 'moon', 'music', 'film',
                    'camera', 'tv', 'plane', 'train', 'bus', 'gift', 'package', 'image', 'lightbulb', 'percent',
                    'banknote', 'tree-pine', 'truck', 'scale', 'balance'];

                // Create PascalCase variables from kebab-case names
                iconNames.forEach(name => {
                    const pascalName = name.split('-').map(word =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                    ).join('');
                    window[pascalName] = createIcon(name);
                });

                // Create all icon components
                // Create ALL common Lucide icons (comprehensive list)
                const Church = createIcon('Church');
                const Phone = createIcon('phone');
                const Mail = createIcon('mail');
                const MapPin = createIcon('map-pin');
                const Star = createIcon('star');
                const Clock = createIcon('clock');
                const Calendar = createIcon('calendar');
                const Users = createIcon('users');
                const User = createIcon('user');
                const Facebook = createIcon('facebook');
                const Twitter = createIcon('twitter');
                const Instagram = createIcon('instagram');
                const Linkedin = createIcon('linkedin');
                const Youtube = createIcon('youtube');
                const Heart = createIcon('heart');
                const Activity = createIcon('activity');
                const Coffee = createIcon('coffee');
                const Layers = createIcon('layers');
                const Grid = createIcon('grid');
                const Award = createIcon('award');
                const Briefcase = createIcon('briefcase');
                const ShoppingBag = createIcon('shopping-bag');
                const ShoppingCart = createIcon('shopping-cart');
                const Building = createIcon('building');
                const Building2 = createIcon('building-2');
                const Sparkles = createIcon('sparkles');
                const Zap = createIcon('zap');
                const Shield = createIcon('shield');
                const Target = createIcon('target');
                const TrendingUp = createIcon('trending-up');
                const CheckCircle = createIcon('check-circle');
                const ChevronRight = createIcon('chevron-right');
                const ChevronDown = createIcon('chevron-down');
                const ChevronUp = createIcon('chevron-up');
                const ChevronLeft = createIcon('chevron-left');
                const ArrowRight = createIcon('arrow-right');
                const ArrowLeft = createIcon('arrow-left');
                const Menu = createIcon('menu');
                const X = createIcon('x');
                const Check = createIcon('check');
                const Info = createIcon('info');
                const AlertCircle = createIcon('alert-circle');
                const ExternalLink = createIcon('external-link');
                const MessageCircle = createIcon('message-circle');
                const UserCheck = createIcon('user-check');
                const Trophy = createIcon('trophy');
                const Medal = createIcon('medal');
                const ChefHat = createIcon('chef-hat');
                const Pizza = createIcon('pizza');
                const Utensils = createIcon('utensils');
                const Wine = createIcon('wine');
                const Cookie = createIcon('cookie');
                const IceCream = createIcon('ice-cream');
                const Soup = createIcon('soup');
                const Salad = createIcon('salad');
                const Stethoscope = createIcon('stethoscope');
                const HeartPulse = createIcon('heart-pulse');
                const Pill = createIcon('pill');
                const Syringe = createIcon('syringe');
                const Thermometer = createIcon('thermometer');
                const Cross = createIcon('cross');
                const Dumbbell = createIcon('dumbbell');
                const Bike = createIcon('bike');
                const Flame = createIcon('flame');
                const Timer = createIcon('timer');
                const Footprints = createIcon('footprints');
                const Store = createIcon('store');
                const CreditCard = createIcon('credit-card');
                const DollarSign = createIcon('dollar-sign');
                const Receipt = createIcon('receipt');
                const Tag = createIcon('tag');
                const Bed = createIcon('bed');
                const Wrench = createIcon('wrench');
                const Hammer = createIcon('hammer');
                const Scissors = createIcon('scissors');
                const Paintbrush = createIcon('paintbrush');
                const PaintBucket = createIcon('paint-bucket');
                const Car = createIcon('car');
                const Home = createIcon('home');
                const Key = createIcon('key');
                const Settings = createIcon('settings');
                const Tool = createIcon('tool');
                const Drill = createIcon('drill');
                const Smile = createIcon('smile');
                const Eye = createIcon('eye');
                const Book = createIcon('book');
                const BookOpen = createIcon('book-open');
                const GraduationCap = createIcon('graduation-cap');
                const Laptop = createIcon('laptop');
                const Smartphone = createIcon('smartphone');
                const Wifi = createIcon('wifi');
                const Globe = createIcon('globe');
                const Leaf = createIcon('leaf');
                const Trees = createIcon('trees');
                const Sun = createIcon('sun');
                const Moon = createIcon('moon');
                const Music = createIcon('music');
                const Film = createIcon('film');
                const Camera = createIcon('camera');
                const Tv = createIcon('tv');
                const Plane = createIcon('plane');
                const Train = createIcon('train');
                const Bus = createIcon('bus');
                const Gift = createIcon('gift');
                const Package = createIcon('package');
                const Image = createIcon('image');
                const Lightbulb = createIcon('lightbulb');
                const Percent = createIcon('percent');
                const Banknote = createIcon('banknote');
                const TreePine = createIcon('tree-pine');
                const Truck = createIcon('truck');
                const Scale = createIcon('scale');
                const Balance = createIcon('balance');

                // Framer Motion mock (disable animations)
                const motion = {
                    div: ({initial, animate, whileInView, viewport, variants, whileHover, ...props}) => <div {...props} />,
                    section: ({initial, animate, whileInView, viewport, variants, whileHover, ...props}) => <section {...props} />,
                    button: ({initial, animate, whileInView, viewport, variants, whileHover, ...props}) => <button {...props} />,
                    a: ({initial, animate, whileInView, viewport, variants, whileHover, ...props}) => <a {...props} />,
                    span: ({initial, animate, whileInView, viewport, variants, whileHover, ...props}) => <span {...props} />,
                    h1: ({initial, animate, whileInView, viewport, variants, whileHover, ...props}) => <h1 {...props} />,
                    h2: ({initial, animate, whileInView, viewport, variants, whileHover, ...props}) => <h2 {...props} />,
                    h3: ({initial, animate, whileInView, viewport, variants, whileHover, ...props}) => <h3 {...props} />,
                    p: ({initial, animate, whileInView, viewport, variants, whileHover, ...props}) => <p {...props} />,
                };

                ${transformedCode}

                // Render component
                const rootElement = document.getElementById('root');
                const root = ReactDOM.createRoot(rootElement);

                // Try to render whichever component was exported
                const Component = typeof ProfessionalTemplate !== 'undefined' ? ProfessionalTemplate :
                        typeof LocalTemplate !== 'undefined' ? LocalTemplate :
                                typeof LuxuryTemplate !== 'undefined' ? LuxuryTemplate :
                                        typeof CreativeTemplate !== 'undefined' ? CreativeTemplate :
                                                typeof ModernTemplate !== 'undefined' ? ModernTemplate :
                                                        BusinessWebsite;

                root.render(<Component />);
            </script>
            </body>
            </html>
        `;
/*------------------*/
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
    let transformed = code
        .replace(/import\s+.*from\s+['"]react['"];?\n?/g, '')
        .replace(/import\s+.*from\s+['"]lucide-react['"];?\n?/g, '')
        .replace(/import\s+{[^}]*}\s+from\s+['"]lucide-react['"];?\n?/g, '')
        .replace(/import\s+{[^}]*}\s+from\s+['"]framer-motion['"];?\n?/g, '');

    transformed = transformed.replace(/export default /g, '');

    return transformed;
}