import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

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

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<{ id: number; details: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase.from('jobs').select('*').order('id', { ascending: false });
      if (!error && data) setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Job Opportunities</h1>
      {loading ? <p>Loading...</p> : jobs.length === 0 ? <p>No job opportunities available right now.</p> : (
        jobs.map((job) => (
          <div key={job.id} className="mb-8 p-6 bg-white rounded shadow">
            <div className="whitespace-pre-wrap text-gray-800">{linkify(job.details)}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default JobsPage;
