
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Clock, Check, X, Printer, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Appointment, appointments as mockAppointments } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { toast } from 'sonner';
import AppointmentSticker from './AppointmentSticker';

const AdminPanel: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [crNumberLookup, setCrNumberLookup] = useState('');
  const [foundPatient, setFoundPatient] = useState<Appointment | null>(null);
  const [currentSerial, setCurrentSerial] = useState(2); // Mock current serial number
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Appointment | keyof Appointment['patientInfo'] | '';
    direction: 'ascending' | 'descending';
  }>({ key: '', direction: 'ascending' });

  // Initialize with mock appointments
  useEffect(() => {
    setAppointments(mockAppointments);
  }, []);

  const handleCrNumberLookup = () => {
    if (!crNumberLookup) {
      toast.error('Please enter a CR number');
      return;
    }
    
    const found = appointments.find(
      (app) => app.crNumber.toLowerCase() === crNumberLookup.toLowerCase()
    );
    
    if (found) {
      setFoundPatient(found);
      toast.success('Patient found!');
    } else {
      setFoundPatient(null);
      toast.error('No patient found with this CR number');
    }
  };

  const updateSerialStatus = (appointmentId: string, increment: boolean) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((app) => {
        if (app.id === appointmentId) {
          return {
            ...app,
            serialNumber: increment
              ? app.serialNumber + 1
              : Math.max(1, app.serialNumber - 1),
          };
        }
        return app;
      })
    );
    
    toast.success(`Serial number ${increment ? 'incremented' : 'decremented'}`);
  };

  const markAppointmentStatus = (appointmentId: string, status: Appointment['status']) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((app) => {
        if (app.id === appointmentId) {
          return {
            ...app,
            status,
          };
        }
        return app;
      })
    );
    
    toast.success(`Appointment marked as ${status}`);
    
    // Update current serial if marked as completed or in progress
    if (status === 'Completed' || status === 'In Progress') {
      setCurrentSerial((prev) => prev + 1);
    }
  };

  const filteredAppointments = appointments.filter((app) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      app.patientInfo.name.toLowerCase().includes(searchLower) ||
      app.crNumber.toLowerCase().includes(searchLower) ||
      app.patientInfo.phone.toLowerCase().includes(searchLower)
    );
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    let aValue, bValue;
    
    // Handle nested properties
    if (sortConfig.key.includes('patientInfo.')) {
      const nestedKey = sortConfig.key.split('.')[1] as keyof typeof a.patientInfo;
      aValue = a.patientInfo[nestedKey];
      bValue = b.patientInfo[nestedKey];
    } else {
      aValue = a[sortConfig.key as keyof typeof a];
      bValue = b[sortConfig.key as keyof typeof b];
    }
    
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: typeof sortConfig.key) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName: typeof sortConfig.key) => {
    if (sortConfig.key !== columnName) return null;
    
    return sortConfig.direction === 'ascending' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage appointments and patient information
          </p>
        </div>

        <Tabs defaultValue="queue">
          <TabsList className="w-full max-w-md mb-6">
            <TabsTrigger value="queue">Queue Management</TabsTrigger>
            <TabsTrigger value="lookup">CR Lookup</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          {/* Queue Management Tab */}
          <TabsContent value="queue">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Current Queue Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Current Serial</p>
                      <p className="text-3xl font-bold text-primary">{currentSerial}</p>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentSerial((prev) => Math.max(1, prev - 1))}
                      >
                        <ArrowDown className="h-4 w-4 mr-1" />
                        Decrease
                      </Button>
                      <Button
                        className="ml-2"
                        size="sm"
                        onClick={() => {
                          setCurrentSerial((prev) => prev + 1);
                          toast.success('Queue advanced to next patient');
                        }}
                      >
                        <ArrowUp className="h-4 w-4 mr-1" />
                        Increase
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Next Patients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sortedAppointments
                      .filter((app) => app.serialNumber >= currentSerial)
                      .slice(0, 5)
                      .map((app) => (
                        <div
                          key={app.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            app.serialNumber === currentSerial
                              ? 'bg-primary/10 border border-primary/20'
                              : 'bg-secondary/50'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                              <span className="font-semibold">{app.serialNumber}</span>
                            </div>
                            <div>
                              <p className="font-medium">{app.patientInfo.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {app.crNumber} | {app.patientInfo.age} yrs, {app.patientInfo.sex}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAppointmentStatus(app.id, 'In Progress')}
                            >
                              Call Now
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const patient = app;
                                setFoundPatient(patient);
                                setCrNumberLookup(patient.crNumber);
                              }}
                            >
                              <User className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toast.success('Sticker printed successfully')}
                            >
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Today's Queue</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search patients..."
                      className="pl-9 w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-secondary/50">
                          <th
                            className="px-4 py-3 text-left font-medium cursor-pointer"
                            onClick={() => requestSort('serialNumber')}
                          >
                            <div className="flex items-center">
                              Serial
                              {getSortIcon('serialNumber')}
                            </div>
                          </th>
                          <th
                            className="px-4 py-3 text-left font-medium cursor-pointer"
                            onClick={() => requestSort('crNumber')}
                          >
                            <div className="flex items-center">
                              CR Number
                              {getSortIcon('crNumber')}
                            </div>
                          </th>
                          <th
                            className="px-4 py-3 text-left font-medium cursor-pointer"
                            onClick={() => requestSort('patientInfo.name')}
                          >
                            <div className="flex items-center">
                              Patient
                              {getSortIcon('patientInfo.name')}
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left font-medium">Status</th>
                          <th className="px-4 py-3 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedAppointments.map((app) => (
                          <tr key={app.id} className="border-t border-border hover:bg-secondary/30">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{app.serialNumber}</span>
                                <div className="flex-shrink-0">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => updateSerialStatus(app.id, false)}
                                  >
                                    <ArrowDown className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => updateSerialStatus(app.id, true)}
                                  >
                                    <ArrowUp className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 font-medium">{app.crNumber}</td>
                            <td className="px-4 py-3">
                              <div>
                                <p>{app.patientInfo.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {app.patientInfo.age} yrs, {app.patientInfo.sex}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                variant="outline"
                                className={`
                                  ${app.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                                  ${app.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                                  ${app.status === 'Scheduled' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                                  ${app.status === 'Cancelled' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                                `}
                              >
                                {app.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => markAppointmentStatus(app.id, 'In Progress')}
                                  title="Mark as In Progress"
                                  className="h-8 w-8"
                                >
                                  <Clock className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => markAppointmentStatus(app.id, 'Completed')}
                                  title="Mark as Completed"
                                  className="h-8 w-8"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => markAppointmentStatus(app.id, 'Cancelled')}
                                  title="Mark as Cancelled"
                                  className="h-8 w-8"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => toast.success('Sticker printed successfully')}
                                  title="Print Sticker"
                                  className="h-8 w-8"
                                >
                                  <Printer className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CR Lookup Tab */}
          <TabsContent value="lookup">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Patient Lookup</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="crNumber" className="text-sm font-medium">
                        Enter CR Number
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          id="crNumber"
                          placeholder="e.g., CR12345"
                          value={crNumberLookup}
                          onChange={(e) => setCrNumberLookup(e.target.value)}
                        />
                        <Button onClick={handleCrNumberLookup}>
                          Look Up
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {!foundPatient && (
                      <div className="py-8 text-center">
                        <User className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                        <p className="text-muted-foreground">
                          Enter a CR number to find patient details
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {foundPatient && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Patient Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start border-b border-border pb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{foundPatient.patientInfo.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {foundPatient.patientInfo.age} years, {foundPatient.patientInfo.sex}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {foundPatient.patientInfo.address}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">CR Number</p>
                          <p className="font-medium">{foundPatient.crNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Serial Number</p>
                          <p className="font-medium">{foundPatient.serialNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Appointment Date</p>
                          <p className="font-medium">
                            {format(new Date(foundPatient.date), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge
                            variant="outline"
                            className={`
                              ${foundPatient.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                              ${foundPatient.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                              ${foundPatient.status === 'Scheduled' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                              ${foundPatient.status === 'Cancelled' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                            `}
                          >
                            {foundPatient.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="border-t border-border pt-4">
                        <p className="text-sm mb-4">Appointment Sticker</p>
                        <div className="w-full max-w-sm mx-auto">
                          <AppointmentSticker
                            patientName={foundPatient.patientInfo.name}
                            patientAge={foundPatient.patientInfo.age.toString()}
                            patientSex={foundPatient.patientInfo.sex}
                            patientAddress={foundPatient.patientInfo.address}
                            department="General Medicine" // This would come from the actual data
                            doctor="Dr. John Smith" // This would come from the actual data
                            appointmentDate={new Date(foundPatient.date)}
                            crNumber={foundPatient.crNumber}
                            serialNumber={foundPatient.serialNumber}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          className="mr-2"
                          onClick={() => toast.success('Sticker printed successfully')}
                        >
                          <Printer className="mr-2 h-4 w-4" />
                          Print Sticker
                        </Button>
                        <Button
                          onClick={() => {
                            // This would create a new appointment with existing patient data
                            toast.success('New appointment created');
                          }}
                        >
                          Book New Appointment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">All Appointments</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search appointments..."
                      className="pl-9 w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-secondary/50">
                          <th
                            className="px-4 py-3 text-left font-medium cursor-pointer"
                            onClick={() => requestSort('crNumber')}
                          >
                            <div className="flex items-center">
                              CR Number
                              {getSortIcon('crNumber')}
                            </div>
                          </th>
                          <th
                            className="px-4 py-3 text-left font-medium cursor-pointer"
                            onClick={() => requestSort('patientInfo.name')}
                          >
                            <div className="flex items-center">
                              Patient
                              {getSortIcon('patientInfo.name')}
                            </div>
                          </th>
                          <th
                            className="px-4 py-3 text-left font-medium cursor-pointer"
                            onClick={() => requestSort('date')}
                          >
                            <div className="flex items-center">
                              Date
                              {getSortIcon('date')}
                            </div>
                          </th>
                          <th
                            className="px-4 py-3 text-left font-medium cursor-pointer"
                            onClick={() => requestSort('status')}
                          >
                            <div className="flex items-center">
                              Status
                              {getSortIcon('status')}
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedAppointments.map((app) => (
                          <tr key={app.id} className="border-t border-border hover:bg-secondary/30">
                            <td className="px-4 py-3 font-medium">{app.crNumber}</td>
                            <td className="px-4 py-3">
                              <div>
                                <p>{app.patientInfo.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {app.patientInfo.age} yrs, {app.patientInfo.sex}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {format(new Date(app.date), 'MMM d, yyyy')}
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                variant="outline"
                                className={`
                                  ${app.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                                  ${app.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                                  ${app.status === 'Scheduled' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                                  ${app.status === 'Cancelled' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                                `}
                              >
                                {app.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    const patient = app;
                                    setFoundPatient(patient);
                                    setCrNumberLookup(patient.crNumber);
                                  }}
                                  className="h-8 w-8"
                                >
                                  <User className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => toast.success('Sticker printed successfully')}
                                  className="h-8 w-8"
                                >
                                  <Printer className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default AdminPanel;
