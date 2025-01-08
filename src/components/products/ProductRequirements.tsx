import { Shield } from 'lucide-react';

interface ProductRequirementsProps {
  requirements: string[];
}

export default function ProductRequirements({ requirements }: ProductRequirementsProps) {
  if (!requirements.length) return null;

  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-6">System Requirements</h3>
      
      <div className="space-y-4">
        {requirements.map((requirement, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-orange-400 flex-shrink-0" />
            <span className="text-gray-400">{requirement}</span>
          </div>
        ))}
      </div>
    </div>
  );
}