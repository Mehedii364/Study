// Web Speech Synthesis Read-Aloud Helper

let currentUtterance: SpeechSynthesisUtterance | null = null;

export const speakText = (
  text: string, 
  onStart?: () => void, 
  onEnd?: () => void
): boolean => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const cleanText = text
    .replace(/[#*`_~]/g, '')
    .replace(/🔥/g, '')
    .trim();

  if (!cleanText) return false;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'bn-BD';
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  // Try to find a Bengali voice
  const voices = window.speechSynthesis.getVoices();
  const bnVoice = voices.find(
    (v) => v.lang.startsWith('bn') || v.name.toLowerCase().includes('bengali') || v.name.toLowerCase().includes('bangla')
  );
  if (bnVoice) {
    utterance.voice = bnVoice;
  }

  utterance.onstart = () => {
    currentUtterance = utterance;
    if (onStart) onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};

export const isSpeakingCurrently = (): boolean => {
  return typeof window !== 'undefined' && Boolean(window.speechSynthesis?.speaking);
};
