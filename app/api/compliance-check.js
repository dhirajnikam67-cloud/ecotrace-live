import crypto from 'crypto';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { factoryId = 'WESTERN_CHEMICALS_BHOSARI', powerFactor = 0.94, phLevel = 8.9 } = req.body;

    let alertsTriggered = [];

    if (powerFactor < 0.99) {
      alertsTriggered.push({
        module: 'MSEDCL Smart Grid & PF',
        type: 'WARNING',
        message: `Warning: Power Factor dropped to ${powerFactor}. Immediate manual capacitor switching required to avoid penalty. (Zero Automated Trip)`
      });
    }

    if (phLevel < 6.5 || phLevel > 8.5) {
      alertsTriggered.push({
        module: 'ETP CAPEX & ROI',
        type: 'CRITICAL',
        message: `Critical ETP Alert: pH level is ${phLevel}. Open emergency dosing valve manually. (Zero Valve Lock)`
      });
    }

    const rawData = JSON.stringify({ factoryId, powerFactor, phLevel, timestamp: new Date().toISOString(), alertsTriggered });
    const blockchainHash = crypto.createHash('sha256').update(rawData).digest('hex');

    return res.status(200).json({
      status: 'Success',
      mode: 'Model 1 - Intelligent Watchman & Legal Shield Active',
      factory: factoryId,
      alerts: alertsTriggered,
      blockchainVerificationHash: blockchainHash,
      dossierStatus: 'Ready for 1-Click MPCB Defense'
    });

  } catch (err) {
    return res.status(500).json({ error: 'Server Error', details: err.message });
  }
}
