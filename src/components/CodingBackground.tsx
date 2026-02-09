import { useEffect, useRef } from 'react';

export default function CodingBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Terminal commands and code snippets to display
        const codeSnippets = [
            '$ npm install @ai/agent',
            '$ git commit -m "feat: AI"',
            'const agent = new AI()',
            'async function process()',
            'import { Pipeline }',
            '=> data.transform()',
            'class NeuralNetwork {',
            'def train_model():',
            'model.fit(X_train)',
            '$ python train.py --gpu',
            'npm run build:prod',
            'docker run -d agent',
            'kubectl apply -f ai.yaml',
            'terraform apply --auto',
            '{ success: true }',
            'Training... 87%',
            'Processing batch...',
            'Inference complete',
            '[INFO] Model loaded',
            '>>> agent.execute()',
        ];

        // Column configuration - more visible
        const fontSize = 14;
        const columns = Math.floor(canvas.width / (fontSize * 1.5));
        const drops: number[] = Array(columns).fill(0).map(() => Math.random() * -100);

        // Animation
        const draw = () => {
            // Semi-transparent fade
            ctx.fillStyle = 'rgba(10, 13, 18, 0.03)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Set text style
            ctx.font = `${fontSize}px 'JetBrains Mono', 'Courier New', monospace`;

            // Draw code snippets
            for (let i = 0; i < drops.length; i++) {
                const text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                const x = i * fontSize * 1.5;
                const y = drops[i] * fontSize;

                // Brighter colors - alternating blue and turquoise
                const useBlue = i % 2 === 0;
                if (useBlue) {
                    ctx.fillStyle = 'rgba(59, 130, 246, 0.25)'; // Bright blue
                } else {
                    ctx.fillStyle = 'rgba(45, 212, 191, 0.25)'; // Bright turquoise  
                }

                ctx.fillText(text, x, y);

                // Add glow effect to some characters
                if (Math.random() > 0.95) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = useBlue ? 'rgba(59, 130, 246, 0.5)' : 'rgba(45, 212, 191, 0.5)';
                } else {
                    ctx.shadowBlur = 0;
                }

                // Randomly reset drop to top or continue falling
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        // Run animation
        const interval = setInterval(draw, 60);

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
                opacity: 0.7, // Much more visible
            }}
        />
    );
}
