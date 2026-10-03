import React, { useState, useEffect, useRef } from 'react';
import { 
  Headphones, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  X, 
  Radio, 
  CloudRain, 
  Waves, 
  Music, 
  Sparkles, 
  Sliders, 
  Square,
  MessageSquare
} from 'lucide-react';
import { toBnDigit } from './PomodoroTimer';

export type AmbientSoundType = 'rain' | 'alpha' | 'waves' | 'cafe';

interface AmbientTrack {
  id: AmbientSoundType;
  title: string;
  icon: typeof CloudRain;
  desc: string;
}

const AMBIENT_TRACKS: AmbientTrack[] = [
  {
    id: 'rain',
    title: '🌧️ শান্ত বৃষ্টি ও রিল্যাক্স',
    icon: CloudRain,
    desc: 'মনোযোগ ধরে রাখতে ও পারিপার্শ্বিক কোলাহল দূর করতে বৃষ্টির আবহ'
  },
  {
    id: 'alpha',
    title: '🧠 ৪৩২Hz আলফা বাইনরাল ড্রোন',
    icon: Music,
    desc: 'গভীর স্মৃতিশক্তি ও মস্তিষ্কের একাগ্রতা বৃদ্ধির বিশেষ ফ্রিকোয়েন্সি'
  },
  {
    id: 'waves',
    title: '🌊 সমুদ্রের ছন্দময় কল্লোল',
    icon: Waves,
    desc: 'পরীক্ষার মানসিক চাপ ও দুশ্চিন্তা দূর করে মন শান্ত রাখার সুর'
  },
  {
    id: 'cafe',
    title: '☕ শান্ত স্টাডি রুম অ্যাম্বিয়েন্স',
    icon: Radio,
    desc: 'পড়াশোনায় নিমগ্ন থাকার জন্য হালকা হোয়াইট নয়েজ আবহ'
  }
];

export const AudioStudyPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<AmbientSoundType>('rain');
  const [volume, setVolume] = useState(0.4);

  // Speech synthesis (Read Aloud) state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);

  // Web Audio Context refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize or get AudioContext
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Stop current ambient synthesizer nodes
  const stopAmbientNodes = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    nodesRef.current.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // ignore
      }
    });
    nodesRef.current = [];
  };

  // Start real-time synthesized ambient sounds using Web Audio API
  const startAmbientSound = (type: AmbientSoundType) => {
    stopAmbientNodes();
    const ctx = getAudioContext();
    if (!ctx) return;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume, ctx.currentTime);
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    if (type === 'rain') {
      // Pink/Brown noise rain generator
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Gain
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      noise.connect(filter);
      filter.connect(masterGain);
      noise.start();
      nodesRef.current.push(noise, filter);

    } else if (type === 'alpha') {
      // 432 Hz Alpha Brainwave Drone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const sub = ctx.createOscillator();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(432, ctx.currentTime);

      // Binaural 10Hz offset for Alpha Brainwaves
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(442, ctx.currentTime);

      sub.type = 'triangle';
      sub.frequency.setValueAtTime(216, ctx.currentTime);

      const toneGain = ctx.createGain();
      toneGain.gain.setValueAtTime(0.2, ctx.currentTime);

      osc1.connect(toneGain);
      osc2.connect(toneGain);
      sub.connect(toneGain);
      toneGain.connect(masterGain);

      osc1.start();
      osc2.start();
      sub.start();
      nodesRef.current.push(osc1, osc2, sub, toneGain);

    } else if (type === 'waves') {
      // Ocean waves filter sweep simulation
      const bufferSize = ctx.sampleRate * 3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);

      // LFO for wave swelling
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 sec ocean swell cycle
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(240, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      noise.connect(filter);
      filter.connect(masterGain);

      noise.start();
      lfo.start();
      nodesRef.current.push(noise, filter, lfo, lfoGain);

    } else if (type === 'cafe') {
      // Warm White/Brown Noise
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      noise.connect(filter);
      filter.connect(masterGain);
      noise.start();
      nodesRef.current.push(noise, filter);
    }
  };

  // Adjust volume
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Handle ambient play/pause
  const toggleAmbientPlay = () => {
    if (isPlayingAmbient) {
      stopAmbientNodes();
      setIsPlayingAmbient(false);
    } else {
      startAmbientSound(currentTrack);
      setIsPlayingAmbient(true);
    }
  };

  const handleSelectTrack = (trackId: AmbientSoundType) => {
    setCurrentTrack(trackId);
    if (isPlayingAmbient) {
      startAmbientSound(trackId);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopAmbientNodes();
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text-To-Speech: Read Introduction Guide Aloud
  const handleReadIntroAloud = () => {
    if (!window.speechSynthesis) {
      alert('আপনার ব্রাউজার টেক্সট-টু-স্পিচ অডিও সাপোর্ট করছে না।');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = "স্বাগতম। জাতীয় বিশ্ববিদ্যালয় ডিগ্রি প্রথম বর্ষ রাষ্ট্রবিজ্ঞান প্রথম পত্র: রাজনৈতিক তত্ত্ব। এখানে ক-বিভাগের ৯৭টি, খ-বিভাগের ৬০টি এবং গ-বিভাগের ৪৪টি পূর্ণাঙ্গ প্রশ্ন ও প্রমিত উত্তর সংকলিত রয়েছে। মনোযোগ দিয়ে পড়ুন এবং পরীক্ষার পূর্ণ প্রস্তুতি নিন।";
    
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'bn-BD';
    utterance.rate = speechRate;

    // Pick a Bengali voice if available
    const voices = window.speechSynthesis.getVoices();
    const bnVoice = voices.find(v => v.lang.includes('bn') || v.name.toLowerCase().includes('bangla') || v.name.toLowerCase().includes('bengali'));
    if (bnVoice) {
      utterance.voice = bnVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="relative inline-block">
      
      {/* Floating Toolbar Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        title="ফোকাস অডিও ও রিড-অ্যালাউড স্পিকার প্লেয়ার"
        className={`px-3 py-2 rounded-xl text-xs font-bold shadow-lg border flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95 ${
          isPlayingAmbient || isSpeaking
            ? 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white border-teal-300/40 animate-pulse'
            : 'bg-slate-900 text-white border-slate-700 hover:bg-slate-800'
        }`}
      >
        <Headphones className="w-3.5 h-3.5 text-teal-300" />
        <span className="hidden sm:inline">অডিও</span>
        {(isPlayingAmbient || isSpeaking) && (
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        )}
      </button>

      {/* Expanded Audio Deck Popover */}
      {isOpen && (
        <div 
          className="absolute bottom-12 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 text-slate-900 animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{ maxWidth: 'calc(100vw - 24px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-teal-500 text-white shadow-xs">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                  স্টাডি ফোকাস অডিও ও রিড-অ্যালাউড
                </h4>
                <p className="text-[11px] text-slate-500">
                  পড়াশোনার সময় মনোযোগ বৃদ্ধির ব্যাকগ্রাউন্ড সাউন্ড
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Section 1: Study Ambient Focus Sounds */}
          <div className="py-3 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <Music className="w-3.5 h-3.5 text-teal-600" />
                ফোকাস অ্যাম্বিয়েন্ট সাউন্ড:
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold">
                {isPlayingAmbient ? 'চলমান 🔊' : 'বন্ধ'}
              </span>
            </div>

            {/* Sound Selection Grid */}
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {AMBIENT_TRACKS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTrack(t.id)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    currentTrack === t.id
                      ? 'bg-teal-50 border-teal-300 text-teal-950 font-bold shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs truncate">{t.title}</span>
                  <span className="text-[10px] text-slate-500 font-normal line-clamp-1 mt-0.5">
                    {t.desc}
                  </span>
                </button>
              ))}
            </div>

            {/* Play/Pause & Volume controls */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={toggleAmbientPlay}
                className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                  isPlayingAmbient
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
              >
                {isPlayingAmbient ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>সাউন্ড বিরতি দিন</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>ফোকাস সাউন্ড চালু করুন</span>
                  </>
                )}
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5 w-24">
                {volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                )}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Text-To-Speech (অডিও পাঠ) */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                টেক্সট-টু-স্পিচ (অডিও পাঠ):
              </span>
              {isSpeaking && (
                <span className="text-[10px] text-rose-600 font-bold animate-pulse">
                  পাঠ চলছে...
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-500 leading-snug">
              পরীক্ষার সারসংক্ষেপ ও বিষয় পরিচিতি ব্রাউজারের ভয়েস দিয়ে বাংলায় শুনুন।
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReadIntroAloud}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isSpeaking
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <Square className="w-3 h-3 fill-current text-rose-600" />
                    <span>পড়া থামান</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>সারসংক্ষেপ শুনুন (অডিও পাঠ)</span>
                  </>
                )}
              </button>

              {/* Speed Controller */}
              <div className="flex items-center rounded-lg bg-slate-100 p-0.5 text-[10px] font-bold">
                <button
                  onClick={() => setSpeechRate(0.85)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${speechRate === 0.85 ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'}`}
                >
                  ০.৮x
                </button>
                <button
                  onClick={() => setSpeechRate(1)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${speechRate === 1 ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'}`}
                >
                  ১x
                </button>
                <button
                  onClick={() => setSpeechRate(1.25)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${speechRate === 1.25 ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'}`}
                >
                  ১.২x
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
