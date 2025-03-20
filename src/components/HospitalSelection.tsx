
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { hospitals } from '@/lib/data';

interface HospitalSelectionProps {
  onSelectHospital: (hospitalId: string) => void;
}

const HospitalSelection: React.FC<HospitalSelectionProps> = ({ onSelectHospital }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectHospital = (hospitalId: string) => {
    setSelectedHospitalId(hospitalId);
  };

  const handleContinue = () => {
    if (selectedHospitalId) {
      onSelectHospital(selectedHospitalId);
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Select Hospital</h2>
        <p className="text-muted-foreground">
          Choose a hospital from our network to proceed with your appointment
        </p>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Search hospitals by name or location"
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital) => (
            <motion.div key={hospital.id} variants={itemVariants}>
              <Card
                className={`cursor-pointer overflow-hidden hover:shadow-md transition-all ${
                  selectedHospitalId === hospital.id
                    ? 'border-primary border-2'
                    : 'border-border'
                }`}
                onClick={() => handleSelectHospital(hospital.id)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                    <div className="flex items-center px-2 py-1">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                      <span className="text-xs font-medium">4.8</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{hospital.name}</h3>
                  <div className="flex items-start text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{hospital.location}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {hospital.departments.slice(0, 3).map((dept) => (
                      <span 
                        key={dept.id}
                        className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {dept.name}
                      </span>
                    ))}
                    {hospital.departments.length > 3 && (
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        +{hospital.departments.length - 3} more
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-6">
            <p className="text-muted-foreground">No hospitals match your search criteria</p>
          </div>
        )}
      </motion.div>

      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!selectedHospitalId}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default HospitalSelection;
