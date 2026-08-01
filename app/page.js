'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  ShieldAlert, 
  Database, 
  Calendar, 
  Bell, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Upload, 
  ChevronRight, 
  MapPin, 
  ExternalLink,
  Activity,
  Menu,
  X
} from 'lucide-react';

// ==========================================
// ECOTRACE INDIA — COMPLETE ENTERPRISE DASHBOARD v3.0 (Error-Free Build)
// ==========================================

export default function EcoTraceDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('logs');
  
  // Tenant State
  const [factory, setFactory] = useState({
    onboarded: true,
    name: 'Shree Ganesh Chemical Industries',
    location: 'Chakan MIDC, Phase II',
    dischargeLimit: '50 KLD',
    ctoExpiry: '2026-10-15'
  });

  // Daily Log State (Section 2.4 - Active Core)
  const [dailyLog, setDailyLog] = useState({
    ph: '7.2',
    water: '1420',
    power: '3150',
    sludge: '0.45'
  });
  const [logSubmitted, setLogSubmitted] = useState(false);

  // Notice Defense State (Section 2.7)
  const [noticeInput, setNoticeInput] = useState('');
  const [noticeDrafted, setNoticeDrafted] = useState(false);

  // Phase 2 Feedback State
  const [p2FeedbackSubmitted, setP2FeedbackSubmitted] = useState(null);

  // Clean JavaScript Handler (Fixed Syntax)
  const handleLogSubmit = (e) => {
    e.preventDefault();
    setLogSubmitted(true);
    setTimeout(() => setLogSubmitted(false), 4000);
  };

  const handleP2Click = (moduleName) => {
    setP2FeedbackSubmitted(moduleName);
    setTimeout(() => setP2FeedbackSubmitted(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* HEADER WITH GLOBAL MENU TOGGLE */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all flex items-center gap-2 text-xs font-semibold"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="hidden sm:inline">Command Center</span>
          </button>
          
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              EcoTrace India <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">v3.0 Pilot Core</span>
            </h1>
            <p className="text-[11px] text-slate-400">{factory.name} ({factory.location})</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-right">
            <p className="text-[10px] text-amber-400 font-semibold uppercase">CTO Status</p>
            <p className="text-xs font-bold text-amber-300">74 Days Left (Amber)</p>
          </div>
        </div>
      </header>

      {/* GLOBAL COMMAND CENTER OVERLAY MODAL */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                  🌐 GLOBAL COMMAND CENTER — ENTERPRISE MODULES
                </h2>
                <p className="text-xs text-slate-400">Select any module to navigate or inspect system status.</p>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-6 text-xs">
              
              {/* CORE PLATFORM */}
              <div className="space-y-2">
                <p className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">CORE PLATFORM</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button onClick={() => { setActiveModule('overview'); setIsMenuOpen(false); }} className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left text-slate-200">
                    🏠 Main Enterprise Overview
                  </button>
                  <button onClick={() => { setActiveModule('ocr'); setIsMenuOpen(false); }} className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left text-slate-200">
                    ⚡ Multi-File Batch OCR & CPCB Selector
                  </button>
                  <button onClick={() => { setActiveModule('logs'); setIsMenuOpen(false); }} className="p-3 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-500/30 rounded-xl text-left text-emerald-300 font-semibold sm:col-span-2">
                    📝 Daily Operator Logbook (Active Pilot Core) ⭐
                  </button>
                </div>
              </div>

              {/* [A] RISK & EMERGENCY SHIELD */}
              <div className="space-y-2">
                <p className="font-bold text-red-400 uppercase tracking-wider text-[10px]">[A] RISK & EMERGENCY SHIELD</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button onClick={() => { setActiveModule('notice'); setIsMenuOpen(false); }} className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left text-slate-200">
                    • Notice Defense Matrix
                  </button>
                  <button onClick={() => handleP2Click('Flying Squad Audit Mode')} className="p-3 bg-slate-950/50 hover:bg-slate-800 border border-slate-800/60 rounded-xl text-left text-slate-400">
                    • Flying Squad Audit Mode
                  </button>
                  <button onClick={() => handleP2Click('Toxic Gas Leak Radar')} className="p-3 bg-slate-950/50 hover:bg-slate-800 border border-slate-800/60 rounded-xl text-left text-slate-400">
                    • Toxic Gas Leak Radar <span className="text-[9px] text-amber-400">[Phase 2]</span>
                  </button>
                </div>
              </div>

              {/* [B] & [C] STATUTORY */}
              <div className="space-y-2">
                <p className="font-bold text-blue-400 uppercase tracking-wider text-[10px]">[B] UTILITY & [C] STATUTORY</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button onClick={() => { setActiveModule('forms'); setIsMenuOpen(false); }} className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left text-slate-200">
                    • Form 3, 4 & 5 Annual Returns Generator
                  </button>
                  <button onClick={() => { setActiveModule('alerts'); setIsMenuOpen(false); }} className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left text-slate-200">
                    • WhatsApp / SMS Alert Engine ⭐
                  </button>
                </div>
              </div>

              {/* [D] SUPPLY CHAIN & ESG */}
              <div className="space-y-2">
                <p className="font-bold text-purple-400 uppercase tracking-wider text-[10px]">[D] SUPPLY CHAIN & ESG (Phase 2 Roadmap)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button onClick={() => handleP2Click('Tanker GPS & Form 10')} className="p-3 bg-slate-950/50 hover:bg-slate-800 border border-slate-800/60 rounded-xl text-left text-slate-400">
                    • Tanker GPS & Form 10 Manifest <span className="text-[9px] text-amber-400">[Phase 2]</span>
                  </button>
                  <button onClick={() => handleP2Click('Bank & Grant Subvention')} className="p-3 bg-slate-950/50 hover:bg-slate-800 border border-slate-800/60 rounded-xl text-left text-slate-400">
                    • Bank & Grant Subvention Corridor <span className="text-[9px] text-amber-400">[Phase 2]</span>
                  </button>
                </div>
              </div>

              {/* [E] COMMAND & ONBOARDING */}
              <div className="space-y-2">
                <p className="font-bold text-indigo-400 uppercase tracking-wider text-[10px]">[E] COMMAND & ONBOARDING</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button onClick={() => { setActiveModule('vault'); setIsMenuOpen(false); }} className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left text-slate-200">
                    • Tamper-Evident Digital Vault (Private Hash Chain)
                  </button>
                  <button onClick={() => { setActiveModule('overview'); setIsMenuOpen(false); }} className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left text-slate-200">
                    📅 Multi-Tenant Client Onboarding
                  </button>
                </div>
              </div>

            </div>

            {p2FeedbackSubmitted && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-emerald-300 text-xs">
                Phase 2 Interest Recorded for: {p2FeedbackSubmitted}. Thank you!
              </div>
            )}

          </div>
        </div>
      )}

      {/* MAIN DASHBOARD CONTENT AREA */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {activeModule === 'overview' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              Active Tenant Overview
            </span>
            <h2 className="text-2xl font-bold text-white">{factory.name}</h2>
            <p className="text-xs text-slate-400">Location: {factory.location} | Discharge Limit: {factory.dischargeLimit}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">Scope 1 Carbon</p>
                <p className="text-xl font-bold text-white mt-1">1.45 MT <span className="text-[10px] text-slate-500 font-normal">(Estimated)</span></p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">Scope 2 Carbon</p>
                <p className="text-xl font-bold text-white mt-1">3.20 MT <span className="text-[10px] text-emerald-400 font-normal">Verified (CEA)</span></p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">Financial Subvention</p>
                <p className="text-xs font-semibold text-emerald-400 mt-1">Eligible for Working Capital Rebate</p>
              </div>
            </div>
          </div>
        )}

        {activeModule === 'logs' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Pilot Critical Core Module
                </span>
                <h2 className="text-xl font-bold text-white mt-2">दैनिक ऑपरेटर लॉगबुक (Daily Operator Logbook)</h2>
                <p className="text-xs text-slate-400">60-second Marathi entry with server-time lock & GPS fallback.</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                Server Time Enforced
              </span>
            </div>

            {logSubmitted && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-emerald-300 text-xs">
                ✅ Log saved securely. Immutable correction trail active.
              </div>
            )}

            <form onSubmit={handleLogSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">pH Level (ETP Outlet)</label>
                  <input type="number" step="0.1" value={dailyLog.ph} onChange={(e) => setDailyLog({...dailyLog, ph: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Water Meter (KL)</label>
                  <input type="number" value={dailyLog.water} onChange={(e) => setDailyLog({...dailyLog, water: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Power Meter (kWh)</label>
                  <input type="number" value={dailyLog.power} onChange={(e) => setDailyLog({...dailyLog, power: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Sludge Generated (MT)</label>
                  <input type="number" step="0.01" value={dailyLog.sludge} onChange={(e) => setDailyLog({...dailyLog, sludge: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/20">
                Submit Daily Record (Immutable Save)
              </button>
            </form>
          </div>
        )}

        {activeModule === 'alerts' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-4">
            <h2 className="text-xl font-bold text-white">WhatsApp / SMS Alert Engine</h2>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
              <p className="font-semibold text-emerald-400">Active Marathi Plain-Language Trigger:</p>
              <p className="text-slate-300">"तुमच्या फॅक्टरीच्या CTO नूतनीकरणासाठी १५ दिवस उरले आहेत."</p>
            </div>
          </div>
        )}

        {activeModule === 'ocr' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-4">
            <h2 className="text-xl font-bold text-white">Multi-File Batch OCR & CPCB Selector</h2>
            <p className="text-xs text-slate-400">Electricity bill OCR with manager discrepancy tracking.</p>
            <div className="p-6 border-2 border-dashed border-slate-800 rounded-2xl text-center bg-slate-950">
              <button className="bg-slate-800 text-white text-xs px-4 py-2 rounded-xl">Simulate Electricity Bill OCR</button>
            </div>
          </div>
        )}

        {activeModule === 'forms' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-4">
            <h2 className="text-xl font-bold text-white">Form 3, 4 & 5 Annual Returns Generator</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                <p className="text-xs font-semibold text-slate-300">Form 3 (Water Cess)</p>
                <button className="mt-2 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg w-full">Download PDF</button>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                <p className="text-xs font-semibold text-slate-300">Form 4 (Hazardous)</p>
                <button className="mt-2 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg w-full">Review & Edit</button>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                <p className="text-xs font-semibold text-slate-300">Form 5 (Environmental)</p>
                <button className="mt-2 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg w-full">Download PDF</button>
              </div>
            </div>
          </div>
        )}

        {activeModule === 'notice' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-4">
            <h2 className="text-xl font-bold text-white">Notice Defense Matrix</h2>
            <input type="text" placeholder="Upload notice copy or enter reference..." value={noticeInput} onChange={(e) => setNoticeInput(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white" />
            <button onClick={() => setNoticeDrafted(true)} className="bg-emerald-600 text-slate-950 font-semibold text-xs px-4 py-2 rounded-xl">Generate Defence Draft</button>
            {noticeDrafted && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
                <p className="text-emerald-400 font-semibold">Defence Draft Ready for Legal Review</p>
                <p className="text-slate-300 font-mono bg-slate-900 p-2 rounded">"Ref: MPCB Notice... As per daily log, ETP outlet pH was maintained at 7.2."</p>
              </div>
            )}
          </div>
        )}

        {activeModule === 'vault' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-4">
            <h2 className="text-xl font-bold text-white">Tamper-Evident Digital Vault (Private Hash Chain)</h2>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
              2026-08-01 00:00:00 — Hash: e3b0c44298fc1c149afbf4c8996fb924...
            </div>
          </div>
        )}

      </main>

      <footer className="border-t border-slate-800 bg-slate-900/60 mt-12 py-6 text-center text-xs text-slate-500">
        <p>EcoTrace India Private Limited — Industrial Compliance Operating System (v3.0 Pilot Core)</p>
      </footer>
    </div>
  );
}
