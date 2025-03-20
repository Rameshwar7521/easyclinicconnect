
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, ArrowRight, Clock, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { hospitals, Hospital, Department, Doctor } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

interface DoctorSelectionProps {
  hospitalId: string;
  onSelectDoctor: (doctorId: string, departmentId: string) => void;
  onBack: () => void;
}

const DoctorSelection: React.FC<DoctorSelectionProps> = ({ 
  hospitalId, 
  onSelectDoctor,
  onBack 
}) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  // Find the selected hospital
  useEffect(() => {
    const hospital = hospitals.find(h => h.id === hospitalId);
    if (hospital) {
      setSelectedHospital(hospital);
      // Default to first department
      if (hospital.departments.length > 0) {
        setSelectedDepartment(hospital.departments[0].id);
      }
    }
  }, [hospitalId]);

  const handleContinue = () => {
    if (selectedDoctor && selectedDepartment) {
      onSelectDoctor(selectedDoctor, selectedDepartment);
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  if (!selectedHospital) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-2">Select Department & Doctor</h2>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <p className="text-muted-foreground">
          You selected <span className="font-medium text-foreground">{selectedHospital.name}</span>
        </p>
      </div>

      <div className="mb-6">
        <Tabs
          value={selectedDepartment}
          onValueChange={setSelectedDepartment}
          className="w-full"
        >
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-max flex">
              {selectedHospital.departments.map((dept) => (
                <TabsTrigger key={dept.id} value={dept.id} className="min-w-max">
                  {dept.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {selectedHospital.departments.map((dept) => (
            <TabsContent key={dept.id} value={dept.id}>
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-1">{dept.name}</h3>
                <p className="text-muted-foreground text-sm">{dept.description}</p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
              >
                {dept.doctors.map((doctor) => (
                  <motion.div key={doctor.id} variants={itemVariants}>
                    <Card
                      className={`cursor-pointer overflow-hidden hover:shadow-md transition-all ${
                        selectedDoctor === doctor.id
                          ? 'border-primary border-2'
                          : 'border-border'
                      }`}
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <div className="p-4 flex">
                        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h4 className="font-semibold">{doctor.name}</h4>
                          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                          
                          <div className="flex items-center mt-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm font-medium">${doctor.consultationFee}</span>
                            <span className="text-xs text-muted-foreground ml-1">consultation fee</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {doctor.availability.map((day, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {day}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {selectedDoctor === doctor.id && (
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center ml-2">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!selectedDoctor}
        >
          Continue to Booking
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default DoctorSelection;
