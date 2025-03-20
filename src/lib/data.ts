
export interface Hospital {
  id: string;
  name: string;
  location: string;
  image: string;
  departments: Department[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  doctors: Doctor[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  availability: string[];
  consultationFee: number;
}

export interface Patient {
  id: string;
  crNumber?: string;
  name: string;
  age: number;
  sex: 'Male' | 'Female' | 'Other';
  address: string;
  phone: string;
  email?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  hospitalId: string;
  departmentId: string;
  crNumber: string;
  serialNumber: number;
  date: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'In Progress';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  patientInfo: Patient;
  createdAt: string;
}

// Mock data
export const hospitals: Hospital[] = [
  {
    id: "h1",
    name: "Central Hospital",
    location: "123 Medical Center Blvd, Healthcare City",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1053&q=80",
    departments: [
      {
        id: "d1",
        name: "Cardiology",
        description: "Heart and cardiovascular system specialists",
        doctors: [
          {
            id: "doc1",
            name: "Dr. John Smith",
            specialty: "Cardiac Surgeon",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            availability: ["Monday", "Wednesday", "Friday"],
            consultationFee: 150
          },
          {
            id: "doc2",
            name: "Dr. Emily Johnson",
            specialty: "Cardiologist",
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            availability: ["Tuesday", "Thursday", "Saturday"],
            consultationFee: 120
          }
        ]
      },
      {
        id: "d2",
        name: "Neurology",
        description: "Brain, spine, and nervous system specialists",
        doctors: [
          {
            id: "doc3",
            name: "Dr. Michael Chen",
            specialty: "Neurologist",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            availability: ["Monday", "Tuesday", "Friday"],
            consultationFee: 140
          },
          {
            id: "doc4",
            name: "Dr. Sarah Williams",
            specialty: "Neurosurgeon",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            availability: ["Wednesday", "Thursday", "Saturday"],
            consultationFee: 180
          }
        ]
      }
    ]
  },
  {
    id: "h2",
    name: "Memorial Medical Center",
    location: "456 Health Avenue, Wellness District",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1053&q=80",
    departments: [
      {
        id: "d3",
        name: "Orthopedics",
        description: "Bone, joint, and musculoskeletal specialists",
        doctors: [
          {
            id: "doc5",
            name: "Dr. Robert Brown",
            specialty: "Orthopedic Surgeon",
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            availability: ["Monday", "Wednesday", "Friday"],
            consultationFee: 130
          },
          {
            id: "doc6",
            name: "Dr. Jessica Lee",
            specialty: "Sports Medicine",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            availability: ["Tuesday", "Thursday", "Saturday"],
            consultationFee: 110
          }
        ]
      },
      {
        id: "d4",
        name: "Pediatrics",
        description: "Child and adolescent health specialists",
        doctors: [
          {
            id: "doc7",
            name: "Dr. David Wilson",
            specialty: "Pediatrician",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            availability: ["Monday", "Tuesday", "Friday"],
            consultationFee: 100
          },
          {
            id: "doc8",
            name: "Dr. Amanda Garcia",
            specialty: "Pediatric Surgeon",
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            availability: ["Wednesday", "Thursday", "Saturday"],
            consultationFee: 160
          }
        ]
      }
    ]
  },
  {
    id: "h3",
    name: "Community General Hospital",
    location: "789 Care Street, Healing Heights",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1053&q=80",
    departments: [
      {
        id: "d5",
        name: "Dermatology",
        description: "Skin, hair, and nail specialists",
        doctors: [
          {
            id: "doc9",
            name: "Dr. Linda Martinez",
            specialty: "Dermatologist",
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            availability: ["Monday", "Wednesday", "Friday"],
            consultationFee: 120
          }
        ]
      },
      {
        id: "d6",
        name: "Ophthalmology",
        description: "Eye and vision specialists",
        doctors: [
          {
            id: "doc10",
            name: "Dr. Thomas Wright",
            specialty: "Ophthalmologist",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            availability: ["Tuesday", "Thursday", "Saturday"],
            consultationFee: 130
          }
        ]
      }
    ]
  }
];

// Sample appointments (for demo purposes)
export const appointments: Appointment[] = [
  {
    id: "a1",
    patientId: "p1",
    doctorId: "doc1",
    hospitalId: "h1",
    departmentId: "d1",
    crNumber: "CR12345",
    serialNumber: 1,
    date: "2023-06-15T10:00:00",
    status: "Scheduled",
    paymentStatus: "Paid",
    patientInfo: {
      id: "p1",
      crNumber: "CR12345",
      name: "John Doe",
      age: 45,
      sex: "Male",
      address: "123 Main St, Anytown, AN 12345",
      phone: "555-123-4567"
    },
    createdAt: "2023-06-01T14:30:00"
  },
  {
    id: "a2",
    patientId: "p2",
    doctorId: "doc3",
    hospitalId: "h1",
    departmentId: "d2",
    crNumber: "CR12346",
    serialNumber: 2,
    date: "2023-06-15T11:00:00",
    status: "In Progress",
    paymentStatus: "Paid",
    patientInfo: {
      id: "p2",
      crNumber: "CR12346",
      name: "Jane Smith",
      age: 32,
      sex: "Female",
      address: "456 Oak Ave, Somewhere, SO 67890",
      phone: "555-987-6543"
    },
    createdAt: "2023-06-02T09:15:00"
  },
  {
    id: "a3",
    patientId: "p3",
    doctorId: "doc5",
    hospitalId: "h2",
    departmentId: "d3",
    crNumber: "CR12347",
    serialNumber: 3,
    date: "2023-06-16T09:30:00",
    status: "Scheduled",
    paymentStatus: "Pending",
    patientInfo: {
      id: "p3",
      crNumber: "CR12347",
      name: "Robert Johnson",
      age: 58,
      sex: "Male",
      address: "789 Pine St, Elsewhere, EL 13579",
      phone: "555-246-8102"
    },
    createdAt: "2023-06-03T16:45:00"
  }
];
