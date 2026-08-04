/**
 * LinkButton — renders a Next.js Link styled as a Button.
 * Use this instead of <Button asChild><Link> since shadcn v4's Button
 * is built on @base-ui/react/button which does not support asChild.
 */
import Link from 'next/link';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LinkButtonProps extends VariantProps<typeof buttonVariants> {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function LinkButton({
  href,
  variant = 'default',
  size = 'default',
  className,
  children,
  onClick,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(buttonVariants({ variant, size }), 'inline-flex items-center', className)}
    >
      {children}
    </Link>
  );
}
