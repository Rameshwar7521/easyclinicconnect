
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  CreditCard, 
  Calendar, 
  Clock, 
  Check, 
  Loader2,
  QrCode 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { hospitals, Hospital, Department, Doctor } from '@/lib/data';
import { PatientData } from './PatientForm';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppointmentSticker from './AppointmentSticker';

interface AppointmentSchedulerProps {
  hospitalId: string;
  departmentId: string;
  doctorId: string;
  patientData: PatientData;
  onBack: () => void;
  onComplete: (appointmentData: any) => void;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  hospitalId,
  departmentId,
  doctorId,
  patientData,
  onBack,
  onComplete,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');

  // Find the selected hospital, department, and doctor
  const hospital = hospitals.find(h => h.id === hospitalId);
  const department = hospital?.departments.find(d => d.id === departmentId);
  const doctor = department?.doctors.find(d => d.id === doctorId);

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      
      // Generate appointment data
      const crNumber = `CR${Math.floor(100000 + Math.random() * 900000)}`;
      const serialNumber = Math.floor(1 + Math.random() * 50);
      
      const newAppointmentData = {
        id: `a${Date.now()}`,
        patientId: `p${Date.now()}`,
        doctorId,
        hospitalId,
        departmentId,
        crNumber,
        serialNumber,
        date: patientData.appointmentDate?.toISOString() || new Date().toISOString(),
        status: 'Scheduled',
        paymentStatus: 'Paid',
        patientInfo: {
          id: `p${Date.now()}`,
          crNumber,
          name: patientData.name,
          age: parseInt(patientData.age),
          sex: patientData.sex,
          address: patientData.address,
          phone: patientData.phone,
          email: patientData.email,
        },
        createdAt: new Date().toISOString(),
      };
      
      setAppointmentData(newAppointmentData);
      toast.success('Payment successful! Your appointment has been confirmed.');
    }, 2000);
  };

  const handleComplete = () => {
    onComplete(appointmentData);
  };

  if (!hospital || !department || !doctor) {
    return <div>Error: Could not find selected hospital, department, or doctor.</div>;
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
          <h2 className="text-2xl font-bold mb-2">
            {isPaid ? 'Appointment Confirmed' : 'Payment Details'}
          </h2>
          {!isPaid && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
        </div>
        <p className="text-muted-foreground">
          {isPaid 
            ? 'Your appointment has been successfully booked' 
            : 'Complete your payment to confirm your appointment'}
        </p>
      </div>

      {!isPaid ? (
        // Payment section
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start border-b border-border pb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">{doctor.name}</h4>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  <p className="text-sm text-muted-foreground">{department.name}, {hospital.name}</p>
                </div>
              </div>
              
              <div className="space-y-3 py-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm font-medium">Appointment Date</p>
                    <p className="text-sm text-muted-foreground">
                      {patientData.appointmentDate 
                        ? format(patientData.appointmentDate, 'EEEE, MMMM d, yyyy') 
                        : 'Not specified'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm font-medium">Expected Time</p>
                    <p className="text-sm text-muted-foreground">To be determined (based on queue)</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Consultation Fee</span>
                  <span className="text-sm font-medium">${doctor.consultationFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Processing Fee</span>
                  <span className="text-sm font-medium">$2.00</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border mt-2">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">${(doctor.consultationFee + 2).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Choose your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue="card" 
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="upi">UPI</TabsTrigger>
                  <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                </TabsList>
                
                <TabsContent value="card" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label htmlFor="cardNumber" className="text-sm font-medium">
                      Card Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full pl-10 p-2 border border-input rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="expiryDate" className="text-sm font-medium">
                        Expiry Date
                      </label>
                      <input
                        id="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-2 border border-input rounded-md"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="cvv" className="text-sm font-medium">
                        CVV
                      </label>
                      <input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        className="w-full p-2 border border-input rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="nameOnCard" className="text-sm font-medium">
                      Name on Card
                    </label>
                    <input
                      id="nameOnCard"
                      type="text"
                      placeholder="John Doe"
                      className="w-full p-2 border border-input rounded-md"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="upi" className="space-y-4 pt-4">
                  <div className="flex justify-center mb-4">
                    <QrCode className="w-32 h-32 text-primary" />
                  </div>
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    Scan the QR code with any UPI app to pay
                  </p>
                  
                  <div className="space-y-2">
                    <label htmlFor="upiId" className="text-sm font-medium">
                      UPI ID
                    </label>
                    <input
                      id="upiId"
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full p-2 border border-input rounded-md"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="netbanking" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <p className="text-sm">Select your bank from the list below:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank'].map((bank) => (
                        <div key={bank} className="flex items-center space-x-2 border border-input rounded-md p-2 cursor-pointer hover:bg-secondary">
                          <input type="radio" id={bank} name="bank" className="rounded-full" />
                          <label htmlFor={bank} className="text-sm cursor-pointer">{bank}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                className="w-full" 
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay ${(doctor.consultationFee + 2).toFixed(2)}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center pt-2">
                Your payment information is secure and encrypted
              </p>
            </CardFooter>
          </Card>
        </div>
      ) : (
        // Confirmation section
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="md:col-span-1 overflow-hidden">
            <div className="bg-primary py-4 px-6">
              <h3 className="text-xl font-medium text-white">Appointment Details</h3>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Check className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-lg font-semibold">Appointment Confirmed!</h4>
                <p className="text-muted-foreground text-sm mt-1">
                  Your appointment has been successfully booked
                </p>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CR Number</span>
                  <span className="font-medium">{appointmentData?.crNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serial Number</span>
                  <span className="font-medium">{appointmentData?.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Appointment Date</span>
                  <span className="font-medium">
                    {patientData.appointmentDate 
                      ? format(patientData.appointmentDate, 'MMM d, yyyy') 
                      : 'Not specified'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doctor</span>
                  <span className="font-medium">{doctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-medium">{department.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hospital</span>
                  <span className="font-medium">{hospital.name}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Please arrive 15 minutes before your appointment. Your actual appointment time will be based on the queue status on the day.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Appointment Sticker</CardTitle>
              <CardDescription>
                This can be printed at the hospital reception
              </CardDescription>
            </CardHeader>
            <CardContent>
              {appointmentData && (
                <AppointmentSticker
                  patientName={patientData.name}
                  patientAge={patientData.age}
                  patientSex={patientData.sex}
                  patientAddress={patientData.address}
                  department={department.name}
                  doctor={doctor.name}
                  appointmentDate={patientData.appointmentDate}
                  crNumber={appointmentData.crNumber}
                  serialNumber={appointmentData.serialNumber}
                />
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" onClick={handleComplete}>
                View Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full">
                Print Appointment Details
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </motion.div>
  );
};

export default AppointmentScheduler;
