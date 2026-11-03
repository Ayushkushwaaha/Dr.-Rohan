// Main JavaScript for Dr. Rohan | Interventional Radiology (IR Clinic)

function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  if (nav) {
    nav.classList.toggle('show');
  }
}

function toggleMobileDropdown(btn) {
  const parent = btn.closest('.mobile-dropdown');
  if (parent) {
    parent.classList.toggle('open');
  }
}

function openBooking(treatmentName) {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.add('show');
    if (treatmentName && document.getElementById('procedureInterest')) {
      document.getElementById('procedureInterest').value = treatmentName;
    }
  }
}

function closeBooking() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

function closeFlyer() {
  const flyer = document.getElementById('floatingFlyer');
  if (flyer) {
    flyer.classList.remove('active');
    sessionStorage.setItem('flyerDismissed', 'true');
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Category filter matching IR Clinic India clinical classifications
function filterCategory(catKey, btn) {
  document.querySelectorAll('.category-filter-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.category-specialty-card');
  cards.forEach(card => {
    if (catKey === 'all' || card.getAttribute('data-cat') === catKey) {
      card.style.display = 'flex';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 20);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 180);
    }
  });
}

// Body Explorer Data based on IR Clinic India clinical standards
const bodyData = {
  head: {
    title: "Head & Neck Interventions",
    desc: "Non-surgical image-guided procedures for thyroid nodules, vascular lesions, and cerebrovascular conditions without open surgery or neck scars.",
    treatments: [
      "Thyroid Nodule Ablation (RFA / Microwave)",
      "Carotid Artery Stenting (CAS)",
      "Brain Aneurysm Coiling & AVM",
      "Head & Neck Vascular Malformations",
      "Epistaxis (Severe Nosebleed) Embolization"
    ],
    highlight: "Thyroid RFA shrinks benign thyroid nodules through a needle puncture—preserving normal thyroid function with zero visible neck scarring."
  },
  chest: {
    title: "Thoracic & Pulmonary Procedures",
    desc: "Targeted interventions for lung lesions, chronic fluid collections, long-term IV therapy, and acute pulmonary bleeding.",
    treatments: [
      "Chemoport Insertion (Long-term Chemotherapy)",
      "PICC Line Insertion (IV Antibiotics / TPN)",
      "Bronchial Artery Embolization (Hemoptysis)",
      "CT-Guided Precision Lung Biopsy",
      "Pleural Effusion Drainage & Pigtail Insertion"
    ],
    highlight: "Chemoports & PICC lines are placed under real-time ultrasound and fluoroscopic guidance, providing safe, pain-free vascular access for cancer treatment."
  },
  abdomen: {
    title: "Abdominal & Hepatobiliary Interventions",
    desc: "Advanced interventional oncology and organ-sparing treatments for liver tumors, acute bleeding, and abscesses.",
    treatments: [
      "TACE & TARE for Liver Tumors (HCC / Metastases)",
      "Microwave / Radiofrequency Tumor Ablation",
      "GI Bleed Embolization (Ulcers / Diverticula)",
      "Pigtail Catheter Drainage for Liver Abscess & Ascites",
      "Biliary Stenting & Percutaneous Drainage (PTBD)"
    ],
    highlight: "TACE delivers high-concentration chemotherapy directly to the liver tumor's blood supply while blocking its flow, minimizing systemic side effects."
  },
  pelvis: {
    title: "Pelvic & Reproductive Health (Men & Women)",
    desc: "Breakthrough pinhole treatments for uterine fibroids, enlarged prostate (BPH), varicoceles, and pelvic congestion.",
    treatments: [
      "Uterine Fibroid Embolization (UFE / UAE)",
      "Prostate Artery Embolization (PAE for BPH)",
      "Varicocele Embolization (Fertility & Pain)",
      "Pelvic Congestion Syndrome Embolization",
      "Uterine Artery Embolization for Adenomyosis"
    ],
    highlight: "UFE preserves the uterus and provides permanent relief from fibroids without surgery, while PAE relieves urinary obstruction without sexual side effects."
  },
  limbs: {
    title: "Vascular, Limbs & Joint Interventions",
    desc: "State-of-the-art endovascular solutions for varicose veins, deep vein clots, diabetic foot blockages, and chronic knee pain.",
    treatments: [
      "Varicose Veins EVLA (Endovenous Laser)",
      "VenaSeal Medical Glue & Radiofrequency Ablation",
      "Genicular Artery Embolization (GAE) for Knee Arthritis",
      "DVT Thrombolysis & IVC Filter Placement",
      "Diabetic Foot & Peripheral Angioplasty",
      "AV Fistula Angioplasty for Dialysis Patients"
    ],
    highlight: "Varicose vein procedures take under 45 minutes under local anesthesia with zero cuts or stitches. Walk home the very same day!"
  }
};

function selectBodyZone(zoneKey) {
  // Update pills
  document.querySelectorAll('.body-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-zone') === zoneKey);
  });

  // Update SVG zones
  document.querySelectorAll('.body-zone-btn').forEach(g => {
    g.classList.toggle('active', g.getAttribute('data-zone') === zoneKey);
  });

  // Update detail card
  const data = bodyData[zoneKey];
  if (!data) return;

  const titleEl = document.getElementById('bodyZoneTitle');
  const descEl = document.getElementById('bodyZoneDesc');
  const listEl = document.getElementById('bodyZoneTreatments');
  const highlightEl = document.getElementById('bodyZoneHighlight');

  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  if (highlightEl) highlightEl.textContent = data.highlight;

  if (listEl) {
    listEl.innerHTML = data.treatments.map(t => `<span class="condition-tag">${t}</span>`).join('');
  }
}

// FAQ Accordion
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
  if (!wasOpen) {
    item.classList.add('open');
  }
}

// Setup Dynamic Widgets & Animations
document.addEventListener('DOMContentLoaded', () => {
  // 1. Create Scroll Progress Bar if not present
  if (!document.getElementById('scrollProgressBar')) {
    const progressBar = document.createElement('div');
    progressBar.id = 'scrollProgressBar';
    document.body.prepend(progressBar);
  }

  // 2. Create Floating Quick-Connect Dock if not present
  if (!document.getElementById('floatingDock')) {
    const dock = document.createElement('div');
    dock.id = 'floatingDock';
    dock.className = 'floating-dock';
    dock.innerHTML = `
      <a href="https://wa.me/9118002021801?text=Hello%20Dr.%20Rohan%20Clinic,%20I%20would%20like%20to%20inquire%20about%20a%20consultation" target="_blank" rel="noopener" class="dock-btn whatsapp" title="Chat on WhatsApp">
        <span>💬</span> <span class="label">WhatsApp</span>
      </a>
      <a href="tel:18002021801" class="dock-btn" title="Call Helpline">
        <span>📞</span> <span class="label">1800 202 1801</span>
      </a>
      <button class="back-to-top" id="backToTopBtn" onclick="scrollToTop()" title="Back to top">
        ↑
      </button>
    `;
    document.body.appendChild(dock);
  }

  // 3. Create Floating Announcement Flyer if not present and not dismissed
  if (!document.getElementById('floatingFlyer') && !sessionStorage.getItem('flyerDismissed')) {
    const flyer = document.createElement('div');
    flyer.id = 'floatingFlyer';
    flyer.className = 'floating-flyer';
    flyer.innerHTML = `
      <div class="floating-flyer-header">
        <span class="kicker" style="margin-bottom:0;"><span class="pulse-dot"></span>Second Opinion Desk</span>
        <button class="floating-flyer-close" onclick="closeFlyer()" aria-label="Close notification">×</button>
      </div>
      <h4>Scan & Report Evaluation</h4>
      <p>Have an ultrasound, Doppler, or MRI report? Bring it to Dr. Rohan for a pinhole procedure eligibility check. Cashless Mediclaim available.</p>
      <div class="floating-flyer-actions">
        <button class="btn floating-flyer-btn" onclick="openBooking('Second Opinion Scan Review')">Book Evaluation Slot ↗</button>
        <button class="btn secondary floating-flyer-btn" onclick="closeFlyer()">Later</button>
      </div>
    `;
    document.body.appendChild(flyer);

    // Slide in flyer after 2.5 seconds
    setTimeout(() => {
      flyer.classList.add('active');
    }, 2500);
  }

  // 4. Scroll Event Handler (Progress bar & Back-to-Top)
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    const bar = document.getElementById('scrollProgressBar');
    if (bar) bar.style.width = scrollPercent + '%';

    const btt = document.getElementById('backToTopBtn');
    if (btt) {
      if (scrollTop > 350) {
        btt.classList.add('visible');
      } else {
        btt.classList.remove('visible');
      }
    }
  }, { passive: true });

  // 5. Scroll Reveal Intersection Observer
  // Auto-tag common elements with .reveal if not already tagged
  document.querySelectorAll('.treatment-card, .condition-card, .journey-step, .stat-box, .tech-item-card, .article-full-card, .comparison-table-wrap').forEach((el, index) => {
    if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
      el.classList.add('reveal');
      const delayMod = (index % 4) + 1;
      el.classList.add(`delay-${delayMod}`);
    }
  });

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .fly-in-left, .fly-in-right').forEach(el => {
    revealObserver.observe(el);
  });

  // 6. Set min date for booking modal
  const dateInput = document.getElementById('preferredDate');
  if (dateInput) {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    dateInput.min = today.toISOString().slice(0, 10);
  }

  // 7. Handle booking form submit
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const conf = document.getElementById('confirmation');
      if (conf) {
        conf.style.display = 'block';
        conf.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 8. Close modal when clicking outside
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeBooking();
    });
  }

  // 9. In-page smooth scroll navigation handler
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const header = document.querySelector('.header');
          const headerOffset = header ? header.offsetHeight + 10 : 86;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          document.querySelectorAll('.navlinks a').forEach(a => a.classList.remove('active'));
          if (this.closest('.navlinks')) {
            this.classList.add('active');
          }
          if (history.pushState) {
            history.pushState(null, null, targetId);
          }
        }
      }
    });
  });
});

// ==========================================================================
// PROCEDURES DATA & INTERACTIVE MODAL (MATCHING IR CLINIC INDIA ARCHITECTURE)
// ==========================================================================

const proceduresData = {
  "fnac-biopsy": {
    title: "USG & CT Guided FNAC / Biopsy",
    category: "Daycare & Diagnostic IR",
    catClass: "cat-basic",
    duration: "15–25 Mins",
    anesthesia: "Local Numbing (Painless)",
    stay: "Daycare (1–2 Hours)",
    incision: "Fine Needle (Zero Cuts)",
    overview: "Ultrasound and CT-guided FNAC (Fine Needle Aspiration Cytology) and core needle biopsies allow Dr. Rohan to accurately sample tissue from deep internal organs and suspicious nodules without invasive surgery. Using sub-millimeter needle tracking on real-time displays, surrounding nerves and major blood vessels are completely avoided.",
    indications: [
      "Suspicious thyroid nodules & neck lymph nodes",
      "Lung nodules and mediastinal masses",
      "Liver focal lesions & hepatic masses",
      "Retroperitoneal & musculoskeletal soft tissue tumors",
      "Kidney lesions and deep pelvic masses"
    ],
    protocol: [
      "Pre-procedure scan marks the safest trajectory with zero vital structure conflict.",
      "Gentle skin numbing with local anesthetic ensures complete patient comfort.",
      "An ultra-thin biopsy needle is guided live into the target lesion under ultrasound or CT fluoroscopy.",
      "Tissue cores or cellular aspirates are retrieved and immediately prepared for histopathology.",
      "A simple band-aid is applied. Patient walks out in under an hour."
    ],
    advantages: [
      "99% diagnostic yield with definitive pathology report",
      "Eliminates exploratory open surgery",
      "Zero surgical incision, no sutures or stitches",
      "Negligible bleeding risk (< 5ml)",
      "Zero hospital admission needed"
    ],
    recovery: "Patients can resume normal eating and light daily activities immediately upon returning home."
  },
  "pigtail-drainage": {
    title: "USG & CT Guided Pigtail / Drainage",
    category: "Daycare & Diagnostic IR",
    catClass: "cat-basic",
    duration: "20–30 Mins",
    anesthesia: "Local Anesthesia",
    stay: "Daycare / Short Observation",
    incision: "2mm Pinhole Entry",
    overview: "Percutaneous pigtail catheter drainage is an emergency and therapeutic image-guided procedure to remove infected collections of pus, bile, pancreatic fluid, or air from the chest and abdomen. A soft, self-locking coiled catheter ('pigtail') is positioned with pinhole accuracy to provide continuous, safe evacuation of fluid.",
    indications: [
      "Amoebic or pyogenic liver abscesses",
      "Pleural effusion (fluid around lungs) & empyema",
      "Pancreatic pseudocysts & infected necrotic collections",
      "Post-operative intra-abdominal collections & hematomas",
      "Pneumothorax (air collapse in pleural cavity)"
    ],
    protocol: [
      "Real-time ultrasound or CT localizes the fluid pocket and calculates exact depth.",
      "Local anesthetic numbs skin and tract down to the abscess wall.",
      "A puncture needle aspirates fluid for microbiological culture and sensitivity testing.",
      "A soft J-tip guidewire is advanced; a flexible pigtail catheter is deployed into the cavity.",
      "Catheter is locked and connected to a sterile gravity drainage bag."
    ],
    advantages: [
      "Instant relief of high fever, toxic sepsis, and severe pressure pain",
      "Completely replaces open surgical laparotomy / thoracotomy",
      "Performed awake under local numbing",
      "Catheter is easily removed once cavity collapses and output ceases",
      "Minimal tissue trauma and swift systemic recovery"
    ],
    recovery: "Drain output is monitored. Patients experience rapid clinical improvement within 24 to 48 hours."
  },
  "picc-line": {
    title: "PICC Line (Peripherally Inserted Central Catheter)",
    category: "Vascular Access",
    catClass: "cat-vascular",
    duration: "20–30 Mins",
    anesthesia: "Gentle Local Numbing",
    stay: "Walk-In Walk-Out Daycare",
    incision: "1.5mm Arm Pinhole",
    overview: "A PICC line is a long, thin, flexible medical-grade catheter inserted through a superficial arm vein and advanced so its tip rests safely in the superior vena cava near the heart. It provides a reliable, secure vascular pathway for extended intravenous medications, protecting delicate arm veins from chemical irritation and repetitive needle trauma.",
    indications: [
      "Long-term intravenous antibiotic therapy (3–8 weeks for osteomyelitis, endocarditis, sepsis)",
      "Total Parenteral Nutrition (TPN) for gastrointestinal failure",
      "Difficult peripheral venous access ('hard-to-stick' patients)",
      "Frequent venous blood sampling and infusion therapy",
      "Chemotherapy delivery when a chemoport is not preferred"
    ],
    protocol: [
      "High-frequency ultrasound evaluates basilic or brachial arm veins for optimal caliber.",
      "Skin is numbed; micro-puncture needle gains safe access with zero vein tearing.",
      "Catheter length is measured and navigated under low-dose Cath Lab fluoroscopy.",
      "Tip placement at the cavoatrial junction is confirmed for maximum flow dilution.",
      "Catheter is secured with a sutureless dressing device (Statlock)."
    ],
    advantages: [
      "Can remain safely in place for several months",
      "Eliminates painful repeated peripheral IV cannula pricks",
      "Completely eliminates pneumothorax risk seen with neck lines",
      "Allows outpatient IV therapy at home",
      "Easily removed at bedside without discomfort"
    ],
    recovery: "Arm can be used normally for light tasks immediately. Patient receives an arm sleeve and shower protector."
  },
  "dialysis-catheter": {
    title: "Hickman / Permcath Dialysis (Tunnelled) Catheter",
    category: "Vascular Access & Dialysis",
    catClass: "cat-vascular",
    duration: "30–45 Mins",
    anesthesia: "Local Anesthesia + Mild Sedation",
    stay: "Daycare (2–3 Hours)",
    incision: "Small Subcutaneous Tunnel",
    overview: "A Permcath is a long-term, silicone dual-lumen catheter tunneled under the chest wall skin into the internal jugular vein. Designed specifically for kidney failure patients, it delivers high-flow blood exchange required for effective hemodialysis sessions while protecting against central vein stenosis and infections.",
    indications: [
      "End-Stage Renal Disease (ESRD) requiring immediate hemodialysis",
      "Bridge access while waiting for an AV fistula or AV graft to mature",
      "Permanent dialysis access in patients with failed or exhausted fistulas",
      "Long-term apheresis or stem-cell harvesting"
    ],
    protocol: [
      "Right internal jugular vein is mapped with color Doppler to ensure patency.",
      "Local anesthetic numbs neck entry and anterior chest wall tunnel site.",
      "Catheter is tunneled beneath skin; Dacron felt cuff promotes tissue ingrowth.",
      "Fluoroscopy confirms step-tip design at mid-right atrium for 350+ ml/min flow.",
      "Catheter lumens are locked with heparin or citrate anticoagulant."
    ],
    advantages: [
      "Immediate readiness for high-flow hemodialysis sessions",
      "Dacron cuff creates a biological seal that cuts infection rates by 80%",
      "Can be maintained for 6 to 18+ months",
      "Preserves arm veins for future permanent AV fistula creation",
      "Painless insertion under image-guided precision"
    ],
    recovery: "Patient can proceed directly to their scheduled hemodialysis run on the very same day."
  },
  "chemoport": {
    title: "Chemoport Insertion (Totally Implantable Venous Access)",
    category: "Vascular Access & Oncology",
    catClass: "cat-oncology",
    duration: "30–40 Mins",
    anesthesia: "Local Anesthesia with Mild Sedation",
    stay: "Daycare (Discharge in 3 Hours)",
    incision: "2.5cm Cosmetic Subcutaneous Pocket",
    overview: "A Chemoport is a totally implantable vascular access port placed beneath the chest skin, connected to a thin silicone catheter resting in the central vein. It provides a reliable, stress-free portal for administering chemotherapy, blood transfusions, and medications without damaging peripheral veins or causing painful extravasation.",
    indications: [
      "Cancer patients planned for multiple cycles of chemotherapy",
      "Infusion of irritating or vesicant chemotherapy drugs",
      "Patients with fragile, sclerosed, or inaccessible arm veins",
      "Frequent long-term blood sampling throughout oncological therapy"
    ],
    protocol: [
      "Internal jugular vein is accessed under real-time ultrasound guidance.",
      "A small 2.5cm cosmetic pocket is created in the subclavicular chest tissue.",
      "The catheter is tunneled and connected to the titanium/plastic port reservoir.",
      "Pulsed fluoroscopy verifies perfect position at the cavoatrial junction.",
      "Skin is closed with subcuticular absorbable sutures and sterile skin glue."
    ],
    advantages: [
      "Completely subcutaneous—no tubes hanging outside the body",
      "Zero restriction on bathing, swimming, or normal dressing when not in use",
      "Eliminates painful repeated needle sticks in scarred veins",
      "Can remain in place safely for 3 to 5+ years",
      "Reduces chemotherapeutic extravasation burn injuries to 0%"
    ],
    recovery: "Bandage remains dry for 48 hours. Port can be accessed immediately for chemotherapy infusion."
  },
  "foreign-body": {
    title: "Intravascular Foreign Body Retrieval",
    category: "Vascular & Emergency IR",
    catClass: "cat-vascular",
    duration: "30–60 Mins",
    anesthesia: "Local Anesthesia",
    stay: "Daycare / Overnight Observation",
    incision: "2mm Pinhole Sheath",
    overview: "An emergency endovascular procedure performed by interventional radiologists to snare and safely extract broken catheter fragments, sheared guidewires, or displaced stents that have embolized into the heart or pulmonary arteries, saving patients from high-risk open-heart surgery.",
    indications: [
      "Fractured chemoport catheter fragments migrated into pulmonary artery",
      "Dislodged central venous catheter or PICC line segments",
      "Migrated endovascular coils, stents, or IVC filter components",
      "Accidental guidewire loss during bedside vascular catheterization"
    ],
    protocol: [
      "Femoral or jugular access is established with a vascular introducer sheath.",
      "DSA fluoroscopy visualizes the exact coordinates and orientation of the fragment.",
      "Specialized goose-neck micro-snares or retrieval baskets are steered toward the object.",
      "The free end of the foreign body is snared, grasped, and folded into the sheath.",
      "The retrieved object is extracted through the 2mm pinhole puncture."
    ],
    advantages: [
      "100% avoids open-chest sternotomy or open vascular surgery",
      "Performed while patient is fully conscious under local numbing",
      "Immediate elimination of cardiac arrhythmia or pulmonary infarction risk",
      "Virtually zero post-procedural pain or scarring",
      "Discharge within 12 to 24 hours"
    ],
    recovery: "Bed rest for 3 to 4 hours following sheath removal, followed by immediate normal mobility."
  },
  "cvc-insertion": {
    title: "Central Venous Catheter (CVC) Insertion",
    category: "Vascular Access",
    catClass: "cat-vascular",
    duration: "15–20 Mins",
    anesthesia: "Local Anesthesia",
    stay: "Immediate Inpatient / Daycare Usability",
    incision: "Pinhole Needle Puncture",
    overview: "Ultrasound-guided central venous catheterization provides rapid, secure multi-lumen vascular access in acute and critical care. By utilizing real-time ultrasound guidance, Dr. Rohan eliminates mechanical complications like arterial puncture, pneumothorax, and hematoma seen with traditional blind landmark techniques.",
    indications: [
      "Intensive care patients needing multiple incompatible drug infusions",
      "Central Venous Pressure (CVP) hemodynamic monitoring",
      "Administration of high-dose inotropes, vasopressors, or concentrated potassium",
      "Emergency high-volume fluid resuscitation"
    ],
    protocol: [
      "Internal jugular or subclavian vein is imaged with continuous ultrasound.",
      "The needle is visualized entering the lumen under direct acoustic guidance.",
      "A flexible J-tip guidewire is introduced, followed by catheter dilation.",
      "Multi-lumen catheter is advanced; catheter position is confirmed.",
      "Line is sutured and dressed with transparent antimicrobial film."
    ],
    advantages: [
      "Near 0% risk of accidental carotid artery puncture",
      "Completely prevents accidental lung puncture (pneumothorax)",
      "Multi-channel access for simultaneous blood draws and infusions",
      "100% first-pass cannulation rate under image guidance"
    ],
    recovery: "Catheter is instantly functional for all critical care medical protocols."
  },
  "cerebral-angio": {
    title: "Diagnostic Cerebral and Spinal Angiography (DSA)",
    category: "Neuro-Intervention",
    catClass: "cat-neuro",
    duration: "30–45 Mins",
    anesthesia: "Local Numbing at Wrist / Groin",
    stay: "Daycare (Discharge in 4 Hours)",
    incision: "1.6mm Wrist or Groin Pinhole",
    overview: "Diagnostic Cerebral Angiography is the uncontested gold-standard imaging technique for evaluating brain blood vessels with micro-millimeter precision. Dr. Rohan navigates microscopic catheters from the wrist (radial artery) directly to the neck and brain arteries to record high-frame-rate fluoroscopic movies of cerebral circulation.",
    indications: [
      "Evaluation of suspected brain aneurysms and subarachnoid hemorrhage",
      "Brain Arteriovenous Malformations (AVMs) and dural AV fistulas",
      "Carotid or vertebral artery stenosis & acute stroke workup",
      "Vasculitis, moyamoya disease, and intracranial dissections",
      "Spinal vascular malformations causing paraparesis"
    ],
    protocol: [
      "Radial artery at wrist (or femoral artery) is numbed; a micro-sheath is placed.",
      "A shaped 1.5mm diagnostic catheter is guided over a wire to the carotid and vertebral arteries.",
      "Non-ionic contrast is gently injected while high-speed digital X-ray cameras record.",
      "Rotational 3D reconstruction generates 360-degree interactive vascular models.",
      "Catheter is removed; a comfortable wrist compression band (TR-Band) is applied."
    ],
    advantages: [
      "Superior spatial and temporal resolution compared to MRI or CT angiography",
      "Shows dynamic blood flow speed, collateral routes, and micro-aneurysm necks",
      "Painless procedure performed through wrist artery while fully awake",
      "Walk and eat within 1 hour after radial access",
      "Provides definitive roadmap for endovascular treatment planning"
    ],
    recovery: "Wrist band is released after 2 hours. Patient walks home the same afternoon."
  },
  "carotid-stenting": {
    title: "Carotid & Vertebral Angioplasty / Stenting (CAS)",
    category: "Neuro-Intervention",
    catClass: "cat-neuro",
    duration: "45–60 Mins",
    anesthesia: "Local Anesthesia (Conscious Patient)",
    stay: "24-Hour Observation",
    incision: "2mm Pinhole Entry",
    overview: "A catheter-based preventative treatment to reopen severely narrowed carotid arteries in the neck that supply blood to the brain. By placing a specialized metallic mesh stent under embolic filter protection, Dr. Rohan restores full brain blood flow and prevents paralyzing ischemic strokes without neck incisions.",
    indications: [
      "Severe carotid stenosis (> 70%) in patients with previous mini-strokes (TIAs)",
      "Asymptomatic severe carotid stenosis (> 80%) on Doppler scan",
      "Patients with high neck bifurcation, previous neck radiation, or cardiac risk",
      "Restenosis following prior surgical carotid endarterectomy"
    ],
    protocol: [
      "Pinhole catheterization from femoral or radial artery under biplane DSA.",
      "A distal embolic protection filter ('umbrella basket') is deployed beyond the stenosis to catch any loose plaque debris.",
      "A micro-balloon gently dilates the narrowed plaque zone.",
      "A self-expanding nickel-titanium (nitinol) carotid stent is deployed across the lesion.",
      "Filter basket containing trapped micro-particles is safely recaptured and retrieved."
    ],
    advantages: [
      "Zero neck cut; avoids any risk of damage to vocal cord or tongue nerves",
      "Performed while awake—neurological monitoring is tested live throughout",
      "Safe alternative for elderly or high-risk surgical patients",
      "Over 98% long-term patency and stroke prevention rate",
      "Rapid recovery with return to light routine in 48 hours"
    ],
    recovery: "Overnight monitoring in ICU/step-down unit for blood pressure regulation; discharge next morning."
  },
  "thrombectomy": {
    title: "Mechanical Thrombectomy for Acute Ischemic Stroke",
    category: "Neuro-Intervention",
    catClass: "cat-neuro",
    duration: "30–60 Mins",
    anesthesia: "Local / Conscious Sedation",
    stay: "Hospital Stay (Stroke Unit)",
    incision: "2mm Pinhole Puncture",
    overview: "An emergency, life-saving neuro-interventional procedure performed within the golden window of acute stroke. Dr. Rohan navigates microscopic devices directly into blocked brain arteries to physically capture and pull out large blood clots, immediately restoring blood flow and reversing paralysis and speech loss.",
    indications: [
      "Acute ischemic stroke within 6 to 24 hours of symptom onset",
      "Confirmed Large Vessel Occlusion (LVO) in middle cerebral or internal carotid artery",
      "Severe stroke symptoms (hemiplegia, facial droop, aphasia/inability to speak)",
      "Patients ineligible for or failing intravenous clot-dissolving IV-tPA medications"
    ],
    protocol: [
      "Emergency Cath Lab activation upon CT-angiography confirmation of brain clot.",
      "Micro-sheath is placed in groin or wrist; guide catheter is parked in neck artery.",
      "A microcatheter crosses the clot; a self-expanding stent-retriever mesh is opened.",
      "The clot integrates into the mesh cells; continuous aspiration suction is applied.",
      "The trapped clot is extracted out of the body, restoring full intracranial brain perfusion."
    ],
    advantages: [
      "Triples the probability of walking out of the hospital with full independence",
      "Dramatic immediate reversal of neurological deficits on the procedure table",
      "Saves brain cells from irreversible ischemic death ('time is brain')",
      "Zero open skull surgery; sub-millimeter endovascular navigation",
      "Proven globally by multiple randomized landmark clinical trials"
    ],
    recovery: "Post-procedure care in stroke care unit with immediate neurological rehabilitation."
  },
  "intracranial-stent": {
    title: "Intracranial Angioplasty & Stenting",
    category: "Neuro-Intervention",
    catClass: "cat-neuro",
    duration: "45–60 Mins",
    anesthesia: "Sedation / Local Numbing",
    stay: "24–48 Hours",
    incision: "2mm Pinhole",
    overview: "An advanced neurovascular catheter procedure used to dilate and stent critically narrowed arteries located deep inside the skull base and brain tissue. It provides robust protection for patients with severe atherosclerotic plaque who continue to suffer stroke warning signs despite blood thinners.",
    indications: [
      "Severe intracranial stenosis (> 70%) of MCA, basilar, or vertebral arteries",
      "Recurrent TIAs or strokes despite dual antiplatelet and high-dose statin therapy",
      "Hemodynamically significant low brain perfusion on perfusion CT/MRI"
    ],
    protocol: [
      "Micro-access through wrist or femoral artery under biplane roadmapping.",
      "An ultra-flexible neurovascular microcatheter navigates tortuous intracranial vessels.",
      "A low-pressure micro-balloon gently widens the narrowed intracranial lumen.",
      "A specialized intracranial stent (e.g., Wingspan) is deployed to maintain patency.",
      "Immediate angiograms verify crisp restoration of normal cerebral blood flow."
    ],
    advantages: [
      "Prevents recurring devastating strokes in medically refractory patients",
      "Pinhole catheter procedure without cranial bone surgery",
      "Restores normal physiological blood supply to oxygen-starved brain regions",
      "Comprehensive protection combined with modern antiplatelet protocols"
    ],
    recovery: "Patient monitored in neurological recovery suite; discharge within 1 to 2 days."
  },
  "aneurysm-coiling": {
    title: "Brain Aneurysm Coiling, Flow Diverters & Occlusion",
    category: "Neuro-Intervention",
    catClass: "cat-neuro",
    duration: "45–90 Mins",
    anesthesia: "General Anesthesia for Absolute Stillness",
    stay: "24–48 Hours (Elective) / ICU (Ruptured)",
    incision: "2mm Groin or Wrist Pinhole",
    overview: "Minimally invasive endovascular treatment of brain aneurysms (weak bulges on brain arteries). Using microcatheters steered from the wrist or groin, Dr. Rohan packs ultra-soft platinum coils inside the aneurysm sac or deploys a dense mesh 'flow diverter' stent across its neck to completely seal it from blood pressure, preventing rupture without opening the skull.",
    indications: [
      "Unruptured brain aneurysms detected on MRI/CT scans with high rupture risk",
      "Acute subarachnoid hemorrhage (ruptured aneurysm emergency)",
      "Giant or wide-necked aneurysms not suitable for surgical clipping",
      "Aneurysms in deep, surgically inaccessible skull base locations"
    ],
    protocol: [
      "Pinhole entry in radial or femoral artery; catheter navigated to cerebral circulation.",
      "High-magnification 3D roadmap isolates the aneurysm neck and volume.",
      "A steerable microcatheter (0.5mm) enters the dome of the aneurysm.",
      "Electrically detachable platinum micro-coils are packed inside until flow ceases.",
      "For wide necks, a flow-diverting stent is deployed across the parent vessel.",
      "The blood inside clots permanently, sealing the aneurysm for life."
    ],
    advantages: [
      "Completely avoids craniotomy (zero bone cutting or brain retraction)",
      "Lower complication rate and faster recovery than open brain clipping",
      "Permanent protection against fatal brain hemorrhage",
      "Elective patients return home in 24 to 48 hours",
      "Zero cosmetic scars on the face or scalp"
    ],
    recovery: "Rest in recovery room; elective cases resume desk work within 4 to 6 days."
  },
  "varicose-veins": {
    title: "Varicose Veins EVLA Laser & VenaSeal Glue",
    category: "Peripheral Vascular",
    catClass: "cat-vascular",
    duration: "30–45 Mins",
    anesthesia: "Gentle Local Tumescent Numbing",
    stay: "Walk-In Walk-Out Daycare (2 Hours)",
    incision: "1mm Skin Pinhole (Zero Stitches)",
    overview: "State-of-the-art endovascular thermal laser ablation (EVLA) and proprietary medical adhesive closure (VenaSeal) for diseased leg veins. Under live ultrasound, the faulty leaking vein is closed from within through a needle puncture, redirecting blood to healthy veins, resolving pain, swelling, and healing venous ulcers permanently.",
    indications: [
      "Painful, bulging, rope-like varicose veins in legs or thighs",
      "Leg heaviness, chronic tiredness, and nighttime calf cramps",
      "Venous skin darkening (hyperpigmentation) around ankles",
      "Active or recurrent non-healing venous stasis leg ulcers",
      "Superficial thrombophlebitis and spontaneous vein bleeding"
    ],
    protocol: [
      "Color Doppler ultrasound maps all leaking venous valves in standing position.",
      "A 1mm needle puncture accesses the saphenous vein; optical laser fiber is inserted.",
      "Protective cooling fluid numbs the vein tract completely.",
      "Laser energy or VenaSeal medical adhesive permanently seals the vein in minutes.",
      "A compression stocking is applied. Patient gets off the table and walks immediately."
    ],
    advantages: [
      "Walk in, walk out the same morning with zero hospital stay",
      "No large surgical incisions, zero stitches, zero scars",
      "98.7% permanent long-term closure rate",
      "Negligible pain compared to old-fashioned surgical vein stripping",
      "Resume normal office work and driving the very next morning"
    ],
    recovery: "Immediate 20-minute post-procedure walk. Normal work routine resumed within 24 hours."
  },
  "fibroid-ufe": {
    title: "Uterine Fibroid Embolization (UFE / UAE)",
    category: "Women's Health",
    catClass: "cat-women",
    duration: "35–50 Mins",
    anesthesia: "Local Anesthesia + Conscious Sedation",
    stay: "Daycare / Overnight Rest",
    incision: "1.5mm Wrist or Groin Pinhole",
    overview: "A non-surgical, uterus-preserving pinhole procedure that permanently treats uterine fibroids and adenomyosis. Through a tiny wrist puncture, Dr. Rohan navigates microscopic catheters into the uterine arteries, releasing calibrated embolic microspheres that starve fibroids of blood supply, causing them to shrink and symptoms to resolve permanently.",
    indications: [
      "Heavy, prolonged menstrual bleeding causing chronic anemia & fatigue",
      "Severe period cramps and debilitating pelvic pain/pressure",
      "Multiple or large intramural/submucosal uterine fibroids",
      "Adenomyosis symptoms unresolved by hormone medications",
      "Women who want to preserve their uterus and avoid hysterectomy surgery"
    ],
    protocol: [
      "Wrist radial artery (or groin) is numbed; a 1.5mm micro-sheath is placed.",
      "Biplane Cath Lab DSA provides high-contrast roadmaps of uterine arteries.",
      "A microscopic catheter is steered into the vessels feeding the fibroids.",
      "FDA-approved spherical micro-beads are delivered, choking the fibroids' blood flow.",
      "The normal uterine muscular wall continues to receive healthy collateral blood.",
      "Catheter is removed; simple band-aid applied. No surgical stitches."
    ],
    advantages: [
      "100% uterus preservation—never lose your feminine anatomy",
      "Treats all fibroids simultaneously in one single 45-minute session",
      "Avoids premature menopause and pelvic floor damage from hysterectomy",
      "Loss of heavy bleeding within the first 1 to 2 menstrual cycles",
      "Resume full routine, work, and exercise in 4 to 5 days"
    ],
    recovery: "Overnight rest in daycare suite with targeted pain management. Full recovery in under a week."
  },
  "prostate-pae": {
    title: "Prostate Artery Embolization (PAE)",
    category: "Men's Health & Urology",
    catClass: "cat-urology",
    duration: "45–60 Mins",
    anesthesia: "Gentle Local Numbing (Awake & Relaxed)",
    stay: "Daycare (Walk Home in 4 Hours)",
    incision: "1.5mm Wrist Pinhole",
    overview: "A breakthrough non-surgical pinhole procedure for men over 50 suffering from an enlarged prostate (Benign Prostatic Hyperplasia / BPH). Microscopic catheters navigated from the wrist artery block the microscopic blood vessels feeding the prostate, causing it to shrink naturally and restoring free, easy urination without surgery or sexual side effects.",
    indications: [
      "Waking up 3 to 6 times at night to urinate (nocturia)",
      "Weak, dribbling, slow urine stream and straining",
      "Sudden urinary urgency, sensation of incomplete bladder emptying",
      "Men dependent on a urinary catheter or failing tamsulosin/finasteride pills",
      "Men who refuse TURP surgery to avoid sexual dysfunction and incontinence"
    ],
    protocol: [
      "Right wrist radial artery is numbed with local anesthetic.",
      "Under high-definition Cath Lab DSA, a 1mm microcatheter is guided to pelvic vessels.",
      "Micro-arteries supplying the left and right prostate lobes are isolated.",
      "Microscopic spherical beads are delivered, starving the enlarged prostate tissue.",
      "Catheter is removed; TR-band wrist strap applied. Walk immediately."
    ],
    advantages: [
      "Zero urethral cutting—nothing enters through your penis or urethra",
      "Zero risk of sexual impotence, retrograde ejaculation, or urinary incontinence",
      "No general anesthesia required; performed while comfortably awake",
      "Prostate shrinks by 30% to 50% over weeks, opening the urine channel",
      "Walk home the very same afternoon; no long hospital stay"
    ],
    recovery: "Normal urination improves progressively over 2 to 4 weeks. Return to desk work in 48 hours."
  },
  "knee-gae": {
    title: "Genicular Artery Embolization (GAE) for Knee Pain",
    category: "Musculoskeletal & Joints",
    catClass: "cat-joints",
    duration: "35–45 Mins",
    anesthesia: "Local Numbing at Upper Thigh",
    stay: "Daycare (Discharge in 3 Hours)",
    incision: "1.5mm Upper Thigh Pinhole",
    overview: "A game-changing minimally invasive catheter procedure that targets chronic inflammation in knee osteoarthritis. Dr. Rohan navigates microscopic catheters into the tiny genicular arteries around the knee joint, selectively extinguishing the abnormal inflammatory micro-vessels and sensory nerve endings that transmit chronic pain signals.",
    indications: [
      "Moderate to severe knee osteoarthritis (Kellgren-Lawrence Grade 2–3)",
      "Chronic knee pain not relieved by medications or physiotherapy",
      "Patients who failed hyaluronic acid or cortisone knee injections",
      "Patients who want to delay or avoid total knee replacement surgery",
      "Persistent knee pain following partial knee surgery"
    ],
    protocol: [
      "Upper thigh artery is numbed; a micro-sheath is introduced.",
      "DSA roadmapping visualizes the characteristic 'hypervascular blush' of knee inflammation.",
      "A sub-millimeter catheter is steered into the inflamed genicular arterial branches.",
      "Fine micro-particles are infused, shutting down the chronic inflammatory vessel network.",
      "Sheath is removed; gentle compression applied. Zero surgical cuts."
    ],
    advantages: [
      "Over 70% reduction in knee pain scores within 1 to 2 weeks",
      "Significant improvement in walking distance and stair climbing",
      "Preserves natural knee joint anatomy; no metal prosthesis",
      "Local anesthesia only; walk out of the clinic the same afternoon",
      "Long-lasting relief lasting 1 to 3+ years"
    ],
    recovery: "Walking is encouraged immediately. Full routine and exercise resumed within 3 to 5 days."
  },
  "thyroid-rfa": {
    title: "Thyroid Nodule Radiofrequency Ablation (RFA)",
    category: "Head & Neck",
    catClass: "cat-basic",
    duration: "20–30 Mins",
    anesthesia: "Local Neck Numbing",
    stay: "Outpatient Daycare (1–2 Hours)",
    incision: "Needle Puncture (Zero Neck Scar)",
    overview: "An internationally acclaimed pinhole alternative to neck surgery for benign thyroid nodules. Under continuous high-resolution ultrasound guidance, an ultra-thin electrode needle is guided into the nodule. Radiofrequency thermal energy coagulates and shrinks the nodular tissue while preserving 100% of normal thyroid gland function.",
    indications: [
      "Benign thyroid nodules causing visible cosmetic neck swelling",
      "Difficulty swallowing (dysphagia) or sensation of neck tightness/pressure",
      "Foreign body sensation or chronic throat clearing",
      "Desire to avoid thyroidectomy neck scar and lifetime thyroid hormone pills"
    ],
    protocol: [
      "Ultrasound confirms benign cytology and maps nodule boundaries.",
      "Skin and thyroid capsule are numbed with gentle local anesthetic.",
      "An internally cooled 18G RFA electrode enters the nodule via the moving-shot technique.",
      "Radiofrequency waves generate frictional heat, ablating nodular tissue section by section.",
      "Ultrasound visualizes transient micro-bubbles confirming complete ablation.",
      "Electrode is removed; a small bandage applied for 2 hours."
    ],
    advantages: [
      "Leaves zero visible surgical neck scar—no disfiguring collar cut",
      "Preserves normal thyroid gland tissue; eliminates lifetime Thyronorm medication",
      "Over 75% to 90% nodule volume shrinkage over 6 to 12 months",
      "Voice is checked continuously during the procedure—zero nerve injury",
      "Walk home within 1 hour after treatment"
    ],
    recovery: "Normal diet and light speaking immediately. Full physical activity resumed next day."
  },
  "liver-tace": {
    title: "Liver TACE & TARE (Transarterial Chemoembolization)",
    category: "Oncology & Hepatobiliary",
    catClass: "cat-oncology",
    duration: "45–60 Mins",
    anesthesia: "Local Numbing with Mild Sedation",
    stay: "24–48 Hours",
    incision: "1.5mm Wrist or Groin Pinhole",
    overview: "A targeted interventional oncology therapy for primary liver cancer (HCC) and liver metastases. Dr. Rohan navigates a microcatheter directly into the hepatic arterial branches feeding the liver tumor, injecting a high-concentration chemotherapy emulsion directly into the tumor bed, followed by embolic particles that cut off its blood supply.",
    indications: [
      "Hepatocellular Carcinoma (HCC) not suitable for surgical resection",
      "Colorectal cancer metastases to the liver",
      "Neuroendocrine liver metastases with severe flushing/diarrhea",
      "Downstaging or bridge therapy prior to liver transplantation"
    ],
    protocol: [
      "Access via wrist or groin artery; selective catheterization of celiac axis.",
      "Cone-beam CT and DSA create super-selective maps of tumor-feeding arteries.",
      "Microcatheter enters the sub-segmental feeding vessel of the tumor.",
      "Chemotherapeutic agent (e.g. Doxorubicin) mixed with lipiodol is infused into the tumor.",
      "Embolic microspheres are injected until blood flow in the feeding vessel halts completely.",
      "Catheter is removed; vascular closure device deployed."
    ],
    advantages: [
      "Delivers 20x higher chemotherapy concentration directly to the tumor",
      "Spares healthy liver tissue from drug toxicity",
      "Minimizes systemic chemotherapy side effects (no hair loss, less nausea)",
      "Shrinks tumors, slows disease progression, and prolongs survival",
      "Can be repeated safely if new lesions develop"
    ],
    recovery: "Daycare or 1-day hospital stay. Patients resume light activities within 48 to 72 hours."
  },
  "varicocele": {
    title: "Varicocele Embolization (Male Fertility & Pain)",
    category: "Men's Health & Urology",
    catClass: "cat-urology",
    duration: "30–40 Mins",
    anesthesia: "Local Numbing",
    stay: "Daycare (Discharge in 3 Hours)",
    incision: "1.5mm Neck or Groin Pinhole",
    overview: "A non-surgical catheter procedure that permanently closes abnormal, dilated veins in the scrotum (varicocele) that cause scrotal heaviness, chronic aching, and male factor infertility. Navigating from the neck or groin vein, Dr. Rohan deploys micro-coils to seal the faulty vein from within, with zero surgical cutting in the scrotum.",
    indications: [
      "Abnormal semen analysis (low sperm count, poor motility, abnormal morphology)",
      "Dull, dragging ache in the scrotum, worsening after standing or exercise",
      "Visible or palpable enlarged scrotal veins ('bag of worms')",
      "Testicular atrophy or growth arrest in young men and adolescents"
    ],
    protocol: [
      "Small skin numbing at the base of neck (internal jugular) or groin vein.",
      "Microcatheter is guided down the vena cava into the left or right internal spermatic vein.",
      "Venography demonstrates faulty retrograde blood reflux.",
      "Detachable micro-coils and sclerosing foam are released, permanently occluding the vein.",
      "Blood immediately reroutes to normal venous drainage channels.",
      "Catheter is removed; small band-aid applied. Walk out in 2 hours."
    ],
    advantages: [
      "Zero incision in the scrotum or groin—avoids delicate testicular structures",
      "Zero risk of accidental testicular artery ligation or scrotal hydrocele",
      "Clinically proven significant improvement in sperm count and pregnancy rates",
      "Walk home within 2 to 3 hours after procedure",
      "Resume desk work next morning and sexual activity in 5 to 7 days"
    ],
    recovery: "Patients can resume gym, sports, and heavy lifting within 7 days."
  },
  "dvt-thrombolysis": {
    title: "DVT Catheter Thrombolysis & IVC Filter",
    category: "Peripheral Vascular",
    catClass: "cat-vascular",
    duration: "45–60 Mins",
    anesthesia: "Local Numbing with Sedation",
    stay: "24–48 Hours",
    incision: "2mm Knee Pinhole Entry",
    overview: "An emergency endovascular procedure for severe Deep Vein Thrombosis (DVT). A specialized multi-sidehole infusion catheter is threaded directly into the leg blood clot to deliver clot-dissolving medications (tPA), combined with temporary IVC filter placement to catch floating clots and prevent fatal pulmonary embolism.",
    indications: [
      "Extensive iliofemoral DVT causing severe leg swelling, pain, and cyanosis",
      "Phlegmasia cerulea dolens (threatened limb circulation due to massive clot)",
      "High risk of fatal pulmonary embolism (PE)",
      "Contraindication to standard anticoagulation blood thinners"
    ],
    protocol: [
      "Popliteal vein behind the knee (or jugular vein) is accessed under ultrasound.",
      "Temporary IVC filter is deployed in the inferior vena cava to block clot migration to lungs.",
      "A multi-sidehole catheter is embedded throughout the length of the thrombus.",
      "Targeted pulse-spray or continuous low-dose tPA dissolves the clot over hours.",
      "Follow-up venogram evaluates vein lumen; underlying vein narrowing is ballooned/stented.",
      "IVC filter is retrieved once clot is cleared."
    ],
    advantages: [
      "Rapidly restores venous drainage and eliminates agonizing leg swelling",
      "Drastically cuts the risk of lifelong Post-Thrombotic Syndrome (PTS leg ulcers)",
      "IVC filter provides 100% protection against lethal pulmonary embolism",
      "Prevents permanent valve destruction in the deep veins",
      "Minimally invasive pinhole catheter treatment"
    ],
    recovery: "Leg swelling decreases within 24 hours. Normal mobility restored under compression therapy."
  }
};

// Open Procedure Detail Modal
function openProcedureDetail(procId) {
  const data = proceduresData[procId];
  if (!data) return;

  const modal = document.getElementById('procedureDetailModal');
  if (!modal) return;

  // Populate Header
  document.getElementById('pModalCategory').textContent = data.category;
  document.getElementById('pModalTitle').textContent = data.title;

  // Populate Metrics
  document.getElementById('pMetricDuration').textContent = data.duration;
  document.getElementById('pMetricAnesthesia').textContent = data.anesthesia;
  document.getElementById('pMetricStay').textContent = data.stay;
  document.getElementById('pMetricIncision').textContent = data.incision;

  // Populate Overview
  document.getElementById('pModalOverview').textContent = data.overview;

  // Populate Indications List
  const indList = document.getElementById('pModalIndications');
  if (indList) {
    indList.innerHTML = data.indications.map(item => `<li>${item}</li>`).join('');
  }

  // Populate Protocol List
  const protList = document.getElementById('pModalProtocol');
  if (protList) {
    protList.innerHTML = data.protocol.map((step, idx) => `
      <div style="display:flex;gap:12px;margin-bottom:10px;align-items:flex-start;">
        <span style="background:var(--teal);color:#fff;width:24px;height:24px;min-width:24px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:700;">${idx+1}</span>
        <p style="margin:0;font-size:13.5px;color:var(--ink);">${step}</p>
      </div>
    `).join('');
  }

  // Populate Advantages List
  const advList = document.getElementById('pModalAdvantages');
  if (advList) {
    advList.innerHTML = data.advantages.map(adv => `<li>${adv}</li>`).join('');
  }

  // Populate Recovery
  const recEl = document.getElementById('pModalRecovery');
  if (recEl) {
    recEl.textContent = data.recovery;
  }

  // Attach procedure to booking button
  const bookBtn = document.getElementById('pModalBookBtn');
  if (bookBtn) {
    bookBtn.setAttribute('data-proc', data.title);
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProcedureDetail() {
  const modal = document.getElementById('procedureDetailModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function bookProcedureFromModal() {
  const bookBtn = document.getElementById('pModalBookBtn');
  const procName = bookBtn ? bookBtn.getAttribute('data-proc') : '';
  closeProcedureDetail();
  openBooking(procName);
}

// Live Search & Category Filter for Procedures Grid
function filterProceduresGrid() {
  const searchInput = document.getElementById('procedureSearch');
  const term = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const activePill = document.querySelector('.procedure-pill.active');
  const cat = activePill ? activePill.getAttribute('data-filter') : 'all';

  const cards = document.querySelectorAll('.proc-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const title = (card.getAttribute('data-title') || '').toLowerCase();
    const cardCat = card.getAttribute('data-category') || '';
    const desc = (card.getAttribute('data-desc') || '').toLowerCase();

    const matchesSearch = !term || title.includes(term) || desc.includes(term);
    const matchesCat = (cat === 'all') || (cardCat === cat);

    if (matchesSearch && matchesCat) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const countEl = document.getElementById('procedureResultsCount');
  if (countEl) {
    countEl.textContent = `Showing ${visibleCount} procedure${visibleCount === 1 ? '' : 's'}`;
  }
}

function selectProcedureCategory(catKey, btn) {
  document.querySelectorAll('.procedure-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  filterProceduresGrid();
}


// ==========================================
// DISEASES & CONDITIONS DATABASE (CLINICAL DETAIL)
// ==========================================
const diseasesData = {
  "varicose-veins": {
    id: "varicose-veins",
    category: "Vascular Health & Circulation",
    title: "Varicose Veins & Chronic Venous Insufficiency",
    tagline: "Incompetent venous valves causing blood pooling, leg heaviness, swelling, and non-healing ulcers.",
    metrics: {
      prevalence: "30%+ Adults",
      treatment: "Daycare EVLA / VenaSeal",
      successRate: "98%+ Vein Closure",
      recovery: "Walk immediately"
    },
    overview: "Varicose veins occur when the one-way valves inside your leg veins become weakened or diseased. Rather than pumping blood upward toward the heart, blood flows backward and pools in the lower legs under high pressure (venous reflux). Over time, this chronic venous hypertension stretches veins into bulging, twisted cords and causes progressive skin damage, swelling, and painful open ulcers.",
    symptoms: [
      "Aching, heavy, tired, or throbbing legs worsening toward evening",
      "Bulging, ropy, twisted purple or dark blue veins visible on legs",
      "Swelling of ankles and lower calves after prolonged sitting or standing",
      "Restless legs and sharp nighttime calf muscle cramps",
      "Red, dry, itchy skin dermatitis (venous eczema)",
      "Dark brown or rusty skin pigmentation around ankles and shins",
      "Active, non-healing venous stasis ulcers near the ankle bone"
    ],
    whyAvoidSurgery: "Conventional vein stripping surgery requires incisions in the groin and calf, physically tearing veins out of the leg under general anesthesia. It causes heavy tissue trauma, nerve injury risks, severe bruising, permanent scars, and requires 3 to 4 weeks of painful bed rest. Modern pinhole IR treats the disease completely without surgery.",
    irSolutions: [
      {
        name: "EVLA (Endovenous Laser Ablation)",
        desc: "A hair-thin laser fiber is inserted under ultrasound guidance via a 1.5mm pinhole to thermally seal the refluxing saphenous vein shut."
      },
      {
        name: "VenaSeal Medical Adhesive Closure",
        desc: "An advanced biocompatible medical glue seals the diseased vein shut instantly with zero heat, zero tumescent injections, and no compression stockings required."
      },
      {
        name: "Ultrasound-Guided Foam Sclerotherapy",
        desc: "A specialized micro-foam sclerosant collapses smaller branch varices and spider veins for complete medical and cosmetic resolution."
      }
    ],
    benefits: [
      "100% pinhole puncture—zero surgical incisions, cuts, or scars",
      "Performed under gentle local numbing anesthesia",
      "30 to 45 minutes total daycare procedure",
      "Walk into the clinic, walk out walking immediately without assistance",
      "Resume work and daily activities within 24 to 48 hours"
    ],
    relatedProcedureId: "varicose-veins"
  },
  "uterine-fibroids": {
    id: "uterine-fibroids",
    category: "Women's Health & Fertility Preservation",
    title: "Uterine Fibroids & Adenomyosis",
    tagline: "Benign muscular tumors causing heavy menstrual bleeding, anemia, and intense pelvic pressure.",
    metrics: {
      prevalence: "Affects 40%+ Women",
      treatment: "UFE (Pinhole Embolization)",
      successRate: "90%+ Symptom Relief",
      recovery: "1–2 Days Rest (Saves Uterus)"
    },
    overview: "Uterine Fibroids (leiomyomas) are non-cancerous muscular tumors that grow within the walls of the uterus, while adenomyosis occurs when uterine lining tissue infiltrates the muscular wall. Both conditions develop massive blood supplies, resulting in severe heavy periods (menorrhagia), debilitating cramps, chronic pelvic fullness, and severe iron-deficiency anemia.",
    symptoms: [
      "Excessively heavy periods soaking multiple sanitary pads per hour",
      "Passing large blood clots during menstruation",
      "Bleeding lasting longer than 7 to 10 days",
      "Severe menstrual cramping and chronic dull pelvic ache",
      "Pelvic fullness, bloated sensation, or feeling of abdomen expansion",
      "Frequent daytime and nighttime urination due to bladder compression",
      "Severe chronic fatigue, lethargy, and anemia due to blood loss"
    ],
    whyAvoidSurgery: "Hysterectomy (surgical removal of the uterus) causes irreversible loss of childbearing ability, sudden surgical menopause, pelvic floor organ prolapse risks, long painful recovery, and deep psychological impact. UFE offers complete non-surgical fibroid cure while keeping your uterus 100% intact.",
    irSolutions: [
      {
        name: "UFE / UAE (Uterine Fibroid Embolization)",
        desc: "Guided by real-time fluoroscopic imaging, an ultra-thin microcatheter is navigated via a pinhole in the wrist or groin into the uterine arteries. Tiny spherical micro-particles are delivered to block the arterial blood supply feeding the fibroids."
      },
      {
        name: "Targeted Fibroid Infarction",
        desc: "Deprived of oxygenated blood, fibroids shrink by 60% to 80% and soften, stopping abnormal bleeding within 1 to 2 menstrual cycles while leaving normal uterine muscle healthy."
      }
    ],
    benefits: [
      "Uterus remains completely healthy and intact—no organ removal",
      "No large abdominal incisions, bikini cuts, or surgical scarring",
      "Rapid cessation of heavy, flooding menstrual periods",
      "Significant relief from pelvic pain, cramps, and urinary pressure",
      "Fast recovery—return to work within 4 to 7 days"
    ],
    relatedProcedureId: "fibroid-ufe"
  },
  "enlarged-prostate": {
    id: "enlarged-prostate",
    category: "Men's Health & Urology",
    title: "Enlarged Prostate (BPH)",
    tagline: "Benign prostate swelling pinching the urethra and obstructing urinary bladder emptying.",
    metrics: {
      prevalence: "50%+ Men Over 50",
      treatment: "Prostate Artery Embolization (PAE)",
      successRate: "88%+ IPSS Score Drop",
      recovery: "Daycare (Zero Impotence)"
    },
    overview: "Benign Prostatic Hyperplasia (BPH) is the non-cancerous enlargement of the prostate gland. As the central prostate tissue expands, it chokes the urethra like a clamped garden hose. The urinary bladder must pump against heavy resistance, resulting in urinary hesitancy, nighttime awakenings, bladder stones, and acute painful urinary retention.",
    symptoms: [
      "Weak, thin, or hesitant urine stream",
      "Waking 3 to 6 times every night to pass urine (nocturia)",
      "Sudden, urgent need to urinate with occasional dribbling or leakage",
      "Sensation that the bladder has never completely emptied",
      "Straining or prolonged waiting for urination to start",
      "Sudden total urinary blockage requiring an emergency urinary catheter (Foley)",
      "Recurrent urinary tract infections (UTIs) or blood in the urine"
    ],
    whyAvoidSurgery: "Surgical TURP (cutting out prostate tissue through the penis) carries significant risks of permanent retrograde ejaculation, sexual erectile dysfunction, urethral strictures, bleeding, and urinary incontinence. PAE is completely non-surgical and performed entirely from the outside.",
    irSolutions: [
      {
        name: "PAE (Prostate Artery Embolization)",
        desc: "Through a 2mm pinhole in the wrist or groin, a high-precision microcatheter enters the microscopic prostatic arteries feeding both prostate lobes. Microscopic embolic beads block blood flow, causing the enlarged gland to shrink naturally by 30% to 40%."
      }
    ],
    benefits: [
      "Zero cuts or surgical instruments through the penis or urethra",
      "Preserves full sexual function with zero risk of retrograde ejaculation or impotence",
      "Zero risk of urinary incontinence or bladder sphincter injury",
      "Safe for elderly patients or men taking blood-thinning cardiac medications",
      "Enables permanent removal of urinary catheters and restores restful sleep"
    ],
    relatedProcedureId: "prostate-pae"
  },
  "knee-osteoarthritis": {
    id: "knee-osteoarthritis",
    category: "Joints & Musculoskeletal Care",
    title: "Knee Osteoarthritis & Chronic Joint Pain",
    tagline: "Chronic joint inflammation driven by abnormal genicular neo-vessels causing severe knee pain.",
    metrics: {
      prevalence: "Leading Disability Cause",
      treatment: "Genicular Artery Embolization (GAE)",
      successRate: "80%+ Pain Reduction",
      recovery: "Walk Same Day"
    },
    overview: "Knee osteoarthritis is not merely mechanical cartilage wear; joint damage stimulates the abnormal proliferation of microscopic new blood vessels (hypervascularity) within the joint lining (synovium) along with sensitive sensory nerve endings. These hyperactive vessels continuously release inflammatory chemicals, generating relentless, throbbing knee pain.",
    symptoms: [
      "Aching knee pain when walking, climbing stairs, or getting up from chairs",
      "Morning knee joint stiffness lasting over 30 minutes",
      "Swelling, tenderness, and localized warmth around the knee joint",
      "Clicking, popping, or grinding sensations (crepitus) on movement",
      "Inability to walk long distances without pain or a walking stick",
      "Diminishing relief from painkiller tablets, physiotherapy, or gel/PRP injections",
      "Desire to postpone or completely avoid total knee replacement surgery"
    ],
    whyAvoidSurgery: "Total Knee Replacement (TKR) is major invasive orthopedic surgery involving bone sawing, metal/plastic prosthesis implantation, blood loss, infection risks, and months of painful rehabilitation. GAE treats the underlying inflammation non-surgically.",
    irSolutions: [
      {
        name: "GAE (Genicular Artery Embolization)",
        desc: "Under high-definition Cath Lab fluoroscopy, a hair-thin catheter is navigated to the genicular arteries supplying the knee. Tiny microscopic particles selectively plug the abnormal inflammatory neo-vessels, extinguishing pain signals while leaving normal bone and muscle circulation untouched."
      }
    ],
    benefits: [
      "Completely non-surgical—no bone cutting, no implants, no hospital stay",
      "Provides rapid, lasting pain relief lasting 1 to 3+ years",
      "Significantly reduces or eliminates dependency on toxic painkiller medications",
      "Delays or prevents the need for artificial joint replacement surgery",
      "Walk home within hours of the procedure under local numbing"
    ],
    relatedProcedureId: "knee-gae"
  },
  "thyroid-nodules": {
    id: "thyroid-nodules",
    category: "Endocrine & Neck Health",
    title: "Thyroid Nodules & Neck Goitres",
    tagline: "Solid or cystic thyroid lumps causing visible neck swelling, swallowing issues, and cosmetic distress.",
    metrics: {
      prevalence: "In up to 50% Adults",
      treatment: "Thyroid RFA / Microwave",
      successRate: "85–90% Nodule Shrinkage",
      recovery: "Zero Neck Scars (30 Mins)"
    },
    overview: "Thyroid nodules are solid or fluid-filled lumps that form within the thyroid gland at the base of the neck. While over 95% of nodules are benign (non-cancerous, confirmed by FNAC biopsy), nodules larger than 2cm create visible neck disfigurement, a sensation of throat constriction, difficulty swallowing solids, or chronic coughing.",
    symptoms: [
      "Noticeable swelling or lump at the front of the neck that moves when swallowing",
      "Sensation of tightness, pressure, or a 'lump in the throat' (globus sensation)",
      "Difficulty or discomfort swallowing dry or solid foods (dysphagia)",
      "Frequent throat clearing or unexplained mild voice alteration",
      "Cosmetic self-consciousness and neck asymmetry",
      "Fear of a visible surgical scar on the front of the neck"
    ],
    whyAvoidSurgery: "Open thyroidectomy requires a 5 to 7 cm neck incision that leaves a permanent, highly visible scar. It carries risks of injuring the recurrent laryngeal nerve (permanent vocal cord hoarseness), damages the parathyroid glands (calcium imbalance), and forces the patient to take daily thyroid hormone replacement pills for life.",
    irSolutions: [
      {
        name: "Thyroid RFA (Radiofrequency Ablation)",
        desc: "Using high-resolution real-time ultrasound guidance, a specialized internally cooled electrode needle is introduced through a microscopic skin puncture. High-frequency alternating current causes thermal destruction of the nodule from the inside out."
      },
      {
        name: "Natural Body Absorption",
        desc: "Treated nodule tissue is gradually resorbed by the body's natural immune scavengers over 3 to 12 months, shrinking the nodule volume by 80% to 90%."
      }
    ],
    benefits: [
      "Zero surgical cuts, stitches, or visible neck scars—only a tiny needle poke",
      "100% preservation of healthy thyroid gland function—no lifelong hormone tablets",
      "Zero risk of permanent voice change or vocal cord nerve damage",
      "Quick 30-minute daycare procedure performed under local numbing",
      "Same-day discharge with immediate return to regular activities"
    ],
    relatedProcedureId: "thyroid-rfa"
  },
  "varicocele": {
    id: "varicocele",
    category: "Men's Health & Urology",
    title: "Varicocele & Male Infertility",
    tagline: "Abnormally dilated scrotal veins elevating testicular heat and damaging sperm parameters.",
    metrics: {
      prevalence: "40% Men with Infertility",
      treatment: "Varicocele Catheter Embolization",
      successRate: "95%+ Vein Occlusion",
      recovery: "24 Hours Return to Normal"
    },
    overview: "A varicocele is an abnormal network of dilated, incompetent veins (the pampiniform venous plexus) within the scrotum, most commonly on the left side. Blood pooling generates excessive testicular warmth and oxidative stress, degrading sperm concentration, motility, and DNA fragmentation, often accompanied by chronic scrotal dragging pain.",
    symptoms: [
      "Dull, dragging ache or heaviness in the scrotum, worsening after standing",
      "Visible or palpable mass resembling a 'bag of worms' above the testicle",
      "Suboptimal semen analysis reports (low sperm count, poor motility, abnormal forms)",
      "Unexplained primary or secondary couple infertility",
      "Shrinking (atrophy) of the affected testicle",
      "Scrotal discomfort aggravated by gym exercise or hot weather"
    ],
    whyAvoidSurgery: "Open or laparoscopic varicocelectomy involves painful groin or lower abdominal incisions, dissecting delicate spermatic cord structures with risks of accidental testicular artery damage, hydrocele formation (fluid buildup requiring another surgery), and high infection rates.",
    irSolutions: [
      {
        name: "Varicocele Catheter Embolization",
        desc: "Through a 2mm pinhole in the wrist or neck, a microcatheter is steered directly into the internal spermatic vein under fluoroscopic guidance. Miniature platinum coils and medical sclerosant block the incompetent vein permanently, diverting blood into healthy pathways."
      }
    ],
    benefits: [
      "No surgical incision or stitches in the groin or scrotum",
      "Zero risk of hydrocele formation or testicular artery compromise",
      "Significant improvement in sperm count, morphology, and pregnancy rates within 3 to 6 months",
      "Daycare procedure under local anesthesia; resume light work the very next day",
      "Over 95% technical success with near-zero recurrence rates"
    ],
    relatedProcedureId: "varicocele"
  },
  "dvt": {
    id: "dvt",
    category: "Vascular Emergency & Clot Care",
    title: "Deep Vein Thrombosis (DVT)",
    tagline: "Dangerous blood clots inside deep leg veins risking fatal pulmonary embolism and chronic disability.",
    metrics: {
      prevalence: "High-Risk Vascular Emergency",
      treatment: "Catheter Thrombolysis & IVC Filter",
      successRate: "Rapid Clot Clearance",
      recovery: "Prevents Leg Disability"
    },
    overview: "Deep Vein Thrombosis (DVT) occurs when a solid blood clot forms in the major deep veins of the calf, thigh, or pelvis. If a clot breaks loose, it travels through the heart to plug the lungs (Pulmonary Embolism - PE), which can be fatal. If left in the leg, the clot permanently scars vein valves, leading to chronic lifelong pain, swelling, and ulcers (Post-Thrombotic Syndrome).",
    symptoms: [
      "Sudden, dramatic swelling of one entire calf or thigh",
      "Intense throbbing pain, cramping, or severe tenderness when walking",
      "Skin feels noticeably hot, tight, and red or bluish in appearance",
      "Superficial veins on the leg become visibly engorged and prominent",
      "Warning signs of Pulmonary Embolism: sudden shortness of breath, sharp chest pain, coughing blood"
    ],
    whyAvoidSurgery: "Open surgical vein opening is traumatic and carries high re-thrombosis rates. Relying solely on blood-thinner tablets can take months to dissolve the clot and leaves over 50% of patients with permanent Post-Thrombotic Syndrome leg disability. Pinhole IR actively clears the clot immediately.",
    irSolutions: [
      {
        name: "Catheter-Directed Thrombolysis (CDT) & Suction Thrombectomy",
        desc: "A specialized multi-sidehole catheter or suction device is advanced directly into the clot via a tiny pinhole behind the knee. Clot-busting medication (rTPA) or mechanical vacuum extraction clears the obstruction within hours."
      },
      {
        name: "IVC Filter Placement & Retrieval",
        desc: "A tiny umbrella-shaped titanium filter is positioned in the inferior vena cava to intercept any migrating clots before they can reach the heart or lungs, protecting patient life."
      }
    ],
    benefits: [
      "Rapid restoration of blood flow and immediate reduction of leg swelling",
      "Lifesaving protection against deadly pulmonary embolism",
      "Preserves delicate venous valve leaflets to prevent lifelong swollen leg syndrome",
      "Minimally invasive pinhole procedure performed in our modern Cath Lab suite"
    ],
    relatedProcedureId: "dvt-thrombolysis"
  },
  "diabetic-foot": {
    id: "diabetic-foot",
    category: "Vascular Health & Circulation",
    title: "Diabetic Foot & Peripheral Arterial Disease (PAD)",
    tagline: "Severe arterial blockages choking blood flow to the lower legs, triggering gangrene and amputation threats.",
    metrics: {
      prevalence: "20%+ Diabetics Over 50",
      treatment: "Peripheral Angioplasty & Stenting",
      successRate: "90%+ Limb Salvage",
      recovery: "Restores Rapid Healing"
    },
    overview: "Diabetes and smoking cause accelerated atherosclerosis, encrusting leg and foot arteries with dense calcium plaques. When blood flow drops below critical levels, muscles and skin starve for oxygen. Small foot blisters or cracks cannot heal without oxygenated blood, rapidly turning into deep infected ulcers, black gangrene, and amputation threats.",
    symptoms: [
      "Severe calf or thigh cramps that force you to stop walking (intermittent claudication)",
      "Agonizing foot or toe pain that awakens you from sleep (ischemic rest pain)",
      "Feet that feel cold to the touch and appear pale or dusky purple",
      "Loss of hair on the lower legs, thick brittle toenails, and thin shiny skin",
      "Non-healing foot blisters, cracks, or deep ulcers around toes and heels",
      "Blackened, dead tissue (gangrene) on toes facing surgical amputation"
    ],
    whyAvoidSurgery: "Open surgical arterial bypass requires harvesting leg veins and making long surgical wounds in frail diabetic patients. These surgical incisions frequently fail to heal, get infected, and cause severe cardiac strain. Pinhole angioplasty restores arterial flow without open surgical wounds.",
    irSolutions: [
      {
        name: "Peripheral Balloon Angioplasty & Drug-Eluting Stents",
        desc: "Under Cath Lab digital subtraction angiography (DSA), miniature balloon catheters and specialized flexible nitinol stents are guided across tight arterial blockages, expanding narrowed arteries down to the foot."
      }
    ],
    benefits: [
      "Saves feet and limbs from surgical amputation in over 90% of critical cases",
      "Immediately relieves agonizing nighttime ischemic foot pain",
      "Delivers oxygenated blood directly to foot ulcers for rapid healing",
      "Performed under gentle local numbing through a 2mm pinhole in the groin or foot",
      "Patients usually return home within 24 to 48 hours"
    ],
    relatedProcedureId: "varicose-veins"
  },
  "liver-tumors": {
    id: "liver-tumors",
    category: "Oncology & Liver Care",
    title: "Liver Tumors (HCC & Metastases)",
    tagline: "Primary and metastatic liver cancers requiring targeted, organ-sparing interventional therapy.",
    metrics: {
      prevalence: "Leading GI Oncology Challenge",
      treatment: "TACE, TARE & Microwave Ablation",
      successRate: "High Tumor Necrosis",
      recovery: "Organ-Sparing Daycare"
    },
    overview: "Hepatocellular Carcinoma (HCC) and secondary liver metastases (from colorectal or neuroendocrine cancers) frequently cannot be surgically removed because of tumor location, multifocal disease, or underlying liver cirrhosis. Interventional Oncology offers powerful, targeted therapies that attack tumors directly through their arterial blood supply.",
    symptoms: [
      "Dull ache or fullness in the right upper abdomen under the ribs",
      "Unexplained rapid weight loss, poor appetite, and chronic exhaustion",
      "Elevated cancer blood markers (Alpha-Fetoprotein AFP, CEA, CA19-9)",
      "Yellowing of the eyes and skin (jaundice) or fluid accumulation in the belly",
      "Incidental discovery of suspicious liver mass lesions on ultrasound or CT scans"
    ],
    whyAvoidSurgery: "Major open liver resection involves removing significant liver lobes and carries high mortality risks in cirrhotic patients, heavy bleeding, and lengthy ICU stays. Systemic chemotherapy causes severe whole-body toxicity, nausea, hair loss, and immune suppression. Interventional oncology delivers targeted treatment directly to the cancer.",
    irSolutions: [
      {
        name: "TACE (Transarterial Chemoembolization)",
        desc: "A microcatheter is steered directly into the tumor's feeding arteries. High-concentration chemotherapy mixed with Lipiodol is injected directly into the tumor, followed by embolic particles that trap the drug inside and starve the cancer."
      },
      {
        name: "Microwave / Cryoablation",
        desc: "A specialized needle probe is inserted directly into the tumor under CT/ultrasound guidance, delivering thermal heat or freezing cold to ablate and kill malignant cells with millimeter precision."
      },
      {
        name: "TARE (Yttrium-90 Radioembolization)",
        desc: "Millions of microscopic radioactive glass or resin microspheres deliver intense, targeted internal radiation directly into the tumor bed."
      }
    ],
    benefits: [
      "Delivers up to 20x higher cancer-fighting potency directly to tumors without whole-body toxicity",
      "Zero hair loss and minimal nausea compared to systemic intravenous chemotherapy",
      "Extends survival and maintains excellent functional quality of life",
      "Minimally invasive pinhole procedure requiring only 1 to 2 days hospital stay"
    ],
    relatedProcedureId: "liver-tace"
  },
  "brain-stroke": {
    id: "brain-stroke",
    category: "Neuro-Intervention & Stroke Emergency",
    title: "Brain Aneurysm & Acute Ischemic Stroke",
    tagline: "Dangerous cerebral vessel ballooning, severe neck stenosis, and acute stroke clot blockages.",
    metrics: {
      prevalence: "Leading Cause of Disability",
      treatment: "Thrombectomy & Coiling",
      successRate: "High Recanalization",
      recovery: "Golden Hour Pinhole Care"
    },
    overview: "Neurovascular conditions affect the critical blood vessels feeding the brain. A brain aneurysm is a weak, ballooned pouch in a cerebral artery that risks rupture and fatal subarachnoid hemorrhage. Acute ischemic stroke occurs when a blood clot suddenly plugs a brain vessel, killing 1.9 million brain cells every minute. Carotid stenosis narrows the main neck arteries, setting the stage for major stroke events.",
    symptoms: [
      "Sudden, explosive 'worst headache of your life' (aneurysm rupture warning)",
      "FAST Stroke Warning: Facial droop, arm weakness, slurred speech",
      "Sudden loss of vision in one eye or sudden double vision",
      "Transient Ischemic Attacks (TIAs / mini-strokes) with temporary paralysis or numbness",
      "Sudden loss of balance, coordination, or unexplained confusion"
    ],
    whyAvoidSurgery: "Open brain surgery (craniotomy) requires cutting open the skull, retracting delicate brain tissue, and carries significant neurological morbidity and weeks of ICU recovery. Endovascular neuro-intervention repairs vessels from the inside through a tiny wrist or groin puncture.",
    irSolutions: [
      {
        name: "Mechanical Thrombectomy for Acute Stroke",
        desc: "In acute ischemic stroke within the golden window, a stent retriever or suction microcatheter is guided to the blocked brain artery to capture and physically extract the clot, restoring blood flow instantly."
      },
      {
        name: "Brain Aneurysm Coiling & Flow Diverters",
        desc: "Microscopic platinum coils or flow-diverting stents are placed inside or across the aneurysm neck, sealing the pouch and permanently preventing rupture."
      },
      {
        name: "Carotid Angioplasty & Stenting",
        desc: "A protective filter catches loose debris while a stent props open the narrowed neck artery, safeguarding against future strokes."
      }
    ],
    benefits: [
      "Reaches delicate brain blood vessels without touching skull bone or scalp",
      "Restores brain blood flow during acute stroke, dramatically reversing paralysis",
      "Drastically reduces long-term disability, nursing home dependency, and mortality",
      "State-of-the-art biplane Cath Lab endovascular treatment"
    ],
    relatedProcedureId: "thrombectomy"
  },
  "pelvic-congestion": {
    id: "pelvic-congestion",
    category: "Women's Health & Fertility Preservation",
    title: "Pelvic Congestion Syndrome (Chronic Pelvic Pain)",
    tagline: "Incompetent ovarian and internal iliac veins causing deep pelvic varicose veins and chronic pain.",
    metrics: {
      prevalence: "15–30% Women with Pelvic Pain",
      treatment: "Ovarian Vein Embolization",
      successRate: "85%+ Long-Term Relief",
      recovery: "Same-Day Daycare"
    },
    overview: "Pelvic Congestion Syndrome (PCS) is the pelvic equivalent of varicose veins in the legs. Faulty valves in the ovarian and internal iliac veins permit blood to pool backward under gravity. This creates swollen, engorged varicose veins around the uterus, ovaries, and bladder. Women frequently suffer for years with debilitating chronic pelvic pain, despite repeatedly normal routine pelvic ultrasound scans.",
    symptoms: [
      "Chronic, dull, heavy pelvic ache lasting longer than 6 months",
      "Pelvic pain worsening toward the end of the day or after prolonged standing",
      "Deep, severe pain during or after sexual intercourse (dyspareunia)",
      "Painful, agonizing menstrual periods (dysmenorrhea)",
      "Unexplained pelvic fullness, lower back ache, or irritable bladder feelings",
      "Visible varicose veins appearing in the upper thighs, buttocks, or vulvar area"
    ],
    whyAvoidSurgery: "Open surgical vein ligation or hysterectomy is invasive, carries surgical wound risks, and frequently fails to eliminate pelvic pain because deep pelvic collateral pathways remain open. Pinhole embolization seals the exact refluxing vessels with high precision.",
    irSolutions: [
      {
        name: "Ovarian Vein Catheter Embolization",
        desc: "Through a tiny 2mm pinhole in the wrist or neck, a catheter is gently guided down into the ovarian and pelvic veins under live fluoroscopy. Miniature platinum coils and sclerosing foam are released to seal the leaky veins shut permanently."
      }
    ],
    benefits: [
      "Completely non-surgical, scarless pinhole procedure",
      "Over 85% of women experience significant or total resolution of chronic pelvic pain",
      "Preserves uterus and ovaries completely intact",
      "Comfortable daycare procedure—patients return home the very same afternoon",
      "Restores active lifestyle, intimate comfort, and quality of life"
    ],
    relatedProcedureId: "fibroid-ufe"
  },
  "dialysis-fistula": {
    id: "dialysis-fistula",
    category: "Vascular & Access Care",
    title: "Dialysis AV Fistula Dysfunction & Failure",
    tagline: "Critical narrowing, strictures, or blood clots threatening the kidney patient's hemodialysis lifeline.",
    metrics: {
      prevalence: "Common in Dialysis Patients",
      treatment: "Fistuloplasty & Declotting",
      successRate: "90%+ Fistula Salvage",
      recovery: "Dialysis Next Day"
    },
    overview: "For patients undergoing hemodialysis for kidney failure, an Arteriovenous (AV) Fistula or dialysis graft is their lifeline. Repeated needle punctures and turbulent blood flow cause venous scarring, strictures (stenosis), and clot formation (thrombosis), causing high venous pressure alarms, poor dialysis flow, arm swelling, or sudden fistula shutdown.",
    symptoms: [
      "Inability to achieve prescribed blood flow rate on the dialysis machine",
      "High venous pressure alarms repeatedly sounding during dialysis sessions",
      "Loss of the normal buzzing vibration (thrill) or heart-like sound (bruit) over the fistula",
      "Severe swelling of the arm, face, or chest wall on the side of the fistula",
      "Prolonged bleeding from needle puncture sites after dialysis needles are removed",
      "Complete cessation of blood flow due to an acute blood clot in the fistula"
    ],
    whyAvoidSurgery: "Surgical reconstruction or creating a new fistula consumes limited remaining arm veins, creates new scars, and forces the patient to receive painful temporary neck dialysis catheters with high infection and central vein damage risks. Pinhole fistuloplasty saves your existing access.",
    irSolutions: [
      {
        name: "Pinhole Fistuloplasty (Balloon Angioplasty)",
        desc: "Under live Cath Lab X-ray imaging, high-pressure dilation balloons are inflated across narrowed venous segments, widening strictures and restoring brisk arterial blood flow."
      },
      {
        name: "Catheter Thrombolysis & Mechanical Declotting",
        desc: "For clotted, non-functional fistulas, specialized suction catheters and clot-dissolving medications clear the clot within 45 minutes, bringing the fistula back to life."
      }
    ],
    benefits: [
      "Salvages and preserves your existing dialysis access without wasting irreplaceable veins",
      "Eliminates the immediate need for emergency neck dialysis catheters and lines",
      "Quick 30 to 45 minute daycare procedure performed under local numbing",
      "The salvaged fistula can typically be used for hemodialysis within 24 hours"
    ],
    relatedProcedureId: "dialysis-catheter"
  }
};

// Open Disease Detail Modal
function openDiseaseDetail(diseaseId) {
  const data = diseasesData[diseaseId];
  if (!data) return;

  const modal = document.getElementById('diseaseDetailModal');
  if (!modal) return;

  // Header
  const catEl = document.getElementById('dModalCategory');
  const titleEl = document.getElementById('dModalTitle');
  const tagEl = document.getElementById('dModalTagline');
  if (catEl) catEl.textContent = data.category;
  if (titleEl) titleEl.textContent = data.title;
  if (tagEl) tagEl.textContent = data.tagline;

  // Metrics
  const mPrev = document.getElementById('dMetricPrevalence');
  const mTreat = document.getElementById('dMetricTreatment');
  const mSucc = document.getElementById('dMetricSuccess');
  const mRec = document.getElementById('dMetricRecovery');
  if (mPrev) mPrev.textContent = data.metrics.prevalence;
  if (mTreat) mTreat.textContent = data.metrics.treatment;
  if (mSucc) mSucc.textContent = data.metrics.successRate;
  if (mRec) mRec.textContent = data.metrics.recovery;

  // Overview
  const overEl = document.getElementById('dModalOverview');
  if (overEl) overEl.textContent = data.overview;

  // Symptoms List
  const sympList = document.getElementById('dModalSymptoms');
  if (sympList) {
    sympList.innerHTML = data.symptoms.map(s => `<li>${s}</li>`).join('');
  }

  // Why Surgery Avoided
  const surgEl = document.getElementById('dModalSurgery');
  if (surgEl) surgEl.textContent = data.whyAvoidSurgery;

  // IR Solutions
  const solEl = document.getElementById('dModalSolutions');
  if (solEl) {
    solEl.innerHTML = data.irSolutions.map(sol => `
      <div style="background:#f4f7f6;border-left:3px solid var(--teal);padding:12px 16px;border-radius:6px;margin-bottom:10px;">
        <strong style="color:var(--teal-dark);font-size:14px;display:block;margin-bottom:4px;">${sol.name}</strong>
        <p style="margin:0;font-size:13px;color:var(--ink);line-height:1.6;">${sol.desc}</p>
      </div>
    `).join('');
  }

  // Benefits
  const benList = document.getElementById('dModalBenefits');
  if (benList) {
    benList.innerHTML = data.benefits.map(b => `<li>${b}</li>`).join('');
  }

  // Booking button
  const bookBtn = document.getElementById('dModalBookBtn');
  if (bookBtn) {
    bookBtn.setAttribute('data-disease', data.title);
  }

  // Related Procedure Link
  const procLink = document.getElementById('dModalProcLink');
  if (procLink) {
    if (data.relatedProcedureId) {
      procLink.style.display = 'inline-flex';
      procLink.href = `treatments.html?proc=${data.relatedProcedureId}`;
    } else {
      procLink.style.display = 'none';
    }
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDiseaseDetail() {
  const modal = document.getElementById('diseaseDetailModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function bookDiseaseFromModal() {
  const bookBtn = document.getElementById('dModalBookBtn');
  const diseaseName = bookBtn ? bookBtn.getAttribute('data-disease') : '';
  closeDiseaseDetail();
  openBooking(diseaseName);
}

// Live Search & Category Filter for Conditions Grid
function filterConditionsGrid() {
  const searchInput = document.getElementById('conditionSearch');
  const term = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const activePill = document.querySelector('.condition-pill.active');
  const cat = activePill ? activePill.getAttribute('data-filter') : 'all';

  const cards = document.querySelectorAll('.condition-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const title = (card.getAttribute('data-title') || '').toLowerCase();
    const cardCat = card.getAttribute('data-category') || '';
    const desc = (card.getAttribute('data-desc') || '').toLowerCase();

    const matchesSearch = !term || title.includes(term) || desc.includes(term);
    const matchesCat = (cat === 'all') || (cardCat === cat);

    if (matchesSearch && matchesCat) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const countEl = document.getElementById('conditionResultsCount');
  if (countEl) {
    countEl.textContent = `Showing ${visibleCount} condition${visibleCount === 1 ? '' : 's'} • Click any card for full disease details`;
  }
}

function selectConditionCategory(catKey, btn) {
  document.querySelectorAll('.condition-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  filterConditionsGrid();
}

// Global Escape Key Listener for Modals
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (typeof closeProcedureDetail === 'function') closeProcedureDetail();
    if (typeof closeDiseaseDetail === 'function') closeDiseaseDetail();
    if (typeof closeBooking === 'function') closeBooking();
  }
});

// Deep Link Auto-Open Check on Load (?disease=... or ?proc=...)
document.addEventListener('DOMContentLoaded', function() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const diseaseParam = urlParams.get('disease');
    const procParam = urlParams.get('proc');
    const hash = window.location.hash.replace('#', '');

    if (diseaseParam && typeof openDiseaseDetail === 'function') {
      setTimeout(() => openDiseaseDetail(diseaseParam), 350);
    } else if (procParam && typeof openProcedureDetail === 'function') {
      setTimeout(() => openProcedureDetail(procParam), 350);
    } else if (hash) {
      if (typeof diseasesData !== 'undefined' && diseasesData[hash] && typeof openDiseaseDetail === 'function') {
        setTimeout(() => openDiseaseDetail(hash), 350);
      } else if (typeof proceduresData !== 'undefined' && proceduresData[hash] && typeof openProcedureDetail === 'function') {
        setTimeout(() => openProcedureDetail(hash), 350);
      }
    }
  } catch (err) {
    console.error('Error parsing deep-link modal query:', err);
  }
});
