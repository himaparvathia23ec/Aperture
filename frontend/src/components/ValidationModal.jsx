import React, { useState } from 'react';

/**
 * ValidationModal — Human-in-the-loop confirmation for unverified crisis signals.
 * No automated decisions. Human must confirm or reject the information.
 */
const ValidationModal = ({ crisis, onConfirm, onCancel }) => {
  const [comment, setComment] = useState('');

  const handleConfirm = (valid) => {
    onConfirm(valid, comment);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        width: '100%',
        maxWidth: '480px',
        padding: 0,
        borderRadius: '8px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #E5E7EB' }}>
          <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '700', color: '#111827' }}>
            Validate Information
          </h2>
          <p style={{ margin: '8px 0 0 0', fontSize: '0.875rem', color: '#6B7280' }}>
            Confirm or reject this signal. Your decision will be logged for audit.
          </p>
        </div>

        <div style={{ padding: '24px' }}>
          <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: '6px', marginBottom: '16px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '4px' }}>Signal</div>
            <div style={{ fontWeight: '600', color: '#111827' }}>{crisis?.title}</div>
            <div style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '4px' }}>{crisis?.locations?.join(', ')}</div>
          </div>

          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151', fontSize: '0.875rem' }}>
            Notes (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add verification context..."
            style={{
              width: '100%',
              minHeight: '72px',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #D1D5DB',
              fontFamily: 'inherit',
              fontSize: '0.875rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ padding: '16px 24px', background: '#F9FAFB', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '8px 16px',
              background: 'white',
              border: '1px solid #D1D5DB',
              color: '#374151',
              borderRadius: '6px',
              fontWeight: '500',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => handleConfirm(false)}
            style={{
              padding: '8px 16px',
              background: 'white',
              border: '1px solid #DC2626',
              color: '#DC2626',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            Reject Signal
          </button>
          <button
            onClick={() => handleConfirm(true)}
            style={{
              padding: '8px 16px',
              background: '#059669',
              border: 'none',
              color: 'white',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            Confirm Verified
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;
