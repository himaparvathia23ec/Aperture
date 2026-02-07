import React, { useState } from 'react';
import CrisisCard from './CrisisCard';
import ValidationModal from './ValidationModal';

/**
 * ActiveCrisisList — Mission Control grouping and display.
 * Vertical stack layout (not grid). Display-only grouping. No automation.
 */
const ActiveCrisisList = ({ crises }) => {
  const [validationTarget, setValidationTarget] = useState(null);

  // Display-only grouping (no system-initiated actions)
  const immediateCrises = crises
    .filter(c => (c.urgency_score >= 4 || c.severity?.toLowerCase() === 'critical') && c.confidence !== 'low')
    .sort((a, b) => b.urgency_score - a.urgency_score);

  const validationNeeded = crises
    .filter(c => c.confidence === 'low' || c.severity?.toLowerCase() === 'warning')
    .filter(c => !immediateCrises.find(ic => ic.id === c.id))
    .sort((a, b) => b.urgency_score - a.urgency_score);

  const monitorCrises = crises
    .filter(c => !immediateCrises.find(ic => ic.id === c.id) && !validationNeeded.find(vc => vc.id === c.id))
    .sort((a, b) => b.urgency_score - a.urgency_score);

  const handleValidationConfirm = (valid, comment) => {
    console.log('HUMAN VALIDATION:', { crisisId: validationTarget?.id, valid, comment });
    setValidationTarget(null);
  };

  const renderSection = (title, items, type, countLabel) => {
    if (items.length === 0) return null;

    const sectionStyles = {
      immediate: { color: '#DC2626', border: '#FECACA' },
      validate: { color: '#D97706', border: '#FEF3C7' },
      monitor: { color: '#059669', border: '#D1FAE5' }
    }[type];

    return (
      <section style={{ marginBottom: '40px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: `2px solid ${sectionStyles.border}`
        }}>
          <h2 style={{
            fontSize: '1.125rem',
            fontWeight: '800',
            color: '#1F2937',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: 0
          }}>
            {title}
          </h2>
          <div style={{
            marginLeft: '16px',
            background: sectionStyles.color,
            color: 'white',
            fontSize: '0.7rem',
            padding: '2px 10px',
            borderRadius: '4px',
            fontWeight: '700'
          }}>
            {items.length} {countLabel}
          </div>
        </div>
        {/* Single-column vertical stack — distinct from Dashboard grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map(c => (
            <CrisisCard
              key={c.id}
              crisis={c}
              actionType={type === 'immediate' ? 'immediate' : type === 'validate' ? 'validate' : 'monitor'}
              onValidate={type === 'validate' ? setValidationTarget : null}
            />
          ))}
        </div>
      </section>
    );
  };

  if (crises.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px',
        background: 'white',
        borderRadius: '8px',
        border: '1px dashed #D1D5DB',
        color: '#6B7280'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>System Clear</h3>
        <p style={{ margin: '8px 0 0 0', fontSize: '0.875rem' }}>No active signals detected in monitoring range.</p>
      </div>
    );
  }

  return (
    <div>
      {renderSection('Immediate Action', immediateCrises, 'immediate', 'RESOLUTIONS PENDING')}
      {renderSection('Validation Needed', validationNeeded, 'validate', 'SIGNALS UNVERIFIED')}
      {renderSection('Monitor', monitorCrises, 'monitor', 'SYSTEM TRACKING')}

      {validationTarget && (
        <ValidationModal
          crisis={validationTarget}
          onConfirm={handleValidationConfirm}
          onCancel={() => setValidationTarget(null)}
        />
      )}
    </div>
  );
};

export default ActiveCrisisList;
