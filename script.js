// script.js

// Element references
const introBox = document.querySelector('.intro-box');
const main = document.querySelector('main');
const terminal = document.querySelector('.terminal');
const continueBtn = document.getElementById('continueBtn');
const thankyouPopup = document.querySelector('.thankyou-popup');
const startBtn = document.querySelector('.intro-box .primary-button');

let stepIndex = 0;
let isTyping = false;

// The sequence of terminal lines and click prompts
const steps = [
  '> Start Your Trusted Ceremony Setup',
  '{Click to Start}',
  '> Initializing Trusted Setup Environment...',
  '> Checking entropy source... ✓',
  '> Verifying secure randomness generator... ✓',
  '> Establishing connection with Union Coordinator Node...',
  '> Device Detected:',
  '   - OS: Ubuntu 20.04.6 LTS',
  '   - RAM: 16 GB',
  '   - Architecture: x86_64',
  '   - IP Range: 152.64.XX.XX',
  '   - CPU: Intel(R) Core(TM) i7-10700K @ 3.80GHz',
  '> Generating entropy...',
  '█████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 14%',
  '{Click to continue}',
  '> Mixing entropy with ZK-verified randomness stream...',
  '> Encrypting contribution with GPG key [0x4B7C3F2E]...',
  '> Uploading to MPC node cluster...',
  '██████████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 41%',
  '{Click to continue}',
  '> Contribution received by Coordinator Node #12 (Amsterdam 🇳🇱)',
  '> Verifying validity of contribution...',
  '> Cross-checking with 4663 previous contributions...',
  '> Contribution Signature: ✅ VALID',
  '> Contribution Hash: 0xb2fa..8e3d',
  '> Latency: 212ms',
  '> Ceremony Phase: Public #9',
  '███████████████████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 67%',
  '{Click to continue}',
  '> Logging contribution to IPFS...',
  '> IPFS Hash: QmYreF8...xpTK',
  '> Backing up contribution to decentralized archive nodes...',
  '██████████████████████████████████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 86%',
  '{Click to continue}',
  '> Publishing public attestation link...',
  '   - https://ceremony.union.build/user/shinosuka_eth',
  '   - Status: ✅ Published',
  '> Broadcasting attestation to decentralized messaging network...',
  '██████████████████████████████████████████████████████████▒▒▒▒▒▒▒ 97%',
  '> Finalizing...',
  '> Sealing entropy stream...',
  '> Updating contributor index (ID: 4728)',
  '> Thanking participant...',
  '████████████████████████████████████████████████████████████████ 100%',
  '> 🎉 Congratulations!',
  'You have successfully completed the Union Trusted Ceremony Setup.',
  'Your single contribution plays a critical role in the generation of Union’s decentralized ZK parameters.',
  'This ceremony stands as the largest Groth16 setup in history — backed by over 5000 participants across the world.',
  'Thanks to you, we inch closer to a truly interoperable, trustless future.',
  '{Click to finish}'
];

// Start the experience
startBtn.addEventListener('click', () => {
  introBox.classList.add('hidden');
  main.classList.remove('hidden');
  nextStep();
});

// Advance to the next step
function nextStep() {
  const current = steps[stepIndex];

  // Show click prompt
  if (current.startsWith('{Click')) {
    terminal.innerHTML += current + '\n';
    continueBtn.style.display = 'block';
    continueBtn.classList.add('pulse');
    return;
  }

  // Typing animation
  isTyping = true;
  typeLine(current, () => {
    isTyping = false;
    stepIndex++;
    nextStep();
  });
}

// Typing effect helper
function typeLine(text, callback, i = 0) {
  if (i < text.length) {
    terminal.innerHTML += text.charAt(i);
    terminal.scrollTop = terminal.scrollHeight;
    setTimeout(() => typeLine(text, callback, i + 1), 20);
  } else {
    terminal.innerHTML += '\n';
    callback();
  }
}

// Continue button handler
continueBtn.addEventListener('click', () => {
  if (isTyping) return;
  continueBtn.style.display = 'none';
  continueBtn.classList.remove('pulse');

  if (steps[stepIndex] === '{Click to finish}') {
    thankyouPopup.style.display = 'block';
  } else {
    stepIndex++;
    nextStep();
  }
});
```0
