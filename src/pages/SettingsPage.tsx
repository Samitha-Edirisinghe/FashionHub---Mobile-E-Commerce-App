import { User, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

const settingsItems = [
  { icon: User, label: 'Profile', description: 'Edit your profile information' },
  { icon: Bell, label: 'Notifications', description: 'Manage notification preferences' },
  { icon: Shield, label: 'Privacy', description: 'Privacy and security settings' },
  { icon: HelpCircle, label: 'Help Center', description: 'Get help and support' },
];

const SettingsPage = () => {
  return (
    <div className="page-container">
      <PageHeader title="Settings" showBack={false} />
      
      <div className="px-4">
        <div className="space-y-2">
          {settingsItems.map(({ icon: Icon, label, description }) => (
            <button 
              key={label}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Icon className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{label}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </button>
          ))}
        </div>

        <button className="w-full flex items-center gap-4 p-4 mt-8 rounded-xl hover:bg-red-50 transition-colors text-destructive">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="font-medium">Log Out</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default SettingsPage;
