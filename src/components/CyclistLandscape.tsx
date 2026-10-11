export default function CyclistLandscape({ className = '' }: { className?: string }) {
  return (
    <svg id="sibaqSceneSvg" className={`w-full h-full object-contain drop-shadow-sm select-none ${className}`} viewBox="0 0 920 620" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <style>{`
                /* ============================================================
                   SELF-CONTAINED EMBEDDED KEYFRAMES & MOTION SYSTEM
                   Enables autonomous animation when copying or exporting SVG
                   ============================================================ */

                /* 1. Hill Traversal Motion: Moves back-and-forth (~96px) with terrain pitch */
                @keyframes cyclist-traverse-landscape {
                  0% {
                    transform: translate(0px, 0px) rotate(0deg);
                  }
                  26% {
                    transform: translate(48px, -5px) rotate(-1.6deg);
                  }
                  50% {
                    transform: translate(96px, 1.5px) rotate(1.2deg);
                  }
                  74% {
                    transform: translate(44px, -2px) rotate(-0.8deg);
                  }
                  100% {
                    transform: translate(0px, 0px) rotate(0deg);
                  }
                }

                @keyframes cyclist-traverse-compact {
                  0%, 100% { transform: translate(0px, 0px); }
                  50% { transform: translate(32px, -2px); }
                }

                @keyframes cyclist-traverse-wide {
                  0% { transform: translate(0px, 0px) rotate(0deg); }
                  26% { transform: translate(75px, -8px) rotate(-2.2deg); }
                  50% { transform: translate(145px, 2px) rotate(1.8deg); }
                  74% { transform: translate(65px, -3px) rotate(-1.0deg); }
                  100% { transform: translate(0px, 0px) rotate(0deg); }
                }

                /* 2. Independent 360-Degree Continuous Wheel Rotations */
                @keyframes spin-rear-wheel {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }

                @keyframes spin-front-wheel {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }

                /* 3. Rider Cadence Bobbing */
                @keyframes rider-subtle-bob {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-2.8px); }
                }

                /* 4. Bottom Bracket Pedal Crank Cycle */
                @keyframes pedal-crank-cycle {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }

                /* 5. Delicate Rider Hand & Arm Micro-Movement */
                @keyframes rider-hand-small-flex {
                  0%, 100% {
                    transform: rotate(0deg) translate(0px, 0px);
                  }
                  50% {
                    transform: rotate(-2deg) translate(-1.2px, -0.6px);
                  }
                }

                @keyframes rider-arm-flex {
                  0%, 100% {
                    transform: scale(1);
                  }
                  50% {
                    transform: scale(1.015) translateY(-0.8px);
                  }
                }

                /* 6. Soft Sunset Cloud Floating & Drifting */
                @keyframes cloud-float-drift {
                  0%, 100% {
                    transform: translate(0px, 0px);
                  }
                  50% {
                    transform: translate(32px, -3px);
                  }
                }

                @keyframes cloud-float-alt {
                  0%, 100% {
                    transform: translate(0px, 0px);
                  }
                  50% {
                    transform: translate(-22px, 2px);
                  }
                }

                /* 7. Giant Puppet Hand Hover */
                @keyframes puppet-hand-hover {
                  0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                  }
                  50% {
                    transform: translateY(-4px) rotate(-0.3deg);
                  }
                }

                /* 8. Wind Streamline Breeze Drift */
                @keyframes breeze-drift {
                  0% {
                    transform: translateX(-35px);
                    opacity: 0.1;
                  }
                  25% {
                    opacity: 0.85;
                  }
                  75% {
                    opacity: 0.85;
                  }
                  100% {
                    transform: translateX(55px);
                    opacity: 0.1;
                  }
                }

                /* ------------------------------------------------------------
                   CLASS BINDINGS & LOCAL TRANSFORM ORIGINS
                   ------------------------------------------------------------ */
                .anim-traversal {
                  animation: cyclist-traverse-landscape 3.6s ease-in-out infinite;
                  transform-origin: 350px 490px;
                }
                .anim-traversal-compact {
                  animation: cyclist-traverse-compact 2.8s ease-in-out infinite;
                  transform-origin: 350px 490px;
                }
                .anim-traversal-wide {
                  animation: cyclist-traverse-wide 4.2s ease-in-out infinite;
                  transform-origin: 350px 490px;
                }

                .anim-wheel-rear {
                  animation: spin-rear-wheel 1.3s linear infinite;
                  transform-origin: 0px 0px;
                }
                .anim-wheel-front {
                  animation: spin-front-wheel 1.3s linear infinite;
                  transform-origin: 0px 0px;
                }
                .anim-rider-bob {
                  animation: rider-subtle-bob 1.4s ease-in-out infinite;
                  transform-origin: 350px 300px;
                }
                .anim-pedal-crank {
                  animation: pedal-crank-cycle 1.3s linear infinite;
                  transform-origin: 0px 0px;
                }

                .anim-hand-flex {
                  animation: rider-hand-small-flex 2.2s ease-in-out infinite;
                  transform-origin: 470px 225px;
                }
                .anim-arm-flex {
                  animation: rider-arm-flex 2.2s ease-in-out infinite;
                  transform-origin: 350px 110px;
                }

                .anim-cloud-drift-1 {
                  animation: cloud-float-drift 6.8s ease-in-out infinite;
                }
                .anim-cloud-drift-2 {
                  animation: cloud-float-alt 7.6s ease-in-out infinite;
                }

                .anim-puppet-sway {
                  animation: puppet-hand-hover 4.8s ease-in-out infinite;
                  transform-origin: 80px 40px;
                }
                .anim-wind-stream {
                  animation: breeze-drift 4.2s ease-in-out infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                  .anim-traversal,
                  .anim-traversal-compact,
                  .anim-traversal-wide,
                  .anim-wheel-rear,
                  .anim-wheel-front,
                  .anim-rider-bob,
                  .anim-pedal-crank,
                  .anim-hand-flex,
                  .anim-arm-flex,
                  .anim-cloud-drift-1,
                  .anim-cloud-drift-2,
                  .anim-puppet-sway,
                  .anim-wind-stream {
                    animation: none !important;
                  }
                }
              `}</style>

              
              <linearGradient id="skyTwilightGrad" x1="460" y1="20" x2="460" y2="440" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1B498E"/>
                <stop offset="28%" stopColor="#2B5EA7"/>
                <stop offset="55%" stopColor="#4574B7"/>
                <stop offset="78%" stopColor="#9E8CA8"/>
                <stop offset="92%" stopColor="#E88F78"/>
                <stop offset="100%" stopColor="#F7BA8B"/>
              </linearGradient>

              
              <linearGradient id="hillBackGrad" x1="460" y1="390" x2="460" y2="520" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#36496F"/>
                <stop offset="100%" stopColor="#23324F"/>
              </linearGradient>

              <linearGradient id="hillMidGrad" x1="460" y1="410" x2="460" y2="560" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#485D88"/>
                <stop offset="45%" stopColor="#33466B"/>
                <stop offset="100%" stopColor="#1E2A44"/>
              </linearGradient>

              <linearGradient id="hillFrontGrad" x1="460" y1="450" x2="460" y2="600" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#556F9F"/>
                <stop offset="35%" stopColor="#3C5177"/>
                <stop offset="100%" stopColor="#182338"/>
              </linearGradient>

              
              <linearGradient id="puppetHandGrad" x1="120" y1="30" x2="380" y2="280" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF7557"/>
                <stop offset="30%" stopColor="#EB5434"/>
                <stop offset="80%" stopColor="#C83B1D"/>
                <stop offset="100%" stopColor="#9C260D"/>
              </linearGradient>

              
              <linearGradient id="cloudPinkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFA8A0"/>
                <stop offset="60%" stopColor="#EE736B"/>
                <stop offset="100%" stopColor="#C84848"/>
              </linearGradient>

              
              <radialGradient id="starMajorAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1"/>
                <stop offset="25%" stopColor="#BAE6FD" stopOpacity="0.85"/>
                <stop offset="55%" stopColor="#60A5FA" stopOpacity="0.4"/>
                <stop offset="85%" stopColor="#FDE047" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#FDE047" stopOpacity="0"/>
              </radialGradient>

              
              <linearGradient id="blueGownGrad" x1="280" y1="80" x2="420" y2="540" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2563EB"/>
                <stop offset="35%" stopColor="#1D4ED8"/>
                <stop offset="70%" stopColor="#1A56DB"/>
                <stop offset="100%" stopColor="#1E3A8A"/>
              </linearGradient>

              <linearGradient id="blueGownFold" x1="320" y1="200" x2="250" y2="480" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1D4ED8"/>
                <stop offset="100%" stopColor="#172554"/>
              </linearGradient>

              <linearGradient id="sleeveGreenGrad" x1="380" y1="120" x2="480" y2="240" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#84CC16"/>
                <stop offset="40%" stopColor="#65D619"/>
                <stop offset="100%" stopColor="#4D7C0F"/>
              </linearGradient>

              <linearGradient id="pinkFrameGrad" x1="160" y1="360" x2="540" y2="490" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F472B6"/>
                <stop offset="40%" stopColor="#E84893"/>
                <stop offset="100%" stopColor="#DB2777"/>
              </linearGradient>

              <linearGradient id="purpleFenderGrad" x1="100" y1="410" x2="160" y2="460" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#A78BFA"/>
                <stop offset="100%" stopColor="#7C3AED"/>
              </linearGradient>

              <radialGradient id="hubCapGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F472B6"/>
                <stop offset="60%" stopColor="#E84893"/>
                <stop offset="100%" stopColor="#9D174D"/>
              </radialGradient>

              <linearGradient id="yellowShoeGrad" x1="480" y1="460" x2="560" y2="520" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FDE047"/>
                <stop offset="70%" stopColor="#FACC15"/>
                <stop offset="100%" stopColor="#CA8A04"/>
              </linearGradient>

              
              <linearGradient id="forestGreenSignGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#19633B"/>
                <stop offset="45%" stopColor="#14532D"/>
                <stop offset="100%" stopColor="#0E3D20"/>
              </linearGradient>

              <filter id="signDropShadow" x="-10%" y="-10%" width="125%" height="135%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.45"/>
              </filter>

              
              <clipPath id="sceneFrameClip">
                <rect x="25" y="25" width="870" height="570" rx="26" ry="26"/>
              </clipPath>
            </defs>

            
            
            
            <g id="surreal-landscape-background" clipPath="url(#sceneFrameClip)">
              
              
              <rect x="25" y="25" width="870" height="570" fill="url(#skyTwilightGrad)"/>

              
              <path d="M 25,410 C 220,380 480,420 895,380 L 895,470 L 25,470 Z" fill="#F7BA8B" opacity="0.45"/>

              
              
              <g id="cloud-group-right" className="anim-cloud-drift-1" opacity="0.95">
                <path d="M 610,135 C 610,115 628,98 650,98 C 656,98 662,100 667,103 C 676,88 695,80 715,84 C 730,86 742,97 746,110 C 755,108 765,113 770,121 C 776,130 774,142 768,148 L 620,148 C 614,145 610,140 610,135 Z" fill="url(#cloudPinkGrad)"/>
                <ellipse cx="685" cy="118" rx="45" ry="22" fill="#FFA59B" opacity="0.6"/>
              </g>

              
              <g id="cloud-group-left" className="anim-cloud-drift-2" opacity="0.9">
                <path d="M 105,250 C 105,230 120,215 140,215 C 152,215 162,222 168,232 C 178,225 192,226 202,234 C 212,243 214,258 206,270 L 115,270 C 108,266 105,258 105,250 Z" fill="url(#cloudPinkGrad)"/>
                <path d="M 75,325 C 75,305 92,290 115,290 C 130,290 144,298 150,312 C 160,305 174,306 184,315 C 192,324 193,338 185,348 L 85,348 C 78,343 75,334 75,325 Z" fill="url(#cloudPinkGrad)"/>
              </g>

              
              <g id="cloud-group-lower-right" className="anim-cloud-drift-1" opacity="0.92">
                <path d="M 680,380 C 680,355 702,335 730,335 C 742,335 754,340 762,350 C 772,340 790,338 804,346 C 820,356 824,374 816,390 L 692,390 C 684,388 680,385 680,380 Z" fill="url(#cloudPinkGrad)"/>
              </g>

              
              <g id="star-major-center" transform="translate(735, 185)">
                
                <circle cx="0" cy="0" r="54" fill="url(#starMajorAura)"/>
                
                <g>
                  
                  <polygon points="0,-8 78,0 0,8 -78,0" fill="#FFFFFF" opacity="0.95"/>
                  
                  <polygon points="-8,0 0,-62 8,0 0,62" fill="#FFFFFF" opacity="0.95"/>
                  
                  <polygon points="0,-4 32,0 0,4 -32,0" transform="rotate(45)" fill="#FFFFFF" opacity="0.7"/>
                  <polygon points="0,-4 32,0 0,4 -32,0" transform="rotate(-45)" fill="#FFFFFF" opacity="0.7"/>
                  
                  <polygon points="0,-14 14,0 0,14 -14,0" fill="#FFFFFF"/>
                </g>
              </g>

              
              <g id="wind-breeze-trails" className="anim-wind-stream" stroke="#5EEAD4" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.75">
                
                <path d="M 270,230 C 310,215 350,235 395,225"/>
                <path d="M 285,238 C 320,226 360,242 410,232" strokeWidth="1.6" opacity="0.6"/>
                
                <path d="M 580,190 C 630,205 675,225 705,235"/>
                <path d="M 595,198 C 640,212 680,230 712,242" strokeWidth="1.8" opacity="0.6"/>
                
                <path d="M 105,305 C 150,290 195,315 255,305"/>
              </g>

              
              
              <path d="M 25,480 C 180,400 360,450 560,420 C 700,400 820,440 895,430 L 895,595 L 25,595 Z" fill="url(#hillBackGrad)"/>

              
              <path d="M 25,505 C 160,440 320,430 520,455 C 720,480 840,435 895,455 L 895,595 L 25,595 Z" fill="url(#hillMidGrad)"/>

              
              <path d="M 25,535 C 140,470 310,450 510,480 C 680,505 810,545 895,525 L 895,595 L 25,595 Z" fill="url(#hillFrontGrad)"/>

              
              <path d="M 130,555 C 145,535 155,515 168,500" stroke="#CBD5E1" strokeWidth="5" strokeLinecap="round" opacity="0.6"/>
              <path d="M 665,540 C 678,520 690,490 710,475" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" opacity="0.55"/>
              <path d="M 750,530 C 760,505 770,480 788,465" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" opacity="0.45"/>

              
              
              <g id="location-marker-board" transform="translate(675, 432)" filter="url(#signDropShadow)">
                
                <ellipse cx="68" cy="88" rx="55" ry="7" fill="#0B1324" opacity="0.5"/>

                
                <rect x="24" y="42" width="7.5" height="46" rx="2" fill="#382115" stroke="#1F1109" strokeWidth="1"/>
                <rect x="104" y="42" width="7.5" height="46" rx="2" fill="#382115" stroke="#1F1109" strokeWidth="1"/>
                <ellipse cx="27.5" cy="87.5" rx="6.5" ry="3" fill="#182236"/>
                <ellipse cx="107.5" cy="87.5" rx="6.5" ry="3" fill="#182236"/>

                
                <rect x="0" y="0" width="136" height="56" rx="8" fill="url(#forestGreenSignGrad)" stroke="#062815" strokeWidth="2"/>
                
                
                <rect x="3.5" y="3.5" width="129" height="49" rx="5.5" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.95"/>

                
                <circle cx="27.5" cy="8" r="1.8" fill="#E2E8F0" stroke="#475569" strokeWidth="0.6"/>
                <circle cx="27.5" cy="48" r="1.8" fill="#E2E8F0" stroke="#475569" strokeWidth="0.6"/>
                <circle cx="107.5" cy="8" r="1.8" fill="#E2E8F0" stroke="#475569" strokeWidth="0.6"/>
                <circle cx="107.5" cy="48" r="1.8" fill="#E2E8F0" stroke="#475569" strokeWidth="0.6"/>

                
                <circle cx="16" cy="19" r="3.2" fill="#FACC15"/>
                <path d="M 16,21.5 L 14,26.5 L 18,26.5 Z" fill="#CA8A04"/>

                
                <text x="70" y="20" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="9" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">NEXT STOP AT</text>

                
                <text x="64" y="38" fontFamily="'Montserrat', sans-serif" fontWeight="900" fontSize="12.5" fill="#FFFFFF" textAnchor="middle" letterSpacing="0.8">KUTTIKKATTUR</text>

                
                <g transform="translate(112, 33)">
                  <path d="M -2,0 L 7,0 M 4,-3.5 L 7.5,0 L 4,3.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>

                
                <line x1="16" y1="24.5" x2="120" y2="24.5" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.35"/>
              </g>

              
              
              <g transform="translate(160, 430)">
                <line x1="0" y1="0" x2="3" y2="28" stroke="#78350F" strokeWidth="3" strokeLinecap="round"/>
                <ellipse cx="2" cy="-2" rx="14" ry="18" fill="#B45309"/>
                <ellipse cx="0" cy="-4" rx="11" ry="14" fill="#C2410C"/>
              </g>

              
              <g transform="translate(620, 465)">
                <line x1="0" y1="0" x2="2" y2="22" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round"/>
                <ellipse cx="1" cy="-2" rx="11" ry="14" fill="#C2410C"/>
              </g>

              
              <g transform="translate(875, 438)">
                <line x1="0" y1="0" x2="1" y2="24" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round"/>
                <ellipse cx="0" cy="-2" rx="12" ry="15" fill="#C2410C"/>
              </g>

              
              <path d="M 25,560 C 50,545 75,560 90,575 C 105,565 130,575 140,595 L 25,595 Z" fill="#D97706" opacity="0.8"/>
              <path d="M 580,595 C 600,575 625,580 645,595 Z" fill="#EA580C" opacity="0.75"/>

              
              <g id="puppet-master-assembly" className="anim-puppet-sway">
                
                
                <g stroke="#FFFFFF" strokeWidth="1.3" strokeOpacity="0.85">
                  
                  <line x1="262" y1="75" x2="238" y2="465"/>
                  
                  <line x1="335" y1="125" x2="305" y2="475"/>
                  
                  <line x1="390" y1="140" x2="365" y2="480"/>
                  
                  <line x1="432" y1="150" x2="415" y2="475"/>
                  
                  <line x1="488" y1="140" x2="520" y2="455"/>
                </g>

                
                
                <path d="M 22,25 L 15,185 C 15,280 45,355 58,355 C 75,355 98,280 102,230 L 125,185 C 150,185 240,150 280,140 C 310,135 340,155 350,170 C 355,178 350,188 338,190 C 315,195 280,205 270,200 C 260,195 265,185 250,180 C 235,178 210,185 195,195 L 245,210 C 285,218 360,205 395,200 C 415,198 425,185 418,172 C 412,160 395,155 375,155 L 435,175 C 465,180 488,170 482,152 C 475,135 448,130 420,130 L 485,142 C 525,145 545,128 535,108 C 525,88 480,95 440,98 L 490,95 C 530,92 548,72 538,55 C 526,35 470,45 420,55 L 220,95 C 180,90 120,40 100,25 Z" fill="url(#puppetHandGrad)" stroke="#A82810" strokeWidth="2"/>

                
                <path d="M 125,185 C 160,170 240,130 300,122" stroke="#8A1E08" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
                <path d="M 195,195 C 240,185 320,165 385,158" stroke="#8A1E08" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
                <path d="M 245,210 C 285,198 360,182 430,172" stroke="#8A1E08" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
                <path d="M 102,230 C 85,260 70,305 60,340" stroke="#FF8A70" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5"/>
              </g>

            </g> 

            
            
            
            
            <g id="cyclist-stage-container" transform="translate(195, 205) scale(0.66)">
              
              
              <g id="preloader-cyclist-root" className="anim-traversal" style={{ animationDuration: '7.2s' }}>

                
                <g id="rear-wheel-assembly" transform="translate(160, 490)">
                  <circle cx="0" cy="0" r="96" stroke="#18181B" strokeWidth="12" fill="none"/>
                  <circle cx="0" cy="0" r="90" stroke="#F472B6" strokeWidth="3.5" fill="none"/>
                  <circle cx="0" cy="0" r="87" stroke="#9D174D" strokeWidth="1.5" fill="none"/>

                  
                  <g id="rear-wheel-spokes" className="anim-wheel-rear" style={{ animationDuration: '2.6s' }}>
                    <line x1="0" y1="-88" x2="0" y2="88" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.85"/>
                    <line x1="-88" y1="0" x2="88" y2="0" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.85"/>
                    <line x1="-62.2" y1="-62.2" x2="62.2" y2="62.2" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.85"/>
                    <line x1="-62.2" y1="62.2" x2="62.2" y2="-62.2" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.85"/>
                    <line x1="-76.2" y1="-44" x2="76.2" y2="44" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.7"/>
                    <line x1="-44" y1="-76.2" x2="44" y2="76.2" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.7"/>
                    <line x1="-76.2" y1="44" x2="76.2" y2="-44" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.7"/>
                    <line x1="-44" y1="76.2" x2="44" y2="-76.2" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.7"/>
                    <circle cx="0" cy="0" r="22" stroke="#F472B6" strokeWidth="1.2" strokeDasharray="3 3" fill="none"/>
                  </g>

                  
                  <path d="M -92,-10 C -98,-65 -45,-98 10,-98 C -35,-88 -82,-55 -85,15 Z" fill="url(#purpleFenderGrad)"/>
                  <circle cx="0" cy="0" r="16" fill="url(#hubCapGrad)"/>
                  <circle cx="0" cy="0" r="8" fill="#FFFFFF"/>
                  <circle cx="0" cy="0" r="3.5" fill="#18181B"/>
                </g>

                
                <g id="front-wheel-assembly" transform="translate(540, 490)">
                  <circle cx="0" cy="0" r="96" stroke="#18181B" strokeWidth="12" fill="none"/>
                  <circle cx="0" cy="0" r="90" stroke="#F472B6" strokeWidth="3.5" fill="none"/>
                  <circle cx="0" cy="0" r="87" stroke="#9D174D" strokeWidth="1.5" fill="none"/>

                  
                  <g id="front-wheel-spokes" className="anim-wheel-front" style={{ animationDuration: '2.6s' }}>
                    <line x1="0" y1="-88" x2="0" y2="88" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.85"/>
                    <line x1="-88" y1="0" x2="88" y2="0" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.85"/>
                    <line x1="-62.2" y1="-62.2" x2="62.2" y2="62.2" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.85"/>
                    <line x1="-62.2" y1="62.2" x2="62.2" y2="-62.2" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.85"/>
                    <line x1="-76.2" y1="-44" x2="76.2" y2="44" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.7"/>
                    <line x1="-44" y1="-76.2" x2="44" y2="76.2" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.7"/>
                    <line x1="-76.2" y1="44" x2="76.2" y2="-44" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.7"/>
                    <line x1="-44" y1="76.2" x2="44" y2="-76.2" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.7"/>
                    <circle cx="0" cy="0" r="22" stroke="#F472B6" strokeWidth="1.2" strokeDasharray="3 3" fill="none"/>
                  </g>

                  
                  <path d="M -90,-25 C -75,-85 -10,-102 60,-90 C 0,-92 -60,-65 -75,-15 Z" fill="url(#purpleFenderGrad)"/>
                  <path d="M -60,70 C 0,105 60,85 85,45 C 55,90 -10,95 -60,70 Z" fill="url(#purpleFenderGrad)"/>
                  <circle cx="0" cy="0" r="16" fill="url(#hubCapGrad)"/>
                  <circle cx="0" cy="0" r="8" fill="#FFFFFF"/>
                  <circle cx="0" cy="0" r="3.5" fill="#18181B"/>
                </g>

                
                <g id="bicycle-frame">
                  
                  <line x1="85" y1="365" x2="235" y2="365" stroke="url(#pinkFrameGrad)" strokeWidth="11" strokeLinecap="round"/>
                  <line x1="95" y1="378" x2="225" y2="378" stroke="#A855F7" strokeWidth="4.5" strokeLinecap="round"/>
                  <line x1="105" y1="392" x2="215" y2="392" stroke="url(#pinkFrameGrad)" strokeWidth="4.5" strokeLinecap="round"/>
                  <line x1="100" y1="365" x2="160" y2="490" stroke="url(#pinkFrameGrad)" strokeWidth="6.5" strokeLinecap="round"/>
                  <line x1="160" y1="365" x2="160" y2="490" stroke="#DB2777" strokeWidth="5" strokeLinecap="round"/>
                  <line x1="225" y1="365" x2="160" y2="490" stroke="url(#pinkFrameGrad)" strokeWidth="7" strokeLinecap="round"/>

                  
                  <line x1="160" y1="490" x2="330" y2="490" stroke="url(#pinkFrameGrad)" strokeWidth="9" strokeLinecap="round"/>
                  <line x1="160" y1="490" x2="230" y2="365" stroke="url(#pinkFrameGrad)" strokeWidth="10" strokeLinecap="round"/>
                  <line x1="330" y1="490" x2="230" y2="345" stroke="url(#pinkFrameGrad)" strokeWidth="10" strokeLinecap="round"/>
                  <line x1="230" y1="345" x2="225" y2="335" stroke="#18181B" strokeWidth="8" strokeLinecap="round"/>

                  
                  <path d="M 195,335 C 195,325 210,320 235,325 C 255,330 260,340 245,342 C 220,345 195,342 195,335 Z" fill="#18181B"/>
                  <rect x="215" y="334" width="22" height="6" rx="2" fill="#DB2777"/>

                  
                  <line x1="230" y1="365" x2="510" y2="365" stroke="url(#pinkFrameGrad)" strokeWidth="12" strokeLinecap="round"/>
                  <line x1="330" y1="490" x2="510" y2="365" stroke="url(#pinkFrameGrad)" strokeWidth="11" strokeLinecap="round"/>
                  <line x1="495" y1="325" x2="512" y2="375" stroke="#DB2777" strokeWidth="12" strokeLinecap="round"/>
                  <line x1="512" y1="375" x2="540" y2="490" stroke="url(#pinkFrameGrad)" strokeWidth="11" strokeLinecap="round"/>

                  
                  <path d="M 500,340 L 490,265 L 505,230" stroke="url(#pinkFrameGrad)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M 505,230 C 510,215 485,210 460,215" stroke="url(#pinkFrameGrad)" strokeWidth="9" strokeLinecap="round" fill="none"/>
                  <rect x="450" y="210" width="28" height="11" rx="4" transform="rotate(-15 450 210)" fill="#18181B"/>
                </g>

                
                <g id="bicycle-pedals" transform="translate(330, 490)">
                  <circle cx="0" cy="0" r="18" fill="#18181B" stroke="#F472B6" strokeWidth="3"/>
                  <g className="anim-pedal-crank">
                    <line x1="0" y1="0" x2="32" y2="-22" stroke="#DB2777" strokeWidth="7" strokeLinecap="round"/>
                    <rect x="24" y="-30" width="18" height="8" rx="2" fill="#E84893" stroke="#18181B" strokeWidth="1.5"/>
                    <line x1="0" y1="0" x2="-32" y2="22" stroke="#9D174D" strokeWidth="7" strokeLinecap="round"/>
                    <rect x="-42" y="18" width="18" height="8" rx="2" fill="#F472B6" stroke="#18181B" strokeWidth="1.5"/>
                  </g>
                </g>

                
                <g id="rider-legs">
                  
                  <path d="M 330,350 L 375,520 L 420,530 L 360,350 Z" fill="#172554"/>
                  
                  <g transform="translate(310, 500)">
                    <polygon points="10,0 55,-5 65,15 15,18" fill="#EAB308"/>
                    <path d="M 12,18 L 65,15 L 68,22 L 15,24 Z" fill="#EC4899"/>
                  </g>

                  
                  <path d="M 362,450 C 360,470 365,495 372,510 L 392,505 C 388,485 385,465 380,448 Z" fill="#C2672D"/>
                  <circle cx="370" cy="480" r="1.2" fill="#7C2D12"/>
                  <circle cx="374" cy="488" r="1.2" fill="#7C2D12"/>
                  <circle cx="368" cy="496" r="1.2" fill="#7C2D12"/>

                  
                  <g id="left-shoe">
                    <path d="M 368,502 L 450,455 C 465,445 478,455 465,472 L 400,522 C 385,532 365,522 368,502 Z" fill="url(#yellowShoeGrad)"/>
                    <path d="M 368,502 C 372,492 388,495 398,508 L 388,518 Z" fill="#CA8A04"/>
                    <path d="M 405,520 L 435,502 L 442,512 L 412,528 Z" fill="#EC4899"/>
                  </g>
                  <path d="M 330,420 L 335,550 L 420,555 L 425,480 Z" fill="#1D4ED8"/>
                  <path d="M 335,550 L 420,555 L 418,565 L 333,560 Z" fill="#172554"/>
                </g>

                
                <g id="rider-body" className="anim-rider-bob">
                  <path d="M 230,340 C 220,290 280,180 340,90 C 355,70 375,65 390,75 C 395,80 405,95 400,120 C 380,170 365,220 380,260 L 435,480 C 438,490 430,505 415,505 L 245,525 C 230,525 220,510 225,490 Z" fill="url(#blueGownGrad)"/>

                  <path d="M 340,90 C 320,180 270,300 240,490 L 290,520 C 320,380 360,250 375,120 Z" fill="url(#blueGownFold)" opacity="0.85"/>
                  <path d="M 380,260 L 435,480 L 375,510 L 350,330 Z" fill="#1E3A8A" opacity="0.65"/>

                  
                  <ellipse cx="378" cy="74" rx="22" ry="11" fill="#EA580C" transform="rotate(-18 378 74)"/>
                  <ellipse cx="379" cy="74" rx="17" ry="8" fill="#C2410C" transform="rotate(-18 379 74)"/>
                  <path d="M 358,74 C 362,86 392,82 398,71" stroke="#2563EB" strokeWidth="3" fill="none"/>
                </g>

                
                <g id="rider-arms" className="anim-arm-flex">
                  
                  <path d="M 345,100 C 365,95 385,115 370,145 L 285,225 C 275,235 265,225 272,212 L 330,120 Z" fill="url(#sleeveGreenGrad)"/>
                  
                  <path d="M 272,212 L 435,280 C 445,285 450,295 440,305 L 430,315 C 420,325 408,318 402,305 L 285,225 Z" fill="url(#sleeveGreenGrad)"/>
                  
                  <path d="M 420,270 L 495,280 C 505,282 508,295 500,305 L 460,335 C 452,342 440,338 435,325 L 415,285 Z" fill="url(#sleeveGreenGrad)"/>
                  <path d="M 495,280 C 505,282 508,295 500,305 L 485,302 C 490,295 488,288 480,285 Z" fill="#3F6212"/>

                  
                  <g opacity="0.8">
                    <path d="M 340,110 L 280,215 L 435,285" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M 348,115 L 290,218 L 445,292" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M 356,122 L 300,222 L 455,300" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M 364,130 L 310,226 L 465,310" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M 430,275 L 485,285" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M 435,285 L 480,300" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M 440,300 L 472,318" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
                  </g>
                </g>

                
                <g id="rider-hands" className="anim-hand-flex">
                  
                  <path d="M 458,235 C 452,225 460,215 470,215 L 485,218 C 490,220 488,230 480,235 Z" fill="#D97736"/>
                  
                  <g fill="#C2672D" stroke="#9A3412" strokeWidth="1">
                    <rect x="466" y="212" width="6.5" height="18" rx="3.2" transform="rotate(-15 466 212)"/>
                    <rect x="473" y="214" width="6.5" height="19" rx="3.2" transform="rotate(-15 473 214)"/>
                    <rect x="480" y="216" width="6.5" height="18" rx="3.2" transform="rotate(-15 480 216)"/>
                    <rect x="487" y="218" width="6" height="16" rx="3" transform="rotate(-15 487 218)"/>
                  </g>
                  
                  <path d="M 456,222 C 454,215 462,210 468,212 C 472,214 470,222 464,226 Z" fill="#EA580C"/>
                  
                  <path d="M 502,228 C 508,222 516,225 514,232 L 508,242 Z" fill="#9A3412"/>
                </g>

              </g> 
            </g> 

            
            
            
            <rect id="sceneOuterBorder" x="25" y="25" width="870" height="570" rx="26" ry="26" fill="none" stroke="#F59E0B" strokeWidth="12" strokeLinejoin="round"/>
            <rect id="sceneInnerGoldTrim" x="31" y="31" width="858" height="558" rx="20" ry="20" fill="none" stroke="#FDE68A" strokeWidth="1.8" opacity="0.7"/>

          </svg>
  );
}
