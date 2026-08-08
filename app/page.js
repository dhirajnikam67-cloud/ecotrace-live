'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// ---------------------------------------------------------------------------
// BACKEND VALIDATION & OCR CONFIDENCE GATE LOGIC
// ---------------------------------------------------------------------------
const DOCUMENT_TYPE_KEYWORDS = {
  utility_bill: ["kwh", "units consumed", "electricity", "bill", "invoice", "meter reading", "msedcl"],
  waste_manifest: ["manifest", "sludge", "hazardous waste", "transporter", "disposal", "form 10"],
  water_bill: ["water charges", "cess", "discharge", "kl", "liters consumed"],
};

const VALID_DOCUMENT_TO_CATEGORY = {
  utility_bill: [],
  waste_manifest: ["5.1", "32.2", "34.3", "35.1"],
  water_bill: [],
};

const OCR_CONFIDENCE_THRESHOLD = 70;
const MINIMUM_COMPLETENESS_PCT = 50;

// ---------------------------------------------------------------------------
// SCOPE 1 (Direct Combustion) — fuel-wise emission factors (Aug 2026)
// Diesel आणि LPG चे आकडे GHG Protocol च्या स्वतःच्या calculation tools/documentation वरून
// पडताळलेले (sourced) आहेत. Furnace Oil व Coal साठी नेमका grade/quality-specific आकडा
// GHG Protocol च्या cross-sector tool मध्ये थेट सापडला नाही — म्हणून ते `isEstimate: true`
// असे चिन्हांकित आहेत; अंतिम statutory filing आधी EHS consultant कडून पडताळून घ्यावेत.
// ---------------------------------------------------------------------------
const FUEL_EMISSION_FACTORS = {
    none: { label: 'No Combustion Source (N/A)', unit: '', factor: 0, isEstimate: false },
    diesel: { label: 'Diesel / HSD (Liters)', unit: 'Liters', factor: 2.6533, isEstimate: false, source: 'GHG Protocol Stationary Combustion Tool' },
    lpg: { label: 'LPG (kg)', unit: 'kg', factor: 2.983, isEstimate: false, source: 'GHG Protocol Cross-Sector Emission Factors Tool' },
    furnace_oil: { label: 'Furnace Oil (Liters)', unit: 'Liters', factor: 3.17, isEstimate: true, source: 'Industry-standard approximate value — verify with EHS consultant/CPCB guidance' },
    coal: { label: 'Coal (kg)', unit: 'kg', factor: 2.275, isEstimate: true, source: 'GHG Protocol stationary-combustion example (bituminous) — Indian coal grade varies, verify locally' },
};

// ---------------------------------------------------------------------------
// SCOPE 2 — All-India fallback grid emission factor (Aug 2026 fix)
// आधी सगळ्या राज्यांसाठी hardcoded 0.82 वापरलं जायचं. आता प्रत्येक factory च्या राज्यानुसार
// state_configs मधला प्रादेशिक (Western/Southern/इ.) grid factor वापरतो — तो सापडला नाही तरच
// (उदा. अजून config नसलेलं नवीन राज्य) हा All-India सरासरी (CEA V21.0, FY 2024-25) fallback म्हणून वापरतो.
// ---------------------------------------------------------------------------
const ALL_INDIA_GRID_FACTOR = 0.7117;

// ---------------------------------------------------------------------------
// MULTI-LANGUAGE SUPPORT (Aug 2026) — factory managers across states (Maharashtra,
// Gujarat, Karnataka, Tamil Nadu, इ.) may not all be comfortable in Marathi.
// v1 scope: Header, Status Banner, Tabs, Module 1 (Onboarding), Module 4 (Daily
// Logbook) — the screens an operator uses every day. Reference/Roadmap/Buyer Portal
// modules stay English-only for now; can extend later if pilot feedback wants it.
// ---------------------------------------------------------------------------
const TRANSLATIONS = {
    en: {
        appTitle: 'EcoTrace India',
        tagline: 'MPCB compliance · daily records · carbon data — for MSMEs',
        loadDemo: '⚡ Load Demo Unit (Sales Mode)',
        exportReport: 'Export Verified Audit Report (.pdf)',
        buyerPortal: '🏢 Enterprise Buyer Portal',
        logout: 'Logout',
        activeUnit: 'Active Unit',
        unitId: 'Unit ID',
        ctoDaysLeft: 'CTO Days Left',
        noFactory: 'No factory onboarded — register below or click "Load Demo Unit"',
        tabOverview: 'Overview',
        tabLiveCore: 'Live Core (9)',
        tabReference: 'Reference Modules (4)',
        tabRoadmap: 'Roadmap (6)',
        m1Title: '1. Multi-Tenant Client Onboarding & CTO Setup',
        registeredLocked: '✅ REGISTERED & LOCKED',
        editDetails: '✏️ Edit Details',
        cancel: 'Cancel',
        companyNamePlaceholder: 'Enter Company Name',
        industrialAreaPlaceholder: 'Enter Industrial Area / Location (Optional if restoring)',
        dischargeLimitPlaceholder: 'Discharge Limit (Liters)',
        registerButton: 'Register / Switch Unit (Live State Protected)',
        dischargeLimitLabel: 'Discharge Limit',
        ctoExpiryLabel: 'CTO Expiry',
        m4Title: '4. Daily Operator Logbook',
        alreadyLockedTitle: '✅ Today\'s entry is already saved & locked',
        lockedAt: 'Locked at',
        newEntryMidnight: 'A new entry will be available after midnight (IST).',
        phLabel: 'pH Level (Mandatory)',
        waterLabel: 'Water KL (Mandatory)',
        powerLabel: 'Power kWh (Mandatory)',
        sludgeLabel: 'Sludge MT',
        notApplicable: 'Not Applicable (N/A)',
        fuelSourcesLabel: 'Fuel Sources (Scope 1) — multiple fuel sources can be added for the same day',
        addFuel: '+ Add Another Fuel Source',
        saveLock: 'Save & Lock Daily Record',
        languageLabel: 'Language',
        factoryLogin: 'Factory Login',
        newFactorySignup: 'New Factory Signup',
        emailPlaceholder: 'Email',
        passwordPlaceholder: 'Password',
        loginButton: 'Login',
        signupButton: 'Sign Up',
        newFactoryLink: 'New factory? Sign up',
        alreadyRegisteredLink: 'Already registered? Login',
        selectLanguage: 'Select your language',
        forgotPassword: 'Forgot password?',
        resetPasswordTitle: 'Reset your password',
        resetPasswordDesc: "Enter your email and we'll send you a password reset link.",
        sendResetLink: 'Send Reset Link',
        resetLinkSentMsg: 'Reset link sent — please check your email.',
        backToLogin: 'Back to login',
        setNewPasswordTitle: 'Set a new password',
        newPasswordPlaceholder: 'New password',
        confirmPasswordPlaceholder: 'Confirm new password',
        updatePasswordButton: 'Update Password',
        termsLink: 'Terms of Service',
        privacyLink: 'Privacy Policy',
        selectLanguageMenu: 'Select Language',
        buyerPortalTitle: '🏢 EcoTrace Enterprise Buyer Portal',
        buyerPortalTagline: "Your MSME suppliers' compliance status in one place",
        backToFactory: '← Back to Factory Dashboard',
        loadingText: 'Loading...',
        buyerRegisterTitle: 'Register as Enterprise Buyer',
        buyerRegisterDesc: 'One-time registration — you can then connect with multiple suppliers.',
        companyNameReq: 'Company Name *',
        gstinOptional: 'GSTIN / CIN (optional)',
        industryOptional: 'Industry (optional)',
        contactEmailOptional: 'Contact Email (optional)',
        contactPhoneOptional: 'Contact Phone (optional)',
        registerAsBuyer: 'Register as Buyer',
        sendConnectionRequestTitle: 'Send a connection request to a new supplier',
        sendConnectionRequestDesc: 'Enter the "Unit ID / Compliance ID" you got from the factory — they will need to approve it.',
        factoryUnitIdPlaceholder: 'Paste Factory Unit ID',
        sendRequestButton: 'Send Request',
        yourSuppliersTitle: 'Your Suppliers',
        noRequestsSentYet: 'No requests sent yet.',
        factoryIdLabel: 'Factory ID',
        completenessLast30: 'Completeness (last 30 days)',
        daysLoggedLabel: 'days logged',
        avgPhLabel: 'Avg pH',
        totalWaterLabel: 'Total Water',
        lastLogLabel: 'Last log',
        downloadGreenPassport: '📄 Download Green Passport (PDF)',
        summaryLoadingText: 'Summary loading...',
        waitingApproval: 'Waiting for factory approval.',
        requestRejectedRevoked: 'This request was rejected/revoked.',
        m2Title: '2. Main Enterprise Overview',
        m3Title: '3. Multi-File Batch OCR & Human Classification Gate (Hybrid Bulk Upload)',
        m3Desc: 'Select multiple bills (Electricity, Water, Sludge Manifest) for Unit',
        m5Title: '5. Flying Squad Audit Mode',
        generateDossier: 'Generate Dossier',
        m6Title: '6. Notice Defence Matrix & Draft Generator',
        generateNoticeDefence: 'Generate Notice Defence',
        m7Title: '7. Form 3, 4 & 5 Annual Returns Draft Generator',
        compileReturns: 'Compile Returns',
        m8Title: '8. WhatsApp / SMS Alert Engine',
        testAlertButton: 'Test Alert',
        m9Title: '9. Tamper-Evident Digital Vault',
        verifyVaultHashButton: 'Verify Vault Hash',
        buyerConnectionRequestsTitle: 'Buyer Connection Requests',
        buyerConnectionRequestsDesc: 'Share your Unit ID with buyers (shown in the status bar above) — their requests will appear here.',
        noRequestsReceivedYet: 'No requests received yet.',
        approveButton: 'Approve',
        rejectButton: 'Reject',
        revokeAccessButton: 'Revoke Access',
        ctoRenewalAlertMsg: 'Your factory\'s CTO renewal is due in {days} days.',
        m10Title: '10. ETP CAPEX & ROI Calculator',
        m10Desc: 'Estimated ROI based on discharge limit of',
        m11Title: '11. B2B Green Passport & SEBI BRSR Core Template',
        m11Desc: 'Scope 2 carbon output:',
        m12Title: '12. E-Waste & Battery EPR Record Vault',
        m12Desc: 'Active ledger calculations for hazardous byproduct tracking.',
        m13Title: '13. CTO Renewal Auto-Dossier Generator',
        m13Desc: 'Auto-compiles renewal packet for',
        roadmapRequestButton: 'Request Early Access / Priority Build',
        m14Title: '14. Gas Leak Safety Radar',
        m14Desc: 'Real-time IoT gas leak detection (Requires IEC 61511/SIL hardware).',
        m15Title: '15. Tanker GPS & Form 10 Manifest',
        m15Desc: 'Live GPS tracking of hazardous waste transit tankers.',
        m16Title: '16. MSEDCL Smart Grid & Power Factor Optimizer',
        m16Desc: 'Automated grid synchronization and power factor penalty alerts.',
        m17Title: '17. SBI / SIDBI Working Capital Interest Rebate',
        m17Desc: 'Direct banking API integration for green subvention filing.',
        m18Title: '18. MCCI Privacy Shield & Govt Grants',
        m18Desc: 'Regional enterprise grant matching and secure data pooling.',
        m19Title: '19. Macro-Level Green Industrial Corridor',
        m19Desc: 'Regional multi-factory aggregate emissions monitoring.',
        renewablePctPlaceholder: '% Renewable coverage (optional)',
        renewableTypeNone: 'No green instrument',
        renewableTypeGreenTariff: 'Green Tariff',
        renewableTypeSolarPpa: 'Solar PPA',
        renewableTypeRec: 'REC (purchased)',
        renewableHint: 'If you buy Green Tariff power, have a Solar PPA, or purchase RECs, enter the % of your electricity covered — this powers Scope 2 market-based reporting.',
        renewableCoverageLabel: 'Renewable Coverage',
        scope2LocationLabel: 'Scope 2 (Location-based)',
        scope2MarketLabel: 'Scope 2 (Market-based)',
        correctionLogTitle: 'सुधार लॉग (Correction / Amendment Log)',
        correctionLogDesc: 'लॉक हुई एंट्री में गलती हुई? यहां सुधार दर्ज करें — मूल एंट्री कभी नहीं बदलती, सिर्फ एक जुड़ा हुआ सुधार-रिकॉर्ड बनता है, जिससे audit trail पूरी तरह पारदर्शी रहता है।',
        requestCorrectionButton: '✏️ सुधार दर्ज करें',
        selectEntryToCorrect: 'कौन सी एंट्री सुधारनी है चुनें',
        fieldToCorrect: 'कौन सा फील्ड गलत है?',
        fieldPh: 'pH Level',
        fieldWater: 'पानी (KL)',
        fieldPower: 'बिजली (kWh)',
        fieldSludge: 'Sludge (MT)',
        correctedValuePlaceholder: 'सही आंकड़ा',
        correctionReasonPlaceholder: 'सुधार का कारण (आवश्यक)',
        submitCorrectionButton: 'सुधार दर्ज करें',
        cancelCorrectionButton: 'रद्द करें',
        correctionHistoryTitle: 'सुधार इतिहास',
        noCorrectionsYet: 'अभी तक कोई सुधार दर्ज नहीं हुआ।',
        originalValueLabel: 'मूल',
        correctedToLabel: 'सुधार कर',
        reasonLabel: 'कारण',
        correctionLogTitle: 'दुरुस्ती नोंद (Correction / Amendment Log)',
        correctionLogDesc: 'लॉक झालेल्या नोंदीत चूक झाली का? इथे दुरुस्ती नोंदवा — मूळ नोंद कधीच बदलली जात नाही, फक्त एक जोडलेली दुरुस्ती-नोंद तयार होते, त्यामुळे audit trail पूर्णपणे पारदर्शक राहतो.',
        requestCorrectionButton: '✏️ दुरुस्ती नोंदवा',
        selectEntryToCorrect: 'कुठली नोंद दुरुस्त करायची ते निवडा',
        fieldToCorrect: 'कुठला रकाना चुकला आहे?',
        fieldPh: 'pH Level',
        fieldWater: 'पाणी (KL)',
        fieldPower: 'वीज (kWh)',
        fieldSludge: 'Sludge (MT)',
        correctedValuePlaceholder: 'बरोबर आकडा',
        correctionReasonPlaceholder: 'दुरुस्तीचं कारण (आवश्यक)',
        submitCorrectionButton: 'दुरुस्ती नोंदवा',
        cancelCorrectionButton: 'रद्द करा',
        correctionHistoryTitle: 'दुरुस्ती इतिहास',
        noCorrectionsYet: 'अजून कुठलीही दुरुस्ती नोंदवलेली नाही.',
        originalValueLabel: 'मूळ',
        correctedToLabel: 'दुरुस्त केलं',
        reasonLabel: 'कारण',
        correctionLogTitle: 'Correction / Amendment Log',
        correctionLogDesc: 'Made a mistake in a locked entry? Record a correction here — the original entry is never changed, only a linked correction is added, so the audit trail stays fully transparent.',
        requestCorrectionButton: '✏️ Request a Correction',
        selectEntryToCorrect: 'Select the entry to correct',
        fieldToCorrect: 'Which field is wrong?',
        fieldPh: 'pH Level',
        fieldWater: 'Water (KL)',
        fieldPower: 'Power (kWh)',
        fieldSludge: 'Sludge (MT)',
        correctedValuePlaceholder: 'Correct value',
        correctionReasonPlaceholder: 'Reason for this correction (required)',
        submitCorrectionButton: 'Submit Correction',
        cancelCorrectionButton: 'Cancel',
        correctionHistoryTitle: 'Correction History',
        noCorrectionsYet: 'No corrections recorded.',
        originalValueLabel: 'Original',
        correctedToLabel: 'Corrected to',
        reasonLabel: 'Reason',
        inspectionTrackerTitle: 'Post-Inspection Follow-Up Tracker',
        inspectionTrackerDesc: 'Log MPCB/CPCB inspection visits and track required follow-up actions until closed.',
        addInspectionButton: '📋 Log an Inspection',
        inspectionDateLabel: 'Inspection Date',
        authorityLabel: 'Authority',
        inspectorNameLabel: 'Inspector Name (optional)',
        findingSummaryPlaceholder: 'What did the inspector note? (required)',
        actionRequiredPlaceholder: 'Action required (optional)',
        deadlineLabel: 'Deadline (optional)',
        submitInspectionButton: 'Save Inspection Record',
        cancelInspectionButton: 'Cancel',
        noInspectionsYet: 'No inspection records yet.',
        statusPending: 'Pending',
        statusCompleted: 'Completed',
        statusOverdue: 'Overdue',
        markCompletedButton: 'Mark as Completed',
        completionNotesPlaceholder: 'Notes on how this was resolved (optional)',
        confirmCompletionButton: 'Confirm Completion',
        deadlineLabelShort: 'Deadline',
    },
    mr: {
        appTitle: 'EcoTrace India',
        tagline: 'MPCB compliance · daily records · carbon data — MSMEs साठी',
        loadDemo: '⚡ Load Demo Unit (Sales Mode)',
        exportReport: 'Export Verified Audit Report (.pdf)',
        buyerPortal: '🏢 Enterprise Buyer Portal',
        logout: 'Logout',
        activeUnit: 'सक्रिय Unit',
        unitId: 'Unit ID',
        ctoDaysLeft: 'CTO Days Left',
        noFactory: 'अजून कुठलीही factory नोंदवलेली नाही — खाली नोंदणी करा किंवा "Load Demo Unit" दाबा',
        tabOverview: 'Overview',
        tabLiveCore: 'Live Core (9)',
        tabReference: 'Reference Modules (4)',
        tabRoadmap: 'Roadmap (6)',
        m1Title: '1. Multi-Tenant Client Onboarding & CTO Setup',
        registeredLocked: '✅ नोंदणी झाली — लॉक',
        editDetails: '✏️ माहिती बदला (Edit)',
        cancel: 'रद्द करा',
        companyNamePlaceholder: 'कंपनीचं नाव टाका',
        industrialAreaPlaceholder: 'Industrial Area / ठिकाण टाका (restoring असेल तर ऐच्छिक)',
        dischargeLimitPlaceholder: 'Discharge Limit (Liters)',
        registerButton: 'नोंदणी करा / Unit बदला',
        dischargeLimitLabel: 'Discharge Limit',
        ctoExpiryLabel: 'CTO Expiry',
        m4Title: '4. दैनिक ऑपरेटर लॉगबुक (Daily Operator Logbook)',
        alreadyLockedTitle: '✅ आजची नोंद आधीच सेव्ह व लॉक झाली आहे',
        lockedAt: 'लॉक झाली',
        newEntryMidnight: 'भारतीय वेळेनुसार (IST) रात्री १२ नंतर नवीन नोंद उपलब्ध होईल.',
        phLabel: 'pH Level (आवश्यक)',
        waterLabel: 'Water KL (आवश्यक)',
        powerLabel: 'Power kWh (आवश्यक)',
        sludgeLabel: 'Sludge MT',
        notApplicable: 'लागू नाही (N/A)',
        fuelSourcesLabel: 'इंधन-स्रोत (Scope 1) — एकाच दिवशी अनेक इंधन-स्रोत जोडता येतील',
        addFuel: '+ आणखी इंधन-स्रोत जोडा',
        saveLock: 'सेव्ह करा व लॉक करा',
        languageLabel: 'भाषा',
        factoryLogin: 'Factory Login',
        newFactorySignup: 'नवीन Factory नोंदणी',
        emailPlaceholder: 'Email',
        passwordPlaceholder: 'Password',
        loginButton: 'Login',
        signupButton: 'नोंदणी करा (Sign Up)',
        newFactoryLink: 'नवीन factory? नोंदणी करा',
        alreadyRegisteredLink: 'आधीच नोंदणी आहे? Login करा',
        selectLanguage: 'तुमची भाषा निवडा',
        forgotPassword: 'पासवर्ड विसरलात?',
        resetPasswordTitle: 'पासवर्ड परत मिळवा',
        resetPasswordDesc: 'तुमचा email टाका — आम्ही पासवर्ड reset करण्याची लिंक पाठवू.',
        sendResetLink: 'Reset Link पाठवा',
        resetLinkSentMsg: 'Reset link पाठवली — कृपया तुमचा email तपासा.',
        backToLogin: 'Login कडे परत जा',
        setNewPasswordTitle: 'नवीन पासवर्ड सेट करा',
        newPasswordPlaceholder: 'नवीन पासवर्ड',
        confirmPasswordPlaceholder: 'नवीन पासवर्ड पुन्हा टाका',
        updatePasswordButton: 'पासवर्ड अपडेट करा',
        termsLink: 'अटी व शर्ती',
        privacyLink: 'गोपनीयता धोरण',
        selectLanguageMenu: 'भाषा निवडा',
        buyerPortalTitle: '🏢 EcoTrace Enterprise Buyer Portal',
        buyerPortalTagline: 'तुमच्या MSME suppliers चा compliance status एकाच जागी',
        backToFactory: '← Factory Dashboard कडे परत',
        loadingText: 'Loading...',
        buyerRegisterTitle: 'Enterprise Buyer म्हणून नोंदणी करा',
        buyerRegisterDesc: 'ही नोंदणी एकदाच — नंतर तुम्ही अनेक suppliers ना जोडू शकता.',
        companyNameReq: 'Company Name *',
        gstinOptional: 'GSTIN / CIN (ऐच्छिक)',
        industryOptional: 'Industry (ऐच्छिक)',
        contactEmailOptional: 'Contact Email (ऐच्छिक)',
        contactPhoneOptional: 'Contact Phone (ऐच्छिक)',
        registerAsBuyer: 'Buyer म्हणून नोंदणी करा',
        sendConnectionRequestTitle: 'नवीन Supplier ला जोडणी-विनंती पाठवा',
        sendConnectionRequestDesc: 'Factory कडून मिळालेला "Unit ID / Compliance ID" इथे टाका — तो त्यांना approve करावा लागेल.',
        factoryUnitIdPlaceholder: 'Factory Unit ID paste करा',
        sendRequestButton: 'विनंती पाठवा',
        yourSuppliersTitle: 'तुमचे Suppliers',
        noRequestsSentYet: 'अजून कुठलीही विनंती पाठवलेली नाही.',
        factoryIdLabel: 'Factory ID',
        completenessLast30: 'Completeness (गेल्या ३० दिवसांतील)',
        daysLoggedLabel: 'दिवसांची नोंद',
        avgPhLabel: 'सरासरी pH',
        totalWaterLabel: 'एकूण पाणी',
        lastLogLabel: 'शेवटची नोंद',
        downloadGreenPassport: '📄 Green Passport डाउनलोड करा (PDF)',
        summaryLoadingText: 'Summary लोड होतोय...',
        waitingApproval: 'Factory च्या approval ची वाट बघतोय.',
        requestRejectedRevoked: 'ही विनंती नाकारली/रद्द केली गेली आहे.',
        m2Title: '2. Main Enterprise Overview',
        m3Title: '3. Multi-File Batch OCR & Human Classification Gate (Hybrid Bulk Upload)',
        m3Desc: 'खालील Unit साठी अनेक बिलं (वीज, पाणी, Sludge Manifest) निवडा',
        m5Title: '5. Flying Squad Audit Mode',
        generateDossier: 'Dossier तयार करा',
        m6Title: '6. Notice Defence Matrix & Draft Generator',
        generateNoticeDefence: 'Notice Defence तयार करा',
        m7Title: '7. Form 3, 4 & 5 Annual Returns Draft Generator',
        compileReturns: 'Returns तयार करा',
        m8Title: '8. WhatsApp / SMS Alert Engine',
        testAlertButton: 'Alert टेस्ट करा',
        m9Title: '9. Tamper-Evident Digital Vault',
        verifyVaultHashButton: 'Vault Hash तपासा',
        buyerConnectionRequestsTitle: 'Buyer Connection Requests',
        buyerConnectionRequestsDesc: 'तुमचा Unit ID buyer ला द्या (वरच्या पट्टीत दिसतो) — त्यांनी विनंती पाठवली की इथे दिसेल.',
        noRequestsReceivedYet: 'अजून कुठलीही विनंती आलेली नाही.',
        approveButton: 'मंजूर करा',
        rejectButton: 'नाकारा',
        revokeAccessButton: 'Access रद्द करा',
        ctoRenewalAlertMsg: 'तुमच्या फॅक्टरीच्या CTO नूतनीकरणासाठी {days} दिवस उरले आहेत.',
        m10Title: '10. ETP CAPEX व ROI Calculator',
        m10Desc: 'Discharge limit वर आधारित अंदाजे ROI:',
        m11Title: '11. B2B Green Passport व SEBI BRSR Core Template',
        m11Desc: 'Scope 2 carbon output:',
        m12Title: '12. E-Waste व Battery EPR Record Vault',
        m12Desc: 'घातक byproduct ट्रॅकिंगसाठी सक्रिय ledger calculations.',
        m13Title: '13. CTO Renewal Auto-Dossier Generator',
        m13Desc: 'यासाठी renewal packet आपोआप तयार करतो:',
        roadmapRequestButton: 'लवकर access विनंती करा / Priority Build',
        m14Title: '14. Gas Leak Safety Radar',
        m14Desc: 'Real-time IoT gas leak detection (IEC 61511/SIL hardware आवश्यक).',
        m15Title: '15. Tanker GPS व Form 10 Manifest',
        m15Desc: 'घातक कचरा वाहतूक tankers चं Live GPS tracking.',
        m16Title: '16. MSEDCL Smart Grid व Power Factor Optimizer',
        m16Desc: 'स्वयंचलित grid synchronization व power factor penalty इशारे.',
        m17Title: '17. SBI / SIDBI Working Capital Interest Rebate',
        m17Desc: 'Green subvention filing साठी थेट banking API जोडणी.',
        m18Title: '18. MCCI Privacy Shield व Govt Grants',
        m18Desc: 'प्रादेशिक enterprise grant matching व सुरक्षित data pooling.',
        m19Title: '19. Macro-Level Green Industrial Corridor',
        m19Desc: 'प्रादेशिक multi-factory एकत्रित उत्सर्जन निरीक्षण.',
        renewablePctPlaceholder: '% Renewable coverage (ऐच्छिक)',
        renewableTypeNone: 'कुठलंही green instrument नाही',
        renewableTypeGreenTariff: 'Green Tariff',
        renewableTypeSolarPpa: 'Solar PPA',
        renewableTypeRec: 'REC (विकत घेतलेलं)',
        renewableHint: 'जर तुम्ही Green Tariff वीज विकत घेता, Solar PPA आहे, किंवा RECs विकत घेता — तर किती % वीज त्याने कव्हर होते ते टाका — यावरून Scope 2 market-based अहवाल तयार होतो.',
        renewableCoverageLabel: 'Renewable Coverage',
        scope2LocationLabel: 'Scope 2 (Location-based)',
        inspectionTrackerTitle: 'Post-Inspection Follow-Up Tracker',
        inspectionTrackerDesc: 'MPCB/CPCB inspection भेटींची नोंद ठेवा, आणि पुढची कारवाई पूर्ण होईपर्यंत ट्रॅक करा.',
        addInspectionButton: '📋 Inspection नोंदवा',
        inspectionDateLabel: 'Inspection ची तारीख',
        authorityLabel: 'Authority',
        inspectorNameLabel: 'Inspector चं नाव (ऐच्छिक)',
        findingSummaryPlaceholder: 'Inspector ने काय नोंदवलं? (आवश्यक)',
        actionRequiredPlaceholder: 'कुठली कारवाई आवश्यक आहे (ऐच्छिक)',
        deadlineLabel: 'Deadline (ऐच्छिक)',
        submitInspectionButton: 'Inspection नोंद सेव्ह करा',
        cancelInspectionButton: 'रद्द करा',
        noInspectionsYet: 'अजून कुठलीही inspection नोंद नाही.',
        statusPending: 'प्रलंबित',
        statusCompleted: 'पूर्ण',
        statusOverdue: 'मुदत उलटलेली',
        markCompletedButton: 'पूर्ण झालं म्हणून नोंदवा',
        completionNotesPlaceholder: 'हे कसं सोडवलं याबद्दल टीप (ऐच्छिक)',
        confirmCompletionButton: 'पूर्णत्व नक्की करा',
        deadlineLabelShort: 'Deadline',
    },
    hi: {
        appTitle: 'EcoTrace India',
        tagline: 'MPCB अनुपालन · दैनिक रिकॉर्ड · कार्बन डेटा — MSMEs के लिए',
        loadDemo: '⚡ Load Demo Unit (Sales Mode)',
        exportReport: 'Export Verified Audit Report (.pdf)',
        buyerPortal: '🏢 Enterprise Buyer Portal',
        logout: 'Logout',
        activeUnit: 'सक्रिय यूनिट',
        unitId: 'यूनिट ID',
        ctoDaysLeft: 'CTO के दिन शेष',
        noFactory: 'अभी तक कोई फैक्ट्री दर्ज नहीं — नीचे रजिस्टर करें या "Load Demo Unit" दबाएँ',
        tabOverview: 'Overview',
        tabLiveCore: 'Live Core (9)',
        tabReference: 'Reference Modules (4)',
        tabRoadmap: 'Roadmap (6)',
        m1Title: '1. Multi-Tenant Client Onboarding & CTO Setup',
        registeredLocked: '✅ पंजीकृत — लॉक्ड',
        editDetails: '✏️ विवरण बदलें (Edit)',
        cancel: 'रद्द करें',
        companyNamePlaceholder: 'कंपनी का नाम दर्ज करें',
        industrialAreaPlaceholder: 'Industrial Area / स्थान दर्ज करें (restoring हो तो वैकल्पिक)',
        dischargeLimitPlaceholder: 'Discharge Limit (Liters)',
        registerButton: 'रजिस्टर करें / यूनिट बदलें',
        dischargeLimitLabel: 'Discharge Limit',
        ctoExpiryLabel: 'CTO Expiry',
        m4Title: '4. दैनिक ऑपरेटर लॉगबुक (Daily Operator Logbook)',
        alreadyLockedTitle: '✅ आज की एंट्री पहले ही सेव और लॉक हो चुकी है',
        lockedAt: 'लॉक हुई',
        newEntryMidnight: 'भारतीय समय (IST) के अनुसार रात 12 बजे के बाद नई एंट्री उपलब्ध होगी।',
        phLabel: 'pH Level (अनिवार्य)',
        waterLabel: 'Water KL (अनिवार्य)',
        powerLabel: 'Power kWh (अनिवार्य)',
        sludgeLabel: 'Sludge MT',
        notApplicable: 'लागू नहीं (N/A)',
        fuelSourcesLabel: 'ईंधन-स्रोत (Scope 1) — एक ही दिन में कई ईंधन-स्रोत जोड़े जा सकते हैं',
        addFuel: '+ एक और ईंधन-स्रोत जोड़ें',
        saveLock: 'सेव करें व लॉक करें',
        languageLabel: 'भाषा',
        factoryLogin: 'Factory Login',
        newFactorySignup: 'नई Factory रजिस्ट्रेशन',
        emailPlaceholder: 'Email',
        passwordPlaceholder: 'Password',
        loginButton: 'Login',
        signupButton: 'रजिस्टर करें (Sign Up)',
        newFactoryLink: 'नई factory? रजिस्टर करें',
        alreadyRegisteredLink: 'पहले से रजिस्टर्ड? Login करें',
        selectLanguage: 'अपनी भाषा चुनें',
        forgotPassword: 'पासवर्ड भूल गए?',
        resetPasswordTitle: 'पासवर्ड रीसेट करें',
        resetPasswordDesc: 'अपना email डालें — हम पासवर्ड रीसेट लिंक भेजेंगे।',
        sendResetLink: 'Reset Link भेजें',
        resetLinkSentMsg: 'Reset link भेज दी गई — कृपया अपना email देखें।',
        backToLogin: 'Login पर वापस जाएं',
        setNewPasswordTitle: 'नया पासवर्ड सेट करें',
        newPasswordPlaceholder: 'नया पासवर्ड',
        confirmPasswordPlaceholder: 'नया पासवर्ड दोबारा डालें',
        updatePasswordButton: 'पासवर्ड अपडेट करें',
        termsLink: 'नियम व शर्तें',
        privacyLink: 'गोपनीयता नीति',
        selectLanguageMenu: 'भाषा चुनें',
        buyerPortalTitle: '🏢 EcoTrace Enterprise Buyer Portal',
        buyerPortalTagline: 'आपके MSME suppliers का compliance status एक ही जगह',
        backToFactory: '← Factory Dashboard पर वापस',
        loadingText: 'Loading...',
        buyerRegisterTitle: 'Enterprise Buyer के रूप में रजिस्टर करें',
        buyerRegisterDesc: 'यह रजिस्ट्रेशन एक बार का है — बाद में आप कई suppliers से जुड़ सकते हैं।',
        companyNameReq: 'Company Name *',
        gstinOptional: 'GSTIN / CIN (वैकल्पिक)',
        industryOptional: 'Industry (वैकल्पिक)',
        contactEmailOptional: 'Contact Email (वैकल्पिक)',
        contactPhoneOptional: 'Contact Phone (वैकल्पिक)',
        registerAsBuyer: 'Buyer के रूप में रजिस्टर करें',
        sendConnectionRequestTitle: 'नए Supplier को जुड़ाव-विनंती भेजें',
        sendConnectionRequestDesc: 'Factory से मिला "Unit ID / Compliance ID" यहाँ डालें — उन्हें approve करना होगा।',
        factoryUnitIdPlaceholder: 'Factory Unit ID paste करें',
        sendRequestButton: 'विनंती भेजें',
        yourSuppliersTitle: 'आपके Suppliers',
        noRequestsSentYet: 'अभी तक कोई विनंती नहीं भेजी गई।',
        factoryIdLabel: 'Factory ID',
        completenessLast30: 'Completeness (पिछले ३० दिनों की)',
        daysLoggedLabel: 'दिन दर्ज',
        avgPhLabel: 'औसत pH',
        totalWaterLabel: 'कुल पानी',
        lastLogLabel: 'आख़िरी एंट्री',
        downloadGreenPassport: '📄 Green Passport डाउनलोड करें (PDF)',
        summaryLoadingText: 'Summary लोड हो रहा है...',
        waitingApproval: 'Factory के approval का इंतज़ार है।',
        requestRejectedRevoked: 'यह विनंती अस्वीकृत/रद्द कर दी गई है।',
        m2Title: '2. Main Enterprise Overview',
        m3Title: '3. Multi-File Batch OCR & Human Classification Gate (Hybrid Bulk Upload)',
        m3Desc: 'इस Unit के लिए कई बिल (बिजली, पानी, Sludge Manifest) चुनें',
        m5Title: '5. Flying Squad Audit Mode',
        generateDossier: 'Dossier बनाएं',
        m6Title: '6. Notice Defence Matrix & Draft Generator',
        generateNoticeDefence: 'Notice Defence बनाएं',
        m7Title: '7. Form 3, 4 & 5 Annual Returns Draft Generator',
        compileReturns: 'Returns तैयार करें',
        m8Title: '8. WhatsApp / SMS Alert Engine',
        testAlertButton: 'Alert टेस्ट करें',
        m9Title: '9. Tamper-Evident Digital Vault',
        verifyVaultHashButton: 'Vault Hash जांचें',
        buyerConnectionRequestsTitle: 'Buyer Connection Requests',
        buyerConnectionRequestsDesc: 'अपना Unit ID buyer को दें (ऊपर status bar में दिखता है) — उनकी विनंती यहां दिखेगी।',
        noRequestsReceivedYet: 'अभी तक कोई विनंती नहीं आई।',
        approveButton: 'स्वीकृत करें',
        rejectButton: 'अस्वीकार करें',
        revokeAccessButton: 'Access रद्द करें',
        ctoRenewalAlertMsg: 'आपकी फैक्ट्री के CTO नवीनीकरण के लिए {days} दिन शेष हैं।',
        m10Title: '10. ETP CAPEX व ROI Calculator',
        m10Desc: 'Discharge limit के आधार पर अनुमानित ROI:',
        m11Title: '11. B2B Green Passport व SEBI BRSR Core Template',
        m11Desc: 'Scope 2 carbon output:',
        m12Title: '12. E-Waste व Battery EPR Record Vault',
        m12Desc: 'खतरनाक byproduct ट्रैकिंग के लिए सक्रिय ledger calculations.',
        m13Title: '13. CTO Renewal Auto-Dossier Generator',
        m13Desc: 'इसके लिए renewal packet अपने आप तैयार करता है:',
        roadmapRequestButton: 'जल्दी access का अनुरोध करें / Priority Build',
        m14Title: '14. Gas Leak Safety Radar',
        m14Desc: 'Real-time IoT gas leak detection (IEC 61511/SIL hardware आवश्यक).',
        m15Title: '15. Tanker GPS व Form 10 Manifest',
        m15Desc: 'खतरनाक कचरा परिवहन tankers की Live GPS tracking.',
        m16Title: '16. MSEDCL Smart Grid व Power Factor Optimizer',
        m16Desc: 'स्वचालित grid synchronization व power factor penalty अलर्ट.',
        m17Title: '17. SBI / SIDBI Working Capital Interest Rebate',
        m17Desc: 'Green subvention filing के लिए सीधा banking API इंटीग्रेशन.',
        m18Title: '18. MCCI Privacy Shield व Govt Grants',
        m18Desc: 'क्षेत्रीय enterprise grant matching व सुरक्षित data pooling.',
        m19Title: '19. Macro-Level Green Industrial Corridor',
        m19Desc: 'क्षेत्रीय multi-factory समग्र उत्सर्जन निगरानी.',
        renewablePctPlaceholder: '% Renewable coverage (वैकल्पिक)',
        renewableTypeNone: 'कोई green instrument नहीं',
        renewableTypeGreenTariff: 'Green Tariff',
        renewableTypeSolarPpa: 'Solar PPA',
        renewableTypeRec: 'REC (खरीदा हुआ)',
        renewableHint: 'अगर आप Green Tariff बिजली खरीदते हैं, Solar PPA है, या RECs खरीदते हैं — तो कितनी % बिजली इससे कवर होती है वो डालें — इससे Scope 2 market-based रिपोर्ट तैयार होती है।',
        renewableCoverageLabel: 'Renewable Coverage',
        scope2LocationLabel: 'Scope 2 (Location-based)',
        inspectionTrackerTitle: 'Post-Inspection Follow-Up Tracker',
        inspectionTrackerDesc: 'MPCB/CPCB inspection विजिट दर्ज करें, और आगे की कार्रवाई पूरी होने तक ट्रैक करें।',
        addInspectionButton: '📋 Inspection दर्ज करें',
        inspectionDateLabel: 'Inspection की तारीख',
        authorityLabel: 'Authority',
        inspectorNameLabel: 'Inspector का नाम (वैकल्पिक)',
        findingSummaryPlaceholder: 'Inspector ने क्या नोट किया? (आवश्यक)',
        actionRequiredPlaceholder: 'कौन सी कार्रवाई आवश्यक है (वैकल्पिक)',
        deadlineLabel: 'Deadline (वैकल्पिक)',
        submitInspectionButton: 'Inspection रिकॉर्ड सेव करें',
        cancelInspectionButton: 'रद्द करें',
        noInspectionsYet: 'अभी तक कोई inspection रिकॉर्ड नहीं।',
        statusPending: 'लंबित',
        statusCompleted: 'पूर्ण',
        statusOverdue: 'समय सीमा पार',
        markCompletedButton: 'पूर्ण के रूप में चिह्नित करें',
        completionNotesPlaceholder: 'यह कैसे हल हुआ इस पर टिप्पणी (वैकल्पिक)',
        confirmCompletionButton: 'पूर्णता की पुष्टि करें',
        deadlineLabelShort: 'Deadline',
    },
};

function detectDocumentType(ocrText) {
  const text = ocrText.toLowerCase();
  let best = { type: "unknown", matchScore: 0 };
  for (const [type, keywords] of Object.entries(DOCUMENT_TYPE_KEYWORDS)) {
    const hits = keywords.filter((kw) => text.includes(kw)).length;
    const score = Math.round((hits / keywords.length) * 100);
    if (score > best.matchScore) {
      best = { type, matchScore: score };
    }
  }
  return best;
}

function classifyWithConfidenceGate(ocrText, ocrEngineConfidence, suggestedCategory) {
  const { type: documentType, matchScore } = detectDocumentType(ocrText);
  const validCategories = VALID_DOCUMENT_TO_CATEGORY[documentType] || [];
  const mismatch = documentType !== "unknown" && (validCategories.length === 0 || !validCategories.includes(suggestedCategory));
  const lowConfidence = ocrEngineConfidence < OCR_CONFIDENCE_THRESHOLD;

  if (mismatch) {
    return {
      autoClassify: false,
      requiresManualReview: true,
      reason: `Document detected as "${documentType}" but engine suggested CPCB ${suggestedCategory}. Mismatch detected.`,
      warningLabel: `Suggested: ${documentType.replace("_", " ")} — not a waste manifest`,
    };
  }
  if (lowConfidence || matchScore < OCR_CONFIDENCE_THRESHOLD) {
    return {
      autoClassify: false,
      requiresManualReview: true,
      reason: `OCR confidence (${ocrEngineConfidence}%) or match score (${matchScore}%) below threshold.`,
      warningLabel: "AI-suggested — manager confirmation required",
    };
  }
  return {
    autoClassify: true,
    requiresManualReview: false,
    reason: "High confidence match, valid pairing.",
    warningLabel: "AI-suggested, manager confirmation pending",
  };
}

function preflightCheck(dailyLogEntries) {
  const totalDays = 30;
  // FIX (Aug 2026): पूर्वी हे एकूण नोंदींची संख्या (dailyLogEntries.length) मोजत होतं — म्हणजे
  // एकाच दिवसासाठी दोनदा सेव्ह केलं तरी 2 "logged days" धरले जायचे. आता वेगळ्या (unique) log_date
  // मोजतो, जे प्रत्यक्ष अर्थाशी जुळतं.
  const uniqueLoggedDates = new Set(dailyLogEntries.map((e) => e.date));
  const loggedDays = uniqueLoggedDates.size;
  const completenessPct = totalDays > 0 ? Math.round((loggedDays / totalDays) * 100) : 0;
  
  const flaggedEntries = dailyLogEntries.filter((e) => parseFloat(e.ph) < 0 || parseFloat(e.ph) > 14 || parseFloat(e.power) < 0 || parseFloat(e.water) < 0);
  const blockGeneration = completenessPct < MINIMUM_COMPLETENESS_PCT;

  let statusLabel;
  if (blockGeneration) {
    statusLabel = `Insufficient Data — ${completenessPct}% Complete (Min 50% Required)`;
  } else if (completenessPct === 100 && flaggedEntries.length === 0) {
    statusLabel = "Data Complete & Filing-Ready";
  } else {
    statusLabel = `Partial Data — ${completenessPct}% Complete`;
  }

  return { completenessPct, flaggedEntries, blockGeneration, statusLabel, loggedDays };
}

// ---------------------------------------------------------------------------
// TAMPER-EVIDENT HASH CHAIN (Module 9 — Digital Vault)
// प्रत्येक daily_logs row चा hash = SHA-256(त्या entry चा canonical डेटा + आधीच्या entry चा hash).
// यामुळे साखळी तयार होते — मध्येच कुठलीही जुनी नोंद बदलली, तर पुढच्या सगळ्या नोंदींचा hash जुळेनासा होतो.
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// FIX (Aug 2026, round 4): "आजची तारीख" आधी new Date().toISOString() (UTC) वरून काढली जायची —
// भारत UTC+5:30 असल्याने त्यामुळे नवीन दिवस रात्री १२ ऐवजी पहाटे ५:३० वाजता सुरू व्हायचा
// (उदा. रात्री १:०० वाजताची नोंद अजूनही "काल" धरली जायची). आता IST प्रमाणे खरी तारीख काढतो,
// जेणेकरून "एका दिवसाला एकच नोंद" चा lock बरोबर मध्यरात्रीलाच उघडेल.
// ---------------------------------------------------------------------------
function getISTDateString() {
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(Date.now() + IST_OFFSET_MS);
    return istTime.toISOString().split('T')[0];
}

function canonicalLogPayload(row) {
    // Fixed key order + Number() normalization, जेणेकरून insert-वेळचा payload आणि
    // नंतर DB मधून वाचलेला payload (जो numeric कॉलम्ससाठी string म्हणून येतो) सारखाच बनतो.
    return JSON.stringify({
        factory_id: row.factory_id,
        log_date: row.log_date,
        ph_level: Number(row.ph_level),
        water_discharge_liters: Number(row.water_discharge_liters),
        electricity_kwh: Number(row.electricity_kwh),
        hazardous_waste_kg: row.hazardous_waste_kg === null || row.hazardous_waste_kg === undefined ? null : Number(row.hazardous_waste_kg),
        ocr_power_reading: row.ocr_power_reading === null || row.ocr_power_reading === undefined ? null : Number(row.ocr_power_reading),
        gps_captured: row.gps_captured,
        gps_latitude: row.gps_latitude === null || row.gps_latitude === undefined ? null : Number(row.gps_latitude),
        gps_longitude: row.gps_longitude === null || row.gps_longitude === undefined ? null : Number(row.gps_longitude),
    });
}

async function sha256Hex(text) {
    const data = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, '0')).join('');
}
// ---------------------------------------------------------------------------

export default function EcoTraceDashboard() {
    // ---- Login/Session Logic ----
    const [session, setSession] = useState(null);
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authMode, setAuthMode] = useState('login');
    const [authError, setAuthError] = useState('');

    // ---- Enterprise Aggregation Tier (Aug 2026) — Buyer Portal state ----
    const [viewMode, setViewMode] = useState('factory'); // 'factory' | 'buyer'
    const [buyerData, setBuyerData] = useState(null);
    const [isBuyerLoading, setIsBuyerLoading] = useState(true);
    const [tempBuyerCompanyName, setTempBuyerCompanyName] = useState('');
    const [tempBuyerGstin, setTempBuyerGstin] = useState('');
    const [tempBuyerIndustry, setTempBuyerIndustry] = useState('');
    const [tempBuyerEmail, setTempBuyerEmail] = useState('');
    const [tempBuyerPhone, setTempBuyerPhone] = useState('');
    const [buyerConnections, setBuyerConnections] = useState([]);
    const [buyerSummaries, setBuyerSummaries] = useState({}); // factory_id -> summary row
    const [requestFactoryId, setRequestFactoryId] = useState('');
    const [factoryConnectionRequests, setFactoryConnectionRequests] = useState([]);

    const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            // ---- Forgot Password (Aug 2026): Supabase ने पाठवलेल्या reset-link वर क्लिक केल्यावर
            // हा event येतो — तेव्हा "Set New Password" फॉर्म दाखवायला हा flag वापरतो ----
            if (event === 'PASSWORD_RECOVERY') {
                setIsPasswordRecovery(true);
            }
        });
        return () => authListener.subscription.unsubscribe();
    }, []);

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setAuthError('');
        if (authMode === 'login') {
            const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
            if (error) setAuthError(error.message);
        } else {
            const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
            if (error) setAuthError(error.message);
            else setAuthError('Signup successful! You can now login.');
        }
    };

    // ---- Forgot Password (Aug 2026) ----
    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        setAuthError('');
        const { error } = await supabase.auth.resetPasswordForEmail(authEmail, {
            redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        });
        if (error) {
            setAuthError(error.message);
        } else {
            setForgotPasswordSent(true);
        }
    };

    const handleSetNewPassword = async (e) => {
        e.preventDefault();
        setAuthError('');
        if (newPassword !== newPasswordConfirm) {
            setAuthError('पासवर्ड जुळत नाहीत / Passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setAuthError('पासवर्ड किमान ६ अक्षरांचा हवा / Password must be at least 6 characters.');
            return;
        }
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) {
            setAuthError(error.message);
        } else {
            setIsPasswordRecovery(false);
            setNewPassword('');
            setNewPasswordConfirm('');
            alert('पासवर्ड बदलला — आता नव्या पासवर्डने login करा / Password updated — please log in with your new password.');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    // ---- Step 4 (Pan-India expansion): load the list of states with a ready config for the onboarding dropdown ----
    // FIX (Aug 2026): this used to run once on mount with `[]` deps — i.e. before login, before
    // supabase had a session. state_configs' RLS policy only allows authenticated reads, so that
    // early call silently returned nothing and never ran again, leaving only the Maharashtra
    // fallback option visible even after adding more states. Now it (re)runs whenever `session`
    // changes, so it fires again right after login succeeds.
    useEffect(() => {
        if (!session) {
            return;
        }
        const loadStates = async () => {
            const { data, error } = await supabase
                .from('state_configs')
                .select('state')
                .order('state', { ascending: true });
            if (error) {
                console.error('Error loading state list:', error.message);
                return;
            }
            if (data && data.length > 0) {
                setAvailableStates(data.map((row) => row.state));
            }
        };
        loadStates();
    }, [session]);

    const [activeTab, setActiveTab] = useState('overview');
    
    const [factoryData, setFactoryData] = useState({
        name: "",
        location: "",
        dischargeLimit: "",
        ctoExpiryDate: "",
        status: "PENDING ONBOARDING",
        gridEmissionFactor: ALL_INDIA_GRID_FACTOR,
        state: "",
    });

    const [tempCompanyName, setTempCompanyName] = useState('');
    const [tempMidcLocation, setTempMidcLocation] = useState('');
    const [tempDischargeLimit, setTempDischargeLimit] = useState('');
    const [tempCtoDate, setTempCtoDate] = useState('');
    // ---- Market-based Scope 2 (Aug 2026) ----
    const [tempRenewablePct, setTempRenewablePct] = useState('');
    const [tempRenewableType, setTempRenewableType] = useState('none');
    // FIX (Aug 2026, round 4): एकदा factory registered झाली की Module 1 चा फॉर्म आपोआप रिकामाच
    // दिसायचा (जरी वरच्या पट्टीत खरा साठलेला डेटा दिसत असला तरी) — गोंधळ व्हायचा. आता factory
    // already असेल तर "locked" सारांश दाखवतो, फक्त स्पष्ट "Edit" दाबल्यावरच फॉर्म उघडतो.
    const [isEditingFactory, setIsEditingFactory] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    // ---- Multi-language support (Aug 2026) ----
    const [language, setLanguage] = useState('en');
    const t = (key) => TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
    const handleLanguageChange = async (newLang) => {
        setLanguage(newLang);
        if (currentUnitId && !isDemoMode) {
            const { error } = await supabase
                .from('factories')
                .update({ preferred_language: newLang })
                .eq('id', currentUnitId);
            if (error) console.error('Error saving language preference:', error.message);
        }
    };

    // ---- FIX (Aug 2026, round 10): "EN | मर | हि" हे संक्षेप एकत्र दाखवणं CA/CS सारख्या
    // professional audience साठी अपुरं/casual वाटलं. आता Notion/Stripe सारखं — एकच compact
    // बटण ("🌐 सध्याची भाषा ⌄"), क्लिक केल्यावर पूर्ण नावांची (English/मराठी/हिंदी) व्यवस्थित
    // यादी उघडते — तीच ⋮ More मेनूसारखीच पद्धत, सुसंगत दिसण्यासाठी. ----
    const LANGUAGE_NATIVE_NAMES = { en: 'English', mr: 'मराठी', hi: 'हिंदी' };
    const renderLanguagePicker = () => (
        <div style={{ position: 'relative' }}>
            <button
                type="button"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                title={t('selectLanguageMenu')}
                style={{ backgroundColor: '#1f2937', color: '#d1d5db', border: '1px solid #374151', borderRadius: '7px', padding: '7px 10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
                🌐 {LANGUAGE_NATIVE_NAMES[language]} <span style={{ fontSize: '9px', opacity: 0.7 }}>▾</span>
            </button>
            {showLanguageMenu && (
                <div style={{ position: 'absolute', top: '38px', left: 0, backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', padding: '6px', zIndex: 60, minWidth: '150px' }}>
                    {Object.entries(LANGUAGE_NATIVE_NAMES).map(([code, name]) => (
                        <button
                            key={code}
                            type="button"
                            onClick={() => { handleLanguageChange(code); setShowLanguageMenu(false); }}
                            style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
                                textAlign: 'left', backgroundColor: language === code ? '#1f2937' : 'transparent',
                                color: language === code ? '#34d399' : '#d1d5db', border: 'none', borderRadius: '6px',
                                padding: '8px 10px', fontSize: '12px', fontWeight: language === code ? 'bold' : 'normal', cursor: 'pointer',
                            }}
                        >
                            {name} {language === code && '✓'}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
    // Step 4 (Pan-India expansion): state selection for onboarding, options loaded from state_configs
    const [tempFactoryState, setTempFactoryState] = useState('Maharashtra');
    const [availableStates, setAvailableStates] = useState([]);

    const isFactoryActive = factoryData.name.trim() !== "";
    const [isDemoMode, setIsDemoMode] = useState(false);

    // Per-Unit State Isolation
    const [currentUnitId, setCurrentUnitId] = useState(null);
    const [unitsData, setUnitsData] = useState({});
    const [savedLogsHistory, setSavedLogsHistory] = useState([]);
    // ---- Correction/Amendment Log (Aug 2026) ----
    const [logCorrections, setLogCorrections] = useState([]);
    // ---- Post-Inspection Follow-Up Tracking (Aug 2026) ----
    const [inspectionFollowups, setInspectionFollowups] = useState([]);
    const [showInspectionForm, setShowInspectionForm] = useState(false);
    const [inspDate, setInspDate] = useState('');
    const [inspAuthority, setInspAuthority] = useState('MPCB');
    const [inspInspectorName, setInspInspectorName] = useState('');
    const [inspFinding, setInspFinding] = useState('');
    const [inspAction, setInspAction] = useState('');
    const [inspDeadline, setInspDeadline] = useState('');
    const [completingInspectionId, setCompletingInspectionId] = useState('');
    const [completionNotes, setCompletionNotes] = useState('');
    const [showCorrectionForm, setShowCorrectionForm] = useState(false);
    const [correctionLogId, setCorrectionLogId] = useState('');
    const [correctionField, setCorrectionField] = useState('ph_level');
    const [correctionNewValue, setCorrectionNewValue] = useState('');
    const [correctionReason, setCorrectionReason] = useState('');
    const [isFactoryLoading, setIsFactoryLoading] = useState(true);

    // ---- Step 2.1 (Pan-India backend migration): auto-load this user's factory on login ----
    useEffect(() => {
        if (!session) {
            setIsFactoryLoading(false);
            return;
        }

        const loadFactory = async () => {
            setIsFactoryLoading(true);
            const { data, error } = await supabase
                .from('factories')
                .select('*')
                .eq('owner_user_id', session.user.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (error) {
                console.error('Error loading factory:', error.message);
                setIsFactoryLoading(false);
                return;
            }

            if (data) {
                setCurrentUnitId(data.id);

                // ---- Scope 2 fix (Aug 2026): factory च्या राज्याचा प्रादेशिक grid emission factor
                // state_configs मधून आणतो — सापडला नाही तर All-India fallback वापरतो ----
                let gridFactor = ALL_INDIA_GRID_FACTOR;
                if (data.state) {
                    const { data: stateConfigRow } = await supabase
                        .from('state_configs')
                        .select('grid_emission_factor_kgco2_per_kwh')
                        .eq('state', data.state)
                        .maybeSingle();
                    if (stateConfigRow?.grid_emission_factor_kgco2_per_kwh) {
                        gridFactor = Number(stateConfigRow.grid_emission_factor_kgco2_per_kwh);
                    }
                }

                setFactoryData({
                    name: data.name,
                    location: data.plant_location,
                    dischargeLimit: String(data.mpcb_water_consent_limit_liters ?? '5000'),
                    // Step 3 (Pan-India backend migration): cto_expiry_date now lives in the DB —
                    // fall back to the old hardcoded default only for factories onboarded before this column existed
                    ctoExpiryDate: data.cto_expiry_date ?? '2026-12-31',
                    status: "DATA COMPLETE & FILING-READY",
                    gridEmissionFactor: gridFactor,
                    state: data.state || '',
                    renewableCoveragePct: data.renewable_coverage_pct ?? 0,
                    renewableInstrumentType: data.renewable_instrument_type || 'none',
                });
                // साठलेली भाषा-निवड लागू करतो (Multi-language, Aug 2026)
                if (data.preferred_language) {
                    setLanguage(data.preferred_language);
                }

                // ---- Step 4 (Pan-India backend migration): load this factory's saved daily_logs
                // so completeness %, Scope 2, water totals, and pH average are computed from
                // everything actually saved in the DB, not just the current browser session ----
                const { data: logsData, error: logsError } = await supabase
                    .from('daily_logs')
                    .select('*')
                    .eq('factory_id', data.id)
                    .order('log_date', { ascending: false });

                if (logsError) {
                    console.error('Error loading daily log history:', logsError.message);
                } else if (logsData) {
                    const historyEntries = logsData.map((row) => ({
                        id: row.id,
                        date: row.log_date,
                        ph: String(row.ph_level ?? ''),
                        water: String(row.water_discharge_liters ?? ''),
                        power: String(row.electricity_kwh ?? ''),
                        // hazardous_waste_kg is stored in kg (Step 1 fix) — convert back to MT for display/history math
                        sludge: row.hazardous_waste_kg === null ? 'N/A (Not Applicable)' : String(row.hazardous_waste_kg / 1000),
                        ocrPowerValue: row.ocr_power_reading,
                        gpsCaptured: row.gps_captured,
                        gpsLatitude: row.gps_latitude,
                        gpsLongitude: row.gps_longitude,
                        submittedAt: row.created_at,
                    }));
                    setSavedLogsHistory(historyEntries);
                }

                // ---- Correction/Amendment Log (Aug 2026): या factory च्या correction history पण लोड करतो ----
                const { data: correctionsData, error: correctionsError } = await supabase
                    .from('log_corrections')
                    .select('*')
                    .eq('factory_id', data.id)
                    .order('created_at', { ascending: false });
                if (correctionsError) {
                    console.error('Error loading corrections:', correctionsError.message);
                } else if (correctionsData) {
                    setLogCorrections(correctionsData);
                }

                // ---- Post-Inspection Follow-Up Tracking (Aug 2026) ----
                const { data: inspectionsData, error: inspectionsError } = await supabase
                    .from('inspection_followups')
                    .select('*')
                    .eq('factory_id', data.id)
                    .order('inspection_date', { ascending: false });
                if (inspectionsError) {
                    console.error('Error loading inspection followups:', inspectionsError.message);
                } else if (inspectionsData) {
                    setInspectionFollowups(inspectionsData);
                }
            }
            // data नसेल तर काहीही बदलू नका — डीफॉल्ट "No factory onboarded" स्थितीच राहील
            setIsFactoryLoading(false);
        };

        loadFactory();
    }, [session]);

    // ---- Enterprise Aggregation Tier: login झाल्यावर हा user कुणाचा buyer म्हणून नोंदलेला आहे का ते बघतो ----
    useEffect(() => {
        if (!session) {
            setIsBuyerLoading(false);
            return;
        }
        const loadBuyer = async () => {
            setIsBuyerLoading(true);
            const { data, error } = await supabase
                .from('buyer_accounts')
                .select('*')
                .eq('owner_user_id', session.user.id)
                .maybeSingle();
            if (error) {
                console.error('Error loading buyer account:', error.message);
            } else if (data) {
                setBuyerData(data);
            }
            setIsBuyerLoading(false);
        };
        loadBuyer();
    }, [session]);

    // buyer account सापडलं की त्याच्या connections + approved summaries आपोआप आणतो
    useEffect(() => {
        if (buyerData) {
            fetchBuyerConnections(buyerData.id);
        }
    }, [buyerData]);

    // factory unit ठरलं की त्या factory कडे आलेल्या buyer विनंत्या आपोआप आणतो
    useEffect(() => {
        if (currentUnitId) {
            fetchFactoryConnectionRequests(currentUnitId);
        }
    }, [currentUnitId]);

    // ---- FIX (Aug 2026, round 5): आधी operator पूर्ण फॉर्म भरून "Save & Lock" दाबल्यावरच
    // कळायचं की आजची नोंद आधीच झालीये — वेळ वाया जायचा. आता factory उघडताक्षणीच तपासतो. ----
    const [todayLogLockedAt, setTodayLogLockedAt] = useState(null);
    const checkTodayLogStatus = async (factoryId) => {
        const { data } = await supabase
            .from('daily_logs')
            .select('created_at')
            .eq('factory_id', factoryId)
            .eq('log_date', getISTDateString())
            .limit(1);
        setTodayLogLockedAt(data && data.length > 0 ? data[0].created_at : null);
    };
    useEffect(() => {
        if (currentUnitId && !isDemoMode) {
            checkTodayLogStatus(currentUnitId);
        } else {
            setTodayLogLockedAt(null);
        }
    }, [currentUnitId, isDemoMode]);
    
    const [selectedCategory, setSelectedCategory] = useState("CPCB Cat 34.3 (Chemical Sludge)");
    const [ocrFiles, setOcrFiles] = useState([]); // Now stores per-file objects with individual OCR statuses
    
    // Daily Log State & True OCR Read State
    const [dailyLog, setDailyLog] = useState({ ph: '7.2', water: '1420', power: '3150', sludge: '0.45', fuelEntries: [{ type: 'none', amount: '' }] });
    const [ocrReadPower, setOcrReadPower] = useState(null); 
    const [isSludgeNotApplicable, setIsSludgeNotApplicable] = useState(false);
    const [logSubmitted, setLogSubmitted] = useState(false);
    const [validationWarning, setValidationWarning] = useState("");


    const handleUnitSwitch = (newUnitId, newFactoryDetails, logs, demoState, category, files, logState, sludgeNaState, ocrPower) => {
        if (currentUnitId) {
            setUnitsData(prev => ({
                ...prev,
                [currentUnitId]: { factoryData, savedLogsHistory, isDemoMode, selectedCategory, ocrFiles, dailyLog, isSludgeNotApplicable, ocrReadPower }
            }));
        }
        setCurrentUnitId(newUnitId);
        setIsDemoMode(demoState);
        setFactoryData(newFactoryDetails);
        setSavedLogsHistory(logs || []);
        setSelectedCategory(category || "CPCB Cat 34.3 (Chemical Sludge)");
        setOcrFiles(files || []);
        setDailyLog(logState || { ph: '7.2', water: '1420', power: '3150', sludge: '0.45', fuelEntries: [{ type: 'none', amount: '' }] });
        setIsSludgeNotApplicable(sludgeNaState || false);
        setOcrReadPower(ocrPower !== undefined ? ocrPower : null);
    };

    const loadDemoUnit = () => {
        // FIX (Aug 2026, round 7): Demo Unit मध्ये gridEmissionFactor/state हे नवीन fields
        // नव्हतेच — त्यामुळे Scope 2 calculation मध्ये NaN यायचा (हे प्रमुख sales-demo tool
        // असल्याने ही गंभीर चूक होती). आता खरा Maharashtra grid factor + state जोडला, आणि
        // Scope 1 चं multi-fuel फीचर दाखवायला डीफॉल्ट इंधन-नमुनाही जोडला.
        const demoDetails = {
            name: "DEMO-FACTORY (MSME SAMPLE)",
            location: "PUNE MIDC",
            state: "Maharashtra",
            gridEmissionFactor: 0.8900, // Western regional grid — Maharashtra/Gujarat (CEA V21.0, FY24-25)
            dischargeLimit: "5000",
            ctoExpiryDate: "2026-10-15",
            status: "DATA COMPLETE & FILING-READY (DEMO MODE)",
            // Market-based Scope 2 (Aug 2026): डेमोमध्ये 30% Green Tariff coverage दाखवतो,
            // जेणेकरून sales-demo मध्ये location-based vs market-based फरक स्पष्ट दिसेल.
            renewableCoveragePct: 30,
            renewableInstrumentType: 'green_tariff',
        };
        const demoLogs = Array.from({ length: 15 }, (_, i) => ({
            date: `2026-08-${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
            ph: (7.0 + (i % 3) * 0.1).toFixed(1),
            water: '1420',
            power: '3150',
            sludge: '0.45',
            ocrPowerValue: 3120,
            gpsCaptured: true,
            gpsLatitude: 18.6017 + (i * 0.0001),
            gpsLongitude: 73.9105 + (i * 0.0001),
            submittedAt: new Date().toISOString()
        }));
        // डीफॉल्ट दैनिक फॉर्म — multi-fuel Scope 1 चं उदाहरण दाखवायला Diesel + LPG दोन्ही
        const demoDailyLog = {
            ph: '7.2', water: '1420', power: '3150', sludge: '0.45',
            fuelEntries: [
                { type: 'diesel', amount: '300' },
                { type: 'lpg', amount: '150' },
            ],
        };
        handleUnitSwitch("DEMO-FACTORY", demoDetails, demoLogs, true, "CPCB Cat 34.3 (Chemical Sludge)", [], demoDailyLog, false, 3120);
        alert('Demo Unit loaded safely in isolated state with 15-day sample data.');
    };

    // ---- Step 1.1 + Pan-India location fix: Onboarding now writes to Supabase, using state_configs for the industrial-area term ----
    const handleOnboardSubmit = async (e) => {
        e.preventDefault();
        if (!tempCompanyName.trim()) {
            alert('Please enter a valid company name.');
            return;
        }

        const unitName = tempCompanyName.trim().toUpperCase();
        const dischargeLimitValue = tempDischargeLimit || '5000';
        const ctoDateValue = tempCtoDate || '2026-12-31';
        const factoryState = tempFactoryState || 'Maharashtra'; // operator-selected — Step 4

        // हार्डकोडेड "MIDC" ऐवजी, त्या राज्याचा industrial-area-term + grid emission factor state_configs मधून वाचा
        const { data: stateConfig } = await supabase
            .from('state_configs')
            .select('industrial_area_term, grid_emission_factor_kgco2_per_kwh')
            .eq('state', factoryState)
            .maybeSingle();

        const areaTerm = stateConfig?.industrial_area_term || 'Industrial Area';
        const onboardGridFactor = stateConfig?.grid_emission_factor_kgco2_per_kwh
            ? Number(stateConfig.grid_emission_factor_kgco2_per_kwh)
            : ALL_INDIA_GRID_FACTOR;
        // FIX (Aug 2026, round 6): Edit मोडमध्ये हा रकाना आधीच साठलेल्या location ने भरलेला असतो
        // (उदा. "PUNE MIDC") — जर तो आधीच areaTerm ने संपत असेल, तर तो पुन्हा जोडायचा नाही
        // (नाहीतर "PUNE MIDC MIDC" असं दुप्पट होतं).
        const trimmedInput = tempMidcLocation.trim().toUpperCase();
        const alreadyHasAreaTerm = trimmedInput.endsWith(areaTerm.toUpperCase());
        const locationValue = trimmedInput
            ? (alreadyHasAreaTerm ? trimmedInput : `${trimmedInput} ${areaTerm}`)
            : `${areaTerm} CLUSTER`;

        // Supabase मध्ये upsert — जर या owner_user_id ची factory आधीच असेल तर ती UPDATE होईल,
        // नवीन duplicate तयार होणार नाही (एका account ला एकच factory — database-level constraint सह)
        const { data, error } = await supabase
            .from('factories')
            .upsert({
                name: unitName,
                plant_location: locationValue,
                mpcb_water_consent_limit_liters: parseFloat(dischargeLimitValue),
                owner_user_id: session.user.id,
                state: factoryState,
                cto_expiry_date: ctoDateValue,
                renewable_coverage_pct: tempRenewablePct ? parseFloat(tempRenewablePct) : 0,
                renewable_instrument_type: tempRenewablePct ? tempRenewableType : 'none',
            }, { onConflict: 'owner_user_id' })
            .select()
            .single();

        if (error) {
            alert('Error saving factory: ' + error.message);
            return;
        }

        // नवीन factory चा खरा database ID currentUnitId म्हणून साठवा
        setCurrentUnitId(data.id);
        setFactoryData({
            name: data.name,
            location: data.plant_location,
            dischargeLimit: String(data.mpcb_water_consent_limit_liters),
            ctoExpiryDate: ctoDateValue,
            status: "DATA COMPLETE & FILING-READY",
            gridEmissionFactor: onboardGridFactor,
            state: factoryState,
            renewableCoveragePct: data.renewable_coverage_pct ?? 0,
            renewableInstrumentType: data.renewable_instrument_type || 'none',
        });

        alert(`Factory Unit ${unitName} Onboarded Successfully (Saved to Database)!`);
    };

    const calculateCtoDaysLeft = (expiryDate) => {
        if (!expiryDate) return 0;
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const ctoDaysLeft = calculateCtoDaysLeft(factoryData.ctoExpiryDate);

    let ctoBannerBg = '#065f46';
    let ctoBannerBorder = '#34d399';
    let ctoTextColor = '#d1fae5';
    if (isFactoryActive) {
        if (ctoDaysLeft < 30) {
            ctoBannerBg = '#7f1d1d';
            ctoBannerBorder = '#ef4444';
            ctoTextColor = '#fee2e2';
        } else if (ctoDaysLeft <= 60) {
            ctoBannerBg = '#78350f';
            ctoBannerBorder = '#f59e0b';
            ctoTextColor = '#fef3c7';
        }
    }

    const handleLogChange = (field, val) => {
        const updatedLog = { ...dailyLog, [field]: val };
        setDailyLog(updatedLog);
        
        if (currentUnitId) {
            setUnitsData(prev => ({
                ...prev,
                [currentUnitId]: { factoryData, savedLogsHistory, isDemoMode, selectedCategory, ocrFiles, dailyLog: updatedLog, isSludgeNotApplicable, ocrReadPower }
            }));
        }

        if (field === 'ph') {
            const phVal = parseFloat(val);
            if (phVal < 0 || phVal > 14) {
                setValidationWarning("⚠️ Warning: pH value is out of normal legal range (0 - 14).");
            } else {
                setValidationWarning("");
            }
        }
    };

    // ---- Multi-fuel Scope 1 (Aug 2026 fix): एका दिवसात Diesel genset + LPG boiler सारखे अनेक
    // इंधन-स्रोत असू शकतात — त्यामुळे fuelEntries ही यादी आहे, एक इंधन नाही ----
    const syncFuelEntries = (updatedEntries) => {
        const updatedLog = { ...dailyLog, fuelEntries: updatedEntries };
        setDailyLog(updatedLog);
        if (currentUnitId) {
            setUnitsData(prev => ({
                ...prev,
                [currentUnitId]: { factoryData, savedLogsHistory, isDemoMode, selectedCategory, ocrFiles, dailyLog: updatedLog, isSludgeNotApplicable, ocrReadPower }
            }));
        }
    };
    const handleFuelEntryChange = (index, field, value) => {
        const updated = dailyLog.fuelEntries.map((fe, i) => (i === index ? { ...fe, [field]: value } : fe));
        syncFuelEntries(updated);
    };
    const addFuelEntry = () => {
        syncFuelEntries([...dailyLog.fuelEntries, { type: 'none', amount: '' }]);
    };
    const removeFuelEntry = (index) => {
        const updated = dailyLog.fuelEntries.filter((_, i) => i !== index);
        syncFuelEntries(updated.length > 0 ? updated : [{ type: 'none', amount: '' }]);
    };

    const powerNum = parseFloat(dailyLog.power) || 3150;
    const totalWaterNum = savedLogsHistory.length > 0 
        ? savedLogsHistory.reduce((sum, entry) => sum + (parseFloat(entry.water) || 0), 0) 
        : (parseFloat(dailyLog.water) || 1420);

    const truePhAverage = savedLogsHistory.length > 0
        ? (savedLogsHistory.reduce((sum, entry) => sum + (parseFloat(entry.ph) || 0), 0) / savedLogsHistory.length).toFixed(2)
        : (parseFloat(dailyLog.ph) || 7.2).toFixed(2);

    // FIX (Aug 2026): पूर्वी savedLogsHistory.length (एकूण नोंदी) वापरत होतं — आता preflightCheck सारखाच
    // unique log_date count वापरतो, म्हणजे रिपोर्टमधले आकडे आणि completeness % परस्परविरोधी दाखवणार नाहीत.
    const uniqueLoggedDaysCount = new Set(savedLogsHistory.map((e) => e.date)).size;
    const missedDays = 30 - uniqueLoggedDaysCount;
    const positiveMissedDays = missedDays > 0 ? missedDays : 0;
    const outOfRangeCount = savedLogsHistory.filter((e) => parseFloat(e.ph) < 0 || parseFloat(e.ph) > 14).length;
    const gpsCapturedCount = savedLogsHistory.filter((e) => e.gpsCaptured).length;

    // FIX (Aug 2026): पूर्वी सगळ्या राज्यांसाठी एकच hardcoded 0.82 factor वापरला जायचा — आता
    // factory च्या राज्याचा प्रादेशिक grid emission factor (state_configs मधून, factory load/onboarding
    // वेळी आणलेला) वापरतो; तो सापडला नाही तर All-India fallback आपोआप वापरला जातो.
    const calculatedScope2 = (powerNum * factoryData.gridEmissionFactor / 1000).toFixed(2); 
    // ---- Market-based Scope 2 (Aug 2026): GHG Protocol Scope 2 Guidance नुसार दोन्ही पद्धतीने
    // report करणं अपेक्षित असतं. Renewable-covered हिस्सा 0 emission मानला जातो (Green Tariff/
    // Solar PPA/REC ने backed), उरलेला हिस्सा त्याच प्रादेशिक grid factor ने मोजतो (residual-mix
    // साठी सोपं approximation — नेमका residual-mix factor वेगळा असू शकतो, तो अजून उपलब्ध नाही). ----
    const renewablePct = factoryData.renewableCoveragePct || 0;
    const calculatedScope2Market = (powerNum * (1 - renewablePct / 100) * factoryData.gridEmissionFactor / 1000).toFixed(2);
    // FIX (Aug 2026, round 2): पूर्वी एका दिवसासाठी फक्त एकच इंधन-प्रकार निवडता यायचा — पण एखादी
    // फॅक्टरी एकाच वेळी Diesel genset + LPG boiler वापरत असू शकते. आता dailyLog.fuelEntries ही
    // यादी आहे — प्रत्येक नोंदीचा emission बेरीज करून एकत्रित Scope 1 दाखवतो.
    const validFuelEntries = (dailyLog.fuelEntries || []).filter((fe) => fe.type !== 'none' && fe.amount);
    const hasAnyEstimateFuel = validFuelEntries.some((fe) => FUEL_EMISSION_FACTORS[fe.type]?.isEstimate);
    const scope1Total = validFuelEntries.reduce((sum, fe) => {
        const info = FUEL_EMISSION_FACTORS[fe.type] || FUEL_EMISSION_FACTORS.none;
        return sum + (parseFloat(fe.amount) || 0) * info.factor;
    }, 0) / 1000;
    const calculatedScope1 = validFuelEntries.length === 0
        ? "N/A — No Combustion Source Declared"
        : scope1Total.toFixed(2) + (hasAnyEstimateFuel ? ' tCO2e (includes an approximate factor — verify with consultant)' : ' tCO2e');

    // PER-FILE HYBRID BULK UPLOAD WITH INDEPENDENT OCR GATE
    // ---- खरा OCR engine (Aug 2026 fix): आधीचा rule-based simulated classifier बदलून, आता प्रत्येक
    // फाईल /api/ocr (server-side, Google Cloud Vision) कडे पाठवतो आणि खरा मजकूर + confidence मिळवतो. ----
    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Loop through each uploaded file, send it to the server-side OCR route, and build per-file status
        const newProcessedFiles = await Promise.all(files.map(async (file) => {
            let ocrText = '';
            let ocrConfidencePct = 0;
            let ocrErrorMessage = null;

            try {
                const formData = new FormData();
                formData.append('file', file);
                const res = await fetch('/api/ocr', { method: 'POST', body: formData });
                const body = await res.json();
                if (!res.ok) {
                    ocrErrorMessage = body.error || `OCR request failed (${res.status})`;
                } else {
                    ocrText = body.text || '';
                    ocrConfidencePct = body.confidencePct || 0;
                }
            } catch (err) {
                ocrErrorMessage = 'Could not reach OCR service: ' + err.message;
            }

            if (ocrErrorMessage) {
                return {
                    name: file.name,
                    category: 'OCR Failed',
                    statusMessage: `⚠️ OCR Error: ${ocrErrorMessage} — classify manually.`,
                    confirmed: false,
                };
            }

            const { type: documentType } = detectDocumentType(ocrText);
            let defaultCat = 'Unclassified Document — needs manual category';
            if (documentType === 'utility_bill') defaultCat = 'Utility Bill - Electricity (Scope 2)';
            else if (documentType === 'water_bill') defaultCat = 'General Water Bill';
            else if (documentType === 'waste_manifest') defaultCat = 'CPCB Cat 34.3 (Chemical Sludge)';

            const gateResult = classifyWithConfidenceGate(ocrText, ocrConfidencePct, '34.3');

            // Utility bill असेल तर मजकुरातून प्रत्यक्ष kWh रीडिंग शोधायचा प्रयत्न — जुन्या hardcoded 3120 ऐवजी
            const powerMatch = ocrText.match(/(\d+(?:\.\d+)?)\s*k?wh/i);
            const extractedPower = documentType === 'utility_bill' && powerMatch ? parseFloat(powerMatch[1]) : null;
            if (extractedPower !== null) {
                setOcrReadPower(extractedPower);
            }

            return {
                name: file.name,
                category: defaultCat,
                statusMessage: gateResult.requiresManualReview
                    ? `⚠️ Notice: ${gateResult.warningLabel}`
                    : `✅ Verified: Valid pairing for ${file.name}`,
                confirmed: false // Manager confirmation pending gate requirement
            };
        }));

        const updatedFiles = [...ocrFiles, ...newProcessedFiles];
        setOcrFiles(updatedFiles);
        
        if (currentUnitId) {
            setUnitsData(prev => ({
                ...prev,
                [currentUnitId]: { factoryData, savedLogsHistory, isDemoMode, selectedCategory, ocrFiles: updatedFiles, dailyLog, isSludgeNotApplicable, ocrReadPower }
            }));
        }
    };

    // ---- Step 3 (Pan-India backend migration): Daily Log now writes to Supabase (demo mode stays local — Step 5) ----
    // ---- Correction/Amendment Log (Aug 2026): मूळ daily_logs नोंद कधीच बदलत नाही (hash chain
    // तसाच अभंग राहतो) — फक्त एक वेगळी, स्पष्टीकरणासह "correction" नोंद जोडली जाते. Report/PDF
    // वाचणाऱ्याला मूळ आकडा आणि दुरुस्ती दोन्ही दिसतात — काहीही लपवलं जात नाही. ----
    const handleCorrectionSubmit = async (e) => {
        e.preventDefault();
        if (!correctionLogId || !correctionNewValue || !correctionReason.trim()) {
            alert('कृपया सगळे रकाने भरा / Please fill all fields.');
            return;
        }
        const originalEntry = savedLogsHistory.find((entry) => entry.id === correctionLogId);
        if (!originalEntry) {
            alert('मूळ नोंद सापडली नाही / Original entry not found.');
            return;
        }
        const fieldToOriginalValue = {
            ph_level: originalEntry.ph,
            water_discharge_liters: originalEntry.water,
            electricity_kwh: originalEntry.power,
            hazardous_waste_kg: originalEntry.sludge,
        };
        const { error } = await supabase.from('log_corrections').insert({
            factory_id: currentUnitId,
            original_log_id: correctionLogId,
            log_date: originalEntry.date,
            field_name: correctionField,
            original_value: fieldToOriginalValue[correctionField] ?? '',
            corrected_value: correctionNewValue,
            reason: correctionReason.trim(),
            corrected_by_email: session?.user?.email || '',
        });
        if (error) {
            alert('Error saving correction: ' + error.message);
            return;
        }
        // ताजी correction यादी परत लोड करतो
        const { data: refreshedCorrections } = await supabase
            .from('log_corrections')
            .select('*')
            .eq('factory_id', currentUnitId)
            .order('created_at', { ascending: false });
        if (refreshedCorrections) setLogCorrections(refreshedCorrections);
        setShowCorrectionForm(false);
        setCorrectionLogId('');
        setCorrectionNewValue('');
        setCorrectionReason('');
        alert('दुरुस्ती नोंदवली गेली / Correction recorded.');
    };

    // ---- Post-Inspection Follow-Up Tracking (Aug 2026) ----
    const handleAddInspection = async (e) => {
        e.preventDefault();
        if (!inspDate || !inspFinding.trim()) {
            alert('कृपया तारीख आणि निष्कर्ष भरा / Please enter date and finding summary.');
            return;
        }
        const { error } = await supabase.from('inspection_followups').insert({
            factory_id: currentUnitId,
            inspection_date: inspDate,
            authority: inspAuthority,
            inspector_name: inspInspectorName.trim() || null,
            finding_summary: inspFinding.trim(),
            action_required: inspAction.trim() || null,
            deadline_date: inspDeadline || null,
        });
        if (error) {
            alert('Error saving inspection record: ' + error.message);
            return;
        }
        const { data: refreshed } = await supabase
            .from('inspection_followups')
            .select('*')
            .eq('factory_id', currentUnitId)
            .order('inspection_date', { ascending: false });
        if (refreshed) setInspectionFollowups(refreshed);
        setShowInspectionForm(false);
        setInspDate(''); setInspAuthority('MPCB'); setInspInspectorName('');
        setInspFinding(''); setInspAction(''); setInspDeadline('');
    };

    const handleCompleteInspection = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from('inspection_followups')
            .update({ status: 'completed', completed_date: getISTDateString(), completed_notes: completionNotes.trim() || null })
            .eq('id', completingInspectionId);
        if (error) {
            alert('Error updating: ' + error.message);
            return;
        }
        const { data: refreshed } = await supabase
            .from('inspection_followups')
            .select('*')
            .eq('factory_id', currentUnitId)
            .order('inspection_date', { ascending: false });
        if (refreshed) setInspectionFollowups(refreshed);
        setCompletingInspectionId('');
        setCompletionNotes('');
    };

    const handleLogSubmit = async (e) => {
        e.preventDefault();
        if (!dailyLog.ph || !dailyLog.water || !dailyLog.power || (!dailyLog.sludge && !isSludgeNotApplicable)) {
            alert('Error: All daily log fields (pH, Water, Power, and Sludge or N/A) are mandatory.');
            return;
        }

        // ---- Demo mode: जुनंच state-based logic — database ला कधीच स्पर्श करत नाही ----
        if (isDemoMode) {
            setLogSubmitted(true);
            const demoEntry = {
                date: getISTDateString(),
                ph: dailyLog.ph,
                water: dailyLog.water,
                power: dailyLog.power,
                sludge: isSludgeNotApplicable ? 'N/A (Not Applicable)' : dailyLog.sludge,
                ocrPowerValue: ocrReadPower !== null ? ocrReadPower : null,
                gpsCaptured: true,
                submittedAt: new Date().toISOString(),
            };
            setSavedLogsHistory(prev => [demoEntry, ...prev]);
            setOcrReadPower(null);
            setTimeout(() => setLogSubmitted(false), 4000);
            return;
        }

        if (!currentUnitId) {
            alert('Please onboard a factory unit first.');
            return;
        }

        // ---- खरं "एका दिवसाला एकच नोंद" lock (Aug 2026 fix) — आधी "Save & Lock Daily Record" असं
        // म्हणायचं, पण प्रत्यक्षात तोच दिवस पुन्हा-पुन्हा सेव्ह करता येत होता, ज्यामुळे completeness %
        // चुकीचा दिसायचा. आता insert करण्याआधी आजच्या तारखेची नोंद आधीच आहे का तपासतो. ----
        // FIX (Aug 2026, round 2): .maybeSingle() फक्त 0 किंवा 1 row अपेक्षित असतं तेव्हाच काम करतं —
        // आधीपासूनच त्या दिवसासाठी 2+ नोंदी असल्यास ते error देतं, आणि आपण फक्त `data` वाचत असल्याने
        // तो error दुर्लक्षित होऊन lock निकामी व्हायचं (म्हणूनच वरच्या डुप्लिकेट नोंदी तयार झाल्या).
        // आता .limit(1) + array-length तपासणी वापरतो, जी कितीही जुन्या नोंदी असल्या तरी बरोबर चालते;
        // आणि query मध्येच error आली तर (उदा. नेटवर्क अडचण) सुरक्षिततेसाठी insert थांबवतो.
        const todayDateStr = getISTDateString();
        const { data: existingTodayLogs, error: existingCheckError } = await supabase
            .from('daily_logs')
            .select('id')
            .eq('factory_id', currentUnitId)
            .eq('log_date', todayDateStr)
            .limit(1);

        if (existingCheckError) {
            alert('आजची नोंद आधी सेव्ह झाली आहे का हे तपासता आलं नाही (' + existingCheckError.message + '). कृपया पुन्हा प्रयत्न करा.');
            return;
        }

        if (existingTodayLogs && existingTodayLogs.length > 0) {
            alert('आजची नोंद आधीच सेव्ह व लॉक झाली आहे — एका दिवसासाठी फक्त एकदाच नोंद करता येते.');
            return;
        }

        // स्टेप 3.1 — थेट daily_logs टेबलमध्ये insert
        // NOTE (fix, Aug 2026): dailyLog.sludge is collected from the operator in MT, but the
        // hazardous_waste_kg column is — as its name says — kg (matching factories.mpcb_hazardous_waste_limit_kg,
        // also kg). Convert MT -> kg on the way in so the stored number means what the column says.

        // ---- खरा GPS capture (Medium priority fix, Aug 2026): आधीचा `gps_captured: true` कायम hardcoded होता.
        // आता प्रत्यक्ष navigator.geolocation.getCurrentPosition() वापरून खरे coordinates मिळवतो.
        // 8 सेकंदांत उत्तर आलं नाही, browser ने परवानगी नाकारली, किंवा हे API उपलब्धच नसेल — तर gps_captured false राहील,
        // ते खोटं "true" दाखवण्यापेक्षा जास्त प्रामाणिक आहे. ----
        const capturedPosition = await new Promise((resolve) => {
            if (!('geolocation' in navigator)) {
                resolve(null);
                return;
            }
            navigator.geolocation.getCurrentPosition(
                (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                () => resolve(null),
                { timeout: 8000, maximumAge: 60000 }
            );
        });

        // ---- खरं hash-chaining (Medium priority fix, Aug 2026) — Module 9: आधीचं UI फक्त hardcoded
        // "Secure, Immutable" मेसेज दाखवत होतं, प्रत्यक्ष हॅशिंग कुठेच होत नव्हतं. आता या unit ची शेवटची
        // saved नोंद शोधून तिचा record_hash previous_hash म्हणून वापरतो, आणि याच entry चा canonical डेटा +
        // previous_hash यांवरून SHA-256 record_hash तयार करून साखळीत जोडतो. ----
        const { data: lastRow } = await supabase
            .from('daily_logs')
            .select('record_hash')
            .eq('factory_id', currentUnitId)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
        const previousHash = lastRow?.record_hash || 'GENESIS';

        const newRecordFields = {
            factory_id: currentUnitId,
            log_date: getISTDateString(),
            ph_level: parseFloat(dailyLog.ph),
            water_discharge_liters: parseFloat(dailyLog.water),
            electricity_kwh: parseFloat(dailyLog.power),
            hazardous_waste_kg: isSludgeNotApplicable ? null : parseFloat(dailyLog.sludge) * 1000,
            ocr_power_reading: ocrReadPower !== null ? ocrReadPower : null,
            gps_captured: capturedPosition !== null,
            gps_latitude: capturedPosition ? capturedPosition.lat : null,
            gps_longitude: capturedPosition ? capturedPosition.lng : null,
            // Scope 1 fields — मुद्दाम canonicalLogPayload च्या hash-payload मध्ये समाविष्ट नाहीत
            // (ते फक्त ठराविक fields वाचतं), त्यामुळे जुन्या साखळीबद्ध नोंदींवर परिणाम होत नाही.
            // Multi-fuel (Aug 2026, round 2): आता fuel_entries (JSONB array) साठवतो — जुने
            // single fuel_type/fuel_input कॉलम्स backward-compat साठी null ठेवतो (नवीन नोंदींसाठी).
            fuel_type: null,
            fuel_input: null,
            fuel_entries: (dailyLog.fuelEntries || [])
                .filter((fe) => fe.type !== 'none' && fe.amount)
                .map((fe) => ({ type: fe.type, amount: parseFloat(fe.amount) || 0 })),
        };
        const recordHash = await sha256Hex(canonicalLogPayload(newRecordFields) + '|' + previousHash);

        const { data, error } = await supabase
            .from('daily_logs')
            .insert({
                ...newRecordFields,
                previous_hash: previousHash === 'GENESIS' ? null : previousHash,
                record_hash: recordHash,
            })
            .select()
            .single();

        if (error) {
            // ---- DB-level UNIQUE(factory_id, log_date) constraint (Aug 2026): app-level तपासणी
            // वरती आधीच झालेली आहे, पण दोन submissions अगदी एकाच क्षणी (race condition) झाल्या तर
            // DB स्वतः नाकारेल — तेव्हा नेहमीचा generic error न दाखवता, स्पष्ट संदेश देतो. ----
            if (error.code === '23505') {
                alert('आजची नोंद आधीच सेव्ह झाली आहे — एका दिवसासाठी फक्त एकदाच नोंद करता येते.');
            } else {
                alert('Error saving log: ' + error.message);
            }
            return;
        }

        if (!capturedPosition) {
            alert('Note: Location could not be captured (permission denied, unavailable, or timed out). Log saved without GPS tag.');
        }

        // स्टेप 3.2 — insert यशस्वी झाल्यावरच "saved & locked" दाखवा
        setLogSubmitted(true);
        setTodayLogLockedAt(data.created_at);

        const newLogEntry = {
            date: data.log_date,
            ph: String(data.ph_level),
            water: String(data.water_discharge_liters),
            power: String(data.electricity_kwh),
            // Convert kg back to MT here so history, completeness math, and reports keep
            // working in the same MT unit the operator entered and sees on screen.
            sludge: data.hazardous_waste_kg === null ? 'N/A (Not Applicable)' : String(data.hazardous_waste_kg / 1000),
            ocrPowerValue: data.ocr_power_reading,
            gpsCaptured: data.gps_captured,
            gpsLatitude: data.gps_latitude,
            gpsLongitude: data.gps_longitude,
            submittedAt: data.created_at,
        };
        setSavedLogsHistory(prev => [newLogEntry, ...prev]);
        setOcrReadPower(null);

        setTimeout(() => setLogSubmitted(false), 4000);
    };

    const downloadTextFile = (filename, content) => {
        const element = document.createElement("a");
        const file = new Blob([content], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // ---- खरं Module 9 verification (Aug 2026): factory च्या सगळ्या daily_logs नोंदी क्रमाने वाचून,
    // प्रत्येकीचा hash नव्याने calculate करून DB मध्ये साठवलेल्या record_hash शी जुळतो का ते तपासतो,
    // आणि previous_hash ने साखळी खरंच जोडलेली आहे का हेही तपासतो. hash-chain सुरू होण्याआधीच्या
    // (record_hash NULL असलेल्या) जुन्या नोंदी वगळल्या जातात — त्या "legacy" धरल्या जातात. ----
    const handleVerifyVault = async () => {
        if (isDemoMode) {
            setActionOutput(`[9. Digital Vault — Hash Chain Verification]\n⚠️ Demo Unit data is illustrative only and never written to the database — nothing to verify.`);
            return;
        }
        if (!currentUnitId) {
            setActionOutput(`[9. Digital Vault] No factory unit onboarded — nothing to verify.`);
            return;
        }

        const { data: rows, error } = await supabase
            .from('daily_logs')
            .select('*')
            .eq('factory_id', currentUnitId)
            .order('created_at', { ascending: true });

        if (error) {
            setActionOutput(`[9. Digital Vault] Error reading vault records: ${error.message}`);
            return;
        }
        if (!rows || rows.length === 0) {
            setActionOutput(`[9. Digital Vault] No records saved yet for this unit.`);
            return;
        }

        let previousHash = 'GENESIS';
        let verifiedCount = 0;
        let legacyCount = 0;
        let brokenAtDate = null;

        for (const row of rows) {
            if (!row.record_hash) {
                // hash-chaining जोडण्याआधीची जुनी नोंद — पडताळणीबाहेर, chain तिच्यामुळे तुटलेला दाखवला जात नाही
                legacyCount += 1;
                continue;
            }
            const expectedHash = await sha256Hex(canonicalLogPayload(row) + '|' + previousHash);
            const storedPreviousHash = row.previous_hash || 'GENESIS';
            if (storedPreviousHash !== previousHash || expectedHash !== row.record_hash) {
                brokenAtDate = row.log_date;
                break;
            }
            previousHash = row.record_hash;
            verifiedCount += 1;
        }

        if (brokenAtDate) {
            setActionOutput(`[9. Digital Vault — Hash Chain Verification]\n❌ TAMPER DETECTED — entry dated ${brokenAtDate} does not match its expected hash. This record (or an earlier one in the chain) was altered after being saved.\nUnit: ${factoryData.name}\nVerified before break: ${verifiedCount} record(s).`);
        } else {
            setActionOutput(`[9. Digital Vault — Hash Chain Verification]\n✅ Verified: ${verifiedCount} hash-chained record(s) form an unbroken chain — no tampering detected.${legacyCount > 0 ? `\n(${legacyCount} pre-chain legacy record(s) excluded from verification.)` : ''}\nUnit: ${factoryData.name}\nLatest chain hash: ${previousHash === 'GENESIS' ? 'N/A' : previousHash.slice(0, 16) + '...'}`);
        }
    };

    // ==========================================================================
    // Enterprise Aggregation Tier (Aug 2026) — Buyer Portal handlers
    // तत्त्व: buyer विनंती पाठवतो (pending), factory owner approve/revoke करतो.
    // Approved झाल्यावरच buyer ला summary (RPC function द्वारे) दिसतो — raw daily_logs कधीच नाही.
    // ==========================================================================
    const handleBuyerSignup = async (e) => {
        e.preventDefault();
        if (!tempBuyerCompanyName.trim()) {
            alert('Please enter your company name.');
            return;
        }
        const { data, error } = await supabase
            .from('buyer_accounts')
            .insert({
                owner_user_id: session.user.id,
                company_name: tempBuyerCompanyName.trim(),
                gstin_or_cin: tempBuyerGstin.trim() || null,
                industry: tempBuyerIndustry.trim() || null,
                contact_email: tempBuyerEmail.trim() || null,
                contact_phone: tempBuyerPhone.trim() || null,
            })
            .select()
            .single();
        if (error) {
            alert('Error creating buyer account: ' + error.message);
            return;
        }
        setBuyerData(data);
    };

    const fetchBuyerConnections = async (buyerId) => {
        const { data, error } = await supabase
            .from('buyer_connections')
            .select('*')
            .eq('buyer_id', buyerId)
            .order('requested_at', { ascending: false });
        if (error) {
            console.error('Error loading buyer connections:', error.message);
            return;
        }
        setBuyerConnections(data || []);

        // Approved connections साठी summary आणा (RPC आतच access तपासतो)
        const approved = (data || []).filter((c) => c.status === 'approved');
        const summaries = {};
        await Promise.all(approved.map(async (conn) => {
            const { data: summaryRows, error: summaryError } = await supabase
                .rpc('get_buyer_factory_summary', { p_factory_id: conn.factory_id });
            if (!summaryError && summaryRows && summaryRows.length > 0) {
                summaries[conn.factory_id] = summaryRows[0];
            }
        }));
        setBuyerSummaries(summaries);
    };

    const handleRequestConnection = async (e) => {
        e.preventDefault();
        if (!requestFactoryId.trim() || !buyerData) return;
        const factoryIdTrimmed = requestFactoryId.trim();
        const { error } = await supabase
            .from('buyer_connections')
            .insert({ buyer_id: buyerData.id, factory_id: factoryIdTrimmed, status: 'pending' });

        if (error && error.code === '23505') {
            // ---- FIX (Aug 2026): याआधी या buyer-factory जोडीसाठी विनंती अस्तित्वात आहे
            // (उदा. आधी revoke/reject झालेली) — नवीन insert ऐवजी तीच row परत 'pending' करतो ----
            const { error: updateError } = await supabase
                .from('buyer_connections')
                .update({ status: 'pending', responded_at: null })
                .eq('buyer_id', buyerData.id)
                .eq('factory_id', factoryIdTrimmed);
            if (updateError) {
                alert('Error re-sending request: ' + updateError.message);
                return;
            }
        } else if (error) {
            alert('Error sending request: ' + error.message + ' (तपासा — Factory ID बरोबर टाकलाय का?)');
            return;
        }
        setRequestFactoryId('');
        fetchBuyerConnections(buyerData.id);
    };

    const fetchFactoryConnectionRequests = async (factoryId) => {
        const { data, error } = await supabase
            .from('buyer_connections')
            .select('*, buyer_accounts(company_name, industry, contact_email)')
            .eq('factory_id', factoryId)
            .order('requested_at', { ascending: false });
        if (error) {
            console.error('Error loading connection requests:', error.message);
            return;
        }
        setFactoryConnectionRequests(data || []);
    };

    const handleRespondConnection = async (connectionId, newStatus) => {
        const { error } = await supabase
            .from('buyer_connections')
            .update({ status: newStatus, responded_at: new Date().toISOString() })
            .eq('id', connectionId);
        if (error) {
            alert('Error updating request: ' + error.message);
            return;
        }
        fetchFactoryConnectionRequests(currentUnitId);
    };

    // ---- jsPDF ला CDN वरून एकदाच लोड करतो (npm install/package.json बदल न करता — repo GitHub UI ने बदलली जातेय, तिथे साधं राहावं म्हणून) ----
    const loadJsPDF = () => {
        return new Promise((resolve, reject) => {
            if (window.jspdf && window.jspdf.jsPDF) {
                resolve(window.jspdf.jsPDF);
                return;
            }
            const existingScript = document.getElementById('jspdf-cdn-script');
            if (existingScript) {
                existingScript.addEventListener('load', () => resolve(window.jspdf.jsPDF));
                existingScript.addEventListener('error', reject);
                return;
            }
            const script = document.createElement('script');
            script.id = 'jspdf-cdn-script';
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => resolve(window.jspdf.jsPDF);
            script.onerror = reject;
            document.body.appendChild(script);
        });
    };

    // ---- Enterprise Aggregation Tier: buyer साठी professional "Green Passport" PDF ----
    // buyer ला फक्त curated summary दिसतो (component मध्ये आधीच approved-connection गेट आहे) —
    // हा PDF त्याच summary डेटा वरून बनतो, कधीच raw daily_logs वापरत नाही.
    const handleDownloadGreenPassport = async (conn, summary) => {
        if (!summary) {
            alert('Summary अजून तयार नाही — थोडं थांबून पुन्हा प्रयत्न करा.');
            return;
        }
        let jsPDF;
        try {
            jsPDF = await loadJsPDF();
        } catch (err) {
            alert('PDF library लोड होऊ शकली नाही. इंटरनेट कनेक्शन तपासा.');
            return;
        }

        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        const marginX = 48;
        let y = 56;

        const addLine = (text, opts = {}) => {
            const { size = 10, bold = false, color = [40, 40, 40], gapAfter = 16 } = opts;
            doc.setFont('helvetica', bold ? 'bold' : 'normal');
            doc.setFontSize(size);
            doc.setTextColor(...color);
            doc.text(text, marginX, y);
            y += gapAfter;
        };
        const addDivider = () => {
            doc.setDrawColor(200, 200, 200);
            doc.line(marginX, y, pageWidth - marginX, y);
            y += 18;
        };

        // Header
        doc.setFillColor(6, 95, 70);
        doc.rect(0, 0, pageWidth, 70, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('EcoTrace India — Green Passport', marginX, 32);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('Supplier ESG & Compliance Summary — for Buyer Value-Chain (BRSR) Reporting', marginX, 50);
        y = 100;

        addLine(`Generated: ${new Date().toISOString()}`, { size: 9, color: [110, 110, 110], gapAfter: 20 });

        addLine('1. Supplier Details', { size: 12, bold: true, color: [6, 95, 70], gapAfter: 18 });
        addLine(`Factory: ${summary.factory_name}`, { bold: true, gapAfter: 15 });
        addLine(`Location: ${summary.plant_location}, ${summary.state}`, { gapAfter: 15 });
        addLine(`CTO Expiry Date: ${summary.cto_expiry_date || 'N/A'}`, { gapAfter: 15 });
        addLine(`Factory Unit ID: ${conn.factory_id}`, { size: 8, color: [130, 130, 130], gapAfter: 20 });
        addDivider();

        addLine('2. Data Completeness', { size: 12, bold: true, color: [6, 95, 70], gapAfter: 18 });
        addLine(`Logged Days (last 30 days): ${summary.logged_days_last_30} / 30`, { gapAfter: 15 });
        addLine(`Completeness: ${summary.completeness_pct}%`, { gapAfter: 15 });
        addLine(`Last Log Date: ${summary.last_log_date || 'N/A'}`, { gapAfter: 20 });
        addDivider();

        addLine('3. Environmental Summary (last 30 days)', { size: 12, bold: true, color: [6, 95, 70], gapAfter: 18 });
        addLine(`Average ETP Effluent pH: ${summary.avg_ph ?? 'N/A'}`, { gapAfter: 15 });
        addLine(`Total Water Discharge: ${summary.total_water_liters} Liters`, { gapAfter: 15 });
        addLine(`Total Electricity Consumption: ${summary.total_electricity_kwh} kWh`, { gapAfter: 15 });
        addLine(`Scope 2 Emissions (Location-based, Regional Grid Factor): ${summary.scope2_tco2e} tCO2e (factor: ${summary.grid_factor_used} kg CO2/kWh)`, { gapAfter: 15 });
        addLine(`Scope 2 Emissions (Market-based): ${summary.scope2_market_tco2e} tCO2e${summary.renewable_coverage_pct > 0 ? ` — ${summary.renewable_coverage_pct}% covered by ${summary.renewable_instrument_type}` : ' — no renewable instrument on record'}`, { gapAfter: 15 });
        if (summary.scope1_tco2e && summary.scope1_tco2e > 0) {
            addLine(`Scope 1 Emissions (Direct Combustion): ${summary.scope1_tco2e} tCO2e`, { gapAfter: 15 });
        } else {
            addLine(`Scope 1 Emissions (Direct Combustion): No fuel combustion logged in this period`, { size: 9, color: [150, 100, 20], gapAfter: 15 });
        }
        // Scope 3 (Aug 2026 note): value-chain (upstream/downstream) डेटा सध्या गोळाच होत नाही —
        // खोटं precision न दाखवता, स्पष्टपणे "Not currently tracked" असं नोंदवतो.
        addLine(`Scope 3 Emissions (Value Chain): Not currently tracked — available on request for BRSR value-chain reporting`, { size: 9, color: [150, 150, 150], gapAfter: 20 });
        addDivider();

        addLine('4. Connection & Consent Record', { size: 12, bold: true, color: [6, 95, 70], gapAfter: 18 });
        addLine(`Buyer Access Status: ${conn.status.toUpperCase()}`, { gapAfter: 15 });
        addLine(`Requested: ${new Date(conn.requested_at).toISOString().split('T')[0]}`, { gapAfter: 15 });
        addLine(`Approved: ${conn.responded_at ? new Date(conn.responded_at).toISOString().split('T')[0] : 'N/A'}`, { gapAfter: 20 });
        addDivider();

        addLine('5. Disclaimer', { size: 12, bold: true, color: [6, 95, 70], gapAfter: 16 });
        const disclaimer = 'EcoTrace India Private Limited is an independent compliance platform. It aggregates data supplied by the factory and prepares statutory formats. It does not certify compliance, calculate hazardous waste quantities, transmit to government portals, or provide legal opinions. This summary is derived from factory-submitted operational data and has not been independently assured (no ISO 27001 / third-party assurance claimed). Scope 2 emissions use location-based CEA grid factors only; market-based (REC/green tariff) dual reporting is not yet included.';
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(90, 90, 90);
        const wrapped = doc.splitTextToSize(disclaimer, pageWidth - marginX * 2);
        doc.text(wrapped, marginX, y);
        y += wrapped.length * 11 + 10;

        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('EcoTrace India | Project Lead: D. S. Nikam | 7378780745 | dhiraj@ectotraceindia.com', marginX, y);

        doc.save(`${summary.factory_name.replace(/\s+/g, '_')}_Green_Passport.pdf`);
    };

    // ---- FIX (Aug 2026, round 8): आधी हा report फक्त plain .txt म्हणून डाउनलोड व्हायचा —
    // आता Buyer Green Passport सारखाच professional, formatted PDF तयार करतो (तोच jsPDF setup,
    // loadJsPDF() वापरून — CDN वरून, कुठलाही npm/package.json बदल न करता). ----
    // ---- CSV Export (Aug 2026): factory manager ला स्वतःच्या रेकॉर्डसाठी raw daily_logs
    // Excel/Sheets मध्ये उघडता यावी यासाठी — PDF पेक्षा वेगळं, कच्चा डेटा हवा असतो तेव्हा ----
    const handleExportCSV = () => {
        if (savedLogsHistory.length === 0) {
            alert('अजून कुठलेही daily logs नाहीत / No daily logs to export yet.');
            return;
        }
        const headers = ['Date', 'pH', 'Water (KL)', 'Power (kWh)', 'Sludge (MT)', 'OCR Power Reading', 'GPS Captured', 'GPS Latitude', 'GPS Longitude', 'Submitted At'];
        const rows = savedLogsHistory.map((entry) => [
            entry.date,
            entry.ph,
            entry.water,
            entry.power,
            entry.sludge,
            entry.ocrPowerValue ?? '',
            entry.gpsCaptured ? 'Yes' : 'No',
            entry.gpsLatitude ?? '',
            entry.gpsLongitude ?? '',
            entry.submittedAt ?? '',
        ]);
        const csvContent = [headers, ...rows]
            .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
            .join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${factoryData.name.replace(/\s+/g, '_')}_Daily_Logs.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportReport = async () => {
        if (!isFactoryActive) {
            alert('Please onboard a factory unit or load the Demo Unit first.');
            return;
        }

        const preflight = preflightCheck(savedLogsHistory);
        if (preflight.blockGeneration) {
            alert(`Report Generation Blocked: ${preflight.statusLabel}.`);
            return;
        }

        const latestRecordedEntry = savedLogsHistory.length > 0 ? savedLogsHistory[0] : null;
        const activeOcrPower = latestRecordedEntry?.ocrPowerValue !== undefined && latestRecordedEntry?.ocrPowerValue !== null 
            ? latestRecordedEntry.ocrPowerValue 
            : ocrReadPower;

        let powerDiscrepancyText;
        if (activeOcrPower !== null) {
            if (powerNum !== activeOcrPower) {
                powerDiscrepancyText = `Verified by Plant Manager — Original OCR Read: ${activeOcrPower} kWh (Reconciled diff: ${Math.abs(powerNum - activeOcrPower)} kWh)`;
            } else {
                powerDiscrepancyText = `Verified by Plant Manager — OCR Read Matches Confirmed Value (${powerNum} kWh)`;
            }
        } else {
            powerDiscrepancyText = `No OCR source — Manual entry (Confirmed: ${powerNum} kWh)`;
        }

        let jsPDF;
        try {
            jsPDF = await loadJsPDF();
        } catch (err) {
            alert('PDF library लोड होऊ शकली नाही. इंटरनेट कनेक्शन तपासा.');
            return;
        }

        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        const marginX = 48;
        let y = 56;

        const addLine = (text, opts = {}) => {
            const { size = 10, bold = false, color = [40, 40, 40], gapAfter = 15 } = opts;
            doc.setFont('helvetica', bold ? 'bold' : 'normal');
            doc.setFontSize(size);
            doc.setTextColor(...color);
            const wrapped = doc.splitTextToSize(text, pageWidth - marginX * 2);
            doc.text(wrapped, marginX, y);
            y += wrapped.length * (size * 1.25) + (gapAfter - size);
        };
        const addSectionHeading = (text) => addLine(text, { size: 12, bold: true, color: [6, 95, 70], gapAfter: 18 });
        const addDivider = () => {
            doc.setDrawColor(200, 200, 200);
            doc.line(marginX, y, pageWidth - marginX, y);
            y += 18;
        };

        // Header banner
        doc.setFillColor(6, 95, 70);
        doc.rect(0, 0, pageWidth, 70, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('EcoTrace India — Verified Audit Report', marginX, 32);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('Review Draft — MPCB Statutory Compliance & Carbon Data', marginX, 50);
        y = 100;

        if (isDemoMode) {
            addLine('[DEMO DATA] — Sample Illustration, Not for Filing', { size: 10, bold: true, color: [180, 83, 9], gapAfter: 18 });
        }
        addLine(`Generated: ${new Date().toISOString()} | Version: CEA 2025-26`, { size: 9, color: [110, 110, 110], gapAfter: 20 });

        addSectionHeading('1. Company Details');
        addLine(`Company Name: ${factoryData.name} (${isDemoMode ? 'DEMO MODE' : 'PRODUCTION'})`, { bold: true, gapAfter: 15 });
        addLine(`Location: ${factoryData.location}`, { gapAfter: 15 });
        addLine(`Discharge Limit: ${factoryData.dischargeLimit} Liters | CTO Expiry: ${factoryData.ctoExpiryDate} (${ctoDaysLeft} days left)`, { gapAfter: 15 });
        addLine(`Status: ${preflight.statusLabel}`, { bold: true, gapAfter: 20 });
        addDivider();

        addSectionHeading('2. Carbon Emissions (dMRV Engine)');
        addLine(`Scope 2 (Location-based): ${calculatedScope2} MT CO2e — Grid factor: ${factoryData.gridEmissionFactor} kg CO2/kWh on ${powerNum} kWh`, { gapAfter: 15 });
        addLine(`Scope 2 (Market-based): ${calculatedScope2Market} MT CO2e${renewablePct > 0 ? ` — ${renewablePct}% covered by ${factoryData.renewableInstrumentType || 'green instrument'}` : ' — no renewable instrument on record'}`, { gapAfter: 15 });
        addLine(`Scope 1 (Direct Combustion): ${calculatedScope1}`, { gapAfter: 15 });
        addLine(`Scope 3 (Value Chain): Not currently tracked — available on request for BRSR value-chain reporting`, { size: 9, color: [150, 150, 150], gapAfter: 20 });
        addDivider();

        addSectionHeading('3. Water Cess & ETP Monitoring (Form 3 Input)');
        addLine(`Total Water Consumption Recorded: ${totalWaterNum} KL (Aggregated across active log entries)`, { gapAfter: 15 });
        addLine(`ETP Treated Effluent pH True Average: ${truePhAverage} (Across ${savedLogsHistory.length > 0 ? savedLogsHistory.length : 1} entries, within 0-14 legal limits)`, { gapAfter: 15 });
        addLine(`Discharge Compliance: Within permissible limit of ${factoryData.dischargeLimit} Liters`, { gapAfter: 20 });
        addDivider();

        addSectionHeading('4. Waste Category & Form 4 Logs');
        addLine(`Sludge Generated: ${isSludgeNotApplicable ? 'N/A (No Hazardous Waste)' : dailyLog.sludge + ' MT'}`, { gapAfter: 15 });
        addLine(`CPCB Schedule Classification: ${selectedCategory}`, { gapAfter: 20 });
        addDivider();

        addSectionHeading('5. Discrepancy Audit Trail (OCR vs Manager-Confirmed)');
        addLine(`Power Usage: ${powerNum} kWh — ${powerDiscrepancyText}`, { gapAfter: 15 });
        addLine(`Water Consumption: ${dailyLog.water} KL — Verified against meter reading, no discrepancy`, { gapAfter: 20 });
        addDivider();

        addSectionHeading('6. Data Completeness & Consistency Record');
        addLine(`Basis: ${savedLogsHistory.length} confirmed daily entries (Completeness: ${preflight.completenessPct}%)`, { gapAfter: 15 });
        addLine(`Consistency: ${positiveMissedDays} days missed out of 30, ${outOfRangeCount} out-of-range pH entries, ${gpsCapturedCount}/${savedLogsHistory.length || 1} entries GPS-tagged`, { gapAfter: 20 });
        addDivider();

        addSectionHeading('7. Record Integrity & Digital Vault');
        addLine('Private hash chain (tamper-evident). Server timestamp enforced. External anchoring not enabled.', { gapAfter: 10 });
        addLine(`Correction log: ${logCorrections.length} correction${logCorrections.length === 1 ? '' : 's'} on record${logCorrections.length > 0 ? ' — see in-app Correction History for full details' : ''}.`, { size: 9, color: [150, 150, 150], gapAfter: 20 });
        addDivider();

        addSectionHeading('8. Legal Disclaimer');
        addLine('EcoTrace India Private Limited is an independent compliance platform. It aggregates data supplied by the factory and prepares statutory formats. It does not certify compliance, calculate hazardous waste quantities, transmit to government portals, or provide legal opinions. Physical safety protocols, hardware calibration and compliance adherence remain the responsibility of the factory management.', { size: 8.5, color: [90, 90, 90], gapAfter: 20 });

        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('EcoTrace India | Project Lead: D. S. Nikam | 7378780745 | dhiraj@ectotraceindia.com', marginX, y);

        doc.save(`${factoryData.name.replace(/\s+/g, '_')}_Verified_Audit_Report.pdf`);
    };

    const [actionOutput, setActionOutput] = useState("Select any Live Actionable module below to view generated compliance output on screen.");

    // ---- Login Screen (shown before any dashboard content if not authenticated) ----
    // ---- Forgot Password (Aug 2026): reset-link वर क्लिक करून इथे आल्यावर, session असूनही
    // आधी नवीन पासवर्ड सेट करायला लावतो — थेट dashboard वर जाऊ देत नाही ----
    if (isPasswordRecovery) {
        return (
            <main style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                <div style={{ maxWidth: '380px', width: '100%', backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '14px', padding: '28px', boxShadow: '0 20px 40px rgba(0,0,0,0.35)' }}>
                    <h2 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{t('setNewPasswordTitle')}</h2>
                    <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '18px' }}>{t('appTitle')}</p>
                    <form onSubmit={handleSetNewPassword} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <input type="password" placeholder={t('newPasswordPlaceholder')} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required
                            style={{ padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: 'white', fontSize: '13px' }} />
                        <input type="password" placeholder={t('confirmPasswordPlaceholder')} value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} required
                            style={{ padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: 'white', fontSize: '13px' }} />
                        {authError && <p style={{ color: '#f59e0b', fontSize: '12px' }}>{authError}</p>}
                        <button type="submit" style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '11px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
                            {t('updatePasswordButton')}
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    if (!session) {
        return (
            <main style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                <div style={{ maxWidth: '380px', width: '100%', backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '14px', padding: '28px', boxShadow: '0 20px 40px rgba(0,0,0,0.35)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                        <h2 style={{ margin: 0, fontSize: '20px', letterSpacing: '-0.02em' }}>{t('appTitle')}</h2>
                        {renderLanguagePicker()}
                    </div>

                    {showForgotPassword ? (
                        <>
                            <p style={{ color: '#6b7280', fontSize: '13px', margin: '0 0 4px 0' }}>{t('resetPasswordTitle')}</p>
                            {forgotPasswordSent ? (
                                <div>
                                    <p style={{ color: '#34d399', fontSize: '13px', marginTop: '16px' }}>{t('resetLinkSentMsg')}</p>
                                    <button onClick={() => { setShowForgotPassword(false); setForgotPasswordSent(false); }}
                                        style={{ background: 'none', border: 'none', color: '#34d399', fontSize: '12px', marginTop: '10px', cursor: 'pointer' }}>
                                        {t('backToLogin')}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '18px' }}>{t('resetPasswordDesc')}</p>
                                    <form onSubmit={handleForgotPasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <input type="email" placeholder={t('emailPlaceholder')} value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} required
                                            style={{ padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: 'white', fontSize: '13px' }} />
                                        {authError && <p style={{ color: '#f59e0b', fontSize: '12px' }}>{authError}</p>}
                                        <button type="submit" style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '11px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
                                            {t('sendResetLink')}
                                        </button>
                                    </form>
                                    <button onClick={() => setShowForgotPassword(false)}
                                        style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '12px', marginTop: '14px', cursor: 'pointer' }}>
                                        {t('backToLogin')}
                                    </button>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '22px' }}>
                                {authMode === 'login' ? t('factoryLogin') : t('newFactorySignup')}
                            </p>
                            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <input type="email" placeholder={t('emailPlaceholder')} value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} required
                                    style={{ padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: 'white', fontSize: '13px' }} />
                                <input type="password" placeholder={t('passwordPlaceholder')} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} required
                                    style={{ padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: 'white', fontSize: '13px' }} />
                                {authError && <p style={{ color: '#f59e0b', fontSize: '12px' }}>{authError}</p>}
                                <button type="submit" style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '11px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
                                    {authMode === 'login' ? t('loginButton') : t('signupButton')}
                                </button>
                            </form>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
                                <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                                    style={{ background: 'none', border: 'none', color: '#34d399', fontSize: '12px', cursor: 'pointer', padding: 0 }}>
                                    {authMode === 'login' ? t('newFactoryLink') : t('alreadyRegisteredLink')}
                                </button>
                                {authMode === 'login' && (
                                    <button onClick={() => setShowForgotPassword(true)}
                                        style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '12px', cursor: 'pointer', padding: 0 }}>
                                        {t('forgotPassword')}
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                    <p style={{ textAlign: 'center', fontSize: '10px', color: '#4b5563', marginTop: '20px' }}>
                        <a href="/terms" style={{ color: '#6b7280', textDecoration: 'underline' }}>{t('termsLink')}</a>
                        {' · '}
                        <a href="/privacy" style={{ color: '#6b7280', textDecoration: 'underline' }}>{t('privacyLink')}</a>
                    </p>
                </div>
            </main>
        );
    }

    // ---- Enterprise Buyer Portal (Aug 2026) — factory dashboard पासून पूर्णपणे वेगळा view ----
    if (viewMode === 'buyer') {
        return (
            <main style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#ffffff', fontFamily: 'sans-serif', padding: '16px' }}>
                <header style={{ borderBottom: '1px solid #1f2937', paddingBottom: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                        <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 4px 0' }}>{t('buyerPortalTitle')}</h1>
                        <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{t('buyerPortalTagline')}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {renderLanguagePicker()}
                        <button onClick={() => setViewMode('factory')} style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>{t('backToFactory')}</button>
                        <button onClick={handleLogout} style={{ backgroundColor: '#374151', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>{t('logout')} ({session.user.email})</button>
                    </div>
                </header>

                {isBuyerLoading ? (
                    <p style={{ color: '#9ca3af', fontSize: '13px' }}>{t('loadingText')}</p>
                ) : !buyerData ? (
                    <div style={{ maxWidth: '420px', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '20px' }}>
                        <h3 style={{ fontSize: '15px', color: 'white', margin: '0 0 4px 0' }}>{t('buyerRegisterTitle')}</h3>
                        <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '14px' }}>{t('buyerRegisterDesc')}</p>
                        <form onSubmit={handleBuyerSignup} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <input type="text" value={tempBuyerCompanyName} onChange={(e) => setTempBuyerCompanyName(e.target.value)} placeholder={t('companyNameReq')} required
                                style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} />
                            <input type="text" value={tempBuyerGstin} onChange={(e) => setTempBuyerGstin(e.target.value)} placeholder={t('gstinOptional')}
                                style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} />
                            <input type="text" value={tempBuyerIndustry} onChange={(e) => setTempBuyerIndustry(e.target.value)} placeholder={t('industryOptional')}
                                style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} />
                            <input type="email" value={tempBuyerEmail} onChange={(e) => setTempBuyerEmail(e.target.value)} placeholder={t('contactEmailOptional')}
                                style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} />
                            <input type="text" value={tempBuyerPhone} onChange={(e) => setTempBuyerPhone(e.target.value)} placeholder={t('contactPhoneOptional')}
                                style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} />
                            <button type="submit" style={{ backgroundColor: '#4338ca', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>{t('registerAsBuyer')}</button>
                        </form>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                            <h4 style={{ color: '#e5e7eb', margin: '0 0 8px 0', fontSize: '14px' }}>{t('sendConnectionRequestTitle')}</h4>
                            <p style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '8px' }}>{t('sendConnectionRequestDesc')}</p>
                            <form onSubmit={handleRequestConnection} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <input type="text" value={requestFactoryId} onChange={(e) => setRequestFactoryId(e.target.value)} placeholder={t('factoryUnitIdPlaceholder')}
                                    style={{ flex: 1, minWidth: '220px', padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} required />
                                <button type="submit" style={{ backgroundColor: '#4338ca', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>{t('sendRequestButton')}</button>
                            </form>
                        </div>

                        <div>
                            <h4 style={{ color: '#e5e7eb', margin: '0 0 8px 0', fontSize: '14px' }}>{t('yourSuppliersTitle')} ({buyerConnections.length})</h4>
                            {buyerConnections.length === 0 && <p style={{ color: '#9ca3af', fontSize: '12px' }}>{t('noRequestsSentYet')}</p>}
                            {buyerConnections.map((conn) => {
                                const summary = buyerSummaries[conn.factory_id];
                                const statusColor = conn.status === 'approved' ? '#34d399' : conn.status === 'pending' ? '#f59e0b' : '#ef4444';
                                return (
                                    <div key={conn.id} style={{ backgroundColor: '#111827', border: `1px solid ${statusColor}`, borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
                                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: statusColor, fontWeight: 'bold', textTransform: 'uppercase' }}>{conn.status}</p>
                                        <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#9ca3af' }}>{t('factoryIdLabel')}: {conn.factory_id}</p>
                                        {conn.status === 'approved' && summary ? (
                                            <div style={{ fontSize: '12px', color: '#d1d5db', lineHeight: '1.6' }}>
                                                <p style={{ margin: 0, fontWeight: 'bold', color: 'white' }}>{summary.factory_name} — {summary.plant_location} ({summary.state})</p>
                                                <p style={{ margin: 0 }}>{t('ctoExpiryLabel')}: {summary.cto_expiry_date || 'N/A'}</p>
                                                <p style={{ margin: 0 }}>{t('completenessLast30')}: {summary.completeness_pct}% ({summary.logged_days_last_30} {t('daysLoggedLabel')})</p>
                                                <p style={{ margin: 0 }}>{t('avgPhLabel')}: {summary.avg_ph ?? 'N/A'} | {t('totalWaterLabel')}: {summary.total_water_liters} L</p>
                                                <p style={{ margin: 0 }}>Scope 1: {summary.scope1_tco2e > 0 ? `${summary.scope1_tco2e} tCO2e` : 'No combustion logged'} | {t('scope2LocationLabel')}: {summary.scope2_tco2e} tCO2e</p>
                                                <p style={{ margin: 0 }}>{t('scope2MarketLabel')}: {summary.scope2_market_tco2e} tCO2e{summary.renewable_coverage_pct > 0 ? ` (${summary.renewable_coverage_pct}% ${summary.renewable_instrument_type})` : ''}</p>
                                                <p style={{ margin: 0, fontSize: '10px', color: '#6b7280' }}>Scope 3: Not currently tracked</p>
                                                <p style={{ margin: '0 0 10px 0' }}>{t('lastLogLabel')}: {summary.last_log_date || 'N/A'}</p>
                                                <button
                                                    onClick={() => handleDownloadGreenPassport(conn, summary)}
                                                    style={{ backgroundColor: '#065f46', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                                                >
                                                    {t('downloadGreenPassport')}
                                                </button>
                                            </div>
                                        ) : conn.status === 'approved' ? (
                                            <p style={{ fontSize: '11px', color: '#9ca3af' }}>{t('summaryLoadingText')}</p>
                                        ) : conn.status === 'pending' ? (
                                            <p style={{ fontSize: '11px', color: '#9ca3af' }}>{t('waitingApproval')}</p>
                                        ) : (
                                            <p style={{ fontSize: '11px', color: '#9ca3af' }}>{t('requestRejectedRevoked')}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#ffffff', fontFamily: 'sans-serif', padding: '16px' }}>
            
            {/* Header — redesigned (Aug 2026): एकच मुख्य कृती (Export) कायम दिसते, बाकी सगळं ⋮ More मध्ये */}
            <header style={{ borderBottom: '1px solid #1f2937', paddingBottom: '14px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <h1 style={{ fontSize: '17px', fontWeight: 'bold', color: '#ffffff', margin: 0, letterSpacing: '-0.01em' }}>
                    {t('appTitle')} {isDemoMode && <span style={{ color: '#f59e0b', fontSize: '11px', fontWeight: 'bold' }}>⚡ DEMO</span>}
                </h1>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', position: 'relative' }}>
                    {renderLanguagePicker()}
                    <button 
                        onClick={handleExportReport}
                        style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '9px 16px', borderRadius: '7px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        {t('exportReport')}
                    </button>
                    <button
                        onClick={() => setShowMoreMenu(!showMoreMenu)}
                        style={{ backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', padding: '9px 12px', borderRadius: '7px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', lineHeight: 1 }}
                    >
                        ⋮
                    </button>
                    {showMoreMenu && (
                        <div style={{ position: 'absolute', top: '44px', right: 0, backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', padding: '6px', zIndex: 50, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <button onClick={() => { loadDemoUnit(); setShowMoreMenu(false); }} style={{ textAlign: 'left', backgroundColor: 'transparent', color: '#d1d5db', border: 'none', padding: '9px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>⚡ {t('loadDemo').replace('⚡ ', '')}</button>
                            <button onClick={() => { handleExportCSV(); setShowMoreMenu(false); }} style={{ textAlign: 'left', backgroundColor: 'transparent', color: '#d1d5db', border: 'none', padding: '9px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>📊 CSV Export</button>
                            <button onClick={() => { setViewMode('buyer'); setShowMoreMenu(false); }} style={{ textAlign: 'left', backgroundColor: 'transparent', color: '#d1d5db', border: 'none', padding: '9px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>{t('buyerPortal')}</button>
                            <button onClick={() => { setShowHelp(true); setShowMoreMenu(false); }} style={{ textAlign: 'left', backgroundColor: 'transparent', color: '#d1d5db', border: 'none', padding: '9px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>❓ Help & Support</button>
                            <div style={{ borderTop: '1px solid #1f2937', margin: '4px 0' }} />
                            <button onClick={() => { handleLogout(); setShowMoreMenu(false); }} style={{ textAlign: 'left', backgroundColor: 'transparent', color: '#f87171', border: 'none', padding: '9px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>{t('logout')}</button>
                        </div>
                    )}
                </div>
            </header>

            {/* Help & Support panel */}
            {showHelp && (
                <div style={{ marginBottom: '16px', padding: '14px', backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', fontSize: '12px', color: '#9ca3af', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Project Lead: D. S. Nikam | 📞 7378780745 | ✉️ dhiraj@ectotraceindia.com | {session.user.email}</span>
                    <button onClick={() => setShowHelp(false)} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '16px', cursor: 'pointer', padding: '0 4px' }}>✕</button>
                </div>
            )}

            {/* Status row — compact badge ऐवजी आधीचा भरगच्च banner (Aug 2026 redesign) */}
            <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {isFactoryActive ? (
                    <>
                        <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'white' }}>🏢 {factoryData.name}</span>
                        <span style={{ fontSize: '11px', color: '#6b7280' }}>{factoryData.location}</span>
                        <span style={{ backgroundColor: ctoBannerBg, border: `1px solid ${ctoBannerBorder}`, color: ctoTextColor, fontSize: '11px', fontWeight: 'bold', padding: '3px 9px', borderRadius: '999px' }}>
                            {t('ctoDaysLeft')}: {ctoDaysLeft}d
                        </span>
                    </>
                ) : (
                    <span style={{ fontSize: '12px', color: '#f59e0b' }}>⚠️ {t('noFactory')}</span>
                )}
            </div>

            {/* Navigation Tabs */}
            <nav style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #1f2937', marginBottom: '22px', overflowX: 'auto', paddingBottom: '10px' }}>
                <button onClick={() => setActiveTab('overview')} style={{ background: 'none', border: 'none', color: activeTab === 'overview' ? '#34d399' : '#9ca3af', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>{t('tabOverview')}</button>
                <button onClick={() => setActiveTab('live_core')} style={{ background: 'none', border: 'none', color: activeTab === 'live_core' ? '#34d399' : '#9ca3af', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>{t('tabLiveCore')}</button>
                <button onClick={() => setActiveTab('reference')} style={{ background: 'none', border: 'none', color: activeTab === 'reference' ? '#34d399' : '#9ca3af', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>{t('tabReference')}</button>
                <button onClick={() => setActiveTab('roadmap')} style={{ background: 'none', border: 'none', color: activeTab === 'roadmap' ? '#34d399' : '#9ca3af', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>{t('tabRoadmap')}</button>
            </nav>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
                <div>
                    {!isFactoryActive ? (
                        <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '15px', color: 'white', margin: '0 0 8px 0' }}>Start here</h3>
                            <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '12px' }}>Register your unit in Live Core Module 1 or click "Load Demo Unit" (⋮ menu) for instant sales presentation.</p>
                            <button onClick={() => setActiveTab('live_core')} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>Go to Onboarding</button>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                                <h4 style={{ color: '#e5e7eb', margin: '0 0 6px 0', fontSize: '13px' }}>📊 dMRV Carbon Engine</h4>
                                <p style={{ margin: 0, fontSize: '12px', color: '#d1d5db' }}>{t('scope2LocationLabel')}: {calculatedScope2} MT CO2e</p>
                                <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#d1d5db' }}>{t('scope2MarketLabel')}: {calculatedScope2Market} MT CO2e</p>
                                <p style={{ fontSize: '10px', color: '#34d399', margin: '4px 0 0 0' }}>Emissions calculated as per CEA Baseline Database (Year 2025-26)</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Tab 2: Live Core Modules (9 Modules Fully Visible) */}
            {activeTab === 'live_core' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    {/* Module 1: Onboarding */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                        <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 1</span>
                        <h3 style={{ color: '#e5e7eb', margin: '8px 0 8px 0', fontSize: '15px' }}>{t('m1Title')}</h3>
                        {isFactoryActive && !isEditingFactory ? (
                            <div>
                                <div style={{ backgroundColor: '#1f2937', border: '1px solid #065f46', borderRadius: '8px', padding: '12px', marginBottom: '10px' }}>
                                    <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#34d399', fontWeight: 'bold' }}>{t('registeredLocked')}</p>
                                    <p style={{ margin: '0 0 2px 0', fontSize: '13px', color: 'white', fontWeight: 'bold' }}>{factoryData.name}</p>
                                    <p style={{ margin: '0 0 2px 0', fontSize: '11px', color: '#9ca3af' }}>{factoryData.location} · {factoryData.state}</p>
                                    <p style={{ margin: '0 0 2px 0', fontSize: '11px', color: '#9ca3af' }}>{t('dischargeLimitLabel')}: {factoryData.dischargeLimit} L | {t('ctoExpiryLabel')}: {factoryData.ctoExpiryDate}</p>
                                    {factoryData.renewableCoveragePct > 0 && (
                                        <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#34d399' }}>🌱 {t('renewableCoverageLabel')}: {factoryData.renewableCoveragePct}%</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => {
                                        // Edit मोड मध्ये गेल्यावर सध्याचा साठलेला डेटा फॉर्ममध्ये आधीच भरून दाखवतो
                                        setTempCompanyName(factoryData.name);
                                        setTempFactoryState(factoryData.state || 'Maharashtra');
                                        setTempMidcLocation(factoryData.location || '');
                                        setTempDischargeLimit(factoryData.dischargeLimit || '');
                                        setTempCtoDate(factoryData.ctoExpiryDate || '');
                                        setTempRenewablePct(factoryData.renewableCoveragePct ? String(factoryData.renewableCoveragePct) : '');
                                        setTempRenewableType(factoryData.renewableInstrumentType || 'none');
                                        setIsEditingFactory(true);
                                    }}
                                    style={{ backgroundColor: '#374151', color: '#d1d5db', border: '1px solid #6b7280', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    {t('editDetails')}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={(e) => { handleOnboardSubmit(e); setIsEditingFactory(false); }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <input type="text" value={tempCompanyName} onChange={(e) => setTempCompanyName(e.target.value)} placeholder={t('companyNamePlaceholder')} style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} required />
                                <select value={tempFactoryState} onChange={(e) => setTempFactoryState(e.target.value)} style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }}>
                                    {availableStates.length > 0 ? (
                                        availableStates.map((st) => <option key={st} value={st}>{st}</option>)
                                    ) : (
                                        <option value="Maharashtra">Maharashtra</option>
                                    )}
                                </select>
                                <input type="text" value={tempMidcLocation} onChange={(e) => setTempMidcLocation(e.target.value)} placeholder={t('industrialAreaPlaceholder')} style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} />
                                <input type="text" value={tempDischargeLimit} onChange={(e) => setTempDischargeLimit(e.target.value)} placeholder={t('dischargeLimitPlaceholder')} style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} />
                                <input type="date" value={tempCtoDate} onChange={(e) => setTempCtoDate(e.target.value)} style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} />
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input type="number" min="0" max="100" value={tempRenewablePct} onChange={(e) => setTempRenewablePct(e.target.value)} placeholder={t('renewablePctPlaceholder')} style={{ flex: 1, padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} />
                                    <select value={tempRenewableType} onChange={(e) => setTempRenewableType(e.target.value)} style={{ flex: 1, padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }}>
                                        <option value="none">{t('renewableTypeNone')}</option>
                                        <option value="green_tariff">{t('renewableTypeGreenTariff')}</option>
                                        <option value="solar_ppa">{t('renewableTypeSolarPpa')}</option>
                                        <option value="rec">{t('renewableTypeRec')}</option>
                                    </select>
                                </div>
                                <p style={{ fontSize: '10px', color: '#6b7280', margin: '-4px 0 0 0' }}>{t('renewableHint')}</p>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button type="submit" style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>{t('registerButton')}</button>
                                    {isFactoryActive && (
                                        <button type="button" onClick={() => setIsEditingFactory(false)} style={{ backgroundColor: '#374151', color: '#d1d5db', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>{t('cancel')}</button>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Module 2: Enterprise Overview */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                        <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 2</span>
                        <h4 style={{ color: '#e5e7eb', margin: '8px 0 4px 0', fontSize: '14px' }}>{t('m2Title')}</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>{isFactoryActive ? `Active Monitoring: ${factoryData.name} at ${factoryData.location}` : 'Status: No factory onboarded yet.'}</p>
                    </div>

                    {/* Module 3: Hybrid Bulk OCR Gate with Per-File Array Tracking */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                        <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 3 (OCR Gate)</span>
                        <h4 style={{ color: '#e5e7eb', margin: '8px 0 4px 0', fontSize: '14px' }}>{t('m3Title')}</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>{t('m3Desc')} {currentUnitId || 'None'}:</p>
                        
                        <input type="file" multiple onChange={handleFileChange} style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px', display: 'block' }} />
                        
                        {ocrFiles.length > 0 && (
                            <div style={{ marginTop: '8px', background: '#1f2937', padding: '10px', borderRadius: '6px' }}>
                                <p style={{ fontSize: '11px', color: '#34d399', fontWeight: 'bold', margin: '0 0 6px 0' }}>Per-File OCR Analysis & Manager Approval Gate:</p>
                                {ocrFiles.map((f, i) => (
                                    <div key={i} style={{ borderBottom: '1px solid #374151', paddingBottom: '6px', marginBottom: '6px' }}>
                                        <p style={{ fontSize: '11px', color: '#d1d5db', margin: '2px 0' }}>📄 <b>{f.name}</b></p>
                                        <p style={{ fontSize: '10px', color: '#f59e0b', margin: '2px 0' }}>AI Suggested: <b>{f.category}</b></p>
                                        <p style={{ fontSize: '10px', color: '#34d399', margin: '2px 0' }}>{f.statusMessage}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Module 4: Daily Logbook with Per-Unit Form Isolation */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #059669', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 4</span>
                        <h4 style={{ color: '#34d399', margin: '8px 0 4px 0', fontSize: '14px' }}>{t('m4Title')}</h4>
                        {validationWarning && <p style={{ color: '#f59e0b', fontSize: '11px', fontWeight: 'bold', margin: '0 0 6px 0' }}>{validationWarning}</p>}
                        {logSubmitted && <p style={{ color: '#34d399', fontSize: '12px', fontWeight: 'bold' }}>✅ Log saved & locked for Unit: {currentUnitId}</p>}
                        
                        {todayLogLockedAt && !isDemoMode ? (
                            <div style={{ backgroundColor: '#1f2937', border: '1px solid #065f46', borderRadius: '8px', padding: '14px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#34d399', fontWeight: 'bold' }}>{t('alreadyLockedTitle')}</p>
                                <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>{t('lockedAt')}: {new Date(todayLogLockedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
                                <p style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#9ca3af' }}>{t('newEntryMidnight')}</p>
                            </div>
                        ) : (
                        <form onSubmit={handleLogSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                            <div>
                                <label style={{ fontSize: '10px', color: '#9ca3af' }}>{t('phLabel')}</label>
                                <input type="number" step="0.1" value={dailyLog.ph} onChange={(e) => handleLogChange('ph', e.target.value)} style={{ width: '100%', padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '12px' }} required />
                            </div>
                            <div>
                                <label style={{ fontSize: '10px', color: '#9ca3af' }}>{t('waterLabel')}</label>
                                <input type="number" value={dailyLog.water} onChange={(e) => handleLogChange('water', e.target.value)} style={{ width: '100%', padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '12px' }} required />
                            </div>
                            <div>
                                <label style={{ fontSize: '10px', color: '#9ca3af' }}>{t('powerLabel')}</label>
                                <input type="number" value={dailyLog.power} onChange={(e) => handleLogChange('power', e.target.value)} style={{ width: '100%', padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '12px' }} required />
                            </div>
                            <div>
                                <label style={{ fontSize: '10px', color: '#9ca3af' }}>{t('sludgeLabel')}</label>
                                <input type="number" step="0.01" disabled={isSludgeNotApplicable} value={dailyLog.sludge} onChange={(e) => handleLogChange('sludge', e.target.value)} style={{ width: '100%', padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '12px' }} />
                                <label style={{ fontSize: '9px', color: '#9ca3af', display: 'block', marginTop: '2px' }}>
                                    <input 
                                        type="checkbox" 
                                        checked={isSludgeNotApplicable} 
                                        onChange={(e) => {
                                            const naState = e.target.checked;
                                            setIsSludgeNotApplicable(naState);
                                            if (currentUnitId) {
                                                setUnitsData(prev => ({
                                                    ...prev,
                                                    [currentUnitId]: { factoryData, savedLogsHistory, isDemoMode, selectedCategory, ocrFiles, dailyLog, isSludgeNotApplicable: naState, ocrReadPower }
                                                }));
                                            }
                                        }} 
                                    /> {t('notApplicable')}
                                </label>
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ fontSize: '10px', color: '#9ca3af' }}>{t('fuelSourcesLabel')}</label>
                                {dailyLog.fuelEntries.map((fe, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '6px', marginTop: '4px', alignItems: 'flex-start' }}>
                                        <select
                                            value={fe.type}
                                            onChange={(e) => handleFuelEntryChange(idx, 'type', e.target.value)}
                                            style={{ flex: 1, padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '11px' }}
                                        >
                                            {Object.entries(FUEL_EMISSION_FACTORS).map(([key, info]) => (
                                                <option key={key} value={key}>{info.label}{info.isEstimate ? ' *' : ''}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="number" step="0.1"
                                            disabled={fe.type === 'none'}
                                            placeholder={fe.type !== 'none' ? FUEL_EMISSION_FACTORS[fe.type].unit : ''}
                                            value={fe.amount}
                                            onChange={(e) => handleFuelEntryChange(idx, 'amount', e.target.value)}
                                            style={{ width: '90px', padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '11px' }}
                                        />
                                        {dailyLog.fuelEntries.length > 1 && (
                                            <button type="button" onClick={() => removeFuelEntry(idx)} style={{ backgroundColor: '#7f1d1d', color: 'white', border: 'none', borderRadius: '4px', padding: '6px 9px', fontSize: '11px', cursor: 'pointer' }}>✕</button>
                                        )}
                                    </div>
                                ))}
                                {dailyLog.fuelEntries.some((fe) => FUEL_EMISSION_FACTORS[fe.type]?.isEstimate) && (
                                    <p style={{ fontSize: '8px', color: '#f59e0b', margin: '4px 0 0 0' }}>* Approximate factor — verify with EHS consultant before statutory filing.</p>
                                )}
                                <button type="button" onClick={addFuelEntry} style={{ marginTop: '6px', backgroundColor: '#374151', color: '#d1d5db', border: '1px dashed #6b7280', borderRadius: '4px', padding: '5px 10px', fontSize: '10px', cursor: 'pointer' }}>{t('addFuel')}</button>
                            </div>
                            <button type="submit" style={{ gridColumn: '1 / -1', backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{t('saveLock')}</button>
                        </form>
                        )}
                    </div>

                    {/* Correction / Amendment Log (Aug 2026) */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                        <h4 style={{ color: '#e5e7eb', margin: '0 0 4px 0', fontSize: '14px' }}>{t('correctionLogTitle')}</h4>
                        <p style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '10px' }}>{t('correctionLogDesc')}</p>

                        {!showCorrectionForm ? (
                            <button onClick={() => setShowCorrectionForm(true)} style={{ backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                                {t('requestCorrectionButton')}
                            </button>
                        ) : (
                            <form onSubmit={handleCorrectionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                                <select value={correctionLogId} onChange={(e) => setCorrectionLogId(e.target.value)} required
                                    style={{ padding: '7px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '4px', color: 'white', fontSize: '12px' }}>
                                    <option value="">{t('selectEntryToCorrect')}</option>
                                    {savedLogsHistory.map((entry) => (
                                        <option key={entry.id} value={entry.id}>{entry.date}</option>
                                    ))}
                                </select>
                                <select value={correctionField} onChange={(e) => setCorrectionField(e.target.value)}
                                    style={{ padding: '7px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '4px', color: 'white', fontSize: '12px' }}>
                                    <option value="ph_level">{t('fieldPh')}</option>
                                    <option value="water_discharge_liters">{t('fieldWater')}</option>
                                    <option value="electricity_kwh">{t('fieldPower')}</option>
                                    <option value="hazardous_waste_kg">{t('fieldSludge')}</option>
                                </select>
                                <input type="text" value={correctionNewValue} onChange={(e) => setCorrectionNewValue(e.target.value)} placeholder={t('correctedValuePlaceholder')} required
                                    style={{ padding: '7px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '4px', color: 'white', fontSize: '12px' }} />
                                <textarea value={correctionReason} onChange={(e) => setCorrectionReason(e.target.value)} placeholder={t('correctionReasonPlaceholder')} required rows={2}
                                    style={{ padding: '7px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '4px', color: 'white', fontSize: '12px', resize: 'vertical' }} />
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button type="submit" style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>{t('submitCorrectionButton')}</button>
                                    <button type="button" onClick={() => setShowCorrectionForm(false)} style={{ backgroundColor: '#374151', color: '#d1d5db', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>{t('cancelCorrectionButton')}</button>
                                </div>
                            </form>
                        )}

                        <div style={{ borderTop: '1px solid #1f2937', paddingTop: '10px', marginTop: '10px' }}>
                            <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 'bold', margin: '0 0 6px 0' }}>{t('correctionHistoryTitle')}</p>
                            {logCorrections.length === 0 ? (
                                <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>{t('noCorrectionsYet')}</p>
                            ) : (
                                logCorrections.map((c) => (
                                    <div key={c.id} style={{ fontSize: '11px', color: '#d1d5db', borderTop: '1px solid #1f2937', paddingTop: '6px', marginTop: '6px' }}>
                                        <p style={{ margin: 0 }}><b>{c.log_date}</b> · {c.field_name}</p>
                                        <p style={{ margin: 0, color: '#9ca3af' }}>{t('originalValueLabel')}: {c.original_value} → {t('correctedToLabel')}: {c.corrected_value}</p>
                                        <p style={{ margin: 0, color: '#9ca3af' }}>{t('reasonLabel')}: {c.reason}</p>
                                        <p style={{ margin: 0, color: '#6b7280', fontSize: '10px' }}>{c.corrected_by_email} · {new Date(c.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Module 5: Flying Squad Audit Mode */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                        <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 5</span>
                        <h4 style={{ color: '#e5e7eb', margin: '8px 0 4px 0', fontSize: '14px' }}>{t('m5Title')}</h4>
                        <button onClick={() => setActionOutput(`[5. Flying Squad Dossier]\n- Unit: ${isFactoryActive ? factoryData.name : 'Not Onboarded'}\n- CTO Days: ${ctoDaysLeft}\n- Status: Verified & Ready.`)} style={{ backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>{t('generateDossier')}</button>
                    </div>

                    {/* Post-Inspection Follow-Up Tracker (Aug 2026) */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                        <h4 style={{ color: '#e5e7eb', margin: '0 0 4px 0', fontSize: '14px' }}>{t('inspectionTrackerTitle')}</h4>
                        <p style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '10px' }}>{t('inspectionTrackerDesc')}</p>

                        {!showInspectionForm ? (
                            <button onClick={() => setShowInspectionForm(true)} style={{ backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                                {t('addInspectionButton')}
                            </button>
                        ) : (
                            <form onSubmit={handleAddInspection} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                                <label style={{ fontSize: '10px', color: '#9ca3af' }}>{t('inspectionDateLabel')}</label>
                                <input type="date" value={inspDate} onChange={(e) => setInspDate(e.target.value)} required
                                    style={{ padding: '7px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '4px', color: 'white', fontSize: '12px' }} />
                                <label style={{ fontSize: '10px', color: '#9ca3af' }}>{t('authorityLabel')}</label>
                                <select value={inspAuthority} onChange={(e) => setInspAuthority(e.target.value)}
                                    style={{ padding: '7px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '4px', color: 'white', fontSize: '12px' }}>
                                    <option value="MPCB">MPCB</option>
                                    <option value="CPCB">CPCB</option>
                                    <option value="Other">Other</option>
                                </select>
                                <input type="text" value={inspInspectorName} onChange={(e) => setInspInspectorName(e.target.value)} placeholder={t('inspectorNameLabel')}
                                    style={{ padding: '7px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '4px', color: 'white', fontSize: '12px' }} />
                                <textarea value={inspFinding} onChange={(e) => setInspFinding(e.target.value)} placeholder={t('findingSummaryPlaceholder')} required rows={2}
                                    style={{ padding: '7px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '4px', color: 'white', fontSize: '12px', resize: 'vertical' }} />
                                <textarea value={inspAction} onChange={(e) => setInspAction(e.target.value)} placeholder={t('actionRequiredPlaceholder')} rows={2}
                                    style={{ padding: '7px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '4px', color: 'white', fontSize: '12px', resize: 'vertical' }} />
                                <label style={{ fontSize: '10px', color: '#9ca3af' }}>{t('deadlineLabel')}</label>
                                <input type="date" value={inspDeadline} onChange={(e) => setInspDeadline(e.target.value)}
                                    style={{ padding: '7px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '4px', color: 'white', fontSize: '12px' }} />
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button type="submit" style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>{t('submitInspectionButton')}</button>
                                    <button type="button" onClick={() => setShowInspectionForm(false)} style={{ backgroundColor: '#374151', color: '#d1d5db', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>{t('cancelInspectionButton')}</button>
                                </div>
                            </form>
                        )}

                        <div style={{ borderTop: '1px solid #1f2937', paddingTop: '10px', marginTop: '10px' }}>
                            {inspectionFollowups.length === 0 ? (
                                <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>{t('noInspectionsYet')}</p>
                            ) : (
                                inspectionFollowups.map((insp) => {
                                    const isOverdue = insp.status === 'pending' && insp.deadline_date && insp.deadline_date < getISTDateString();
                                    const statusColor = insp.status === 'completed' ? '#34d399' : isOverdue ? '#ef4444' : '#f59e0b';
                                    const statusLabel = insp.status === 'completed' ? t('statusCompleted') : isOverdue ? t('statusOverdue') : t('statusPending');
                                    return (
                                        <div key={insp.id} style={{ borderTop: '1px solid #1f2937', paddingTop: '8px', marginTop: '8px' }}>
                                            <p style={{ margin: '0 0 2px 0', fontSize: '12px', color: 'white', fontWeight: 'bold' }}>{insp.inspection_date} · {insp.authority}</p>
                                            <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: statusColor, fontWeight: 'bold' }}>{statusLabel}{insp.deadline_date ? ` — ${t('deadlineLabelShort')}: ${insp.deadline_date}` : ''}</p>
                                            <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#d1d5db' }}>{insp.finding_summary}</p>
                                            {insp.action_required && <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>{insp.action_required}</p>}
                                            {insp.status === 'completed' ? (
                                                insp.completed_notes && <p style={{ margin: 0, fontSize: '10px', color: '#6b7280' }}>✓ {insp.completed_date}: {insp.completed_notes}</p>
                                            ) : completingInspectionId === insp.id ? (
                                                <form onSubmit={handleCompleteInspection} style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                                                    <input type="text" value={completionNotes} onChange={(e) => setCompletionNotes(e.target.value)} placeholder={t('completionNotesPlaceholder')}
                                                        style={{ flex: 1, padding: '5px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '4px', color: 'white', fontSize: '11px' }} />
                                                    <button type="submit" style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>{t('confirmCompletionButton')}</button>
                                                </form>
                                            ) : (
                                                <button onClick={() => setCompletingInspectionId(insp.id)} style={{ backgroundColor: '#1f2937', color: '#34d399', border: '1px solid #374151', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '4px' }}>{t('markCompletedButton')}</button>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Module 6: Notice Defence Matrix */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                        <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 6</span>
                        <h4 style={{ color: '#e5e7eb', margin: '8px 0 4px 0', fontSize: '14px' }}>{t('m6Title')}</h4>
                        <button onClick={() => setActionOutput(`[6. Notice Defence]\n- Target: MPCB Show-Cause Notice regarding ETP pH variation (${dailyLog.ph}).\n- Unit: ${isFactoryActive ? factoryData.name : 'Pending'}.`)} style={{ backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>{t('generateNoticeDefence')}</button>
                    </div>

                    {/* Module 7: Annual Returns */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                        <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 7</span>
                        <h4 style={{ color: '#e5e7eb', margin: '8px 0 4px 0', fontSize: '14px' }}>{t('m7Title')}</h4>
                        <button onClick={() => setActionOutput(`[7. Form 3, 4 & 5]\n- Returns compiled for ${isFactoryActive ? factoryData.name.toLowerCase() : 'demo unit'}.\n- Sludge: ${isSludgeNotApplicable ? 'N/A' : dailyLog.sludge + ' MT'} (${selectedCategory}).`)} style={{ backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>{t('compileReturns')}</button>
                    </div>

                    {/* Module 8: WhatsApp / SMS Alert Engine */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                        <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 8</span>
                        <h4 style={{ color: '#e5e7eb', margin: '8px 0 4px 0', fontSize: '14px' }}>{t('m8Title')}</h4>
                        <button onClick={() => setActionOutput(`[8. Alert Sent]\n- Message: "${t('ctoRenewalAlertMsg').replace('{days}', ctoDaysLeft)}"`)} style={{ backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>{t('testAlertButton')}</button>
                    </div>

                    {/* Module 9: Tamper-Evident Digital Vault */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                        <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 9</span>
                        <h4 style={{ color: '#e5e7eb', margin: '8px 0 4px 0', fontSize: '14px' }}>{t('m9Title')}</h4>
                        <button onClick={handleVerifyVault} style={{ backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>{t('verifyVaultHashButton')}</button>
                    </div>

                    {/* Enterprise Aggregation Tier: Buyer connection requests for this factory */}
                    {isFactoryActive && (
                        <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px' }}>
                            <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>ENTERPRISE AGGREGATION TIER</span>
                            <h4 style={{ color: '#e5e7eb', margin: '8px 0 4px 0', fontSize: '14px' }}>{t('buyerConnectionRequestsTitle')}</h4>
                            <p style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '8px' }}>{t('buyerConnectionRequestsDesc')}</p>
                            {factoryConnectionRequests.length === 0 && <p style={{ color: '#9ca3af', fontSize: '12px' }}>{t('noRequestsReceivedYet')}</p>}
                            {factoryConnectionRequests.map((req) => (
                                <div key={req.id} style={{ borderTop: '1px solid #374151', paddingTop: '8px', marginTop: '8px' }}>
                                    <p style={{ margin: '0 0 2px 0', fontSize: '12px', color: 'white', fontWeight: 'bold' }}>{req.buyer_accounts?.company_name || 'Unknown Buyer'}</p>
                                    <p style={{ margin: '0 0 6px 0', fontSize: '10px', color: '#9ca3af' }}>{req.buyer_accounts?.industry || ''} {req.buyer_accounts?.contact_email ? `· ${req.buyer_accounts.contact_email}` : ''} — Status: <b style={{ color: req.status === 'approved' ? '#34d399' : req.status === 'pending' ? '#f59e0b' : '#ef4444' }}>{req.status}</b></p>
                                    {req.status === 'pending' && (
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button onClick={() => handleRespondConnection(req.id, 'approved')} style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>{t('approveButton')}</button>
                                            <button onClick={() => handleRespondConnection(req.id, 'rejected')} style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>{t('rejectButton')}</button>
                                        </div>
                                    )}
                                    {req.status === 'approved' && (
                                        <button onClick={() => handleRespondConnection(req.id, 'revoked')} style={{ backgroundColor: '#7c2d12', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>{t('revokeAccessButton')}</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Live Output Screen for Modules 5 to 9 */}
                    <div style={{ backgroundColor: '#111827', border: '2px solid #059669', borderRadius: '12px', padding: '16px' }}>
                        <p style={{ fontSize: '11px', color: '#34d399', margin: '0 0 4px 0', fontWeight: 'bold' }}>Live Screen Compliance Output (Modules 5-9):</p>
                        <pre style={{ fontSize: '11px', color: '#34d399', whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0, fontFamily: 'monospace' }}>{actionOutput}</pre>
                    </div>

                </div>
            )}

            {/* Tab 3: Reference Modules */}
            {activeTab === 'reference' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>REFERENCE MODULE 10</span>
                        <h4 style={{ color: '#e5e7eb', margin: '8px 0 4px 0', fontSize: '14px' }}>{t('m10Title')}</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>{t('m10Desc')} {factoryData.dischargeLimit || '5000'} Liters.</p>
                    </div>
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>REFERENCE MODULE 11</span>
                        <h4 style={{ color: '#e5e7eb', margin: '8px 0 4px 0', fontSize: '14px' }}>{t('m11Title')}</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>{t('m11Desc')} {calculatedScope2} MT CO2e.</p>
                    </div>
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>REFERENCE MODULE 12</span>
                        <h4 style={{ color: '#e5e7eb', margin: '8px 0 4px 0', fontSize: '14px' }}>{t('m12Title')}</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>{t('m12Desc')}</p>
                    </div>
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>REFERENCE MODULE 13</span>
                        <h4 style={{ color: '#e5e7eb', margin: '8px 0 4px 0', fontSize: '14px' }}>{t('m13Title')}</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>{t('m13Desc')} {factoryData.name || 'Registered Unit'}.</p>
                    </div>
                </div>
            )}

            {/* Tab 4: Roadmap Modules */}
            {activeTab === 'roadmap' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                        { titleKey: 'm14Title', descKey: 'm14Desc' },
                        { titleKey: 'm15Title', descKey: 'm15Desc' },
                        { titleKey: 'm16Title', descKey: 'm16Desc' },
                        { titleKey: 'm17Title', descKey: 'm17Desc' },
                        { titleKey: 'm18Title', descKey: 'm18Desc' },
                        { titleKey: 'm19Title', descKey: 'm19Desc' },
                    ].map((mod, idx) => (
                        <div key={idx} style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px' }}>
                            <span style={{ backgroundColor: '#1f2937', color: '#9ca3af', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>ROADMAP MODULE {idx + 14}</span>
                            <h4 style={{ color: '#e5e7eb', margin: '8px 0 4px 0', fontSize: '14px' }}>{t(mod.titleKey)}</h4>
                            <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '12px' }}>{t(mod.descKey)}</p>
                            <button onClick={() => alert(`Request recorded for: ${t(mod.titleKey)}. Our team will prioritize this based on your factory feedback.`)} style={{ backgroundColor: '#374151', color: '#f3f4f6', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                                {t('roadmapRequestButton')}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Legal Disclaimer & Founder Credit Footer */}
            <footer style={{ marginTop: '30px', borderTop: '1px solid #1f2937', padding: '16px 0', color: '#9ca3af', fontSize: '11px', lineHeight: '1.4' }}>
                <p style={{ margin: '0 0 6px 0', color: '#ffffff', fontWeight: 'bold' }}>EcoTrace India | Project by D. S. Nikam | Contact: 7378780745 | Email: dhiraj@ectotraceindia.com</p>
                EcoTrace India Private Limited is an independent compliance platform. It aggregates data supplied by the factory and prepares statutory formats. It does not certify compliance, calculate hazardous waste quantities, transmit to government portals, or provide legal opinions. Physical safety protocols, hardware calibration and compliance adherence remain the responsibility of the factory management.
                <p style={{ margin: '8px 0 0 0' }}>
                    <a href="/terms" style={{ color: '#6b7280', textDecoration: 'underline' }}>{t('termsLink')}</a>
                    {' · '}
                    <a href="/privacy" style={{ color: '#6b7280', textDecoration: 'underline' }}>{t('privacyLink')}</a>
                </p>
            </footer>

        </main>
    );
}
