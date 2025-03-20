
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const PatientLogin: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [crNumber, setCrNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowOtpInput(true);
      toast.success('OTP sent successfully!');
    }, 1500);
  };

  const handleLogin = () => {
    if (!otp || otp.length < 4) {
      toast.error('Please enter a valid OTP');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Login successful!');
      // Store user info in localStorage for demo purposes
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    }, 1500);
  };

  const handleCrLogin = () => {
    if (!crNumber) {
      toast.error('Please enter your CR number');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('CR number verified!');
      // Store user info in localStorage for demo purposes
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('crNumber', crNumber);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="glass-card overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold text-center">Welcome to EasyClinic</CardTitle>
          <CardDescription className="text-center text-muted-foreground pt-2">
            Sign in to access your appointments and medical information
          </CardDescription>
        </CardHeader>

        <Tabs defaultValue="phone" className="w-full">
          <TabsList className="grid grid-cols-2 w-[90%] mx-auto">
            <TabsTrigger value="phone">Phone Login</TabsTrigger>
            <TabsTrigger value="cr">CR Number</TabsTrigger>
          </TabsList>

          <TabsContent value="phone" className="pt-4">
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-10"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      disabled={showOtpInput || loading}
                    />
                  </div>
                </div>

                {showOtpInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <label htmlFor="otp" className="text-sm font-medium">
                      OTP Verification
                    </label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      disabled={loading}
                      maxLength={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      We've sent a 6-digit code to your phone
                    </p>
                  </motion.div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
              {!showOtpInput ? (
                <Button 
                  className="w-full" 
                  onClick={handleSendOtp}
                  disabled={loading || !phoneNumber}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  onClick={handleLogin}
                  disabled={loading || !otp}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Login
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}

              {showOtpInput && (
                <Button 
                  variant="ghost" 
                  className="mt-2 text-sm" 
                  onClick={() => {
                    setShowOtpInput(false);
                    setOtp('');
                  }}
                  disabled={loading}
                >
                  Change phone number
                </Button>
              )}
            </CardFooter>
          </TabsContent>

          <TabsContent value="cr" className="pt-4">
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="crNumber" className="text-sm font-medium">
                    CR Number
                  </label>
                  <Input
                    id="crNumber"
                    type="text"
                    placeholder="Enter your CR number"
                    value={crNumber}
                    onChange={(e) => setCrNumber(e.target.value)}
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your previous CR number for quick access
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleCrLogin}
                disabled={loading || !crNumber}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
};

export default PatientLogin;
