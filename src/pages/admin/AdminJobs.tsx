import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

// Utility to linkify URLs in text
function linkify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{part}</a>;
    }
    return part;
  });
}

const AdminJobs: React.FC = () => {
  const [jobs, setJobs] = useState<{ id: number; details: string }[]>([]);
  const [newJob, setNewJob] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('jobs').select('*').order('id', { ascending: false });
    if (!error && data) setJobs(data);
    setLoading(false);
  };

  const handleAddJob = async () => {
    if (!newJob.trim()) return;
    setSubmitting(true);
    await supabase.from('jobs').insert([{ details: newJob.trim() }]);
    setNewJob('');
    await fetchJobs();
    setSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    await supabase.from('jobs').delete().eq('id', id);
    await fetchJobs();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Manage Job Opportunities</h2>
      <div className="mb-4">
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={3}
          placeholder="Paste all job details here (e.g. Company: ... | Domain: ... | JD: ... | Link: ...)"
          value={newJob}
          onChange={e => setNewJob(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAddJob}
          disabled={submitting}
        >
          {submitting ? 'Adding...' : 'Add Job'}
        </button>
      </div>
      <div>
        {loading ? <p>Loading...</p> : jobs.length === 0 ? <p>No jobs added yet.</p> : (
          jobs.map(job => (
            <div key={job.id} className="mb-4 p-3 border rounded flex justify-between items-center">
              <div className="whitespace-pre-wrap text-gray-800 flex-1">{linkify(job.details)}</div>
              <button
                className="ml-4 text-red-600 hover:underline"
                onClick={() => handleDelete(job.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminJobs;
