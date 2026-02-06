import { Search } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

const SearchPage = () => {
  return (
    <div className="page-container">
      <PageHeader title="Search" showBack={false} />
      
      <div className="px-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        
        <div className="mt-8 text-center text-muted-foreground">
          <p>Search for your favorite products</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SearchPage;
