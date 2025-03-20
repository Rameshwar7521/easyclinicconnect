
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SerialTrackerProps {
  currentSerial: number;
  yourSerial: number;
  hospitalName: string;
  departmentName: string;
  doctorName: string;
}

const SerialTracker: React.FC<SerialTrackerProps> = ({
  currentSerial,
  yourSerial,
  hospitalName,
  departmentName,
  doctorName,
}) => {
  const [progress, setProgress] = useState(0);
  
  // Calculate progress
  useEffect(() => {
    if (yourSerial <= currentSerial) {
      setProgress(100); // Already called
    } else {
      // Calculate percentage progress
      const totalBefore = yourSerial - 1; // Total patients before you
      const complete = currentSerial; // Patients already seen
      const percent = Math.round((complete / totalBefore) * 100);
      setProgress(percent);
    }
  }, [currentSerial, yourSerial]);

  const estimatedWaitTime = () => {
    if (yourSerial <= currentSerial) {
      return 'It\'s your turn now!';
    }
    
    const patientsAhead = yourSerial - currentSerial;
    // Assume average time per patient is 10 minutes
    const waitTimeMinutes = patientsAhead * 10;
    
    if (waitTimeMinutes < 60) {
      return `About ${waitTimeMinutes} minutes`;
    } else {
      const hours = Math.floor(waitTimeMinutes / 60);
      const minutes = waitTimeMinutes % 60;
      return `About ${hours} hour${hours > 1 ? 's' : ''} ${minutes > 0 ? `and ${minutes} minutes` : ''}`;
    }
  };

  const getStatusColor = () => {
    if (yourSerial <= currentSerial) {
      return 'text-green-500';
    } else if (yourSerial - currentSerial <= 5) {
      return 'text-yellow-500';
    } else {
      return 'text-muted-foreground';
    }
  };

  const getStatusText = () => {
    if (yourSerial < currentSerial) {
      return 'Already Called';
    } else if (yourSerial === currentSerial) {
      return 'Currently Seeing';
    } else if (yourSerial - currentSerial <= 5) {
      return 'Coming Up Soon';
    } else {
      return 'In Queue';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <div className="bg-primary py-3 px-6">
          <h3 className="text-white font-medium">Live Serial Queue Status</h3>
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">{hospitalName}</p>
              <p className="font-medium">{departmentName} - {doctorName}</p>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm">Last updated: Just now</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">{currentSerial}</div>
              <div className="text-sm text-muted-foreground">Current Serial</div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">{yourSerial}</div>
              <div className="text-sm text-muted-foreground">Your Serial</div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg">
              <div className={`text-lg font-medium mb-2 ${getStatusColor()}`}>
                {getStatusText()}
              </div>
              <div className="text-sm text-muted-foreground">Status</div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Queue Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="bg-secondary/30 p-4 rounded-lg">
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Estimated Wait Time</h4>
                <p className="text-sm text-muted-foreground">{estimatedWaitTime()}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 border-t border-border pt-4">
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-muted-foreground">
              <div className="flex items-center mb-2 sm:mb-0">
                <UserCheck className="h-4 w-4 mr-2" />
                <span>Patients seen today: {currentSerial}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Patients waiting: {Math.max(0, yourSerial - currentSerial)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SerialTracker;
