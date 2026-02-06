import { ChevronLeft, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  showBookmark?: boolean;
  onBookmark?: () => void;
}

const PageHeader = ({ title, showBack = true, showBookmark = false, onBookmark }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-4 bg-background sticky top-0 z-40">
      <div className="w-10">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="header-icon"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
      </div>
      
      <h1 className="text-lg font-semibold">{title}</h1>
      
      <div className="w-10">
        {showBookmark && (
          <button
            onClick={onBookmark}
            className="header-icon"
            aria-label="Bookmark"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
