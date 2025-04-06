export interface TbuttonProps {
    to: string;
    variant: 'home' | 'popular' | 'now_playing' | 'top-rated' | 'upcoming';
    children: React.ReactNode;
}