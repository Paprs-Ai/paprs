export type Language = "en" | "es" | "ca";

export interface Translations {
  nav: {
    reality: string;
    howItWorks: string;
    autonomoEngine: string;
    intelligence: string;
    europe: string;
    faq: string;
    career: string;
    waitlist: string;
    joinWaitlist: string;
    overview: string;
    actionPlan: string;
    vault: string;
    assistant: string;
  };
  hero: {
    withoutPaprs: string;
    withPaprs: string;
    headlineLeft: string;
    descLeft: string;
    headlineRight: string;
    descRight: string;
    getStarted: string;
    scroll: string;
    scrollToContinue: string;
  };
  pain: {
    slideLabels: string[];
    // Slide 0
    mondayTime: string;
    moveDone: string;
    moveDoneSub: string;
    employerAsks: string;
    alertOneQuestion: string;
    // Slide 1
    search1Tag: string;
    beforeTheForm: string;
    beforeTheFormSub: string;
    euOrNonEu: string;
    sameMoveBadge: string;
    procedures: Array<{ name: string; hint: string }>;
    chooseRouteAlert: string;
    // Slide 2
    search2Tag: string;
    appointmentGate: string;
    appointmentGateSub: string;
    portalAsks: string;
    noSlotsStatus: string;
    alt060: string;
    bookingLoopTitle: string;
    painStepsSlide2: Array<{ label: string; sublabel?: string; warning?: string }>;
    // Slide 3
    search3Tag: string;
    similarLanguage: string;
    similarLanguageSub: string;
    formExplanations: string;
    easyToConfuseTitle: string;
    confuseBadges: string[];
    checklistBehindTitle: string;
    painStepsSlide3: Array<{ label: string; sublabel?: string; cost?: string; warning?: string }>;
    // Slide 4
    search4Tag: string;
    addressIsReal: string;
    addressIsRealSub: string;
    leaseExplanation: string;
    alertIncomplete: string;
    flatShareTitle: string;
    painStepsSlide4: Array<{ label: string; sublabel?: string; warning?: string }>;
    // Slide 5
    hiddenWorkloadTag: string;
    hardPartTitle: string;
    hardPartDesc: string;
    repeatedDetailsBullet: string;
    similarAcronymsBullet: string;
    unavailableSlotBullet: string;
    stats: {
      officialSystems: { label: string; sublabel: string };
      similarForms: { label: string; sublabel: string };
      bookingPortals: { label: string; sublabel: string };
      missingSignature: { label: string; sublabel: string };
      repeatedDetails: { label: string; sublabel: string };
      openTabs: { label: string };
    };
    noSingleStep: string;
  };
  howItWorks: {
    slideLabels: string[];
    // Slide 0
    fromConfusionTag: string;
    turnsMazeTitle: string;
    turnsMazeDesc: string;
    pillsSlide0: string[];
    segSocialRouteReady: string;
    // Slide 1
    step01Tag: string;
    tellOnceTitle: string;
    tellOnceDesc: string;
    pillsSlide1: string[];
    // Slide 2
    step02Tag: string;
    phase1Title: string;
    phase1Desc: string;
    phase2Title: string;
    phase2Desc: string;
    phase3Title: string;
    phase3Desc: string;
    phase4Title: string;
    phase4Desc: string;
    pillsSlide2: string[];
    // Slide 3
    step03Tag: string;
    whatDoIDoTitle: string;
    whatDoIDoDesc: string;
    pillsSlide3: string[];
    // Slide 4
    step04Tag: string;
    deadlinesTitle: string;
    deadlinesDesc: string;
    pillsSlide4: string[];
    // Slide 5
    step05Tag: string;
    whoHasTheBallTitle: string;
    whoHasTheBallDesc: string;
    pillsSlide5: string[];
    // Slide 6
    step06Tag: string;
    workingMemoryTitle: string;
    workingMemoryDesc: string;
    pillsSlide6: string[];
    // Slide 7
    step07Tag: string;
    whenLifeChangesTitle: string;
    whenLifeChangesDesc: string;
    pillsSlide7: string[];
    // Slide 8
    step08Tag: string;
    pocketAgencyTitle: string;
    pocketAgencyDesc: string;
    pillsSlide8: string[];
    // Simulator & UI
    analysisComplete: string;
    yourRouteIsReady: string;
    matchedRouteDesc: string;
    assembledActionPlans: string;
    studentRenewal: string;
    studentRenewalDocs: string;
    empadronamiento: string;
    empadronamientoDesc: string;
    socialSecurityNuss: string;
    socialSecurityDesc: string;
    ready: string;
    locked: string;
    active: string;
    buildMyRoadmap: string;
    buildingYourRoute: string;
    aiLogger: {
      matchedRoute: string;
      verifiedForms: string;
      orderedTasks: string;
    };
    filterAll: string;
    filterPending: string;
    filterCompleted: string;
    spainRoute: string;
    checkEvidenceTitle: string;
    checkEvidenceDesc: string;
    reviewFormsTitle: string;
    reviewFormsDesc: string;
    approveSubmissionTitle: string;
    approveSubmissionDesc: string;
    actionPlansBreadcrumb: string;
    matchOfficialRoute: string;
    matchOfficialRouteDesc: string;
    prepareFormFee: string;
    prepareFormFeeDesc: string;
    reviewAndApprove: string;
    reviewAndApproveDesc: string;
    actionReadiness: string;
    doneBadge: string;
    healthMetric: string;
    docsMetric: string;
    targetMetric: string;
    urgentActionAlert: string;
    daysLeft: string;
    urgentRenewalDesc: string;
    reviewPreparedAction: string;
    aiRecommendation: string;
    freshAddressProofNeeded: string;
    freshAddressProofDesc: string;
    prepareFreshCopy: string;
    activeProcedures: string;
    waitingOnCityOffice: string;
    documentVault: string;
    universityEnrolment: string;
    addressCertificate: string;
    verified: string;
    extracted: string;
  };
  autonomo: {
    tag: string;
    title: string;
    slides: Array<{
      tag: string;
      title: string;
      subtitle: string;
      highlight: string;
      details: string[];
    }>;
    taxModels: Array<{
      code: string;
      name: string;
      due: string;
      desc: string;
    }>;
    deductions: Array<{
      label: string;
      pct: string;
    }>;
    taxModelsTitle: string;
    taxModelsSubtitle: string;
    deductionsTitle: string;
    deductionsSubtitle: string;
    invoicingTitle: string;
    invoicingSubtitle: string;
    intelligenceTitle: string;
    intelligenceSubtitle: string;
    launchAssistant: string;
    featureModuleTag: string;
    autoFiledBadge: string;
    deductionIdentified: string;
    netSavings: string;
    issuedFactura: string;
    irpfDeducted: string;
    baseSubtotal: string;
    ivaAdded: string;
    totalReconciled: string;
    netBadge: string;
    agenciaVerified: string;
    trainedRoyalDecree: string;
    gestorComparison: string;
    scrollHint: string;
    compliantBadge: string;
  };
  aiLearns: {
    tag: string;
    title: string;
    p1: string;
    p2: string;
    securityDisclaimer: string;
  };
  countries: {
    tag: string;
    title: string;
    desc: string;
    liveNow: string;
    spain: string;
    available: string;
    q1Label: string;
    q2Label: string;
    q3Label: string;
    moreIn2027: string;
    countryNames: {
      CH: string;
      DE: string;
      FR: string;
      IT: string;
      PT: string;
      NL: string;
      AT: string;
    };
  };
  finalCTA: {
    badge: string;
    title: string;
    desc: string;
    emailPlaceholder: string;
    joining: string;
    youAreOnList: string;
    joinWaitlistBtn: string;
    defaultFeedback: string;
    defaultError: string;
    unexpectedError: string;
    seeHowItWorks: string;
    noSpam: string;
    builtInSpain: string;
    earlyAccessPriority: string;
  };
  footer: {
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
    cookies: string;
  };
  onboarding: {
    title: string;
    subtitle: string;
    steps: Array<{ title: string; subtitle: string }>;
    stepCount: string;
    complete: string;
    stage0: {
      title: string;
      desc: string;
      q1Label: string;
      q1Selected: string;
      q2Label: string;
      q2Option1: string;
      q2Option2: string;
    };
    stage1: {
      title: string;
      desc: string;
      q1Label: string;
      q1Option1: string;
      q1Option2: string;
      q2Label: string;
      q2Option1: string;
      q2Tag: string;
      q2Option2: string;
    };
    stage2: {
      title: string;
      desc: string;
      q1Label: string;
      q1Selected: string;
      q2Label: string;
      q2Option1: string;
      q2Option2: string;
    };
    back: string;
    continue: string;
    buildRoadmap: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
      tag: string;
    }>;
  };
}
