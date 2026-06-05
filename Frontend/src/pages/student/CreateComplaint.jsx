import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { complaintService } from '../../services/api';
import { Input, Select, Textarea } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import toast from 'react-hot-toast';
import { COMPLAINT_CATEGORIES, PRIORITY_LEVELS, FLOORS } from '../../utils/helpers';
import { HiOutlineCamera, HiOutlineXMark } from 'react-icons/hi2';

export default function CreateComplaint() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    title: '', category: '', description: '', room: user?.room || '', floor: user?.floor || '', priority: 'medium', image: null,
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setForm({ ...form, image: null });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.description || !form.room || !form.floor) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      await complaintService.create({
        ...form, studentId: user.id, studentName: user.name,
      });
      toast.success('Complaint submitted successfully!');
      navigate('/student/complaints');
    } catch {
      toast.error('Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Report an Issue</h1>
        <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">Fill out the form below to submit a new complaint</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Complaint Title *" name="title" placeholder="e.g., Fan not working in room" value={form.title} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4">
            <Select label="Category *" name="category" value={form.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {COMPLAINT_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</option>
              ))}
            </Select>

            <Select label="Priority *" name="priority" value={form.priority} onChange={handleChange}>
              {PRIORITY_LEVELS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </Select>
          </div>

          <Textarea label="Description *" name="description" placeholder="Describe the issue in detail..." rows={4} value={form.description} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Room Number *" name="room" placeholder="e.g., 204" value={form.room} onChange={handleChange} />
            <Select label="Floor *" name="floor" value={form.floor} onChange={handleChange}>
              <option value="">Select Floor</option>
              {FLOORS.map((f) => (
                <option key={f} value={f}>Floor {f}</option>
              ))}
            </Select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">Attach Photo (Optional)</label>
            {imagePreview ? (
              <div className="relative inline-block">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-xl border border-dark-200 dark:border-dark-700" />
                <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 w-6 h-6 bg-danger-500 text-white rounded-full flex items-center justify-center shadow cursor-pointer">
                  <HiOutlineXMark className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-dark-300 dark:border-dark-600 rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-all">
                <HiOutlineCamera className="w-8 h-8 text-dark-400 mb-2" />
                <span className="text-sm text-dark-500">Click to upload</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={loading} className="flex-1">Submit Complaint</Button>
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
