


const msg = new SpeechSynthesisUtterance();

      let voices = [];
      const voicesDropdown = document.querySelector('[name="voice"]');
      const options = document.querySelectorAll(
        '[type="range"], [name="text"]'
      );
      const speakButton = document.querySelector("#speak");
      const stopButton = document.querySelector("#stop");

      // doc : https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
      function populateVoiceList() {
        voices = this.getVoices();
        console.log(voices);
        voicesDropdown.innerHTML = voices
          .map(
            (voice) =>
              `<option value="${voice.name}">${voice.name} (${voice.lang}) ${
                voice.default ? "- default" : ""
              }</option>`
          )
          .join("");
      }

      function setVoice() {
        msg.voice = voices.find((voice) => voice.name === this.value);
        toggle();
      }

      function toggle(startOver = true) {
        window.speechSynthesis.cancel();
        if (startOver) {
          window.speechSynthesis.speak(msg);
          console.log(msg);
        }
      }

      function setOption() {
        console.log(this.name, this.value);
        msg[this.name] = this.value;
      }

      window.speechSynthesis.addEventListener(
        "voiceschanged",
        populateVoiceList
      );
      voicesDropdown.addEventListener("change", setVoice);
      options.forEach((option) => option.addEventListener("change", setOption));
      speakButton.addEventListener("click", toggle);
      stopButton.addEventListener("click", toggle.bind(null, false));

