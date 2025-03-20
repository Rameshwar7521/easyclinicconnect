
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  CreditCard,
  CheckCircle2,
  Activity,
  UserCircle,
  LayoutDashboard,
  QrCode,
  ArrowRight,
  ChevronRight,
  Hospital,
  CalendarCheck,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PatientLogin from '@/components/PatientLogin';
import PageTransition from '@/components/ui/PageTransition';

const features = [
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    title: 'Easy Appointment Booking',
    description: 'Schedule appointments with just a few taps.',
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
    title: 'Multiple Hospitals & Doctors',
    description: 'Choose from a wide network of healthcare providers.',
  },
  {
    icon: <CreditCard className="h-6 w-6 text-primary" />,
    title: 'Secure Payment',
    description: 'Pay your consultation fee securely via various methods.',
  },
  {
    icon: <Activity className="h-6 w-6 text-primary" />,
    title: 'Live Queue Updates',
    description: 'Track real-time updates on your position in the queue.',
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: 'Instant CR Number',
    description: 'Receive your CR number immediately after booking.',
  },
  {
    icon: <LayoutDashboard className="h-6 w-6 text-primary" />,
    title: 'Admin Dashboard',
    description: 'Comprehensive tools for hospital staff to manage patients.',
  },
];

const testimonials = [
  {
    quote: "I used to spend hours waiting at the hospital. With EasyClinic, I can now track my position in the queue and arrive just in time for my appointment.",
    name: "Sarah Johnson",
    title: "Patient",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    quote: "Managing patient flow has never been easier. The admin dashboard helps us optimize our scheduling and reduce wait times.",
    name: "Dr. Michael Chen",
    title: "Cardiologist",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    quote: "As a returning patient, I love that I can use my CR number to book new appointments without re-entering all my information.",
    name: "Robert Brown",
    title: "Patient",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  }
];

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 pt-32 pb-16 md:pt-40 md:pb-24">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Badge variant="outline" className="bg-primary/10 text-primary mb-4">
                      Simplify Your Hospital Visits
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                      Book Hospital Appointments with Ease
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                      Streamline your healthcare experience with our all-in-one appointment booking system. No more long waits or confusion.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <Button size="lg" onClick={() => navigate('/dashboard')}>
                        Book Appointment
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="lg" onClick={() => navigate('/admin')}>
                        Hospital Staff Portal
                      </Button>
                    </div>
                  </motion.div>
                </div>
                
                <div className="md:w-1/2 mt-12 md:mt-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-10 rounded-2xl transform rotate-3"></div>
                    <div className="glass-card rounded-xl overflow-hidden shadow-xl z-10 relative">
                      <PatientLogin />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 right-0 h-12 md:h-24">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
                <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
          </section>
          
          {/* How It Works Section */}
          <section className="py-20 px-6">
            <div className="container mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-primary/10 text-primary mb-4">
                  Simple Process
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our streamlined process makes hospital visits efficient and hassle-free for both patients and healthcare providers.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <UserCircle className="h-8 w-8 text-primary" />
                  </div>
                  <div className="relative mb-8">
                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-medium">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Login & Select</h3>
                  <p className="text-muted-foreground">
                    Sign in with your mobile number or CR number. Choose from a list of hospitals and available doctors.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <CalendarCheck className="h-8 w-8 text-primary" />
                  </div>
                  <div className="relative mb-8">
                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-medium">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Book & Pay</h3>
                  <p className="text-muted-foreground">
                    Enter your details, select your preferred date, and complete the payment securely.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Activity className="h-8 w-8 text-primary" />
                  </div>
                  <div className="relative mb-8">
                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-medium">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Track & Visit</h3>
                  <p className="text-muted-foreground">
                    Receive your CR number and serial number. Track live updates and arrive just in time for your appointment.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Features Section */}
          <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-primary/10 text-primary mb-4">
                  Key Benefits
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Features You'll Love</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our platform is designed to make the healthcare experience seamless for both patients and providers.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-md transition-shadow duration-300">
                      <CardContent className="pt-6">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* For Patients and Admins Section */}
          <section className="py-20 px-6">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8"
                >
                  <div className="flex items-center mb-6">
                    <Stethoscope className="h-8 w-8 text-primary mr-4" />
                    <h3 className="text-2xl font-bold">For Patients</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Easy Login</p>
                        <p className="text-sm text-muted-foreground">Sign in using your mobile number</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Choose Your Provider</p>
                        <p className="text-sm text-muted-foreground">Select from multiple hospitals and doctors</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Secure Payment</p>
                        <p className="text-sm text-muted-foreground">Pay via UPI, credit, or debit card</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Live Updates</p>
                        <p className="text-sm text-muted-foreground">Track real-time serial number updates</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Quick Rebooking</p>
                        <p className="text-sm text-muted-foreground">Use your CR number for faster future bookings</p>
                      </div>
                    </li>
                  </ul>
                  
                  <Button className="mt-8" onClick={() => navigate('/dashboard')}>
                    Book as Patient
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-900/5 to-indigo-900/10 rounded-2xl p-8"
                >
                  <div className="flex items-center mb-6">
                    <Hospital className="h-8 w-8 text-primary mr-4" />
                    <h3 className="text-2xl font-bold">For Hospital Staff</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Queue Management</p>
                        <p className="text-sm text-muted-foreground">Update patient serial numbers in real-time</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Patient Lookup</p>
                        <p className="text-sm text-muted-foreground">Quick CR number lookup for patient details</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Print Stickers</p>
                        <p className="text-sm text-muted-foreground">Generate appointment stickers with patient details</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Status Updates</p>
                        <p className="text-sm text-muted-foreground">Mark appointments as completed or in progress</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Appointment Management</p>
                        <p className="text-sm text-muted-foreground">View and manage all scheduled appointments</p>
                      </div>
                    </li>
                  </ul>
                  
                  <Button className="mt-8" onClick={() => navigate('/admin')}>
                    Admin Portal
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="bg-primary/10 text-primary mb-4">
                  Testimonials
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Hear from our users about how EasyClinic has transformed their healthcare experience.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="mb-6">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-yellow-400">★</span>
                          ))}
                        </div>
                        <p className="italic mb-6 text-muted-foreground">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-20 px-6 bg-gradient-to-r from-primary to-blue-600 text-white">
            <div className="container mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="mb-6 mx-auto">
                  <HeartPulse className="h-16 w-16 text-white/80 mx-auto" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Simplify Your Hospital Visits?</h2>
                <p className="text-white/80 max-w-2xl mx-auto mb-8">
                  Join thousands of patients who are already enjoying a smoother healthcare experience with EasyClinic.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90"
                    onClick={() => navigate('/dashboard')}
                  >
                    Book an Appointment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => navigate('/admin')}
                  >
                    Hospital Staff Login
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
