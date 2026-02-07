import React, { useState, useEffect } from 'react';
import { getCrises } from '../api';
import ActiveCrisisList from '../components/ActiveCrisisList';

/**
 * Active Crises Page — Mission Control Interface
 *
 * Distinct from Dashboard: operational depth, accountability, human-in-the-loop.
 * Uses vertical stack layout, no metric tiles, no summary cards.
 */
const ActiveCrisesPage = () => {
  const [crises, setCrises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrises = async () => {
      try {
        const data = await getCrises();
        setCrises(data);
      } catch (error) {
        console.error('Failed to fetch crises', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCrises();
  }, []);

  if (loading) {
    return (
      <div style={{
        padding: '48px',
        textAlign: 'center',
        color: '#4B5563',
        fontFamily: 'ui-monospace, monospace',
        fontSize: '0.875rem'
      }}>
        Loading operational feed...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Mission Control Header — No KPI tiles, no Dashboard patterns */}
      <header
        style={{
          borderBottom: '2px solid #1F2937',
          paddingBottom: '16px',
          marginBottom: '32px'
        }}
      >
        <div
          style={{
            fontSize: '0.7rem',
            fontWeight: '700',
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '4px'
          }}
        >
          Emergency Operations
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#111827',
            letterSpacing: '-0.02em'
          }}
        >
          Active Crises
        </h1>
        <p
          style={{
            margin: '8px 0 0 0',
            fontSize: '0.875rem',
            color: '#4B5563',
            lineHeight: 1.5
          }}
        >
          Situational feed requiring human review. No automated actions.
        </p>
      </header>

      <ActiveCrisisList crises={crises} />
    </div>
  );
};

export default ActiveCrisesPage;
