// ── Mock Users (password used only for local mock auth; never expose in API responses) ──
const MOCK_PASSWORD = 'hostel123';

export const mockUsers = [
  { id: 1, name: 'Arjun Sharma', email: 'arjun@hostel.edu', password: MOCK_PASSWORD, role: 'student', room: '204', floor: 2, hostel: 'Hostel A', avatar: null, phone: '9876543210', createdAt: '2025-08-15' },
  { id: 2, name: 'Priya Patel', email: 'priya@hostel.edu', password: MOCK_PASSWORD, role: 'student', room: '312', floor: 3, hostel: 'Hostel A', avatar: null, phone: '9876543211', createdAt: '2025-08-16' },
  { id: 3, name: 'Rahul Kumar', email: 'rahul@hostel.edu', password: MOCK_PASSWORD, role: 'student', room: '105', floor: 1, hostel: 'Hostel A', avatar: null, phone: '9876543212', createdAt: '2025-08-17' },
  { id: 4, name: 'Sneha Gupta', email: 'sneha@hostel.edu', password: MOCK_PASSWORD, role: 'student', room: '418', floor: 4, hostel: 'Hostel A', avatar: null, phone: '9876543213', createdAt: '2025-08-18' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@hostel.edu', password: MOCK_PASSWORD, role: 'student', room: '501', floor: 5, hostel: 'Hostel A', avatar: null, phone: '9876543214', createdAt: '2025-09-01' },
  { id: 6, name: 'Ananya Reddy', email: 'ananya@hostel.edu', password: MOCK_PASSWORD, role: 'student', room: '203', floor: 2, hostel: 'Hostel A', avatar: null, phone: '9876543215', createdAt: '2025-09-05' },
  { id: 7, name: 'Deepak Verma', email: 'deepak@hostel.edu', password: MOCK_PASSWORD, role: 'student', room: '310', floor: 3, hostel: 'Hostel A', avatar: null, phone: '9876543216', createdAt: '2025-09-10' },
  { id: 8, name: 'Mr. Rajendra Mishra', email: 'warden@hostel.edu', password: MOCK_PASSWORD, role: 'warden', floors: [1, 2, 3], hostel: 'Hostel A', avatar: null, phone: '9876500001', createdAt: '2025-01-01' },
  { id: 9, name: 'Mrs. Kavita Joshi', email: 'warden2@hostel.edu', password: MOCK_PASSWORD, role: 'warden', floors: [4, 5], hostel: 'Hostel A', avatar: null, phone: '9876500002', createdAt: '2025-01-01' },
  { id: 10, name: 'Dr. Suresh Iyer', email: 'admin@hostel.edu', password: MOCK_PASSWORD, role: 'admin', avatar: null, phone: '9876500000', createdAt: '2024-06-01' },
];

// ── Mock Complaints ──
export const mockComplaints = [
  {
    id: 'CMP-001', title: 'Fan not working in room', category: 'electricity', description: 'The ceiling fan in my room has stopped working completely. It makes a buzzing noise when turned on but the blades don\'t rotate.', room: '204', floor: 2, priority: 'high', status: 'pending',
    studentId: 1, studentName: 'Arjun Sharma', notes: '', image: null, createdAt: '2026-05-15T10:30:00', updatedAt: '2026-05-15T10:30:00',
  },
  {
    id: 'CMP-002', title: 'Broken chair in study area', category: 'furniture', description: 'One of the study chairs has a broken leg and is unsafe to sit on.', room: '312', floor: 3, priority: 'medium', status: 'in-progress',
    studentId: 2, studentName: 'Priya Patel', notes: 'Carpenter will visit tomorrow', image: null, createdAt: '2026-05-14T14:20:00', updatedAt: '2026-05-15T09:00:00',
  },
  {
    id: 'CMP-003', title: 'Bathroom drain clogged', category: 'washroom', description: 'The shower drain in the common bathroom on floor 1 is completely clogged. Water is pooling during showers.', room: '105', floor: 1, priority: 'urgent', status: 'in-progress',
    studentId: 3, studentName: 'Rahul Kumar', notes: 'Plumber dispatched', image: null, createdAt: '2026-05-13T08:15:00', updatedAt: '2026-05-14T11:00:00',
  },
  {
    id: 'CMP-004', title: 'Room not cleaned for 3 days', category: 'cleaning', description: 'My room and the corridor have not been cleaned for the past three days. Dustbins are overflowing.', room: '418', floor: 4, priority: 'medium', status: 'resolved',
    studentId: 4, studentName: 'Sneha Gupta', notes: 'Cleaning done and verified', image: null, createdAt: '2026-05-10T16:45:00', updatedAt: '2026-05-12T10:00:00',
  },
  {
    id: 'CMP-005', title: 'WiFi not connecting', category: 'wifi', description: 'Unable to connect to hostel WiFi from my room. Other residents on the same floor are facing the same issue.', room: '501', floor: 5, priority: 'high', status: 'pending',
    studentId: 5, studentName: 'Vikram Singh', notes: '', image: null, createdAt: '2026-05-15T20:00:00', updatedAt: '2026-05-15T20:00:00',
  },
  {
    id: 'CMP-006', title: 'Water leaking from ceiling', category: 'water', description: 'There is a continuous water leak from the ceiling near the window. It has damaged some of my books.', room: '203', floor: 2, priority: 'urgent', status: 'in-progress',
    studentId: 6, studentName: 'Ananya Reddy', notes: 'Inspecting tank', image: null, createdAt: '2026-05-12T07:30:00', updatedAt: '2026-05-13T14:00:00',
  },
  {
    id: 'CMP-007', title: 'Tubelight flickering', category: 'electricity', description: 'The tubelight in my room keeps flickering throughout the night. Cannot sleep properly.', room: '310', floor: 3, priority: 'medium', status: 'resolved',
    studentId: 7, studentName: 'Deepak Verma', notes: 'Replaced tubelight', image: null, createdAt: '2026-05-08T22:10:00', updatedAt: '2026-05-10T15:00:00',
  },
  {
    id: 'CMP-008', title: 'Cupboard door broken', category: 'furniture', description: 'The cupboard door hinge is broken and the door is hanging loose. Risk of injury.', room: '204', floor: 2, priority: 'high', status: 'pending',
    studentId: 1, studentName: 'Arjun Sharma', notes: '', image: null, createdAt: '2026-05-16T06:00:00', updatedAt: '2026-05-16T06:00:00',
  },
  {
    id: 'CMP-009', title: 'No hot water in washroom', category: 'water', description: 'The hot water geyser in the 4th floor common washroom is not working.', room: '418', floor: 4, priority: 'medium', status: 'resolved',
    studentId: 4, studentName: 'Sneha Gupta', notes: 'Geyser repaired', image: null, createdAt: '2026-05-05T05:30:00', updatedAt: '2026-05-07T12:00:00',
  },
  {
    id: 'CMP-010', title: 'Cockroach infestation', category: 'cleaning', description: 'There is a severe cockroach problem in the ground floor kitchen area and it has spread to nearby rooms.', room: '105', floor: 1, priority: 'urgent', status: 'pending',
    studentId: 3, studentName: 'Rahul Kumar', notes: '', image: null, createdAt: '2026-05-16T09:00:00', updatedAt: '2026-05-16T09:00:00',
  },
  {
    id: 'CMP-011', title: 'Power socket sparking', category: 'electricity', description: 'The power socket near my bed is sparking when I plug in my charger. Very dangerous.', room: '312', floor: 3, priority: 'urgent', status: 'in-progress',
    studentId: 2, studentName: 'Priya Patel', notes: 'Electrician dispatched', image: null, createdAt: '2026-05-15T23:45:00', updatedAt: '2026-05-16T08:00:00',
  },
  {
    id: 'CMP-012', title: 'WiFi speed very slow', category: 'wifi', description: 'The WiFi speed has dropped significantly on floor 2. Cannot attend online classes.', room: '203', floor: 2, priority: 'high', status: 'resolved',
    studentId: 6, studentName: 'Ananya Reddy', notes: 'Router reset and upgraded', image: null, createdAt: '2026-05-01T11:00:00', updatedAt: '2026-05-03T16:00:00',
  },
  {
    id: 'CMP-013', title: 'Washroom tiles broken', category: 'washroom', description: 'Multiple tiles in the 5th floor washroom are broken and have sharp edges.', room: '501', floor: 5, priority: 'high', status: 'pending',
    studentId: 5, studentName: 'Vikram Singh', notes: '', image: null, createdAt: '2026-05-16T12:00:00', updatedAt: '2026-05-16T12:00:00',
  },
  {
    id: 'CMP-014', title: 'Table drawer stuck', category: 'furniture', description: 'The drawer of my study table is completely stuck and I cannot open it. My notes are inside.', room: '310', floor: 3, priority: 'low', status: 'resolved',
    studentId: 7, studentName: 'Deepak Verma', notes: 'Drawer fixed', image: null, createdAt: '2026-04-28T10:00:00', updatedAt: '2026-04-30T14:00:00',
  },
  {
    id: 'CMP-015', title: 'Corridor lights not working', category: 'electricity', description: 'All corridor lights on the 4th floor are not working. Very dark at night.', room: '418', floor: 4, priority: 'high', status: 'in-progress',
    studentId: 4, studentName: 'Sneha Gupta', notes: 'Wiring issue, work in progress', image: null, createdAt: '2026-05-14T19:00:00', updatedAt: '2026-05-15T10:00:00',
  },
];

// ── Mock Notifications ──
export const mockNotifications = [
  { id: 1, message: 'Your complaint CMP-001 has been received', type: 'info', read: false, createdAt: '2026-05-15T10:31:00' },
  { id: 2, message: 'Complaint CMP-003 status updated to In Progress', type: 'success', read: false, createdAt: '2026-05-14T11:01:00' },
  { id: 3, message: 'Complaint CMP-004 has been resolved', type: 'success', read: true, createdAt: '2026-05-12T10:01:00' },
  { id: 4, message: 'New urgent complaint CMP-010 reported', type: 'warning', read: false, createdAt: '2026-05-16T09:01:00' },
  { id: 5, message: 'Complaint CMP-007 resolved', type: 'success', read: true, createdAt: '2026-05-10T15:01:00' },
];

// ── Analytics Data ──
export const monthlyComplaintData = [
  { month: 'Jan', complaints: 12, resolved: 10 },
  { month: 'Feb', complaints: 19, resolved: 15 },
  { month: 'Mar', complaints: 15, resolved: 14 },
  { month: 'Apr', complaints: 22, resolved: 18 },
  { month: 'May', complaints: 28, resolved: 16 },
];

export const categoryDistribution = [
  { name: 'Electricity', value: 4, fill: '#3b82f6' },
  { name: 'Furniture', value: 3, fill: '#f59e0b' },
  { name: 'Cleaning', value: 2, fill: '#22c55e' },
  { name: 'Water', value: 2, fill: '#06b6d4' },
  { name: 'WiFi', value: 2, fill: '#8b5cf6' },
  { name: 'Washroom', value: 2, fill: '#ef4444' },
];

export const floorWiseData = [
  { floor: 'Floor 1', total: 3, pending: 1, resolved: 1, inProgress: 1 },
  { floor: 'Floor 2', total: 4, pending: 1, resolved: 1, inProgress: 2 },
  { floor: 'Floor 3', total: 3, pending: 0, resolved: 2, inProgress: 1 },
  { floor: 'Floor 4', total: 3, pending: 0, resolved: 1, inProgress: 2 },
  { floor: 'Floor 5', total: 2, pending: 2, resolved: 0, inProgress: 0 },
];

export const statusDistribution = [
  { name: 'Pending', value: 5, fill: '#f59e0b' },
  { name: 'In Progress', value: 5, fill: '#3b82f6' },
  { name: 'Resolved', value: 5, fill: '#22c55e' },
];

export const priorityDistribution = [
  { name: 'Low', value: 1, fill: '#22c55e' },
  { name: 'Medium', value: 4, fill: '#f59e0b' },
  { name: 'High', value: 5, fill: '#f97316' },
  { name: 'Urgent', value: 5, fill: '#ef4444' },
];
