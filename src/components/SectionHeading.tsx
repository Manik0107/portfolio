import { ReactNode } from 'react';

interface SectionHeadingProps {
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
}

export default function SectionHeading({ title, description, align = 'left' }: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={`mb-12 ${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      <h2 className="text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}
