import { useEffect, useRef } from 'react';

const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Configuration
        // Cyrillic characters mixed with some numbers and tech symbols
        const chars = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789<>[]{}';
        const charArray = chars.split('');
        const fontSize = 16;
        const columns = canvas.width / fontSize;

        // Array to track the y position of each column
        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -100); // Start above standard view randomly
        }

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = 'rgba(10, 15, 30, 0.1)'; // Slightly darker fade to prevent too much buildup
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`; // Use app's mono font
            ctx.textBaseline = 'top'; // Ensure text draws from top

            for (let i = 0; i < drops.length; i++) {
                // Randomly pick a character
                const text = charArray[Math.floor(Math.random() * charArray.length)];

                // Color logic:
                // Primary Blue: #3b82f6
                // Accent Turquoise: #2dd4bf
                // Brighter colors for visibility
                const isAccent = Math.random() > 0.8;
                ctx.fillStyle = isAccent ? '#5eead4' : '#60a5fa'; // Lighter shades of teal/blue

                // Add some glow
                ctx.shadowBlur = isAccent ? 8 : 4;
                ctx.shadowColor = ctx.fillStyle;

                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                // Reset shadow for performance
                ctx.shadowBlur = 0;

                // Reset drop to top randomly after it crosses screen
                // Adding randomness to the reset makes it look less uniform
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33); // ~30fps

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-50"
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
        </div>
    );
};

export default MatrixRain;
