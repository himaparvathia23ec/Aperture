import React, { useState } from 'react';
import { reportCrisis } from '../api';

const ReportModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        type: 'flood',
        severity: 1,
        description: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await reportCrisis({
                ...formData,
                severity: parseInt(formData.severity)
            });
            alert("Report submitted successfully. Status: Awaiting Verification.");
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to submit report.");
        } finally {
            setLoading(false);
        }
    };

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
                maxWidth: '550px',
                borderRadius: '12px',
                padding: '0',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
                {/* Header */}
                <div style={{ padding: '24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#111827' }}>Report New Crisis</h2>
                        <p style={{ margin: '4px 0 0 0', color: '#6B7280', fontSize: '0.875rem' }}>
                            Manual entry. Requires operational verification.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px' }}>Crisis Title</label>
                            <input
                                required
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. River bank breach"
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px' }}>Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                            >
                                <option value="flood">Flood</option>
                                <option value="earthquake">Earthquake</option>
                                <option value="fire">Fire</option>
                                <option value="landslide">Landslide</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px' }}>Location</label>
                        <input
                            required
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Area, Landmark, City"
                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px' }}>Initial Severity Estimate (1-5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            name="severity"
                            value={formData.severity}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
                        />
                        <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>1 = Minor, 5 = Critical/Catastrophic</span>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px' }}>Description</label>
                        <textarea
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe current situation and immediate observations..."
                            style={{ width: '100%', minHeight: '80px', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ background: '#F9FAFB', padding: '12px', borderRadius: '6px', border: '1px solid #F3F4F6', fontSize: '0.75rem', color: '#6B7280', marginBottom: '24px' }}>
                        <strong>Note:</strong> This report will be created with status "Awaiting Verification" and confidence "Low". It will not trigger automated alerts until approved by a Response Coordinator.
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button
                            type="button"
                            className="btn"
                            onClick={onClose}
                            style={{ background: 'white', border: '1px solid #D1D5DB' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportModal;
