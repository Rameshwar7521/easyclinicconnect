
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Calendar, User, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface PatientFormProps {
  onSubmit: (patientData: PatientData) => void;
  onBack: () => void;
  initialData?: PatientData;
}

export interface PatientData {
  name: string;
  age: string;
  sex: 'Male' | 'Female' | 'Other';
  address: string;
  phone: string;
  email: string;
  appointmentDate: Date | undefined;
  notes: string;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, onBack, initialData }) => {
  const [formData, setFormData] = useState<PatientData>(
    initialData || {
      name: '',
      age: '',
      sex: 'Male',
      address: '',
      phone: '',
      email: '',
      appointmentDate: undefined,
      notes: '',
    }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof PatientData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (errors[name as keyof PatientData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSexChange = (value: 'Male' | 'Female' | 'Other') => {
    setFormData((prev) => ({ ...prev, sex: value }));
    if (errors.sex) {
      setErrors((prev) => ({ ...prev, sex: undefined }));
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, appointmentDate: date }));
    if (errors.appointmentDate) {
      setErrors((prev) => ({ ...prev, appointmentDate: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PatientData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = 'Age must be a valid number';
    }
    
    if (!formData.sex) {
      newErrors.sex = 'Sex is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Appointment date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
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
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-2">Patient Information</h2>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <p className="text-muted-foreground">
          Please fill in your details to proceed with the appointment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center text-sm font-medium">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Age and Sex */}
          <div className="flex space-x-4">
            <div className="space-y-2 w-1/3">
              <Label htmlFor="age" className="text-sm font-medium">
                Age
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="Age"
                min="0"
                max="120"
                value={formData.age}
                onChange={handleChange}
                className={errors.age ? 'border-destructive' : ''}
              />
              {errors.age && (
                <p className="text-xs text-destructive">{errors.age}</p>
              )}
            </div>

            <div className="space-y-2 w-2/3">
              <Label className="text-sm font-medium">Sex</Label>
              <RadioGroup
                value={formData.sex}
                onValueChange={handleSexChange as (value: string) => void}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Male" id="male" />
                  <Label htmlFor="male" className="text-sm">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Female" id="female" />
                  <Label htmlFor="female" className="text-sm">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Other" id="other" />
                  <Label htmlFor="other" className="text-sm">Other</Label>
                </div>
              </RadioGroup>
              {errors.sex && (
                <p className="text-xs text-destructive">{errors.sex}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address" className="flex items-center text-sm font-medium">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              Address
            </Label>
            <Textarea
              id="address"
              name="address"
              placeholder="Enter your full address"
              value={formData.address}
              onChange={handleChange}
              className={`min-h-[80px] ${errors.address ? 'border-destructive' : ''}`}
            />
            {errors.address && (
              <p className="text-xs text-destructive">{errors.address}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center text-sm font-medium">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center text-sm font-medium">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              Email (Optional)
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Appointment Date */}
          <div className="space-y-2">
            <Label className="flex items-center text-sm font-medium">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              Preferred Appointment Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.appointmentDate && "text-muted-foreground",
                    errors.appointmentDate && "border-destructive"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {formData.appointmentDate ? (
                    format(formData.appointmentDate, "PPP")
                  ) : (
                    <span>Select date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={formData.appointmentDate}
                  onSelect={handleDateChange}
                  initialFocus
                  disabled={(date) => {
                    // Disable past dates and dates more than 30 days in the future
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const maxDate = new Date();
                    maxDate.setDate(today.getDate() + 30);
                    return date < today || date > maxDate;
                  }}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            {errors.appointmentDate && (
              <p className="text-xs text-destructive">{errors.appointmentDate}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any specific concerns or information you'd like the doctor to know"
              value={formData.notes}
              onChange={handleChange}
              className="min-h-[80px]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit">
            Continue to Payment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default PatientForm;
