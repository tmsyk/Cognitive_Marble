'use client';

import { useEffect, useRef } from 'react';

export default function MarbleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        // Blob objects
        const blobs = [
            {
                x: 0, y: 0,
                vx: 1, vy: 1,
                r: 150, color: 'rgba(59, 130, 246, 0.8)'
            }, // Blue
            {
                x: 0, y: 0,
                vx: -1, vy: 1,
                r: 180, color: 'rgba(168, 85, 247, 0.8)'
            }, // Purple
            {
                x: 0, y: 0,
                vx: 0.5, vy: -1.5,
                r: 200, color: 'rgba(236, 72, 153, 0.8)'
            }, // Pink
            {
                x: 0, y: 0,
                vx: -0.8, vy: -0.8,
                r: 160, color: 'rgba(14, 165, 233, 0.8)'
            }, // Sky
        ];

        const resize = () => {
            canvas.width = canvas.offsetWidth * 2; // Retina
            canvas.height = canvas.offsetHeight * 2;
            ctx.scale(2, 2);
        };
        window.addEventListener('resize', resize);
        resize();

        const render = () => {
            time += 0.01;
            const w = canvas.width / 2;
            const h = canvas.height / 2;

            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = '#0f0f12'; // Dark background
            ctx.fillRect(0, 0, w, h);

            // Use screen blend mode for glowing effect
            ctx.globalCompositeOperation = 'screen';

            blobs.forEach((blob, i) => {
                // Move blobs in Lissajous curves or simple sine waves
                blob.x = w / 2 + Math.cos(time * blob.vx + i) * (w / 4);
                blob.y = h / 2 + Math.sin(time * blob.vy + i) * (h / 4);

                const gradient = ctx.createRadialGradient(
                    blob.x, blob.y, 0,
                    blob.x, blob.y, blob.r
                );
                gradient.addColorStop(0, blob.color);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(blob.x, blob.y, blob.r * 2, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalCompositeOperation = 'source-over';

            // Glassy overlay
            // ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            // ctx.fillRect(0, 0, w, h);

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full opacity-80 blur-3xl mix-blend-screen" />;
}
