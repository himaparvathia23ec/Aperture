import React from 'react';

const ResourceCard = ({ recommendation, onReview }) => {
    return (
        <div className="glass-container" style={{
            background: 'white',
            padding: '0',
            marginBottom: '0',
            transition: 'all 0.2s',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.125rem' }}>{recommendation.resource_name}</h3>
                    <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>ID: {recommendation.resource_id}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '500' }}>MATCH SCORE</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-color)' }}>{Math.round(recommendation.score)}%</div>
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: '24px', flex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    <div>
                        <h4 style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '8px', textTransform: 'uppercase' }}>Why this recommendation?</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#4B5563' }}>
                            {recommendation.reasoning.map((r, i) => (
                                <li key={i} style={{ marginBottom: '4px' }}>{r}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '8px', textTransform: 'uppercase' }}>Confidence</h4>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <span className={`confidence-${recommendation.confidence}`}>
                                {recommendation.confidence}
                            </span>
                            <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                                Based on resource freshness and proximity.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Details / Capacity (Mock) */}
                <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>DME</div>
                            <div style={{ fontWeight: '600' }}>{recommendation.details.DME || '-'}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>DPH</div>
                            <div style={{ fontWeight: '600' }}>{recommendation.details.DPH || '-'}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>DM_RHS</div>
                            <div style={{ fontWeight: '600' }}>{recommendation.details.DM_RHS || '-'}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>TOTAL</div>
                            <div style={{ fontWeight: '600', color: 'var(--accent-color)' }}>{recommendation.details.grand_total || '-'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Actions */}
            <div style={{ padding: '16px 24px', background: '#F9FAFB', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                    className="btn"
                    style={{ background: 'white', border: '1px solid #D1D5DB', color: '#374151' }}
                    onClick={() => { }} // Placeholder for "Reject/Defer"
                >
                    Defer
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => onReview(recommendation)}
                >
                    Review & Approve
                </button>
            </div>
        </div>
    );
};

export default ResourceCard;
