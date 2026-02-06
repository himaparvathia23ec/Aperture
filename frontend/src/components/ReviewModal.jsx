import React, { useState } from 'react';

const ReviewModal = ({ crisis, recommendation, onConfirm, onCancel }) => {
    const [comment, setComment] = useState('');

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="glass-container" style={{
                background: 'white',
                width: '100%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '0',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
                {/* Header */}
                <div style={{ padding: '24px', borderBottom: '1px solid #E5E7EB' }}>
                    <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Confirm Allocation</h2>
                    <p style={{ margin: '4px 0 0 0', color: '#6B7280', fontSize: '0.875rem' }}>
                        Please review the details before committing resources.
                    </p>
                </div>

                {/* Content */}
                <div style={{ padding: '24px' }}>
                    <div style={{ background: '#F3F4F6', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.875rem' }}>
                            <div>
                                <span style={{ display: 'block', color: '#6B7280', marginBottom: '2px' }}>Resource</span>
                                <span style={{ fontWeight: '600' }}>{recommendation.resource_name}</span>
                            </div>
                            <div>
                                <span style={{ display: 'block', color: '#6B7280', marginBottom: '2px' }}>Allocation to</span>
                                <span style={{ fontWeight: '600' }}>{crisis.title}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151', fontSize: '0.875rem' }}>Operational Notes (Optional)</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add context for this decision..."
                            style={{
                                width: '100%',
                                minHeight: '80px',
                                padding: '12px',
                                borderRadius: '6px',
                                border: '1px solid #D1D5DB',
                                fontFamily: 'inherit',
                                fontSize: '0.9rem',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#6B7280', background: '#FEF2F2', padding: '12px', borderRadius: '6px', color: '#991B1B', border: '1px solid #FECACA' }}>
                        This action will log an entry in the audit trail. Immediate mobilization commands may be sent to the field.
                    </div>
                </div>

                {/* Actions */}
                <div style={{ padding: '16px 24px', background: '#F9FAFB', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <button
                        className="btn"
                        onClick={onCancel}
                        style={{ background: 'white', border: '1px solid #D1D5DB', color: '#374151' }}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => onConfirm('approve', comment)}
                        style={{ paddingLeft: '24px', paddingRight: '24px' }}
                    >
                        Confirm & Mobilize
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
