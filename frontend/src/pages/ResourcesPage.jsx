import React from 'react';

/**
 * Resources Page — Operational reference and coordination documentation.
 * Static content aligned with workflow and human-in-the-loop narrative.
 * No AI-generated advice, no placeholders.
 */
const ResourcesPage = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #E5E7EB', paddingBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700', color: '#111827' }}>
          Resources
        </h1>
        <p style={{ margin: '8px 0 0 0', fontSize: '0.875rem', color: '#6B7280' }}>
          Operational reference, data guidance, and coordination protocols for response teams.
        </p>
      </header>

      {/* Operational Reference */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#374151', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Operational Reference
        </h2>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Emergency Response Protocols</h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            All crisis signals are triaged by urgency and severity. High-urgency, high-confidence signals are routed to Immediate Action. Low-confidence or unverified signals require manual validation before any resource allocation. Field mobilization occurs only after explicit human confirmation via the Review & Decide workflow.
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Coordination Guidelines</h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            Response coordinators should cross-check signals against multiple sources before approving allocations. When sources conflict or confidence is low, escalate to Validation Needed and seek field verification. Record all decisions and reasoning in the operational notes for audit.
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Escalation Procedures</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            Signals in Validation Needed require human review before promotion to Immediate Action or Monitor. Use the Validate Information flow to confirm or reject. Escalation for Assessment is available for Monitor-level incidents when conditions change or additional context is received.
          </p>
        </div>
      </section>

      {/* Data & Inputs */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#374151', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Data & Inputs
        </h2>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Trusted Data Sources</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            The system aggregates data from: India Meteorological Department (flash flood guidance, regional advisories), Facility Coordination Hub (hospital capacity logs), Automated Facility Logs, and NGO Field Reports. Each source is tagged on every crisis card. Source reputation and update frequency influence confidence scoring.
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Confidence Levels (High / Medium / Low)</h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            <strong>High:</strong> Recent data from established sources, complete fields, consistent with other feeds. Suitable for prioritization in Immediate Action when urgency warrants.
          </p>
          <p style={{ margin: '0 0 12px 0', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            <strong>Medium:</strong> Data may be older, from mixed sources, or partially incomplete. Requires human judgment before major allocation decisions.
          </p>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            <strong>Low:</strong> Unverified reports, single-source, or stale data. Must be validated before any resource commitment.
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Data Limitations and Uncertainty</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            The system does not forecast disasters; it relies on reported bulletins. Geographic precision varies by source. Coordinates may be unavailable for some feeds. Data age affects confidence: older entries receive lower confidence. Human operators must account for these limitations when interpreting signals.
          </p>
        </div>
      </section>

      {/* Human Decision Framework */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#374151', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Human Decision Framework
        </h2>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Human-in-the-Loop Responsibility</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            No final decisions are made by the system. Resource allocation, signal validation, and escalation choices require explicit human confirmation. The system supports; humans decide.
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>System Support vs Human Decisions</h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            The system provides: triage grouping, urgency and severity scoring, resource recommendations ranked by proximity and capacity, and confidence indicators. Humans provide: approval or rejection of allocations, validation of unverified signals, interpretation of conflicting data, and operational judgment under uncertainty.
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Ethical Review and Validation Expectations</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            All major allocation decisions should be documented with rationale. Operators are expected to consider equity, urgency, and resource availability. When data is uncertain, err on the side of verification before commitment. The audit trail captures all confirmations and rejections for accountability.
          </p>
        </div>
      </section>

      {/* Inter-Agency Coordination */}
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#374151', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Inter-Agency Coordination
        </h2>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px' }}>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            Effective response depends on collaboration across agencies. The system is designed to support coordination, not replace it.
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>NGOs</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            NGO field reports supplement institutional feeds. These often provide ground-level context but may have lower confidence until verified. Coordinate with NGO liaisons to validate and share situational updates.
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Government Agencies</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            India Meteorological Department and regional networks supply authoritative meteorological and regional advisories. Use these as primary references for flash flood and weather-related events. Cross-reference with facility and NGO data for resource allocation.
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Field Responders</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
            Facility coordination hubs and automated facility logs report capacity and status. Field responders provide real-time verification. When signals are unverified, prioritize contact with on-ground teams before approving allocations.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
