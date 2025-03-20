
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Hospital, Calendar, User, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AppointmentStickerProps {
  patientName: string;
  patientAge: string;
  patientSex: 'Male' | 'Female' | 'Other';
  patientAddress: string;
  department: string;
  doctor: string;
  appointmentDate: Date | undefined;
  crNumber: string;
  serialNumber: number;
}

const AppointmentSticker: React.FC<AppointmentStickerProps> = ({
  patientName,
  patientAge,
  patientSex,
  patientAddress,
  department,
  doctor,
  appointmentDate,
  crNumber,
  serialNumber,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 border-2 border-dashed border-primary/50 bg-white">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <Hospital className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-bold text-lg">EasyClinic</h3>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Appointment ID</span>
            <p className="text-xs font-medium">{crNumber}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-start mb-2">
            <User className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
            <div>
              <h4 className="font-semibold">{patientName}</h4>
              <p className="text-xs text-muted-foreground">
                {patientAge} years, {patientSex}
              </p>
            </div>
          </div>
          
          <div className="flex items-start mb-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
            <p className="text-xs">{patientAddress}</p>
          </div>
        </div>

        <div className="mb-4 pt-3 border-t border-dashed border-gray-200">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Department</span>
              <span className="text-xs font-medium">{department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Doctor</span>
              <span className="text-xs font-medium">{doctor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Date</span>
              <span className="text-xs font-medium">
                {appointmentDate 
                  ? format(appointmentDate, 'MMMM d, yyyy') 
                  : 'Not specified'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200">
          <div>
            <span className="text-xs text-muted-foreground block">CR Number</span>
            <span className="font-bold text-lg">{crNumber}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground block">Serial Number</span>
            <span className="font-bold text-lg">{serialNumber}</span>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>Please arrive 15 minutes before your scheduled time</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default AppointmentSticker;
