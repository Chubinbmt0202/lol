import { Card as AntCard } from 'antd';
import { IconButton } from '@/components/icon';
import { Icon } from '@iconify/react';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  onEdit: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, icon, onClick, onEdit }) => {
  return (
    <AntCard onClick={onClick} className="w-full cursor-pointer flex-col">
      <header className="flex w-full items-center">
        {icon}
        <span className="ml-4 text-xl opacity-70">{title}</span>
        <div className="ml-auto flex opacity-70">
          <IconButton onClick={onEdit}>
            <Icon icon="fontisto:more-v-a" width={18} height={18} />
          </IconButton>
        </div>
      </header>
      <main className="my-4 opacity-70">{description}</main>
    </AntCard>
  );
};

export default Card;
