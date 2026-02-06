import React, { useState, useEffect } from 'react';
import { getCrises } from '../api';
import CrisisCard from '../components/CrisisCard';
import ReportModal from '../components/ReportModal';

const Dashboard = () => {
  const [crises, setCrises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    fetchCrises();
  }, []);

  const fetchCrises = async () => {
    try {
      const data = await getCrises();
      setCrises(data);
    } catch (error) {
      console.error("Failed to fetch crises", error);
    } finally {
      setLoading(false);
    }
  };

  const highUrgencyCount = crises.filter(c => c.urgency_score >= 4).length;
  const reviewRequiredCount = crises.filter(c => c.confidence === 'low').length;
  const topPriority = crises.sort((a, b) => b.urgency_score - a.urgency_score)[0];

  if (loading) return (
    <div style={{ color: 'var(--text-secondary)', padding: '40px', textAlign: 'center' }}>
      Loading Dispatch Data...
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#111827' }}>Operational Control</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Crises requiring review or coordination based on urgency and data confidence.
          </p>
        </div>
        <button
          className="btn"
          onClick={() => setShowReportModal(true)}
          style={{
            background: 'white',
            border: '1px solid #D1D5DB',
            color: '#374151',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          + Report New Crisis
        </button>
      </div>

      {showReportModal && <ReportModal onClose={() => setShowReportModal(false)} />}

      {/* Actionable KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {/* Active Crises */}
        <div className="glass-container" style={{ padding: '24px', background: 'white' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '8px' }}>Active Incidents</div>
          <div style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--text-primary)' }}>{crises.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px' }}>Ongoing tracking</div>
        </div>

        {/* High Urgency */}
        <div className="glass-container" style={{ padding: '24px', background: 'white', borderLeft: '4px solid #B91C1C' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '8px' }}>Urgent Attention</div>
          <div style={{ fontSize: '2rem', fontWeight: '600', color: '#B91C1C' }}>{highUrgencyCount}</div>
          <div style={{ fontSize: '0.75rem', color: highUrgencyCount > 0 ? '#DC2626' : '#6B7280', marginTop: '4px' }}>
            {highUrgencyCount > 0 ? 'Immediate review needed' : 'No escalation required'}
          </div>
        </div>

        {/* Review Required */}
        <div className="glass-container" style={{ padding: '24px', background: 'white', borderLeft: '4px solid #F59E0B' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '8px' }}>Validation Needed</div>
          <div style={{ fontSize: '2rem', fontWeight: '600', color: '#D97706' }}>{reviewRequiredCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px' }}>Low confidence reports</div>
        </div>

        {/* Resources */}
        <div className="glass-container" style={{ padding: '24px', background: 'white', borderLeft: '4px solid var(--accent-color)' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '8px' }}>Resource Status</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--accent-color)' }}>Ready</div>
          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px' }}>Capacity confirmed 2h ago</div>
        </div>
      </div>

      {/* Next Recommended Action Strip */}
      {topPriority && (
        <div style={{
          background: '#F0FDF4',
          border: '1px solid #BBF7D0',
          borderRadius: '8px',
          padding: '16px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            background: '#16A34A',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: '600',
            padding: '4px 8px',
            borderRadius: '4px',
            textTransform: 'uppercase'
          }}>
            Recommended Action
          </div>
          <div style={{ color: '#14532D', fontSize: '0.95rem' }}>
            <strong>Review {topPriority.title}:</strong> Urgency is {topPriority.urgency_score}/5. {topPriority.summary.split('.')[0]}.
          </div>
        </div>
      )}

      <h2 style={{ fontSize: '1.125rem', marginBottom: '16px', borderBottom: '1px solid #E5E7EB', paddingBottom: '12px', color: '#374151' }}>
        Priority Bulletins
      </h2>

      {crises.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px', background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', color: 'var(--text-secondary)' }}>
          No active crisis bulletins. System monitoring...
        </div>
      ) : (
        <div className="crisis-grid">
          {crises.map(c => (
            <CrisisCard
              key={c.id}
              crisis={c}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
