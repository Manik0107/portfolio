import { useEffect, useRef } from 'react';

export default function CodingBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Single glyphs + short code tokens for Matrix-rain aesthetic
        const chars = [
            '{', '}', '(', ')', ';', ':', '<', '>', '/', '=',
            'fn', '=>', '{}', 'AI', '0x', 'if', 'db', '++',
            '01', '10', '&&', '||', '!=', '<<', '>>', '//',
            'λ', 'Σ', 'Δ', 'π', '∞', '→', '⊕', '∴',
            '0', '1', 'x', 'y', 'z', 'n', 'i', 'k',
        ];

        // Column spacing ~50px to align with neural-grid
        const colWidth = 50;
        const fontSize = 14;
        const columns = Math.floor(canvas.width / colWidth);
        const drops: number[] = Array(columns).fill(0).map(() => Math.random() * -50);

        const draw = () => {
            // Longer trail fade for blending with grid
            ctx.fillStyle = 'rgba(10, 13, 18, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px 'JetBrains Mono', 'Courier New', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const xPos = i * colWidth;
                const yPos = drops[i] * fontSize;

                // Alternating blue and turquoise
                const useBlue = i % 2 === 0;
                ctx.fillStyle = useBlue
                    ? 'rgba(59, 130, 246, 0.35)'
                    : 'rgba(45, 212, 191, 0.35)';

                // Occasional glow
                if (Math.random() > 0.95) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = useBlue ? 'rgba(59, 130, 246, 0.6)' : 'rgba(45, 212, 191, 0.6)';
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fillText(text, xPos, yPos);

                if (yPos > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        // Slower interval (80ms) for calmer ambient feel
        const interval = setInterval(draw, 80);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', setCanvasSize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-30 pointer-events-none"
            style={{
                opacity: 0.4,
                mixBlendMode: 'screen',
            }}
        />
    );
}
