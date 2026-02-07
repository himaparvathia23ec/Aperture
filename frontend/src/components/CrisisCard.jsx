import React from 'react';
import { Link } from 'react-router-dom';

/** Derive crisis type for display (Flood, Fire, Infrastructure Failure, etc.) */
const getCrisisType = (crisis) => {
  if (crisis.raw_data_type === 'hospital_status') return 'Infrastructure Failure';
  if (crisis.raw_data_type === 'disaster_a') return 'Flash Flood';
  if (crisis.raw_data_type === 'disaster_b') return 'Regional Advisory';
  if (crisis.title?.toLowerCase().includes('fire')) return 'Fire';
  return crisis.title?.split(' - ')[0] || 'Incident';
};

/**
 * CrisisCard Component
 *
 * Emergency mission control interface. Prioritizes depth, context, accountability.
 * Human-in-the-loop: all actions lead to human review, no automated decisions.
 */
const CrisisCard = ({ crisis, actionType, onValidate }) => {

  // Theme configuration for the mission-control aesthetic
  const theme = {
    immediate: {
      accent: '#DC2626', // Red-600
      bg: '#FEF2F2',
      border: '#FECACA',
      label: 'IMMEDIATE ACTION',
      btnBg: '#DC2626',
      btnText: 'white'
    },
    validate: {
      accent: '#D97706', // Amber-600
      bg: '#FFFBEB',
      border: '#FDE68A',
      label: 'VALIDATION NEEDED',
      btnBg: 'white',
      btnText: '#B45309'
    },
    monitor: {
      accent: '#059669', // Emerald-600
      bg: '#ECFDF5',
      border: '#A7F3D0',
      label: 'MONITOR',
      btnBg: 'white',
      btnText: '#374151'
    }
  }[actionType] || {
    accent: '#6B7280',
    bg: '#F9FAFB',
    border: '#E5E7EB',
    label: 'INCIDENT',
    btnBg: 'white',
    btnText: '#374151'
  };

  // Helper for Confidence Badge styling
  const getConfidenceBadge = (conf) => {
    const c = conf?.toLowerCase();
    let style = { color: '#6B7280', bg: '#F3F4F6', border: '#E5E7EB' };

    if (c === 'high') style = { color: '#047857', bg: '#D1FAE5', border: '#10B981' };
    if (c === 'medium') style = { color: '#B45309', bg: '#FEF3C7', border: '#F59E0B' };
    if (c === 'low') style = { color: '#B91C1C', bg: '#FEE2E2', border: '#EF4444' };

    return (
      <span style={{
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '0.7rem',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {conf?.toUpperCase() || 'UNKNOWN'}
      </span>
    );
  };

  // Helper for Severity Style
  const getSeverityStyle = (sev) => {
    const s = sev?.toLowerCase();
    if (s === 'critical') return { color: '#DC2626', fontWeight: '800' };
    if (s === 'warning') return { color: '#D97706', fontWeight: '800' };
    return { color: '#059669', fontWeight: '800' };
  };

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E5E7EB',
      borderTop: `4px solid ${theme.accent}`,
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>

      {/* 1. Crisis Identity */}
      <div style={{ padding: '16px', borderBottom: '1px solid #F3F4F6', background: theme.bg + '30' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: '700',
            color: theme.accent,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            background: 'white',
            padding: '2px 6px',
            border: `1px solid ${theme.accent}40`,
            borderRadius: '4px'
          }}>
            {getCrisisType(crisis)}
          </span>
          <span style={{ fontSize: '0.65rem', color: '#9CA3AF', fontFamily: 'monospace' }}>ID-{crisis.id}</span>
        </div>

        <h3 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', fontWeight: '700', color: '#111827' }}>
          {crisis.raw_data_type === 'hospital_status' ? crisis.title : (crisis.title?.split(' - ')[1] || crisis.title)}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: '#4B5563', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>📍</span>
            <span style={{ fontWeight: '500' }}>{crisis.locations?.join(', ') || 'Unknown'}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9CA3AF', fontFamily: 'monospace' }}>
            Coordinates: {crisis.coordinates || 'N/A'}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* 2. Urgency vs Severity (Numeric Scale & Label) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ background: '#F9FAFB', padding: '10px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '0.65rem', color: '#6B7280', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Urgency</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: crisis.urgency_score >= 4 ? '#DC2626' : '#111827' }}>
                {crisis.urgency_score}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>/5</span>
            </div>
          </div>

          <div style={{ background: '#F9FAFB', padding: '10px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '0.65rem', color: '#6B7280', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Severity</div>
            <div style={{
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              ...getSeverityStyle(crisis.severity)
            }}>
              {crisis.severity || 'LOW'}
            </div>
          </div>
        </div>

        {/* 3. Data Confidence Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.75rem', color: '#4B5563', fontWeight: '600', textTransform: 'uppercase' }}>Data Confidence:</span>
          {getConfidenceBadge(crisis.confidence)}
        </div>

        {/* 4. Context Explanation: "Why this matters" */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            color: '#374151',
            textTransform: 'uppercase',
            marginBottom: '6px',
            borderBottom: '1px solid #F3F4F6',
            paddingBottom: '4px'
          }}>
            Why this matters
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151', lineHeight: '1.5' }}>
            {crisis.summary || 'Operational context pending field validation.'}
          </p>
        </div>

        {/* 5. Trust Metadata */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px solid #F3F4F6',
          fontSize: '0.7rem',
          color: '#6B7280',
          fontFamily: 'monospace'
        }}>
          <span>UPDATED: {new Date(crisis.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
          <span>SOURCE: {crisis.source?.toUpperCase() || 'UNKNOWN'}</span>
        </div>

        {/* 6. Human Next Step Button — Leads to human review, no automated decisions */}
        <div style={{ marginTop: '8px' }}>
          {actionType === 'validate' ? (
            <button
              onClick={() => onValidate?.(crisis)}
              style={{
                width: '100%',
                background: 'transparent',
                border: `2px solid ${theme.accent}`,
                color: theme.accent,
                padding: '10px',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              Validate Information
            </button>
          ) : actionType === 'immediate' ? (
            <Link to={`/crisis/${crisis.id}`} style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                background: theme.accent,
                border: 'none',
                color: 'white',
                padding: '12px',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Review & Decide
              </button>
            </Link>
          ) : (
            <Link to={`/crisis/${crisis.id}`} style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                background: 'white',
                border: '1px solid #D1D5DB',
                color: '#374151',
                padding: '10px',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}>
                Escalate for Assessment
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrisisCard;
