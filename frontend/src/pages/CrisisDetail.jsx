import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCrises, getRecommendations, confirmAction } from '../api';
import ResourceCard from '../components/ResourceCard';
import ReviewModal from '../components/ReviewModal';

const CrisisDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crisis, setCrisis] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const allCrises = await getCrises();
      const current = allCrises.find(c => c.id === id);
      setCrisis(current);

      if (current) {
        const recs = await getRecommendations(id);
        setRecommendations(recs);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = (recommendation) => {
    setModalData({ crisis, recommendation });
  };

  const handleConfirm = async (action, comment) => {
    try {
      await confirmAction({
        crisis_id: modalData.crisis.id,
        resource_id: modalData.recommendation.resource_id,
        action,
        comment
      });
      setModalData(null);
      alert("Decision recorded successfully.");
    } catch (error) {
      alert("Failed to record decision.");
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>Loading Details...</div>;
  if (!crisis) return <div style={{ padding: '40px', textAlign: 'center', color: '#B91C1C' }}>Crisis not found</div>;

  return (
    <div>
      {/* Header / Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <button
          className="btn"
          onClick={() => navigate('/')}
          style={{ background: 'white', border: '1px solid #D1D5DB', color: '#374151' }}
        >
          ← Back to Dashboard
        </button>
        <span style={{ color: '#9CA3AF' }}>|</span>
        <span style={{ color: '#4B5563', fontSize: '0.875rem' }}>CRISIS ID: {crisis.id}</span>
      </div>

      {/* Crisis Overview Panel */}
      <div className="glass-container" style={{ background: 'white', padding: '32px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.75rem', marginBottom: '8px' }}>{crisis.title}</h1>
            <p style={{ margin: 0, color: '#6B7280' }}>Source: {crisis.source} • Reported: {new Date(crisis.timestamp).toLocaleString()}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '4px' }}>URGENCY LEVEL</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: crisis.urgency_score >= 4 ? '#B91C1C' : '#374151' }}>
              {crisis.urgency_score} / 5
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          <div>
            <h3 style={{ fontSize: '1rem', color: '#374151', marginBottom: '8px', textTransform: 'uppercase' }}>Situation Summary</h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#1F2937', background: '#F9FAFB', padding: '16px', borderRadius: '8px', border: '1px solid #F3F4F6' }}>
              {crisis.summary}
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', color: '#374151', marginBottom: '16px', textTransform: 'uppercase' }}>Key Metrics</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '8px' }}>
                <span style={{ color: '#6B7280' }}>Location(s)</span>
                <span style={{ fontWeight: '500', textAlign: 'right' }}>{crisis.locations.join(', ')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '8px' }}>
                <span style={{ color: '#6B7280' }}>Severity</span>
                <span style={{ fontWeight: '500' }}>{crisis.severity}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '8px' }}>
                <span style={{ color: '#6B7280' }}>Data Confidence</span>
                <span className={`confidence-${crisis.confidence}`}>{crisis.confidence.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid #E5E7EB', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Resource Allocation Options</h2>
          <p style={{ margin: '4px 0 0 0', color: '#6B7280', fontSize: '0.875rem' }}>AI-ranked suggestions based on capacity and proximity.</p>
        </div>
        <div style={{ background: '#EFF6FF', color: '#1E40AF', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', border: '1px solid #DBEAFE' }}>
          DECISION SUPPORT ONLY
        </div>
      </div>

      <div className="crisis-grid" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}> {/* List view for details */}
        {recommendations.map((rec, idx) => (
          <ResourceCard key={idx} recommendation={rec} onReview={handleReview} />
        ))}
      </div>

      {modalData && (
        <ReviewModal
          crisis={modalData.crisis}
          recommendation={modalData.recommendation}
          onConfirm={handleConfirm}
          onCancel={() => setModalData(null)}
        />
      )}
    </div>
  );
};

export default CrisisDetail;
