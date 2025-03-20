
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, ChevronLeft, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';
import HospitalSelection from '@/components/HospitalSelection';
import DoctorSelection from '@/components/DoctorSelection';
import PatientForm, { PatientData } from '@/components/PatientForm';
import AppointmentScheduler from '@/components/AppointmentScheduler';
import SerialTracker from '@/components/SerialTracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { hospitals, appointments } from '@/lib/data';
import { toast } from 'sonner';
import { format } from 'date-fns';

enum BookingStep {
  HospitalSelection = 'hospital',
  DoctorSelection = 'doctor',
  PatientForm = 'patient',
  Payment = 'payment',
  Complete = 'complete',
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>(BookingStep.HospitalSelection);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>('');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [userAppointments, setUserAppointments] = useState<any[]>([]);
  const [currentSerial, setCurrentSerial] = useState(2); // Mock current serial number

  // Check if user is logged in
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
      
      // For demo purposes, set some mock appointments
      setUserAppointments(appointments);
    }
  }, []);

  // Redirect to home if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      // For demo purposes, we'll allow access without login
      // navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('crNumber');
    setIsLoggedIn(false);
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleSelectHospital = (hospitalId: string) => {
    setSelectedHospitalId(hospitalId);
    setBookingStep(BookingStep.DoctorSelection);
  };

  const handleSelectDoctor = (doctorId: string, departmentId: string) => {
    setSelectedDoctorId(doctorId);
    setSelectedDepartmentId(departmentId);
    setBookingStep(BookingStep.PatientForm);
  };

  const handlePatientFormSubmit = (data: PatientData) => {
    setPatientData(data);
    setBookingStep(BookingStep.Payment);
  };

  const handleAppointmentComplete = (data: any) => {
    setAppointmentData(data);
    setBookingStep(BookingStep.Complete);
    
    // Add the appointment to the user's appointments
    setUserAppointments((prev) => [data, ...prev]);
    
    toast.success('Appointment booked successfully!');
  };

  const startNewBooking = () => {
    setBookingStep(BookingStep.HospitalSelection);
    setSelectedHospitalId('');
    setSelectedDepartmentId('');
    setSelectedDoctorId('');
    setPatientData(null);
    setAppointmentData(null);
  };

  const getCurrentStepContent = () => {
    switch (bookingStep) {
      case BookingStep.HospitalSelection:
        return <HospitalSelection onSelectHospital={handleSelectHospital} />;
      
      case BookingStep.DoctorSelection:
        return (
          <DoctorSelection
            hospitalId={selectedHospitalId}
            onSelectDoctor={handleSelectDoctor}
            onBack={() => setBookingStep(BookingStep.HospitalSelection)}
          />
        );
      
      case BookingStep.PatientForm:
        return (
          <PatientForm
            onSubmit={handlePatientFormSubmit}
            onBack={() => setBookingStep(BookingStep.DoctorSelection)}
          />
        );
      
      case BookingStep.Payment:
        if (!patientData) return <div>Error: Patient data missing</div>;
        
        return (
          <AppointmentScheduler
            hospitalId={selectedHospitalId}
            departmentId={selectedDepartmentId}
            doctorId={selectedDoctorId}
            patientData={patientData}
            onBack={() => setBookingStep(BookingStep.PatientForm)}
            onComplete={handleAppointmentComplete}
          />
        );
      
      case BookingStep.Complete:
        if (!appointmentData) return <div>Error: Appointment data missing</div>;
        
        // Find the selected hospital, department and doctor
        const hospital = hospitals.find(h => h.id === selectedHospitalId);
        const department = hospital?.departments.find(d => d.id === selectedDepartmentId);
        const doctor = department?.doctors.find(d => d.id === selectedDoctorId);
        
        return (
          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Appointment Confirmed</h2>
              <p className="text-muted-foreground">
                Your appointment has been successfully booked
              </p>
            </div>
            
            <SerialTracker
              currentSerial={currentSerial}
              yourSerial={appointmentData.serialNumber}
              hospitalName={hospital?.name || ''}
              departmentName={department?.name || ''}
              doctorName={doctor?.name || ''}
            />
            
            <div className="mt-6 flex justify-end">
              <Button onClick={startNewBooking}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Book Another Appointment
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16 px-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Patient Dashboard</h1>
                <p className="text-muted-foreground">
                  Manage your appointments and healthcare journey
                </p>
              </div>
              
              <Button variant="ghost" onClick={handleLogout} className="mt-4 md:mt-0">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
            
            <Tabs defaultValue="book">
              <TabsList className="w-full max-w-md mb-8">
                <TabsTrigger value="book">Book Appointment</TabsTrigger>
                <TabsTrigger value="appointments">My Appointments</TabsTrigger>
                <TabsTrigger value="tracker">Queue Tracker</TabsTrigger>
              </TabsList>
              
              <TabsContent value="book" className="animate-in fade-in-50 slide-in-from-top-5">
                {bookingStep !== BookingStep.HospitalSelection && bookingStep !== BookingStep.Complete && (
                  <div className="mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={startNewBooking}
                      className="mb-6"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Start Over
                    </Button>
                  </div>
                )}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {getCurrentStepContent()}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="appointments" className="animate-in fade-in-50 slide-in-from-top-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">My Appointments</h2>
                    <p className="text-muted-foreground">
                      View and manage your upcoming and past appointments
                    </p>
                  </div>
                  
                  {userAppointments.length > 0 ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userAppointments.map((appointment) => {
                          // Find the hospital and department
                          const hospital = hospitals.find(h => h.id === appointment.hospitalId);
                          const department = hospital?.departments.find(d => d.id === appointment.departmentId);
                          
                          return (
                            <Card key={appointment.id} className="overflow-hidden">
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-lg">{format(new Date(appointment.date), 'MMMM d, yyyy')}</CardTitle>
                                  <div className={`
                                    px-2 py-1 rounded-full text-xs font-medium
                                    ${appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                                    ${appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                                    ${appointment.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : ''}
                                    ${appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
                                  `}>
                                    {appointment.status}
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="font-semibold">{hospital?.name}</p>
                                      <p className="text-sm text-muted-foreground">{department?.name}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm text-muted-foreground">Serial Number</p>
                                      <p className="font-bold text-2xl">{appointment.serialNumber}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="pt-3 border-t border-border">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">CR Number</span>
                                      <span className="text-sm font-medium">{appointment.crNumber}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline" size="sm">
                                      View Details
                                    </Button>
                                    {appointment.status === 'Scheduled' && (
                                      <Button size="sm">
                                        Track Queue
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                      
                      <div className="flex justify-center mt-8">
                        <Button onClick={startNewBooking}>
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Book New Appointment
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Card className="bg-muted/50">
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                          <PlusCircle className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No Appointments Yet</h3>
                        <p className="text-muted-foreground text-center mb-6 max-w-md">
                          You haven't booked any appointments yet. Start by booking your first appointment with a doctor.
                        </p>
                        <Button onClick={() => startNewBooking()}>
                          Book Your First Appointment
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="tracker" className="animate-in fade-in-50 slide-in-from-top-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Queue Tracker</h2>
                    <p className="text-muted-foreground">
                      Track your position in the queue for upcoming appointments
                    </p>
                  </div>
                  
                  {userAppointments.length > 0 && userAppointments[0].status === 'Scheduled' ? (
                    <SerialTracker
                      currentSerial={currentSerial}
                      yourSerial={userAppointments[0].serialNumber}
                      hospitalName="Central Hospital" // This would come from the actual appointment data
                      departmentName="Cardiology" // This would come from the actual appointment data
                      doctorName="Dr. John Smith" // This would come from the actual appointment data
                    />
                  ) : (
                    <Card className="bg-muted/50">
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <h3 className="text-xl font-semibold mb-2">No Active Appointments</h3>
                        <p className="text-muted-foreground text-center mb-6 max-w-md">
                          You don't have any upcoming appointments to track. Book an appointment to use the queue tracker.
                        </p>
                        <Button onClick={() => startNewBooking()}>
                          Book an Appointment
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Dashboard;
