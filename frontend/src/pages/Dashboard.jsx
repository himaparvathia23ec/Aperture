import React, { useState, useEffect } from 'react';
import { getCrises } from '../api';
import ActiveCrisisList from '../components/ActiveCrisisList';
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

  // Metrics (Preserving existing logic/metrics as per constraints)
  const totalSignals = crises.length;
  const highUrgency = crises.filter(c => c.urgency_score >= 4).length;

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      Loading Dashboard...
    </div>
  );

  return (
    <div className="dashboard-container" style={{ maxWidth: '1600px', margin: '0 auto', padding: '32px' }}>

      {/* 1. Dashboard Header (Preserved Layout) */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        borderBottom: '1px solid #E5E7EB',
        paddingBottom: '24px'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem', color: '#111827' }}>Crisis Dashboard</h1>
          <p style={{ margin: '4px 0 0 0', color: '#6B7280' }}>Real-time emergency monitoring and decision support.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowReportModal(true)}
          style={{ padding: '10px 24px', borderRadius: '6px' }}
        >
          New Incident Report
        </button>
      </div>

      {showReportModal && <ReportModal onClose={() => setShowReportModal(false)} />}

      {/* 2. Dashboard KPIs (Preserved Metrics/Logic) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: '500' }}>Active Crises</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#111827' }}>{totalSignals}</div>
        </div>
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: '500' }}>High Urgency Alert</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#DC2626' }}>{highUrgency}</div>
        </div>
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: '500' }}>System Health</div>
          <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#059669', marginTop: '12px' }}>Operational</div>
        </div>
      </div>

      {/* 3. Active Crises Section (Refactored Component) */}
      <div className="active-crises-section">
        <ActiveCrisisList crises={crises} />
      </div>

    </div>
  );
};

export default Dashboard;
