import React from 'react';
import { Link } from 'react-router-dom';

const CrisisCard = ({ crisis }) => {
  const isUrgent = crisis.urgency_score >= 4;

  return (
    <div className="glass-container card" style={{
      background: 'white',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      borderTop: isUrgent ? '4px solid #B91C1C' : '1px solid #E5E7EB' // Visual priority
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              color: isUrgent ? '#B91C1C' : '#374151',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {isUrgent ? 'Immediate Action' : 'Monitor'}
            </span>
            <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '2px' }}>
              Reported: {new Date(crisis.timestamp).toLocaleDateString()}
            </div>
          </div>

          {/* Secondary Qualifier: Confidence */}
          <span className={`confidence-${crisis.confidence}`} style={{ fontSize: '0.7rem' }}>
            {crisis.confidence} Conf.
          </span>
        </div>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', lineHeight: '1.4', color: '#111827' }}>
          {crisis.title}
        </h3>

        <p style={{ fontSize: '0.875rem', color: '#4B5563', marginBottom: '16px' }}>
          <strong style={{ color: '#111827' }}>Location:</strong> {crisis.locations.join(', ')}
        </p>

        {/* Explainability Section */}
        <div style={{ background: '#F9FAFB', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.875rem', color: '#374151' }}>
          <strong style={{ display: 'block', fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', marginBottom: '4px' }}>Why this matters</strong>
          {crisis.summary}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px', marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Urgency Score</span>
            <span style={{ fontWeight: '600', fontSize: '1.1rem', color: isUrgent ? '#B91C1C' : '#374151' }}>
              {crisis.urgency_score} <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>/ 5</span>
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Severity</span>
            <span style={{ fontWeight: '600', textTransform: 'uppercase', fontSize: '0.9rem' }}>{crisis.severity}</span>
          </div>
        </div>

        <Link to={`/crisis/${crisis.id}`} className="btn btn-primary" style={{ width: '100%', textDecoration: 'none' }}>
          {crisis.raw_data_type === 'hospital_status' ? 'View Nearby Hospitals & Decide' : 'Review Options & Decide'}
        </Link>
      </div>
    </div>
  );
};

export default CrisisCard;
