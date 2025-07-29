const intro = document.getElementById('intro');
const main = document.getElementById('main');
const terminal = document.getElementById('terminal');
const thankyou = document.getElementById('thankyou');
const continueBtn = document.getElementById('continueBtn');
const startBtn = document.getElementById('startBtn');

let stepIndex = 0;
let username = '';
let isTyping = false; // <- fix: typing lock

startBtn.onclick = () => {
  intro.classList.add('hidden');
  main.classList.remove('hidden');
  nextStep();
};

const steps = [
  '> Start Your Trusted Ceremony Setup',
  '{Click to Start}',
  '> Initializing Trusted Setup Environment...',
  '> Checking entropy source... ✓',
  '> Verifying secure randomness generator... ✓',
  '> Establishing connection with Union Coordinator Node...',
  '> Device Detected:\n   - OS: Ubuntu 20.04.6 LTS\n   - RAM: 16 GB\n   - Architecture: x86_64\n   - IP Range: 152.64.XX.XX\n   - CPU: Intel(R) Core(TM) i7-10700K @ 3.80GHz',
  '> Generating entropy...\n█████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 14%',
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
  '   - https://ceremony.union.build/user/{username}',
  '   - Status: ✅ Published',
  '> Broadcasting attestation to decentralized messaging network...',
  '██████████████████████████████████████████████████████████▒▒▒▒▒▒▒ 97%',
  '> Finalizing...',
  '> Sealing entropy stream...',
  '> Updating contributor index (ID: 4728)',
  '> Thanking participant...',
  '████████████████████████████████████████████████████████████████ 100%',
  '> 🎉 Congratulations!\nYou have successfully completed the Union Trusted Ceremony Setup.\n\nYour single contribution plays a critical role in the generation of Union’s decentralized ZK parameters.\nThis ceremony stands as the largest Groth16 setup in history — backed by over 5000 participants across the world.\nThanks to you, we inch closer to a truly interoperable, trustless future.',
  '{Click to finish}'
];

function nextStep() {
  const current = steps[stepIndex];

  if (current.startsWith('{Click')) {
    terminal.innerHTML += current + '\n';
    continueBtn.classList.remove('hidden');
    continueBtn.classList.add('pulse');
    return;
  }

  if (current === 'Enter your username:') {
    terminal.innerHTML += '> ' + current + '\n';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'e.g. shinosuka_eth';
    input.onkeydown = function (e) {
      if (e.key === 'Enter') {
        username = input.value || 'anonymous_user';
        terminal.removeChild(input);
        stepIndex++;
        showNextWithUsername();
      }
    };
    terminal.appendChild(input);
    input.focus();
    terminal.scrollTop = terminal.scrollHeight;
    return;
  }

  let line = current.includes('{username}') ? current.replace('{username}', username) : current;
  isTyping = true;
  typeLine(line, () => {
    isTyping = false;
    stepIndex++;
    nextStep();
  });
}

function showNextWithUsername() {
  const current = steps[stepIndex].replace('{username}', username);
  isTyping = true;
  typeLine(current, () => {
    isTyping = false;
    stepIndex++;
    nextStep();
  });
}

function typeLine(text, callback, i = 0) {
  if (i < text.length) {
    terminal.innerHTML += text.charAt(i);
    terminal.scrollTop = terminal.scrollHeight;
    setTimeout(() => typeLine(text, callback, i + 1), 15);
  } else {
    terminal.innerHTML += '\n';
    callback();
  }
}

continueBtn.onclick = () => {
  if (isTyping) return; // prevent mid-type clicking

  continueBtn.classList.add('hidden');
  continueBtn.classList.remove('pulse');

  const current = steps[stepIndex];
  if (current === '{Click to finish}') {
    finishExperience();
  } else {
    stepIndex++;
    nextStep();
  }
};

function finishExperience() {
  thankyou.classList.remove('hidden');
  thankyou.scrollIntoView({ behavior: 'smooth' });
}
