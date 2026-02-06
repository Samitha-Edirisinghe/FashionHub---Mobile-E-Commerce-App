import { Link } from 'react-router-dom';
import onboardingModel from '@/assets/products/onboarding-model.jpg';

const OnboardingPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Image */}
      <div className="flex-1 px-6 pt-8 pb-4">
        <div className="relative w-full h-full max-h-[60vh] rounded-3xl overflow-hidden bg-secondary">
          <img
            src={onboardingModel}
            alt="Fashion model"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-10 pt-6 animate-slide-up">
        <h1 className="text-3xl font-bold text-foreground leading-tight">
          Find The<br />Best Collections
        </h1>
        
        <p className="text-muted-foreground mt-3 text-base">
          Get your dream item easily with FashionHub and get other interesting offer
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <Link 
            to="/home" 
            className="btn-outline flex-1 text-center"
          >
            Sign Up
          </Link>
          <Link 
            to="/home" 
            className="btn-primary flex-1 text-center"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
