// Your script here.
 const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  // Fetch available voices and populate the dropdown
  function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  populateVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
  }

  // Set the voice of the message
  function setVoice() {
    const selectedVoice = voices.find(voice => voice.name === voicesDropdown.value);
    msg.voice = selectedVoice;
  }

  // Event listener for voice selection change
  voicesDropdown.addEventListener('change', setVoice);

  // Event listener for rate and pitch changes
  options.forEach(option =>
    option.addEventListener('input', () => {
      msg[option.name] = option.value;
    })
  );

  // Event listener for the Speak button
  speakButton.addEventListener('click', () => {
    setVoice();
    speechSynthesis.speak(msg);
  });

  // Event listener for the Stop button
  stopButton.addEventListener('click', () => {
    speechSynthesis.cancel();
  });