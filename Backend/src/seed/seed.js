import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { Complaint } from '../models/Complaint.js';
import { Notification } from '../models/Notification.js';
import { Counter } from '../models/Counter.js';
import { env } from '../config/env.js';

dotenv.config();

const PASSWORD = env.defaultPassword;

const usersSeed = [
  { name: 'Arjun Sharma', email: 'arjun@hostel.edu', role: 'student', room: '204', floor: 2, phone: '9876543210' },
  { name: 'Priya Patel', email: 'priya@hostel.edu', role: 'student', room: '312', floor: 3, phone: '9876543211' },
  { name: 'Rahul Kumar', email: 'rahul@hostel.edu', role: 'student', room: '105', floor: 1, phone: '9876543212' },
  { name: 'Sneha Gupta', email: 'sneha@hostel.edu', role: 'student', room: '418', floor: 4, phone: '9876543213' },
  { name: 'Vikram Singh', email: 'vikram@hostel.edu', role: 'student', room: '501', floor: 5, phone: '9876543214' },
  { name: 'Ananya Reddy', email: 'ananya@hostel.edu', role: 'student', room: '203', floor: 2, phone: '9876543215' },
  { name: 'Deepak Verma', email: 'deepak@hostel.edu', role: 'student', room: '310', floor: 3, phone: '9876543216' },
  { name: 'Mr. Rajendra Mishra', email: 'warden@hostel.edu', role: 'warden', floors: [1, 2, 3], phone: '9876500001' },
  { name: 'Mrs. Kavita Joshi', email: 'warden2@hostel.edu', role: 'warden', floors: [4, 5], phone: '9876500002' },
  { name: 'Dr. Suresh Iyer', email: 'admin@hostel.edu', role: 'admin', phone: '9876500000' },
];

const complaintsSeed = [
  { id: 'CMP-001', title: 'Fan not working in room', category: 'electricity', description: 'The ceiling fan in my room has stopped working completely.', room: '204', floor: 2, priority: 'high', status: 'pending', studentEmail: 'arjun@hostel.edu', notes: '', createdAt: '2026-05-15T10:30:00' },
  { id: 'CMP-002', title: 'Broken chair in study area', category: 'furniture', description: 'One of the study chairs has a broken leg.', room: '312', floor: 3, priority: 'medium', status: 'in-progress', studentEmail: 'priya@hostel.edu', notes: 'Carpenter will visit tomorrow', createdAt: '2026-05-14T14:20:00' },
  { id: 'CMP-003', title: 'Bathroom drain clogged', category: 'washroom', description: 'Shower drain clogged on floor 1.', room: '105', floor: 1, priority: 'urgent', status: 'in-progress', studentEmail: 'rahul@hostel.edu', notes: 'Plumber dispatched', createdAt: '2026-05-13T08:15:00' },
  { id: 'CMP-004', title: 'Room not cleaned for 3 days', category: 'cleaning', description: 'Room and corridor not cleaned.', room: '418', floor: 4, priority: 'medium', status: 'resolved', studentEmail: 'sneha@hostel.edu', notes: 'Cleaning done and verified', createdAt: '2026-05-10T16:45:00' },
  { id: 'CMP-005', title: 'WiFi not connecting', category: 'wifi', description: 'Unable to connect to hostel WiFi.', room: '501', floor: 5, priority: 'high', status: 'pending', studentEmail: 'vikram@hostel.edu', notes: '', createdAt: '2026-05-15T20:00:00' },
  { id: 'CMP-006', title: 'Water leaking from ceiling', category: 'water', description: 'Water leak near the window.', room: '203', floor: 2, priority: 'urgent', status: 'in-progress', studentEmail: 'ananya@hostel.edu', notes: 'Inspecting tank', createdAt: '2026-05-12T07:30:00' },
  { id: 'CMP-007', title: 'Tubelight flickering', category: 'electricity', description: 'Tubelight flickers at night.', room: '310', floor: 3, priority: 'medium', status: 'resolved', studentEmail: 'deepak@hostel.edu', notes: 'Replaced tubelight', createdAt: '2026-05-08T22:10:00' },
  { id: 'CMP-008', title: 'Cupboard door broken', category: 'furniture', description: 'Cupboard hinge broken.', room: '204', floor: 2, priority: 'high', status: 'pending', studentEmail: 'arjun@hostel.edu', notes: '', createdAt: '2026-05-16T06:00:00' },
  { id: 'CMP-009', title: 'No hot water in washroom', category: 'water', description: 'Geyser not working on 4th floor.', room: '418', floor: 4, priority: 'medium', status: 'resolved', studentEmail: 'sneha@hostel.edu', notes: 'Geyser repaired', createdAt: '2026-05-05T05:30:00' },
  { id: 'CMP-010', title: 'Cockroach infestation', category: 'cleaning', description: 'Severe cockroach problem.', room: '105', floor: 1, priority: 'urgent', status: 'pending', studentEmail: 'rahul@hostel.edu', notes: '', createdAt: '2026-05-16T09:00:00' },
  { id: 'CMP-011', title: 'Power socket sparking', category: 'electricity', description: 'Socket sparking when plugging charger.', room: '312', floor: 3, priority: 'urgent', status: 'in-progress', studentEmail: 'priya@hostel.edu', notes: 'Electrician dispatched', createdAt: '2026-05-15T23:45:00' },
  { id: 'CMP-012', title: 'WiFi speed very slow', category: 'wifi', description: 'WiFi speed dropped on floor 2.', room: '203', floor: 2, priority: 'high', status: 'resolved', studentEmail: 'ananya@hostel.edu', notes: 'Router reset', createdAt: '2026-05-01T11:00:00' },
  { id: 'CMP-013', title: 'Washroom tiles broken', category: 'washroom', description: 'Broken tiles with sharp edges.', room: '501', floor: 5, priority: 'high', status: 'pending', studentEmail: 'vikram@hostel.edu', notes: '', createdAt: '2026-05-16T12:00:00' },
  { id: 'CMP-014', title: 'Table drawer stuck', category: 'furniture', description: 'Study table drawer stuck.', room: '310', floor: 3, priority: 'low', status: 'resolved', studentEmail: 'deepak@hostel.edu', notes: 'Drawer fixed', createdAt: '2026-04-28T10:00:00' },
  { id: 'CMP-015', title: 'Corridor lights not working', category: 'electricity', description: 'Corridor lights out on 4th floor.', room: '418', floor: 4, priority: 'high', status: 'in-progress', studentEmail: 'sneha@hostel.edu', notes: 'Wiring issue', createdAt: '2026-05-14T19:00:00' },
];

async function seed() {
  await mongoose.connect(env.mongoUri);
  console.log('Connected. Clearing collections...');

  await Promise.all([
    User.deleteMany({}),
    Complaint.deleteMany({}),
    Notification.deleteMany({}),
    Counter.deleteMany({}),
  ]);

  const users = await User.create(
    usersSeed.map((u) => ({
      ...u,
      hostel: 'Hostel A',
      password: PASSWORD,
    }))
  );

  const emailToUser = Object.fromEntries(users.map((u) => [u.email, u]));

  const complaints = await Complaint.insertMany(
    complaintsSeed.map((c) => {
      const student = emailToUser[c.studentEmail];
      return {
        complaintId: c.id,
        title: c.title,
        category: c.category,
        description: c.description,
        room: c.room,
        floor: c.floor,
        priority: c.priority,
        status: c.status,
        studentId: student._id,
        studentName: student.name,
        notes: c.notes,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.createdAt),
      };
    })
  );

  await Counter.create({ _id: 'complaint', seq: complaints.length });

  const arjun = emailToUser['arjun@hostel.edu'];
  await Notification.insertMany([
    { userId: arjun._id, message: 'Your complaint CMP-001 has been received', type: 'info', read: false, complaintId: 'CMP-001' },
    { userId: arjun._id, message: 'Complaint CMP-003 status updated to In Progress', type: 'success', read: false, complaintId: 'CMP-003' },
    { userId: emailToUser['sneha@hostel.edu']._id, message: 'Complaint CMP-004 has been resolved', type: 'success', read: true, complaintId: 'CMP-004' },
  ]);

  console.log(`Seeded ${users.length} users, ${complaints.length} complaints`);
  console.log(`Default password for all accounts: ${PASSWORD}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
