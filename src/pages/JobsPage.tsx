import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { WhatsappIcon } from 'react-share';
import { Share2 } from 'lucide-react';

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
        jobs.map((job) => {
          const shareUrl = `${window.location.origin}/jobs#job-${job.id}`;
          const shareText = `Job Opportunity:\n${job.details}\nSearch jobs here: devblogs.io/jobs`;
          return (
            <div key={job.id} id={`job-${job.id}`} className="mb-8 p-6 bg-white rounded shadow">
              <div className="whitespace-pre-wrap text-gray-800 mb-4">{linkify(job.details)}</div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={async () => {
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: 'Job Opportunity',
                          text: shareText,
                          url: shareUrl,
                        });
                      } catch (error) {
                        // User cancelled or error
                      }
                    } else {
                      // Fallback: WhatsApp share
                      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
                      window.open(whatsappUrl, '_blank');
                    }
                  }}
                  title="Share job"
                >
                  <Share2 className="h-5 w-5 mr-1" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default JobsPage;
